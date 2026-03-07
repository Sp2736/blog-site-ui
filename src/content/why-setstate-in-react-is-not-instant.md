---
title: Why setState in React Is Not Instant
date: March 8, 2026
category: Tech & Code
---

Every React developer eventually experiences a small moment of confusion: You update the state of a component and immediately try to log the new value, but the console prints the **old value instead of the new one**.

At first, it feels like React is ignoring your command. Consider this common snippet:

```javascript
const [count, setCount] = useState(0);

function handleClick() {
    setCount(count + 1);
    console.log(count); // Still prints 0!
}

```

If the current value of `count` is `0`, you might expect the console to print `1`. Instead, it prints `0`. This leads many beginners to think something is broken, but React is working exactly as designed.

### The Batching Strategy

The reason this happens is that **state updates in React are asynchronous and batched**.

To understand why, imagine how React manages the UI. Every time state changes, React must re-render the component and potentially many children. If every tiny state change triggered an immediate re-render, performance would tank.

Instead of updating everything instantly, React collects multiple state updates and processes them together. Think of it like a **queue**:

1. When you call `setCount`, React schedules the update.
2. It does not apply it immediately.
3. The update happens during the *next* render cycle.

Consequently, the `count` variable inside the current function scope still holds the **old value** from the current render.

### The Multiple Update Trap

This behavior becomes even more visible when you try to update state multiple times in a row:

```javascript
setCount(count + 1);
setCount(count + 1);

```

You might expect the counter to increase by 2, but the result will be **1**. Since both calls use the same "stale" value of `count` (which is still 0), both instructions essentially tell React: `setCount(0 + 1)`. React merges these identical requests, and the final state becomes 1.

### The Solution: Functional Updates

To handle situations where the new state depends on the previous one, React provides the **functional update** pattern:

```javascript
setCount(prev => prev + 1);
setCount(prev => prev + 1);

```

In this version, React passes the most up-to-date state value into the function each time. The updates are queued correctly, and the counter successfully increases by 2.

### How to "Read" the New State

If you need to trigger an action specifically because the state changed, React expects you to use the `useEffect` hook:

```javascript
useEffect(() => {
    console.log("Count changed:", count);
}, [count]);

```

This code runs **after** React has applied the state update and re-rendered the component, ensuring you have access to the fresh value.

---

### Conclusion

React isn't delaying updates to be difficult; it’s optimizing the rendering process to keep your application fast. Once you adopt the mental model that **state updates are scheduled requests** rather than immediate commands, working with React becomes much more predictable.

---