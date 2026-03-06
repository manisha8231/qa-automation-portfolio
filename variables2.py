name="Manisha"
experience=13
city="Calgary"
tool="Jira"


#f-strings -most important in Python
print(f"My name is {name}")
print(f"I have {experience} years of experience in software testing in {city}")
print(f"My favorite tool is {tool}")

# String operations- important in automation

url="https://automationexercise.com"
print("     "+url.upper())
print("exercise" in url)
print(url.replace("exercise","test"))