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