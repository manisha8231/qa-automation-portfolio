import sys
sys.path.append('../')

from cart import Cart
from checkout import Checkout
from product import Product

p1= Product("Internet Plan 150", 65.99, "Internet")
p2 = Product("TV Package Plus", 120.00, "TV")
p3 = Product("Mobile Plan Unlimited", 80.00, "Mobile")


c1= Cart("MANISHA CART")
print("*" * 40)
print("ROGERS SHOPPING CART")
print("*" * 40)

c1.add_item(p1)
c1.add_item(p2)
c1.add_item(p3)

print("\n🛍️  Cart after adding items:")
c1.show_cart()


print("\n🗑️  Removing an item from cart:")
c1.remove_item("TV Package Plus")
print("\n🛍️  Cart after removing an item:")
c1.show_cart()

print()
checkout = Checkout(c1, "Credit Card")
checkout.process()
print(f"Order ID: {checkout.generate_order_id()}")


print("\n🔍 Checking if products are expensive:")
print("*" * 40)
print(f"{p1.name} is expensive: {p1.is_expensive()}")
print(f"{p2.name} is expensive: {p2.is_expensive()}")
print(f"{p3.name} is expensive: {p3.is_expensive()}")
print("*" * 40)
print("✅ TESTS COMPLETED")
print("*" * 40)