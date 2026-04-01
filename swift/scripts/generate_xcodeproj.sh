#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

if ! command -v xcodegen >/dev/null 2>&1; then
  echo "[INFO] xcodegen not found. Installing with Homebrew..."
  if command -v brew >/dev/null 2>&1; then
    brew install xcodegen
  else
    echo "[ERROR] Homebrew is not installed. Install XcodeGen manually: https://github.com/yonaskolb/XcodeGen"
    exit 1
  fi
fi

xcodegen generate --spec "$ROOT_DIR/project.yml"

echo "[OK] Generated: $ROOT_DIR/TheInvisibleGallery.xcodeproj"
