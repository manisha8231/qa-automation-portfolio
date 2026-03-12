class Product:
    def __init__(self, name, price, category):
        self.name = name
        self.price = price
        self.category = category

    def describe(self):
        print(f"{self.name} of category {self.category} costs ${self.price}")

    def is_expensive(self):
        return self.price > 100
    
""" Multiline comment:
p1 = Product("Internet Plan 150", 65.99, "Internet")
p2 = Product("TV Package Plus", 120.00, "TV")

p1.describe()
p2.describe()
print(p1.is_expensive())   # False
print(p2.is_expensive())   # True 
"""