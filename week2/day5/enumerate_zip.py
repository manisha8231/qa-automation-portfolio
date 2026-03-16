# enumerate_zip.py
# Learning enumerate and zip properly

# ─────────────────────────────────────
# PART 1 — enumerate
# ─────────────────────────────────────

# Normal loop — no numbers
print("=== Without enumerate ===")
browsers = ["Chrome", "Firefox", "Safari", "Edge"]

for browser in browsers:
    print(browser)

# Output:
# Chrome
# Firefox
# Safari
# Edge

print()

# With enumerate — adds counter automatically
print("=== With enumerate ===")
for i, browser in enumerate(browsers):
    print(f"{i} — {browser}")

# Output:
# 0 — Chrome   ← starts at 0 by default
# 1 — Firefox
# 2 — Safari
# 3 — Edge

print()

# Start counting from 1 instead of 0
print("=== enumerate starting from 1 ===")
for i, browser in enumerate(browsers, 1):
    print(f"Browser {i}: {browser}")

# Output:
# Browser 1: Chrome
# Browser 2: Firefox
# Browser 3: Safari
# Browser 4: Edge


# ─────────────────────────────────────
# PART 2 — zip
# ─────────────────────────────────────

# Two separate lists
test_names = [
    "Login Test",
    "Search Test",
    "Checkout Test"
]

test_results = [
    "PASS",
    "PASS",
    "FAIL"
]

# Without zip — can't easily combine them
print("=== Without zip ===")
for name in test_names:
    print(name)

print()

# With zip — pairs them together!
print("=== With zip ===")
for name, result in zip(test_names, test_results):
    print(f"{name} → {result}")

print()

# zip with emoji
print("=== zip with pass/fail emoji ===")
for name, result in zip(test_names, test_results):
    emoji = "✅" if result == "PASS" else "❌"
    print(f"{emoji} {name} — {result}")



# ─────────────────────────────────────
# PART 2 — zip
# ─────────────────────────────────────

# Two separate lists
test_names = [
    "Login Test",
    "Search Test",
    "Checkout Test"
]

test_results = [
    "PASS",
    "PASS",
    "FAIL"
]

# Without zip — can't easily combine them
print("\n***" * 10)
print("=== Without zip ===")
for name in test_names:
    print(name)

print()

# With zip — pairs them together!
print("=== With zip ===")
for name, result in zip(test_names, test_results):
    print(f"{name} → {result}")

print()

# zip with emoji
print("=== zip with pass/fail emoji ===")
for name, result in zip(test_names, test_results):
    emoji = "✅" if result == "PASS" else "❌"
    print(f"{emoji} {name} — {result}")




# ─────────────────────────────────────
# PART 3 — enumerate + zip together
# ─────────────────────────────────────

test_names = [
    "Login Test",
    "Search Test",
    "Checkout Test",
    "Cart Test",
    "Payment Test"
]

test_results = [
    "PASS",
    "PASS",
    "FAIL",
    "PASS",
    "PASS"
]
print("\n")
print("Part 3 — enumerate + zip together")
print("=== enumerate + zip together ===")
for i, (name, result) in enumerate(zip(test_names, test_results), 1):
    emoji = "✅" if result == "PASS" else "❌"
    print(f"  [{i}/{len(test_names)}] {emoji} {name} — {result}")

print()
print(f"  Total: {len(test_names)}")
passed = test_results.count("PASS")
failed = test_results.count("FAIL")
print(f"  Passed: {passed} | Failed: {failed}")    