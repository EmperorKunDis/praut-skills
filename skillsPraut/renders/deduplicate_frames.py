"""
Deduplicate video frames using perceptual hashing (pHash).
Strategy:
1. Compute pHash for each frame
2. Compare consecutive frames — if hash distance < threshold, they're similar
3. Keep only the first frame from each group of similar consecutive frames
"""

import json
import sys
from pathlib import Path

import imagehash
from PIL import Image

FRAMES_DIR = Path(__file__).parent / "epizoda1_screens"

# Hash distance threshold: 0 = identical, higher = more tolerant
# 8-12 is good for "same scene with minor movement"
THRESHOLD = 10


def main():
    frames = sorted(FRAMES_DIR.glob("frame_*.png"))
    total = len(frames)
    print(f"Found {total} frames to analyze")

    if total == 0:
        print("No frames found!")
        return

    # Phase 1: Compute hashes
    print("Computing perceptual hashes...")
    hashes = {}
    for i, frame in enumerate(frames):
        img = Image.open(frame)
        h = imagehash.phash(img, hash_size=16)
        hashes[frame.name] = h
        if (i + 1) % 100 == 0:
            print(f"  [{i + 1}/{total}] hashed")
    print(f"All {total} hashes computed.")

    # Phase 2: Group consecutive similar frames
    sorted_names = sorted(hashes.keys())
    groups = []
    current_group = [sorted_names[0]]

    for prev_name, curr_name in zip(sorted_names, sorted_names[1:]):
        dist = hashes[prev_name] - hashes[curr_name]
        if dist <= THRESHOLD:
            current_group.append(curr_name)
        else:
            groups.append(current_group)
            current_group = [curr_name]
    groups.append(current_group)

    # Phase 3: Keep first from each group, delete rest
    to_keep = set()
    to_delete = set()
    for group in groups:
        to_keep.add(group[0])
        for frame in group[1:]:
            to_delete.add(frame)

    print(f"\n{'=' * 60}")
    print(f"Total frames: {total}")
    print(f"Unique scenes: {len(groups)}")
    print(f"Frames to KEEP: {len(to_keep)}")
    print(f"Frames to DELETE: {len(to_delete)}")
    print(f"{'=' * 60}")

    # Save report before deleting
    report_path = FRAMES_DIR.parent / "dedup_report.json"
    with open(report_path, "w") as f:
        json.dump(
            {
                "threshold": THRESHOLD,
                "total": total,
                "unique_scenes": len(groups),
                "to_keep": sorted(to_keep),
                "to_delete": sorted(to_delete),
            },
            f,
            indent=2,
        )
    print(f"Report saved to {report_path}")

    if not to_delete:
        print("Nothing to delete — all frames are unique!")
        return

    # Auto-delete if --delete flag, otherwise just report
    if "--delete" in sys.argv:
        deleted = 0
        for frame in sorted(to_delete):
            path = FRAMES_DIR / frame
            if path.exists():
                path.unlink()
                deleted += 1
        print(f"Deleted {deleted} frames. {len(to_keep)} unique frames remain.")
    else:
        print("\nDry run — no files deleted. Run with --delete to remove duplicates.")


if __name__ == "__main__":
    main()
