class TestCase:
    def __init__(self, name, priority="Medium"):
        self.name     = name
        self.priority = priority
        self.status   = "NOT RUN"   # default value — no parameter needed
        self.message  = ""          # default value — no parameter needed
    
    def pass_test(self, message=""):
        self.status  = "PASS"
        self.message = message
       
    def fail_test(self, message=""):
        self.status  = "FAIL"
        self.message = message

    def is_passed(self):
        return self.status == "PASS"

    def is_failed(self):
        return self.status == "FAIL"

    def result_line(self):
        emoji = "✅" if self.is_passed() else "❌"
        msg= f" — {self.message}" if self.message else ""
        return f"{emoji} {self.status}   {self.name} {msg}"       