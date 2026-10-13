#!/usr/bin/env python3
"""MATH_SCRIPT adapter for the format-02 publishing sheets (02a, 02b, 02c).

publishing/tools/build_publishing.py runs a sheet's MATH_SCRIPT and reads its summary with the pattern
"<N> checks, <F> failed" (the form 06-pov-race.py prints). teasers/v2/checks/02-find-your-row.py prints
"PASSED: all <N> checks" or "FAILED: <F> of <N> checks" instead. This runs that check unchanged, passes its
output and exit code through, and adds the summary line in the builder's form. It computes nothing itself.

    python3 publishing/data/checks/02-find-your-row.py [args passed to the 02 check]
"""
import os, re, subprocess, sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
CHECK = os.path.join(ROOT, "teasers", "v2", "checks", "02-find-your-row.py")

r = subprocess.run([sys.executable, CHECK] + sys.argv[1:], capture_output=True, text=True)
sys.stdout.write(r.stdout)
sys.stderr.write(r.stderr)
ok = re.search(r"PASSED: all (\d+) checks", r.stdout)
bad = re.search(r"FAILED: (\d+) of (\d+) checks", r.stdout)
already = re.search(r"(\d+) checks, (\d+) failed", r.stdout)
if already:
    pass                                                    # the check already prints the builder's form
elif ok and r.returncode == 0:
    print(f"{ok.group(1)} checks, 0 failed")
elif bad:
    print(f"{bad.group(2)} checks, {bad.group(1)} failed")
else:
    print(f"no summary from {os.path.relpath(CHECK, ROOT)} (exit {r.returncode})")
sys.exit(r.returncode)
