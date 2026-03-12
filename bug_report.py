class BugReport:
    def __init__(self, bug_id, title, severity):
        self.bug_id = bug_id
        self.title = title
        self.severity = severity
        self.status = "Open"

    def describe(self):
         print(f" ID:          {self.bug_id}")
         print(f" Title:       {self.title}")
         print(f" Severity:    {self.severity}")      
         print(f" Status:      {self.status}") 
         print("-" * 20)   
    

    def resolve(self):
        if self.status == "Open" and self.severity == "Critical":
            self.status = "Resolved"
            print(f" {self.bug_id} marked as resolved👌")
        else:
            print(f"{self.bug_id} cannot be resolved because it is currently '{self.status}'.")

    def is_critical(self):
        if self.severity == "Critical":
            print(f"{self.bug_id} is critical: True")
        else:
            print(f"{self.bug_id} is critical: False")
    
    #Create 3 bug report objects 
bug1 = BugReport("BUG-001", "Login button not working", "Critical")
bug2 = BugReport("BUG-002", "Search returns no results", "High")
bug3 = BugReport("BUG-003", "Checkout page loads slowly", "Medium")

print("=" * 30)
print("BUG DETAILS:")
print("=" * 30)
bug1.describe()
bug2.describe()
bug3.describe()

bug1.resolve()


print("\n")
print("-" * 30)
print("CRITICAL CHECK")
print("-" * 3)
bug1.is_critical()
bug2.is_critical()
bug3.is_critical()