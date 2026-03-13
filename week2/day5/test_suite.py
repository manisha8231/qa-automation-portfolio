from test_case import TestCase

class TestSuite:
    def __init__(self, suite_name):
        self.suite_name       = suite_name
        self.test_cases = []
        self.passed      = 0
        self.failed      = 0
    
    def add_test(self, test_case):
        self.test_cases.append(test_case)
        return self
    
    def total(self):
        return len(self.test_cases)
    
    def pass_rate(self):
       if self.total() == 0:
            return 0
       return round((self.passed / self.total()) * 100, 1) 
       

    def run_all(self,test_functions):
       print("=" * 50)
       print(f"  {self.suite_name}")
       print(f" Total Tests: {self.total()} ")
       print("=" * 50)

       for i , (tc,fn) in enumerate(zip(self.test_cases, test_functions), 1):
            print(f"\n  [ {i}:{self.total()} ] Running: {tc.name} ...")

            fn(tc)
            print(tc.result_line())
            if tc.is_passed():
                self.passed += 1
            else:
                self.failed += 1

       self.print_report()

    def print_report(self):
        print("\n" + "=" * 45)
        print("  SUITE COMPLETE")
        print("=" * 45)
        print(f"  Total:  {self.total()}")
        print(f"  Passed: {self.passed}")
        print(f"  Failed: {self.failed}")
        print(f"  Pass Rate: {self.pass_rate()}%")
        print("=" * 45)
        if self.failed == 0:
            print("  🎉 ALL TESTS PASSED — Ready for release!")
        else:
            print(f"  ⚠️  Suite FAILED — do not release!")
        print("=" * 45)
        