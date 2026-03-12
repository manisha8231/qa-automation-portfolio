# mini_test_report.py
# Week 1 Final Project — Manisha Wadhwa
# Uses: variables, lists, dicts, functions, loops, if/else

# ── VARIABLES ──────────────────────────────────────────
app_name = "Rogers Unified Desktop"
tester   = "Manisha Wadhwa"
version  = "v2.5.1"

# ── TEST CASES — list of dictionaries ─────────────────
test_cases = [
    {"name": "Login with valid credentials",  "expected": "PASS", "actual": "PASS"},
    {"name": "Login with wrong password",      "expected": "FAIL", "actual": "FAIL"},
    {"name": "Search for internet plans",      "expected": "PASS", "actual": "PASS"},
    {"name": "Add TV plan to cart",            "expected": "PASS", "actual": "FAIL"},
    {"name": "Checkout and confirm order",     "expected": "PASS", "actual": "PASS"},
]

# ── FUNCTION ───────────────────────────────────────────
def check_test(test):
    if test["actual"] == test["expected"]:
        return "✅ PASS"
    else:
        return "❌ FAIL"

# ── RUN ALL TESTS ──────────────────────────────────────
passed = 0
failed = 0

print("=" * 55)
print(f"  TEST REPORT — {app_name} {version}")
print(f"  Tester: {tester}")
print("=" * 55)

for tc in test_cases:
    result = check_test(tc)
    print(f"  {result}  {tc['name']}")
    if result == "✅ PASS":
        passed += 1
    else:
        failed += 1

# ── SUMMARY ────────────────────────────────────────────
print("=" * 55)
print(f"  Total: {len(test_cases)}  |  Passed: {passed}  |  Failed: {failed}")
if failed == 0:
    print("  🎉 All tests passed! Ready for release.")
else:
    print(f"  ⚠️  {failed} test(s) failed. Do NOT release.")

print("=" * 55)

