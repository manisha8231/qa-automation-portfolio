# run_rogers.py
# Define and run Rogers regression suite

from test_case import TestCase
from test_suite import TestSuite

# ── DEFINE TEST FUNCTIONS ──────────────────────────
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
    cart_items = []    # ← empty cart simulates bug!
    if len(cart_items) > 0:
        tc.pass_test("Item added to cart")
    else:
        tc.fail_test("Cart is empty — add to cart failed")

def test_checkout(tc):
    order_id = "ORD-001"
    if order_id:
        tc.pass_test(f"Order confirmed: {order_id}")
    else:
        tc.fail_test("Checkout failed — no order ID")

# ── BUILD SUITE ────────────────────────────────────
suite = TestSuite("ROGERS REGRESSION SUITE")

suite.add_test(TestCase("Login with valid credentials",  "High"))
suite.add_test(TestCase("Login with wrong password",     "High"))
suite.add_test(TestCase("Search for internet plans",     "Medium"))
suite.add_test(TestCase("Add TV plan to cart",           "High"))
suite.add_test(TestCase("Checkout and confirm order",    "High"))

# ── RUN SUITE ──────────────────────────────────────
test_functions = [
    test_valid_login,
    test_wrong_password,
    test_search,
    test_add_to_cart,
    test_checkout,
]

suite.run_all(test_functions)