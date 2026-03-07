---
title: Why Some Problems Cannot Be Solved Efficiently (Intro to NP Problems)
date: March 8, 2026
category: Algorithm Alley
---

When students first start learning algorithms, they slowly discover that some algorithms are faster than others. Sorting algorithms, for example, may run in $O(n \log n)$ time. Searching a sorted list using binary search takes $O(\log n)$ time. These improvements make programs dramatically faster as input sizes grow.

At this stage, it feels like every problem just needs a smarter algorithm. But computer science eventually introduces a slightly uncomfortable truth: **Some problems appear to have no efficient solution at all.**

Not because we haven’t tried hard enough, but because the nature of the problem itself becomes extremely complex as the input grows.

### The Exploding Puzzle
To understand this, imagine a simple puzzle. Suppose a traveling salesperson must visit several cities exactly once and return to the starting point. The goal is to find the **shortest possible route**.

With four cities, the problem is manageable. You can list all possible routes and compare them. But as the number of cities increases, the number of possible routes grows at a staggering rate:

* **4 cities** → 6 possible routes
* **5 cities** → 24 routes
* **10 cities** → 362,880 routes
* **20 cities** → Over **2 quintillion** routes

Even the fastest computers cannot test every possibility when the numbers grow this large.

### Understanding P and NP
In computer science, problems are often divided into categories based on how difficult they are to solve:

* **Class P:** Contains problems that can be solved efficiently using known algorithms (e.g., sorting numbers or searching arrays).
* **Class NP:** Contains problems where **verifying** a solution is easy, but **finding** the solution from scratch may require enormous computation.

The Traveling Salesperson problem is the classic example. If someone gives you a route and asks, "Is this route valid and how long is it?", you can verify it quickly. However, finding that absolute best route among quintillions of options is a different story.

### The Subset Sum Challenge
Another example is the **subset sum problem**. Imagine you have a list of numbers and a target value. The challenge is to determine whether some combination of numbers adds up exactly to that target.

**Numbers:** `[3, 7, 12, 19, 21]`  
**Target:** `22`

You start checking combinations:
```text
3 + 7 + 12 = 22

```

You got lucky here. But imagine a list of 50 numbers. The number of possible combinations grows exponentially, making a brute-force search impossible for modern hardware.

### The Big Question: P vs NP

The deeper question in computer science is the **P vs NP problem**, one of the biggest unsolved questions in mathematics:

> **If a solution can be verified quickly, does that mean it can also be found quickly?**

So far, nobody has proven whether this is true or false.

* If **$P = NP$**, it would revolutionize fields like cryptography, logistics, and AI by making hard problems suddenly solvable.
* If **$P \neq NP$**, it confirms that some problems are fundamentally hard and no clever algorithm will ever magically solve them efficiently.

### Conclusion

For now, the best we can do is use **approximation algorithms** or heuristics that produce "good enough" solutions. The fascinating lesson here is that computation itself has limits. Sometimes the challenge is not writing faster code—it is realizing that the problem itself is harder than it looks.

---