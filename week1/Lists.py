#List= mulitiple items in a single variable

tools=["Jira", "Postman","Playwright","Jmeter","AWS"]
print(tools[0])
print(tools[-1])
print(len(tools))


#Add and remove
tools.append("rest assured")
print(tools)

tools.remove("Jmeter")
print(tools)

#For loop- run once for each item in the list
browsers=["chrome","firefox","edge","safari"]
for browser in browsers:
    print(f">Running test on {browser} browser")