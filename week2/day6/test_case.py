class TestCase:
    def __init__(self, name , priority="Medium", category="UI"):
        self.name     = name
        self.priority = priority
        self.category = category
        self.status   = "NOT RUN"   # default value — no parameter needed
        self.message  = ""          # default value — no parameter needed


    def pass_test(self, message=""):
        self.status  = "PASS"
        self.message = message

    def fail_test(self, message=""):
        self.status  = "FAIL"
        self.message = message

    def skip_test(self, message=""):     #New : Skip a test
        self.status  = "SKIP"
        self.message = message    


    def is_passed(self):
            return self.status == "PASS"
    

    def is_failed(self):
            return self.status == "FAIL"
    

    def is_skipped(self):                                              #New : Check if test is skipped
            return self.status == "SKIP"
    

    def result_line(self):
        if self.is_passed():
            emoji = "✅"
        elif self.is_failed():
            emoji = "❌"
        else:
            emoji = "⏭️"                                            #New : Emoji for skipped test
        

        msg= f" — {self.message}" if self.message else ""
        return f"{emoji} {self.status:<5}  [{self.category}] {self.name} {msg}"
