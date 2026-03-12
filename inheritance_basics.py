class TestCase:
    def __init__(self, name, priority):
        self.name     = name
        self.priority = priority
        self.status   = "NOT RUN"

    def run(self, result):
        self.status = result
        print(f"[{self.status}] {self.name}")

    def describe(self):
        print(f"Test: {self.name} | Priority: {self.priority} | Status: {self.status}")

# CHILD CLASS — inherits everything from TestCase
class UITestCase(TestCase):
    def __init__(self, name, priority, browser):
        super().__init__(name, priority)  # call parent __init__
        self.browser = browser            # add extra attribute

    def describe(self):                   # OVERRIDE parent method
        print(f"Test:     {self.name}")
        print(f"Priority: {self.priority}")
        print(f"Browser:  {self.browser}")
        print(f"Status:   {self.status}")
        print("-" * 30)


# ANOTHER CHILD CLASS
class APITestCase(TestCase):
    def __init__(self, name, priority, endpoint):
        super().__init__(name, priority)
        self.endpoint = endpoint

    def describe(self):
        print(f"Test:     {self.name}")
        print(f"Priority: {self.priority}")
        print(f"Endpoint: {self.endpoint}")
        print(f"Status:   {self.status}")
        print("-" * 30)


# Create objects
ui_test  = UITestCase("Login Page Test",  "High",   "Chrome")
api_test = APITestCase("Login API Test",  "High",   "/api/login")


# Both inherited run() from parent — no need to rewrite it!
print("=" * 30)
print("  RUNNING TESTS")
print("=" * 30)

ui_test.run("PASS")
api_test.run("FAIL")

print("\n" + "=" * 30)
print("  TEST DETAILS")
print("=" * 30)

ui_test.describe()
api_test.describe()