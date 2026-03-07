---
title: How LRU Cache Works in Real Systems
date: March 8, 2026
category: Algorithm Alley
---

At some point while learning algorithms, students come across something called an **LRU Cache**. The name sounds slightly intimidating at first, but the idea behind it is surprisingly simple.

LRU stands for **Least Recently Used**.

The concept appears whenever a system has **limited space** and needs to decide which data should stay and which data should be removed. Computers face this problem all the time. Memory is not infinite, storage is not infinite, and fast access spaces like caches are always small compared to the total amount of data.

### The Strategy
The LRU strategy says something very intuitive: **If something has not been used for a long time, it is probably safe to remove it.**

Imagine a small desk with space for only three books. Every time you use a book, you leave it on the desk. If the desk becomes full and you need space for a new book, which one do you remove? Most people would remove the book they have not touched in the longest time.

### A Practical Example
Let’s imagine a cache that can store **3 items**. At the beginning, the cache is empty.

Now operations start happening:
```javascript
PUT(1)
PUT(2)
PUT(3)

```

The cache now contains: `[1, 2, 3]`.

Now suppose the system **uses item 1**:

```javascript
GET(1)

```

Since item 1 was just accessed, it becomes the **most recently used**. The order of usage becomes: `[2, 3, 1]`. Here, `2` is now the least recently used.

Now suppose a new item arrives:

```javascript
PUT(4)

```

The cache is already full. According to the LRU rule, the system removes the least recently used item, which is `2`. The new cache becomes: `[3, 1, 4]`.

### Real-World Applications

This simple rule turns out to be extremely useful in real systems:

* **Web browsers** use caching to store recently visited pages.
* **Databases** cache frequently accessed queries.
* **Operating systems** cache disk data.
* **CDNs** use LRU-like strategies to decide what data stays in fast storage.

### Implementing Efficiency

How do we implement an LRU cache **efficiently**? We need two operations to be very fast:

1. Accessing an item quickly.
2. Updating which item was used most recently.

A clever solution combines **two data structures**:

* A **Hash Map** for fast lookup ($O(1)$).
* A **Doubly Linked List** to track usage order.

Whenever an item is accessed, it moves to the **front of the list**. The item at the **end of the list** is the least recently used.

#### The Logic in Pseudocode:

```javascript
GET(key)
    if key not in cache
        return -1

    move key to front of list
    return value

```

```javascript
PUT(key, value)
    if key exists
        update value
        move key to front
    else
        if cache is full
            remove tail node (LRU)
        insert new node at front

```

### Conclusion

With this design, both `GET` and `PUT` operations remain extremely fast. It shows one of the beautiful patterns in computer science: sometimes the most useful algorithms come from very natural human behavior.

After all, even our desks follow an LRU policy.

---