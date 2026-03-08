---
title: My VS Code Setup for Full Stack Development
date: March 8, 2026
category: Open Source & Setups
---

Let’s be honest for a second. Setting up your code editor is a sacred ritual for any developer. It is the digital equivalent of arranging your desk before sitting down to study, except you actually end up doing work instead of just staring at highlighters.

Over the years, I have seen a fascinating phenomenon in our engineering classrooms. There is always that one guy who boasts a 9.8 CGPA, can write a 10-page essay on the mathematical proofs behind Neural Networks, and casually drops terms like "Data Mining" and "Distributed Blockchain Architecture" in the canteen. 

But the moment you ask him to write a simple API, things get tragic. 

He opens a blindingly white, unconfigured text editor, types `print("Hello World")` inside a `server.js` file, and then spends 45 minutes asking ChatGPT why the terminal says `SyntaxError`. He can mathematically prove gradient descent on a whiteboard, but last week I caught him trying to compile a React app with GCC.

Theory is great, my friends. But in the real world, you actually have to build things. And if you are still using a basic, vanilla VS Code setup with just Prettier and a default theme, you are driving a sports car in first gear. 

Forget the basics. Here is my personal, highly customized VS Code setup for Full Stack Development, featuring the superb hidden settings that actually save your sanity at 3 AM.

### 1. The Aesthetic: Dark Angel by SP
You think installing One Dark Pro makes you a senior developer? Cute. 

When you stare at a screen for ten hours a day, you need a theme that doesn't just look good, but feels like it belongs in a wish-list, because it doesn't strain your eyes. Let's be real, the Dracula and the Hacker Pro themes are delicious, but are they really suitable for long and unrestrained eye-gazing? Don't think so. That is exactly why I built my own custom theme: **Dark Angel by SP**.

It is explicitly designed for late-night coding sessions with medium-contrast syntax highlighting that makes your variables enough visible without burning your retinas. 
You can grab it directly from the marketplace here: [Dark Angel by SP](https://marketplace.visualstudio.com/items?itemName=sp2736.dark-angel-by-sp). 

Once you install it, your editor stops looking like a generic text box or command center, and starts to be eye-soothing during those late night vibe coding sessions. 

### 2. Explorer File Nesting (Hiding the Config Vomit)
Modern web development is 10% writing code and 90% writing configuration files. Open any full-stack project, and your file explorer is polluted with `.eslintrc.json`, `.prettierrc`, `tailwind.config.js`, `tsconfig.json`, `package-lock.json`... the list never ends.

VS Code has a brilliant, hidden feature called **File Nesting**. It visually groups these files under one primary file.

Drop this into your `settings.json`:

```json
"explorer.fileNesting.enabled": true,
"explorer.fileNesting.expand": false,
"explorer.fileNesting.patterns": {
    "package.json": "package-lock.json, yarn.lock, pnpm-lock.yaml, .npmrc",
    "tailwind.config.js": "tailwind.config.*, postcss.config.*",
    "*.js": "${capture}.js.map, ${capture}.min.js, ${capture}.d.ts"
}

```

Suddenly, all those ugly config files are neatly tucked underneath `package.json`. Your file tree looks clean, and you can actually find your source code again.

### 3. Editor Sticky Scroll

If you have ever scrolled halfway down a 500-line React component or a massive API controller and suddenly forgot which function you were inside, this feature is for you.

Add this to your settings:

```json
"editor.stickyScroll.enabled": true

```

What does it do? When you scroll down, the class name, function signature, or loop condition "sticks" to the top of your editor. No more scrolling up and down frantically trying to figure out if you are inside the `useEffect` or the `handleSubmit` function. It is a massive cognitive relief.

### 4. REST Client (Ditching Postman)

Our "Data Mining expert" friend is currently waiting 4 minutes for Postman to load so he can test a simple GET request. Meanwhile, he has consumed 2GB of RAM just to send JSON.

Instead, I use the **REST Client** extension. It allows you to send HTTP requests and view the response directly inside VS Code. You just create a file called `requests.http` and write this:

```http
### Get User Profile
GET http://localhost:5000/api/users/123
Authorization: Bearer my_super_secret_token

### Create New Post
POST http://localhost:5000/api/posts
Content-Type: application/json

{
    "title": "VS Code is awesome",
    "content": "Postman is crying right now."
}

```

You get a little clickable "Send Request" button right above the code. The response opens in a split pane. Your API documentation and testing live right next to your code. It is beautiful.

### 5. Multi-root Workspaces

Full stack development usually means you have a `frontend` folder and a `backend` folder. Most students open two entirely different VS Code windows and constantly `Alt + Tab` between them, losing their minds in the process.

Instead, use **Multi-root Workspaces**.
You go to `File > Add Folder to Workspace...` and add both your frontend and backend folders. Then, save the workspace (`File > Save Workspace As...`).

Now, both projects live in the same file explorer, but they maintain their own separate searching scopes, terminal paths, and extensions. You can see your React code and your Node.js code side-by-side without the terminal getting confused about which `package.json` to read.

---

### 🎁 BONUS: Lazygit in the Integrated Terminal

Let’s talk about version control.

Most beginners either type `git commit -m "update"` 500 times a day, or they use the clunky default VS Code source control tab.

Enter **Lazygit**. It is a simple terminal UI for git commands. Once you install it on your system, you just open your VS Code integrated terminal and type `lazygit`.

Instantly, your terminal transforms into a beautiful, interactive dashboard. You can stage individual lines of code with the spacebar, switch branches with a click, resolve merge conflicts visually, and push code in seconds.

It feels like you are hacking the mainframe, but really, you are just avoiding typing `git rebase -i HEAD~3` because we all know you would have to Google how to exit Vim anyway.

### Final Thoughts

Your code editor is your digital workbench. A good setup won't magically write the algorithms for you (sorry, ChatGPT addicts), but it removes the friction between your brain and the screen.

Customize your environment. Learn the superb features. And the next time someone tries to flex their theory marks on you, just ask them why `setState` in React doesn't work instantly... and watch the panic set in, LOL.

---