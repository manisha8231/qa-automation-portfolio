class Checkout:
    def __init__(self, cart, payment_method):
        self.cart           = cart
        self.payment_method = payment_method

    def process(self):
        print(f"💳 Processing payment via {self.payment_method}")
        print(f"✅ Order confirmed for {self.cart.customer_name}")

    def generate_order_id(self):
        return "ORD-001"