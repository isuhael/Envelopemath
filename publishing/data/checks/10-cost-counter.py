#!/usr/bin/env python3
"""MATH_SCRIPT adapter for the format-10 publishing sheets (10a, 10b, 10c).

publishing/tools/build_publishing.py runs a sheet's MATH_SCRIPT and reads its summary with the pattern
"<N> checks, <F> failed" (the form 06-pov-race.py prints). teasers/v2/checks/10-cost-counter.py prints
"<N> checks, <F> failures" instead. This runs that check unchanged, passes its output and exit code through,
and adds the summary line in the builder's form. It computes nothing itself. (Copied from the 07 adapter.)

    python3 publishing/data/checks/10-cost-counter.py [args passed to the 10 check]
"""
import os, re, subprocess, sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
CHECK = os.path.join(ROOT, "teasers", "v2", "checks", "10-cost-counter.py")

r = subprocess.run([sys.executable, CHECK] + sys.argv[1:], capture_output=True, text=True)
sys.stdout.write(r.stdout)
sys.stderr.write(r.stderr)
summary = re.search(r"(\d+) checks, (\d+) failures", r.stdout)
already = re.search(r"(\d+) checks, (\d+) failed", r.stdout)
if already:
    pass                                                    # the check already prints the builder's form
elif summary:
    print(f"{summary.group(1)} checks, {summary.group(2)} failed")
else:
    print(f"no summary from {os.path.relpath(CHECK, ROOT)} (exit {r.returncode})")
sys.exit(r.returncode)
