# test_suite.py
# Define TestSuite class to manage and run test cases

from test_case import TestCase

class TestSuite:                                #Manages and runs a collection of test cases. Supports priority filtering and category breakdown.
    def __init__(self, suite_name):
        self.suite_name = suite_name
        self.test_cases = []
        self.passed     = 0
        self.failed     = 0
        self.skipped    = 0

    def add_test(self, test_case):      # ← fixed name
        self.test_cases.append(test_case)
        return self

    def total(self):
        return len(self.test_cases)

    def pass_rate(self):
        ran = self.passed + self.failed
        if ran == 0:
            return 0
        return round((self.passed / ran) * 100, 1)

    def get_by_priority(self, priority):
        return [tc for tc in self.test_cases
                if tc.priority == priority]

    def get_by_category(self, category):
        return [tc for tc in self.test_cases
                if tc.category == category]

    def run_all(self, test_functions, priority_filter=None):
        print("=" * 50)
        print(f"  {self.suite_name}")
        if priority_filter:
            print(f"  Filter: {priority_filter} priority only")
        print(f"  Total Tests: {self.total()}")
        print("=" * 50)

        for i, (tc, fn) in enumerate(zip(self.test_cases, test_functions), 1):
            if priority_filter and tc.priority != priority_filter:
                tc.skip_test(f"Filtered — not {priority_filter} priority")
                print(f"\n  [{i}/{self.total()}] Skipping: {tc.name}")
                print(tc.result_line())
                self.skipped += 1
                continue

            print(f"\n  [{i}/{self.total()}] Running: {tc.name}...")
            fn(tc)
            print(tc.result_line())

            if tc.is_passed():
                self.passed += 1
            elif tc.is_failed():
                self.failed += 1

        self.print_report()

    def print_report(self):             # ← inside class — 4 spaces!
        print("\n" + "=" * 50)
        print("  SUITE COMPLETE")
        print("=" * 50)
        print(f"  Total:   {self.total()}")
        print(f"  Passed:  {self.passed}")
        print(f"  Failed:  {self.failed}")
        print(f"  Skipped: {self.skipped}")
        print(f"  Pass Rate: {self.pass_rate()}%")
        print("=" * 50)
        categories = set(tc.category for tc in self.test_cases)
        print("  Category Breakdown:")
        for cat in categories:
            cat_tests = self.get_by_category(cat)
            cat_passed = sum(1 for tc in cat_tests if tc.is_passed())
            print(f"    {cat}: {cat_passed}/{len(cat_tests)} passed")
        print("=" * 50)
        if self.failed == 0:
            print("  🎉 ALL TESTS PASSED — Ready for release!")
        else:
            print(f"  ⚠️  Suite FAILED — do not release!")
        print("=" * 50)




