# tests/test_login.py
# Test file — imports LoginPage and runs tests

import sys
sys.path.append('..\pages')      # tells Python where to find pages folder

from login_page import LoginPage  # ← import the class!

# ── TEST 1 — Valid Login ───────────────────────────
def test_valid_login():
    print("\n--- Test: Valid Login ---")
    page = LoginPage()
    page.navigate()
    page.login("manisha_test", "Test@1234")
    page.verify_login()
    page.get_title()
    page.close()

# ── TEST 2 — Check Title ───────────────────────────
def test_page_title():
    print("\n--- Test: Page Title ---")
    page = LoginPage()
    page.navigate()
    expected = "Rogers Login"
    if page.page_title == expected:
        print(f"✅ PASS — Title is: {page.page_title}")
    else:
        print(f"❌ FAIL — Expected: {expected} | Got: {page.page_title}")
    page.close()

# ── RUN ALL TESTS ──────────────────────────────────
print("=" * 45)
print("  LOGIN PAGE TESTS")
print("=" * 45)

test_valid_login()
test_page_title()

print("\n" + "=" * 45)
print("  ALL LOGIN TESTS COMPLETE")
print("=" * 45) 