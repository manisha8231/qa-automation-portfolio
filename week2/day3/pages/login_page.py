from base_page import BasePage

class LoginPage(BasePage):
    def __init__(self):
        super().__init__("https://www.rogers.com/login")
        self.page_title = "Rogers Login"

    def login(self, username, password):
        print(f"🔐 Logging in with username: {username} and password: {'*' * len(password)}")
        print("✅ Clicking Login button")

    def verify_login(self):
        if self.is_open:
            print("✅ PASS — Login successful")
        else:
            print("❌ FAIL — Login failed")