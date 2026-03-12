from base_page import BasePage

class SearchPage(BasePage):
    def __init__(self):
        super().__init__("https://www.rogers.com/search")
        self.page_title = "Rogers Search"

    def search(self, term):
        print(f"🔍 Searching for: {term}")

    def click_search(self):
        print(f"🖱️  Clicking Search button")    

    def verify_results(self, count):
        if count > 0:
            print(f"✅ PASS — {count} results found")
        else:
            print(f"❌ FAIL — No results found for the search term")