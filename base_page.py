# base_page.py
# This is EXACTLY how Playwright Page Object Model works!

# BASE CLASS — shared by all pages
class BasePage:
    def __init__(self, url):
        self.url        = url
        self.is_open    = False
        self.page_title = ""

    def navigate(self):
        self.is_open = True
        print(f"🌐 Navigating to: {self.url}")

    def get_title(self):
        print(f"📄 Page title: {self.page_title}")

    def close(self):
        self.is_open = False
        print(f"❌ Closing: {self.url}")


# LOGIN PAGE — inherits from BasePage
class LoginPage(BasePage):
    def __init__(self):
        super().__init__("https://www.rogers.com/login")
        self.page_title = "Rogers Login"

    def login(self, username, password):
        print(f"👤 Entering username: {username}")
        print(f"🔑 Entering password: {'*' * len(password)}")
        print(f"🖱️  Clicking Login button")

    def verify_login(self, expected_url):
        if self.is_open:
            print(f"✅ PASS — Redirected to {expected_url}")
        else:
            print(f"❌ FAIL — Login failed")


# HOME PAGE — inherits from BasePage
class HomePage(BasePage):
    def __init__(self):
        super().__init__("https://www.rogers.com/home")
        self.page_title = "Rogers Home"

    def search(self, term):
        print(f"🔍 Searching for: {term}")

    def verify_results(self, expected_count):
        print(f"✅ PASS — Found {expected_count} results")


# USE THE PAGES — like a real test!
print("=" * 40)
print("  TEST: Login and Search")
print("=" * 40)

login = LoginPage()
login.navigate()
login.login("manisha_test", "Test@1234")
login.verify_login("https://www.rogers.com/home")
login.get_title()
login.close()

print()

home = HomePage()
home.navigate()
home.search("Internet Plans")
home.verify_results(5)
home.get_title()
home.close()