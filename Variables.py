# Variables, Strings & F-Strings Tutorial

# 1. Variables - containers for storing data values
name = "Alice"
age = 25
height = 5.8
is_student = True

print(name)
print(age)

# 2. String basics
greeting = "Hello, World!"
message = 'Python is awesome'
multiline = """This is a
multiline string"""

print(greeting)
print(message)
print(multiline)

# 3. String concatenation
first_name = "John"
last_name = "Doe"
full_name = first_name + " " + last_name
print(full_name)

# 4. F-strings (formatted string literals) - Python 3.6+
user_name = "Bob"
user_age = 30
experience = 5

# Simple f-string
print(f"My name is {user_name}")

# Multiple variables in f-string
print(f"{user_name} is {user_age} years old")

# Expressions in f-strings
print(f"{user_name} has {experience * 2} years of combined experience")

# F-string with formatting
price = 19.99
print(f"Price: ${price:.2f}")

# F-string with operations
print(f"Next year {user_name} will be {user_age + 1} years old")

# 5. Other string methods
text = "  Python Programming  "
print(text.strip())  # Remove whitespace
print(text.upper())  # Convert to uppercase
print(text.lower())  # Convert to lowercase
print(text.replace("Python", "JavaScript"))  # Replace substring