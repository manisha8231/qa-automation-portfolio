#Dictionary- Key value pairs - exactly like json API response
api_response={
    "status":"Success",
    "code":200,
    "userId":12345,
    "message":"Login successful",
}
#Access by keyname
print(api_response["status"])
print(api_response["userId"])


#use in assertion
if api_response["code"] == 200:
    print(f"✅ Pass -User {api_response['userId']} logged in successfully")
else:
    print(f"❌ Fail - Login failed ")

for key,value in api_response.items():
    print(f"  {key}: {value}")
