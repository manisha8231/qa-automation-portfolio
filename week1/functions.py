#def - define a reusable block of code
def check_status(label,expected,actual):
    if expected == actual:
        print(f"{label} Test: PASS ✅")
    else:
        print(f"{label} Test: FAIL ❌ — Expected {expected}, got {actual}" )

check_status("Login Page loads",200,200)
check_status("Search returns items",True,True)
check_status("Checkout status","Success","Failure")
check_status("Page title","Rogers","Rogers")
check_status("Logout redirect","/home","/dashboard")

