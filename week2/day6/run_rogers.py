from test_case import TestCase
from test_suite import TestSuite

# ── TEST FUNCTIONS ─────────────────────────────────
def test_valid_login(tc):
    username = "manisha_test"
    password = "Test@1234"
    if username and password:
        tc.pass_test("Login successful")
    else:
        tc.fail_test("Missing credentials")


def test_wrong_password(tc):
    password = "wrongpass"
    if password != "Test@1234":
        tc.pass_test("Error message shown correctly")
    else:
        tc.fail_test("Should have rejected wrong password")       

def test_search(tc):
    results = ["Internet 150", "Internet 300", "Internet 500"]
    if len(results) > 0:
        tc.pass_test(f"{len(results)} plans found")
    else:
        tc.fail_test("No results returned")


def test_add_to_cart(tc):
    cart_items = []
    if len(cart_items) > 0:
        tc.pass_test("Item added to cart")
    else:
        tc.fail_test("Cart is empty — add to cart failed")


def test_checkout(tc):
    order_id = "ORD-001"
    if order_id:
        tc.pass_test(f"Order confirmed: {order_id}")
    else:
        tc.fail_test("Checkout failed")

def test_api_login(tc):
    status_code = 200
    if status_code == 200:
        tc.pass_test("API returned 200 OK")
    else:
        tc.fail_test(f"API returned {status_code}")

def test_api_search(tc):
    response = {"results": 5, "status": "success"}
    if response["status"] == "success":
        tc.pass_test(f"API returned {response['results']} results")
    else:
        tc.fail_test("API search failed")

# ── BUILD SUITE ────────────────────────────────────
suite = TestSuite("ROGERS REGRESSION SUITE — DAY 6")

# UI Tests
suite.add_test(TestCase("Login with valid credentials", "High",   "UI"))
suite.add_test(TestCase("Login with wrong password",    "High",   "UI"))
suite.add_test(TestCase("Search for internet plans",    "Medium", "UI"))
suite.add_test(TestCase("Add TV plan to cart",          "High",   "UI"))
suite.add_test(TestCase("Checkout and confirm order",   "High",   "UI"))

# API Tests
suite.add_test(TestCase("API login endpoint",           "High",   "API"))
suite.add_test(TestCase("API search endpoint",          "Medium", "API"))

# ── TEST FUNCTIONS LIST ────────────────────────────
test_functions = [
    test_valid_login,
    test_wrong_password,
    test_search,
    test_add_to_cart,
    test_checkout,
    test_api_login,
    test_api_search,
]

# ── RUN 1: ALL TESTS ───────────────────────────────
print("\n" + "🔵 " * 20)
print("RUN 1 — ALL TESTS")
print("🔵 " * 20)
suite.run_all(test_functions)

# ── RUN 2: HIGH PRIORITY ONLY ──────────────────────
print("\n" + "🔴 " * 20)
print("RUN 2 — HIGH PRIORITY ONLY")
print("🔴 " * 20)

suite2 = TestSuite("ROGERS — HIGH PRIORITY ONLY")
suite2.add_test(TestCase("Login with valid credentials", "High", "UI"))
suite2.add_test(TestCase("Login with wrong password",    "High", "UI"))
suite2.add_test(TestCase("Search for internet plans",    "Medium", "UI"))
suite2.add_test(TestCase("Add TV plan to cart",          "High", "UI"))
suite2.add_test(TestCase("Checkout and confirm order",   "High", "UI"))
suite2.add_test(TestCase("API login endpoint",           "High", "API"))
suite2.add_test(TestCase("API search endpoint",          "Medium", "API"))

suite2.run_all(test_functions, priority_filter="High")         