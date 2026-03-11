class qaTester:
    def __init__(self, name, experience):
        self.name = name
        self.experience = experience

    def introduce(self):
        print(f"Hi! I am {self.name}")
        print(f"I have {self.experience} years of experience in software testing.")


tester1 = qaTester("Manisha", 13)
tester2= qaTester("Alice", 5)


tester1.introduce()
tester2.introduce()