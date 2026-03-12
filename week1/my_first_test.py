# my_first_test.py

def test_login_valid():
    username = "manisha_test"
    password = "Test@1234"
    
    # Simulate a login check
    if username == "manisha_test" and password == "Test@1234":
        result = "PASS"
    else:
        result = "FAIL"
    
    print(f"Login Test: {result}")

def test_status_code():
    actual   = 200
    expected = 200
    
    if actual == expected:
        print(f"Status Code Test: PASS ✅")
    else:
        print(f"Status Code Test: FAIL ❌ — Expected {expected}, got {actual}")

# Run all tests
test_login_valid()
test_status_code()