class Cart:
    def __init__(self,customer_name):
        self.customer_name = customer_name  
        self.items = []
    
    def add_item(self, product):
        self.items.append(product)
        print(f"✅ Added: {product.name}")

    def remove_item(self, product_name):
        for item in self.items:
            if item.name == product_name:
             self.items.remove(item)
             print(f"🗑️ Removed: {product_name}")
             return
        print(f"⚠️ {product_name} not found in cart")    
    
    def total(self):
        return sum(item.price for item in self.items)
    
    def show_cart(self):
        print(f"🛒 {self.customer_name}'s Cart:")
        for item in self.items:
            print(f" - {item.name}: ${item.price}")
        print(f"Total: ${self.total():.2f}")