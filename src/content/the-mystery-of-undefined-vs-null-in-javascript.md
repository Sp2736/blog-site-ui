---
title: The Mystery of undefined vs null in JavaScript
date: March 8, 2026
category: Tech & Code
---

If you spend enough time with JavaScript, you eventually run into one of its most confusing little puzzles: the difference between `undefined` and `null`.

At first glance, they seem to mean the same thing. Both represent “nothing.” Both show up when a value is missing. And both have probably caused at least one developer to stare at their screen wondering what exactly just happened.

But despite looking similar, they actually mean **two slightly different things**.

### The Core Difference
The simplest way to understand it is this:
* `undefined` means **a value has not been assigned yet**.
* `null` means **a value was intentionally set to nothing**.

Imagine you declare a variable but do not assign anything to it:

```javascript
let name;
console.log(name);

```

The output will be: `undefined`. JavaScript is basically saying: “This variable exists, but nobody has given it a value yet.”

Now compare that with `null`:

```javascript
let user = null;

```

Here the developer is intentionally saying: “This variable currently has no value.” In short, `undefined` usually appears **automatically**, while `null` is usually assigned **deliberately**.

### Common Scenarios

This difference shows up in several common situations. For example, if you try to access a property that does not exist, JavaScript returns `undefined`:

```javascript
const student = { name: "Alex" };
console.log(student.age); // Output: undefined

```

`null`, on the other hand, is often used to represent something that **exists conceptually but currently has no value**.

```javascript
let selectedUser = null;

```

The system knows that `selectedUser` will eventually hold a user object, but right now, nothing is selected.

### The Equality Trap

This might seem simple so far, but JavaScript adds one more twist that has confused developers for years. Look at this comparison:

```javascript
null == undefined // Output: true

```

Surprisingly, the result is `true`. But if you use **strict equality**:

```javascript
null === undefined // Output: false

```

Why does this happen? Because `==` performs **type coercion**, meaning JavaScript tries to convert values before comparing them. In this loose comparison, JavaScript treats `null` and `undefined` as roughly equivalent “empty” values. The strict equality operator `===` does not perform conversion, so it correctly recognizes that the two types are different.

### The Historical Glitch

Another strange historical detail is this famous JavaScript quirk:

```javascript
typeof null // Output: "object"

```

Yes, `null` is reported as an object type. This is actually an **old bug** from the early days of JavaScript that became permanent because fixing it would break too much existing code. It is one of those little artifacts that remind developers that JavaScript was created very quickly and later had to grow into a massive ecosystem.

### Best Practices

In practice, developers usually follow a few simple habits:

* **Leave `undefined**` for JavaScript to use internally when something has not been defined.
* **Use `null**` when you want to intentionally represent an empty value.

Understanding this distinction helps make code more predictable and easier to reason about. And once you finally grasp the difference, JavaScript stops feeling slightly haunted every time it returns `undefined`.

---