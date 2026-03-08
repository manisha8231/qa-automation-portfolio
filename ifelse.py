status_code=201
if status_code == 200:
    print("Status Code Test: PASS ✅")
else:
    print("Status Code Test: FAIL ❌")


    #elif -mutiple conditions
code=406
if code == 200:
    print("Status Code Test: PASS ✅")
elif code == 404:
    print("Status Code Test: FAIL ❌ — Not Found")
elif  code == 500:
    print("Status Code Test: FAIL ❌ — Server Error")
elif code == 401:
    print("Status Code Test: FAIL ❌ — Unauthorized")
else:
    print(f"Status Code Test: FAIL ❌ — Unexpected status code {code}")