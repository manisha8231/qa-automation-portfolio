import sys
sys.path.append("..\pages") # tells Python where to find pages folder
from search_page import SearchPage # ← import the class!

def test_search_results():
    print("\n--- Test: Search Results ---")
    search = SearchPage()
    search.navigate()
    search.search("Internet Plans")
    search.click_search()
    search.verify_results(5)
    #search.get_title()
    search.close()  


def test_empty_search():
    print("\n--- Test: Empty Search ---")
    search = SearchPage()
    search.navigate()
    search.search("")  # Empty search term
    search.click_search()
    search.verify_results(0)  # Expecting 0 results
    #search.get_title()
    search.close()


print("=" * 45)
print("  SEARCH PAGE TESTS")
print("=" * 45)

test_search_results()
test_empty_search() 
print("\n" + "=" * 45)

print("  ALL SEARCH TESTS COMPLETE")    
print("=" * 45)
