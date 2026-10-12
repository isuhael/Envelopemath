#!/usr/bin/env python3
"""Builds publishing/06c-becker-rig-latte-starbucks.{md,json}. Kept so the commands in the 06c sheet and in
teasers/v2/06-pov-race.md still work; it is the same as

    python3 publishing/tools/build_publishing.py 06c-becker-rig-latte-starbucks [--covers] [--check]

The 06c strings now live in publishing/data/06c-becker-rig-latte-starbucks.py, and the house template in
build_publishing.py. The move reproduces the shipped sheet byte for byte (both .md and .json, and both covers).
"""
import os, sys

sys.dont_write_bytecode = True
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import build_publishing  # noqa: E402

if __name__ == "__main__":
    sys.exit(build_publishing.main(["06c-becker-rig-latte-starbucks"] + sys.argv[1:]))
