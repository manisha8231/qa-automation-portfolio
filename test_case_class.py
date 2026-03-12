# test_case_class.py
# A class that represents a single test case

class TestCase:
    
    def __init__(self, name, priority):
        self.name     = name
        self.priority = priority
        self.status   = "NOT RUN"   # default value — no parameter needed
    
    def run(self, result):
        self.status = result
        print(f"[{self.status}] {self.name} (Priority: {self.priority})")
    
    def is_passed(self):
        return self.status == "PASS"
    
    def summary(self):
        emoji = "✅" if self.is_passed() else "❌"
        print(f"{emoji} {self.name} — {self.status}")


# Create 5 test cases
tc1 = TestCase("Login with valid credentials",  "High")
tc2 = TestCase("Login with wrong password",     "High")
tc3 = TestCase("Search for internet plans",     "Medium")
tc4 = TestCase("Add TV plan to cart",           "Medium")
tc5 = TestCase("Checkout and confirm order",    "High")

# Run each test
print("=" * 50)
print("  RUNNING TEST CASES")
print("=" * 50)

tc1.run("PASS")
tc2.run("PASS")
tc3.run("PASS")
tc4.run("FAIL")
tc5.run("PASS")

# Print summary
print("\n" + "=" * 50)
print("  SUMMARY")
print("=" * 50)

tc1.summary()
tc2.summary()
tc3.summary()
tc4.summary()
tc5.summary()