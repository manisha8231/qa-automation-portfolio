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

class SearchPage(BasePage):
    def __init__(self):
        super().__init__("https://www.rogers.com/search")
        self.page_title = "Rogers Search"

    def search(self, term):
        print(f"🔍 Searching for: {term}")

    def click_search(self):
        print(f"🖱️  Clicking Search button")    

    def verify_results(self, expected_count):
        if expected_count > 0:
            print(f"✅ PASS — Found {expected_count} results")
        else:
            print(f"❌ FAIL — No results found for the search term")    

print("=" * 40)
print("  TEST: Search Page")   
print("=" * 40)
search = SearchPage()
search.navigate()
search.search("Internet Plans")
search.click_search()
search.verify_results(8)
search.get_title()
search.close()         