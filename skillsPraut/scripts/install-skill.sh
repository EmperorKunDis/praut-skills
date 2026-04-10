#!/bin/bash
# Install Praut Remotion skill into Claude Code (~/.claude/skills/remotion)
# Creates a symlink so updates to the repo auto-propagate.

SKILL_DIR="$HOME/.claude/skills/remotion"
SCRIPT_DIR="$(cd "$(dirname "$0")/.." && pwd)/skills/remotion"

if [ -L "$SKILL_DIR" ]; then
  echo "✓ Skill already linked: $(readlink "$SKILL_DIR")"
  exit 0
elif [ -d "$SKILL_DIR" ]; then
  echo "✗ Skill directory exists (not a symlink). Remove first:"
  echo "  rm -rf $SKILL_DIR"
  exit 1
else
  mkdir -p "$HOME/.claude/skills"
  ln -s "$SCRIPT_DIR" "$SKILL_DIR"
  echo "✓ Skill installed: $SKILL_DIR → $SCRIPT_DIR"
  echo "  Available as /remotion-best-practices in any Claude Code session."
fi
