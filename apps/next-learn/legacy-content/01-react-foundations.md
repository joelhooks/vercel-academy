# REACT FOUNDATIONS



<!-- Source: 01-what-is-react-and-nextjs.mdx -->
## About React and Next.js

---
title: About React and Next.js
description: Understand the differences between React and Next.js, and how you can use them together to build modern web applications.
summary:
  current: Now that you've learned what React and Next.js are.
  next: Learn the fundamentals of how user interfaces (UI) are rendered in the browser.
---

Next.js is a flexible **React framework** that gives you building blocks to create fast, full-stack **web applications**.

But what exactly do we mean by this? Let's spend some time expanding on what React and Next.js are and how they can help you build web applications.

### Building blocks of a web application

There are a few things you need to consider when building modern applications. Such as:

- **User Interface** - how users will consume and interact with your application.
- **Routing** - how users navigate between different parts of your application.
- **Data Fetching** - where your data lives and how to get it.
- **Rendering** - when and where you render static or dynamic content.
- **Integrations** - what third-party services you use (for CMS, auth, payments, etc.) and how you connect to them.
- **Infrastructure** - where you deploy, store, and run your application code (serverless, CDN, edge, etc.).
- **Performance** - how to optimize your application for end-users.
- **Scalability** - how your application adapts as your team, data, and traffic grow.
- **Developer Experience** - your team's experience building and maintaining your application.

For each part of your application, you will need to decide whether you will build a solution yourself or use other tools, such as packages, libraries, and frameworks.

### What is React?

[React](https://react.dev) is a JavaScript **library** for building **interactive user interfaces**.

By user interfaces (UI), we mean the elements that users see and interact with on-screen.

<Image
  alt="User Interface example showing a browser window with a navigation, a sidebar, and a list of posts"
  srcLight="/learn/light/learn-react-components.png"
  srcDark="/learn/dark/learn-react-components.png"
  width={1600}
  height={572}
/>

By library, we mean React provides helpful functions (APIs) to build UI, but leaves it up to the developer where to use those functions in their application.

Part of React's success is that it is relatively unopinionated about the other aspects of building applications. This has resulted in a flourishing ecosystem of third-party tools and solutions, including Next.js.

It also means, however, that building a complete React application from the ground up requires some effort. Developers need to spend time configuring tools and reinventing solutions for common application requirements.

## What is Next.js?

Next.js is a React **framework** that gives you building blocks to create web applications.

By framework, we mean Next.js handles the tooling and configuration needed for React, and provides additional structure, features, and optimizations for your application.

<Image
  alt="Diagram showing how Next.js spans the server and client, and provides additional features such as routing, data fetching, and rendering."
  srcLight="/learn/light/learn-ecosystem.png"
  srcDark="/learn/dark/learn-ecosystem.png"
  width={1600}
  height={754}
/>

You can use React to build your UI, then incrementally adopt Next.js features to solve common application requirements such as routing, data fetching, and caching - all while improving the developer and end-user experience.

Whether you're an individual developer or part of a larger team, you can use React and Next.js to build fully interactive, highly dynamic, and performant web applications.

In the next chapters, we will discuss how you can get started with React and Next.js.


<!-- Source: 02-rendering-ui.mdx -->
## Rendering User Interfaces (UI)

---
title: Rendering User Interfaces (UI)
description: Learn what the DOM is and how user interfaces are rendered.
summary:
  current: You should now understand the fundamentals of how UI is rendered on the browser.
  next: Learn how developers use JavaScript to manipulate the DOM and update the UI.
---

To understand how React works, we first need a basic understanding of how browsers interpret your code to create (or render) user interfaces (UI).

When a user visits a web page, the server returns an HTML file to the browser that may look like this:

<Image
  alt="Two side-by-side diagrams, left showing the HTML code, and right showing the DOM tree."
  srcLight="/learn/light/learn-html-and-dom.png"
  srcDark="/learn/dark/learn-html-and-dom.png"
  width={1600}
  height={759}
/>

The browser then reads the HTML and constructs the Document Object Model (DOM).

### What is the DOM?

The DOM is an object representation of the HTML elements. It acts as a bridge between your code and the user interface, and has a tree-like structure with parent and child relationships.

<Image
  alt="Two side-by-side diagrams, left showing the DOM tree, and right showing the rendered UI."
  srcLight="/learn/light/learn-dom-and-ui.png"
  srcDark="/learn/dark/learn-dom-and-ui.png"
  width={1600}
  height={759}
/>

You can use DOM methods and JavaScript, to listen to user events and [manipulate the DOM](https://developer.mozilla.org/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents) by selecting, adding, updating, and deleting specific elements in the user interface. DOM manipulation allows you to not only target specific elements, but also change their style and content.

In the next section you'll learn how to use JavaScript and DOM methods.

> **Additional Resources:**
>
> - [Introduction to the DOM](https://developer.mozilla.org/docs/Web/API/Document_Object_Model/Introduction)
> - [How to view the DOM in Google Chrome](https://developer.chrome.com/docs/devtools/dom/)
> - [How to view the DOM in Firefox](https://developer.mozilla.org/docs/Tools/Debugger/How_to/Highlight_and_inspect_DOM_nodes)

<Quiz
  answers={['True', 'False']}
  correctAnswer="True"
  question="True or False: You can update the page content by manipulating the DOM."
  hint="Make sure you understand the role of the DOM in the browser."
  explanation="The DOM is an object representation of the HTML elements. It acts as a bridge between your code and the user interface, and has a tree-like structure with parent and child relationships."
/>


<!-- Source: 03-updating-ui-with-javascript.mdx -->
## Updating UI with Javascript

---
title: Updating UI with Javascript
description: Learn how you can use event listeners and JavaScript to update UI.
summary:
  current: You've learned how developers use JavaScript to update the UI.
  next: Learn how to add React to your existing project.
---

In this chapter, we'll start building out our project by using JavaScript and DOM methods to add an `h1` tag to your project.

Open your code editor and create a new `index.html` file. Inside the HTML file, add the following code:

```html filename="index.html" highlight={1-5}
<html>
  <body>
    <div></div>
  </body>
</html>
```

Then give the `div` a unique `id` so that you can target it later.

```html filename="index.html" highlight={3}
<html>
  <body>
    <div id="app"></div>
  </body>
</html>
```

To write JavaScript inside your HTML file, add a `script` tag:

```html filename="index.html" highlight={4}
<html>
  <body>
    <div id="app"></div>
    <script type="text/javascript"></script>
  </body>
</html>
```

Now, inside the `script` tag, you can use a DOM method, [`getElementById()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById), to select the `<div>` element by its `id`:

```html filename="index.html" highlight={5}
<html>
  <body>
    <div id="app"></div>
    <script type="text/javascript">
      const app = document.getElementById('app');
    </script>
  </body>
</html>
```

You can continue using DOM methods to create a new `<h1>` element:

```html filename="index.html" highlight={6,9,12-13,16,19}
<html>
  <body>
    <div id="app"></div>
    <script type="text/javascript">
      // Select the div element with 'app' id
      const app = document.getElementById('app');

      // Create a new H1 element
      const header = document.createElement('h1');

      // Create a new text node for the H1 element
      const text = 'Develop. Preview. Ship.';
      const headerContent = document.createTextNode(text);

      // Append the text to the H1 element
      header.appendChild(headerContent);

      // Place the H1 element inside the div
      app.appendChild(header);
    </script>
  </body>
</html>
```

To make sure everything is working, open your HTML file inside your browser of choice. You should see an `h1` tag that says, 'Develop. Preview. Ship.'.

## HTML vs. the DOM

If you look at the DOM elements inside your [browser developer tools](https://developer.mozilla.org/docs/Learn/Common_questions/Tools_and_setup/What_are_browser_developer_tools), you will notice the DOM includes the `<h1>` element. The DOM of the page is different from the source code - or in other words, the original HTML file you created.

<Image
  alt="Two side-by-side diagrams showing the differences between the rendered DOM elements and Source Code (HTML)"
  srcLight="/learn/light/learn-dom-and-source.png"
  srcDark="/learn/dark/learn-dom-and-source.png"
  width={1600}
  height={594}
/>

This is because the HTML represents the **initial page content**, whereas the DOM represents the **updated page content** which was changed by the JavaScript code you wrote.

Updating the DOM with plain JavaScript is very powerful but verbose. You've written all this code to add an `<h1>` element with some text:

```html filename="index.html"
<script type="text/javascript">
  const app = document.getElementById('app');
  const header = document.createElement('h1');
  const text = 'Develop. Preview. Ship.';
  const headerContent = document.createTextNode(text);
  header.appendChild(headerContent);
  app.appendChild(header);
</script>
```

As the size of an app or team grows, it can become increasingly challenging to build applications this way.

With this approach, developers spend a lot of time writing instructions to tell the computer **how** it should do things. But wouldn't it be nice to describe **what** you want to show and let the computer figure out **how** to update the DOM?

## Imperative vs. declarative programming

The code above is a good example of **imperative** **programming.** You're writing the steps for **how** the user interface should be updated. But when it comes to building user interfaces, a declarative approach is often preferred because it can speed up the development process. Instead of having to write DOM methods, it would be helpful if developers were able to declare **what** they want to show (in this case, an `h1` tag with some text).

In other words, **imperative programming** is like giving a chef step-by-step instructions on how to make a pizza. **Declarative programming** is like ordering a pizza without being concerned about the steps it takes to make the pizza. 🍕

[React](https://react.dev/) is a popular declarative library that you can use build user interfaces.

## React: A declarative UI library

As a developer, you can tell React what you want to happen to the user interface, and React will figure out the steps of **how** to update the DOM on your behalf.

In the next section, we'll explore how you can get started with React.

<Quiz
  answers={[
    '"Knead the dough, roll the dough, add tomato sauce, add cheese, add ham, add pineapple, bake at 200 degrees celsius in a stone oven for..."',
    '"A Hawaiian pizza please."',
  ]}
  correctAnswer='"A Hawaiian pizza please."'
  question="Which of the following statements is more declarative?"
  hint="How would you order pizza?"
  explanation="Declarative programming allows you to describe what you want to happen, rather than the steps to make it happen."
/>

> **Additional Resources:**
>
> - [HTML vs. the DOM](https://developer.chrome.com/docs/devtools/dom/#appendix)
> - [How declarative UI compares to imperative](https://react.dev/learn/reacting-to-input-with-state#how-declarative-ui-compares-to-imperative)


<!-- Source: 04-getting-started-with-react.mdx -->
## Getting Started with React

---
title: Getting Started with React
description: Install the React packages to start using it.
summary:
  current: Nice, you're now using React. But there's much more to learn.
  next: Understand what essential JavaScript you need to know to start building React applications.
---

To use React in your newly created project, load two React scripts from an external website called [unpkg.com](https://unpkg.com/):

- **react** is the core React library.
- **react-dom** provides DOM-specific methods that enable you to use React with the DOM.

```html filename="index.html" highlight={4-5}
<html>
  <body>
    <div id="app"></div>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script type="text/javascript">
      const app = document.getElementById('app');
      const header = document.createElement('h1');
      const text = 'Develop. Preview. Ship.';
      const headerContent = document.createTextNode(text);
      header.appendChild(headerContent);
      app.appendChild(header);
    </script>
  </body>
</html>
```

Instead of directly manipulating the DOM with plain JavaScript, remove the DOM methods that you had added previously, and add the [`ReactDOM.createRoot()`](https://react.dev/reference/react-dom/client/createRoot) method to target a specific DOM element and create a root to display your React Components in. Then, add the [`root.render()`](https://react.dev/reference/react-dom/client/hydrateRoot#root-render) method to render your React code to the DOM.

This will tell React to render our `<h1>` title inside our `#app` element.

```html filename="index.html" highlight={6-10}
<html>
  <body>
    <div id="app"></div>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script>
      const app = document.getElementById('app');
      const root = ReactDOM.createRoot(app);
      root.render(<h1>Develop. Preview. Ship.</h1>);
    </script>
  </body>
</html>
```

If you try to run this code in the browser, you will get a syntax error:

```bash filename="Terminal"
Uncaught SyntaxError: expected expression, got '<'
```

This is because `<h1>...</h1>` is not valid Javascript. This piece of code is **JSX**.

## What is JSX?

JSX is a syntax extension for JavaScript that allows you to describe your UI in a familiar _HTML-like_ syntax. The nice thing about JSX is that apart from following [three JSX rules](https://react.dev/learn/writing-markup-with-jsx#the-rules-of-jsx), you don't need to learn any new symbols or syntax outside of HTML and JavaScript.

But browsers don't understand JSX out of the box, so you'll need a JavaScript compiler, such as a [Babel](https://babeljs.io/), to transform your JSX code into regular JavaScript.

## Adding Babel to your project

To add Babel to your project, copy and paste the following script in your `index.html` file:

```jsx filename="index.html"
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
```

In addition, you will need to inform Babel what code to transform by changing the script type to `type=text/jsx`.

```html filename="index.html" highlight={7-8}
<html>
  <body>
    <div id="app"></div>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <!-- Babel Script -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script type="text/jsx">
      const domNode = document.getElementById('app');
      const root = ReactDOM.createRoot(domNode);
      root.render(<h1>Develop. Preview. Ship.</h1>);
    </script>
  </body>
</html>
```

To confirm it's working correctly, open your HTML file in the browser.

Comparing the **declarative** React code you just wrote:

```html filename="index.html"
<script type="text/jsx">
  const domNode = document.getElementById("app")
  const root = ReactDOM.createRoot(domNode);
  root.render(<h1>Develop. Preview. Ship.</h1>);
</script>
```

to the **imperative** JavaScript code you wrote in the previous section:

```html filename="index.html"
<script type="text/javascript">
  const app = document.getElementById('app');
  const header = document.createElement('h1');
  const text = 'Develop. Preview. Ship.';
  const headerContent = document.createTextNode(text);
  header.appendChild(headerContent);
  app.appendChild(header);
</script>
```

You can start to see how using React enables you to cut down a lot of repetitive code.

And this is exactly what React does, it's a library that contains reusable snippets of code that perform tasks on your behalf - in this case, updating the UI.

> **Additional Resources:**
>
> You don't need to know exactly how React updates the UI to start using it, but if you'd like to learn more, here are some additional resources:
>
> - [UI trees](https://react.dev/learn/understanding-your-ui-as-a-tree)
> - [Writing markup with JSX](https://react.dev/learn/writing-markup-with-jsx)
> - [react-dom/server](https://react.dev/reference/react-dom/server) sections in the React Documentation.

## Essential JavaScript for React

While you can learn JavaScript and React at the same time, being familiar with JavaScript can make the process of learning React easier.

In the next sections, you will be introduced to some core concepts of React from a JavaScript perspective. Here's a summary of the JavaScript topics that will be mentioned:

- [Functions](https://developer.mozilla.org/docs/Web/JavaScript/Guide/Functions) and [Arrow Functions](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
- [Objects](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)
- [Arrays and array methods](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Destructuring](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- [Template literals](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Template_literals)
- [Ternary Operators](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)
- [ES Modules and Import / Export Syntax](https://developer.mozilla.org/docs/Web/JavaScript/Guide/Modules)

While this course does not dive into JavaScript, it's good practice to stay up to date with the latest versions of JavaScript. But if you don't feel proficient in JavaScript yet, don't let this hinder you from starting to build with React!

<Quiz
  answers={[
    'React uses a new version of HTML that’s too advanced for current browsers.',
    'React uses JSX which needs to be compiled into JavaScript.',
    'React doesn’t know how to update the DOM so it needs a compiler to do it.',
  ]}
  correctAnswer="React uses JSX which needs to be compiled into JavaScript."
  question="Why do you need to compile your React code?"
  hint="What language does the browser understand?"
  explanation="JSX is a syntax extension for JavaScript, but browsers don't understand JSX out of the box, so you'll need a JavaScript compiler to transform your JSX code into regular JavaScript."
/>


<!-- Source: 05-building-ui-with-components.mdx -->
## Building UI with Components

---
title: Building UI with Components
description: Learn how to build composable UI with React Components.
summary:
  current: You've created your first React Components.
  next: Learn what props are and how you can use them to display data.
---

## React core concepts

There are three core concepts of React that you'll need to be familiar with to start building React applications. These are:

- Components
- Props
- State

In the next chapters, we will go through these concepts and provide resources where you can continue learning them. After you're familiar with these concepts, we'll then show you how to install Next.js and use newer React features such as Server and Client Components.

## Components

User interfaces can be broken down into smaller building blocks called **components**.

Components allow you to build self-contained, reusable snippets of code. If you think of components as **LEGO bricks**, you can take these individual bricks and combine them together to form larger structures. If you need to update a piece of the UI, you can update the specific component or brick.

<Image
  alt="Example of a Media Component made up of 3 smaller components: image, text, and button"
  srcLight="/learn/light/learn-components.png"
  srcDark="/learn/dark/learn-components.png"
  width={1600}
  height={798}
/>

This modularity allows your code to be more maintainable as it grows because you can add, update, and delete components without touching the rest of our application.

The nice thing about React components is that they are just JavaScript. Let's see how you can write a React component, from a JavaScript perspective:

### Creating components

In React, components are **functions.** Inside your `script` tag, create a new function called `header`:

```html filename="index.html" highlight={4-5}
<script type="text/jsx">
  const app = document.getElementById("app")

  function header() {
  }

  const root = ReactDOM.createRoot(app);
  root.render(<h1>Develop. Preview. Ship.</h1>);
</script>
```

A component is a function that **returns UI elements**. Inside the return statement of the function, you can write JSX:

```html filename="index.html" highlight={5}
<script type="text/jsx">
  const app = document.getElementById("app")

  function header() {
     return (<h1>Develop. Preview. Ship.</h1>)
   }

  const root = ReactDOM.createRoot(app);
  root.render(<h1>Develop. Preview. Ship.</h1>);
</script>
```

To render this component to the DOM, pass it as the first argument in the `root.render()` method:

```html filename="index.html" highlight={9}
<script type="text/jsx">
  const app = document.getElementById("app")

  function header() {
     return (<h1>Develop. Preview. Ship.</h1>)
   }

  const root = ReactDOM.createRoot(app);
  root.render(header);
</script>
```

But, wait a second. If you try to run the code above in your browser, you'll get an error. To get this to work, there are two things you have to do:

First, React components should be capitalized to distinguish them from plain HTML and JavaScript:

```jsx filename="index.html" highlight={1,7}
function Header() {
  return <h1>Develop. Preview. Ship.</h1>;
}

const root = ReactDOM.createRoot(app);
// Capitalize the React Component
root.render(Header);
```

Second, you use React components the same way you'd use regular HTML tags, with angle brackets `<>`:

```jsx filename="index.html" highlight={6}
function Header() {
  return <h1>Develop. Preview. Ship.</h1>;
}

const root = ReactDOM.createRoot(app);
root.render(<Header />);
```

If you try to run the code in your browser again, you'll see your changes.

### Nesting components

Applications usually include more content than a single component. You can **nest** React components inside each other like you would regular HTML elements.

In your example, create a new component called `HomePage`:

```jsx filename="index.html" highlight={5-7}
function Header() {
  return <h1>Develop. Preview. Ship.</h1>;
}

function HomePage() {
  return <div></div>;
}

const root = ReactDOM.createRoot(app);
root.render(<Header />);
```

Then nest the `<Header>` component inside the new `<HomePage>`component:

```jsx filename="index.html" highlight={7-10}
function Header() {
  return <h1>Develop. Preview. Ship.</h1>;
}

function HomePage() {
  return (
    <div>
      {/* Nesting the Header component */}
      <Header />
    </div>
  );
}

const root = ReactDOM.createRoot(app);
root.render(<Header />);
```

### Component trees

You can keep nesting React components this way to form component trees.

<Image
  alt="Component tree showing how components can be nested inside each other"
  srcLight="/learn/light/learn-component-tree.png"
  srcDark="/learn/dark/learn-component-tree.png"
  width={1600}
  height={617}
/>

For example, your top-level `HomePage` component could hold a `Header`, an `Article`, and a `Footer` Component. And each of those components could in turn have their own child components and so on. For example, the `Header` component could contain a `Logo`, `Title` and `Navigation` component.

This modular format allows you to reuse components in different places inside your app.

In your project, since `<HomePage>` is now your top-level component, you can pass it to the `root.render()` method:

```jsx filename="index.html" highlight={14}
function Header() {
  return <h1>Develop. Preview. Ship.</h1>;
}

function HomePage() {
  return (
    <div>
      <Header />
    </div>
  );
}

const root = ReactDOM.createRoot(app);
root.render(<HomePage />);
```

> **Additional Resources:**
>
> - [Your first component](https://react.dev/learn/your-first-component)
> - [Importing and exporting components](https://react.dev/learn/importing-and-exporting-components)

<Quiz
  answers={[
    '<Layout /><Nav />',
    '<Layout><Nav /></Layout>',
    '<layout><nav><nav/><layout/>',
  ]}
  correctAnswer="<Layout><Nav /></Layout>"
  question="How would you nest a `Nav` component inside a `Layout` component in React?"
  hint="Consider how you would nest HTML elements inside each other."
  explanation="In React, you can nest components inside each other, forming a component tree."
/>


<!-- Source: 06-displaying-data-with-props.mdx -->
## Displaying Data with Props

---
title: Displaying Data with Props
description: Learn how you can use React props to display data in your application.
summary:
  current: You've learned how to use props to display data.
  next: Learn how you can add interactivity with React state and event listeners.
---

So far, if you were to reuse your `<Header />` component, it would display the same content both times.

```jsx filename="index.html" highlight={8-9}
function Header() {
  return <h1>Develop. Preview. Ship.</h1>;
}

function HomePage() {
  return (
    <div>
      <Header />
      <Header />
    </div>
  );
}
```

But what if you want to pass different text or you don't know the information ahead of time because you're fetching data from an external source?

Regular HTML elements have attributes that you can use to pass pieces of information that change the behavior of those elements. For example, changing the `src` attribute of an `<img>` element changes the image that is shown. Changing the `href` attribute of an `<a>` tag changes the destination of the link.

In the same way, you can pass pieces of information as properties to React components. These are called `props`. Take for instance, the possible variations of a button:

<Image
  alt="Diagram showing 3 variations of a button component: Primary, Secondary, and Disabled"
  srcLight="/learn/light/learn-props.png"
  srcDark="/learn/dark/learn-props.png"
  width={1600}
  height={286}
/>

Similar to a JavaScript function, you can design components that accept custom arguments (or props) that change the component's behavior or what is visibly shown when it's rendered to the screen. Then, you can pass down these props from parent components to child components.

> **Note:** In React, data flows down the component tree. This is referred to as _one-way data flow_. State, which will be discussed in the next chapter, can be passed from parent to child components as props.

## Using props

In your `HomePage` component, you can pass a custom `title` prop to the `Header` component, just like you'd pass HTML attributes:

```jsx filename="index.html" highlight={4}
function HomePage() {
  return (
    <div>
      <Header title="React" />
    </div>
  );
}
```

And `Header`, the child component, can accept those props as its first **function parameter**:

```jsx filename="index.html" highlight={1}
function Header(props) {
  return <h1>Develop. Preview. Ship.</h1>;
}
```

If you `console.log()` props, you can see that it's an **object** with a title property.

```jsx filename="index.html" highlight={2}
function Header(props) {
  console.log(props); // { title: "React" }
  return <h1>Develop. Preview. Ship.</h1>;
}
```

Since props is an object, you can use [**object destructuring**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) to explicitly name the values of props inside your function parameters:

```jsx filename="index.html" highlight={1}
function Header({ title }) {
  console.log(title); // "React"
  return <h1>Develop. Preview. Ship.</h1>;
}
```

Then you can replace the content of the `<h1>` tag with your title variable.

```jsx filename="index.html" highlight={3}
function Header({ title }) {
  console.log(title);
  return <h1>title</h1>;
}
```

If you open your file in the browser, you will see that it is displaying the actual word "title". This is because React thinks you're intending to render a plain text string to the DOM.

You need a way to tell React that this is a JavaScript variable.

## Using variables in JSX

To use the `title` prop, add **curly braces** `{}`. These are a special JSX syntax that allows you to write regular JavaScript directly inside your JSX markup.

```jsx filename="index.html" highlight={3}
function Header({ title }) {
  console.log(title);
  return <h1>{title}</h1>;
}
```

You can think of curly braces as a way to enter "JavaScript land" while you are in "JSX land". You can add any **JavaScript expression** (something that evaluates to a single value) inside curly braces. For example:

1. An **object property** with dot notation:

```jsx filename="example.js"
function Header(props) {
  return <h1>{props.title}</h1>;
}
```

2. A **template literal**:

```jsx filename="example.js"
function Header({ title }) {
  return <h1>{`Cool ${title}`}</h1>;
}
```

3. The **returned value of a function**:

```jsx filename="example.js"
function createTitle(title) {
  if (title) {
    return title;
  } else {
    return 'Default title';
  }
}

function Header({ title }) {
  return <h1>{createTitle(title)}</h1>;
}
```

4. Or **ternary operators**:

```jsx filename="example.js"
function Header({ title }) {
  return <h1>{title ? title : 'Default Title'}</h1>;
}
```

You can now pass any string to your title prop, or, if you used the ternary operator, you could even not pass a title prop at all, since you've accounted for the default case in your component:

```jsx filename="example.js" highlight={2}
function Header({ title }) {
  return <h1>{title ? title : 'Default title'}</h1>;
}

function HomePage() {
  return (
    <div>
      <Header />
    </div>
  );
}
```

Your component now accepts a generic title prop which you can reuse in different parts of your application. All you need to do is change the title string:

```jsx filename="index.html" highlight={4,5}
function HomePage() {
  return (
    <div>
      <Header title="React" />
      <Header title="A new title" />
    </div>
  );
}
```

## Iterating through lists

It's common to have data that you need to show as a list. You can use array methods to manipulate your data and generate UI elements that are identical in style but hold different pieces of information.

Add the following array of names to your `HomePage` component:

```jsx filename="index.html" highlight={2}
function HomePage() {
  const names = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'];

  return (
    <div>
      <Header title="Develop. Preview. Ship." />
      <ul>
        {names.map((name) => (
          <li>{name}</li>
        ))}
      </ul>
    </div>
  );
}
```

You can then use the `array.map()` method to iterate over the array and use an **arrow function** to map a name to a list item:

```jsx filename="index.html" highlight={7-11}
function HomePage() {
  const names = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'];

  return (
    <div>
      <Header title="Develop. Preview. Ship." />
      <ul>
        {names.map((name) => (
          <li>{name}</li>
        ))}
      </ul>
    </div>
  );
}
```

Notice how you've used curly braces to weave in and out of "JavaScript" and "JSX" land.

If you run this code, React will give us a warning about a missing `key` prop. This is because React needs something to uniquely identify items in an array so it knows which elements to update in the DOM.

You can use the names for now since they are currently unique, but it's recommended to use something guaranteed to be unique, like an item ID.

```jsx filename="index.html" highlight={9}
function HomePage() {
  const names = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'];

  return (
    <div>
      <Header title="Develop. Preview. Ship." />
      <ul>
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  );
}
```

> **Additional Resources:**
>
> - [Passing props to a component](https://react.dev/learn/passing-props-to-a-component)
> - [Rendering lists](https://react.dev/learn/rendering-lists)
> - [Conditional rendering](https://react.dev/learn/conditional-rendering)

<Quiz
  answers={[
    'Writing CSS rules',
    'Passing information to components',
    'Adding attributes to HTML elements',
  ]}
  correctAnswer="Passing information to components"
  question="What are props used for in React?"
  hint="Remember props are passed from parent components to child components."
  explanation="Props can be passed to components similarly to HTML attributes, but you can pass any JavaScript value through them, including objects and functions."
/>


<!-- Source: 07-updating-state.mdx -->
## Adding Interactivity with State

---
title: Adding Interactivity with State
description: Learn how to add interactive with state and event listeners.
summary:
  current: You added basic interactivity to your application with state and event listeners.
  next: Review your code, and see how you can continue learning React.
---

Let's explore how React helps us add interactivity with **state** and **event handlers**.

As an example, let's create a "Like" button inside your `HomePage` component. First, add a button element inside the `return()` statement:

```jsx filename="index.html" highlight={12}
function HomePage() {
  const names = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'];

  return (
    <div>
      <Header title="Develop. Preview. Ship." />
      <ul>
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      <button>Like</button>
    </div>
  );
}
```

## Listening to events

To make the button do something when clicked, you can use the `onClick` event:

```jsx filename="index.html" highlight={6}
function HomePage() {
  // ...
  return (
    <div>
      {/* ... */}
      <button onClick={}>Like</button>
    </div>
  );
}
```

In React, event names are camelCased. The `onClick` event is one of many possible events you can use to respond to user interaction. For example, you can use `onChange` for input fields or `onSubmit` for forms.

## Handling events

You can define a function to "handle" events whenever they are triggered. Create a function before the return statement called `handleClick()`:

```jsx filename="index.html" highlight={4-6}
function HomePage() {
  // ...

  function handleClick() {
    console.log("increment like count")
  }

  return (
    <div>
      {/* ... */}
	  <button onClick={}>Like</button>
    </div>
     )
   }
```

Then, you can call the `handleClick` function when the `onClick` event is triggered:

```jsx filename="index.html" highlight={10}
function HomePage() {
  // 	...
  function handleClick() {
    console.log('increment like count');
  }

  return (
    <div>
      {/* ... */}
      <button onClick={handleClick}>Like</button>
    </div>
  );
}
```

Try running this in your browser. Notice in your developer tools how the log output increases.

## State and hooks

React has a set of functions called [hooks](https://react.dev/learn). Hooks allow you to add additional logic such as **state** to your components. You can think of state as any information in your UI that changes over time, usually triggered by user interaction.

<Image
  alt="Two different examples of state: 1. A toggle button that can be selected or unselected. 2. A like button that can be clicked multiple times."
  srcLight="/learn/light/learn-state.png"
  srcDark="/learn/dark/learn-state.png"
  width={1600}
  height={714}
/>

You can use _state_ to store and increment the number of times a user has clicked the "Like" button. In fact, the React hook used to manage state is called: `useState()`

Add `useState()` to your project. It returns an array, and you can access and use those array values inside your component using **array destructuring**:

```jsx filename="index.html" highlight={3}
function HomePage() {
  // ...
  const [] = React.useState();

  // ...
}
```

The first item in the array is the state `value`, which you can name anything. It's recommended to name it something descriptive:

```jsx filename="index.html" highlight={3}
function HomePage() {
  // ...
  const [likes] = React.useState();

  // ...
}
```

The second item in the array is a function to `update` the value. You can name the update function anything, but it's common to prefix it with `set` followed by the name of the state variable you're updating:

```jsx filename="index.html" highlight={3}
function HomePage() {
  // ...
  const [likes, setLikes] = React.useState();

  // ...
}
```

You can also take the opportunity to add the initial value of your `likes` state to `0`:

```jsx filename="index.html" highlight={3}
function HomePage() {
  // ...
  const [likes, setLikes] = React.useState(0);
}
```

Then, you can check the initial state is working by using the state variable inside your component.

```jsx filename="index.html" highlight={2,7}
function HomePage() {
  // ...
  const [likes, setLikes] = React.useState(0);
  // ...

  return (
    // ...
    <button onClick={handleClick}>Like({likes})</button>
  );
}
```

Finally, you can call your state updater function, `setLikes` in your `HomePage` component, let's add it inside the `handleClick()` function you previously defined:

```jsx filename="index.html" highlight={6}
function HomePage() {
  // ...
  const [likes, setLikes] = React.useState(0);

  function handleClick() {
    setLikes(likes + 1);
  }

  return (
    <div>
      {/* ... */}
      <button onClick={handleClick}>Likes ({likes})</button>
    </div>
  );
}
```

Clicking the button will now call the `handleClick` function, which calls the `setLikes` state updater function with a single argument of the current number of likes + 1.

> **Note**: Unlike props which are passed to components as the first function parameter, the state is initiated and stored within a component. You can pass the state information to children components as props, but the logic for updating the state should be kept within the component where state was initially created.

## Managing state

This was only an introduction to state, and there's more you can learn about managing state and data flow in your React applications. To learn more, we recommend you go through the [Adding Interactivity](https://react.dev/learn/adding-interactivity) and [Managing State](https://react.dev/learn/managing-state) sections in the React documentation.

> **Additional Resources:**
>
> - [State: A component's memory](https://react.dev/learn/state-a-components-memory)
> - [Meet your first hook](https://react.dev/learn/state-a-components-memory#meet-your-first-hook)
> - [Responding to Events](https://react.dev/learn/responding-to-events)

<Quiz
  answers={[
    `Props are read-only information that's passed to components. State is information that can change over time, usually triggered by user interaction.`,
    `Props are used to define the component's behaviour. State is used to style components.`,
    `Props contain temporary information about a component. State contains read-only information.`,
  ]}
  correctAnswer="Props are read-only information that's passed to components. State is information that can change over time, usually triggered by user interaction."
  question="What is the difference between props and state?"
  hint="State implies change"
  explanation="Props are read-only information that's passed to components. State is information that can change over time, usually triggered by user interaction."
/>


<!-- Source: 08-from-react-to-nextjs.mdx -->
## From React to Next.js

---
title: From React to Next.js
description: How to continue learning React, and get ready to learn Next.js.
summary:
  current: You're almost there!
  next: Install Next.js and refactor your React App to Next.js
---

So far, we explored how you can get started with React. This is what the final code looked like. If you're starting from here, paste this code into an `index.html` file in your code editor.

```jsx filename="index.html"
<html>
  <body>
    <div id="app"></div>

    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <script type="text/jsx">
      const app = document.getElementById("app")

      function Header({ title }) {
        return <h1>{title ? title : "Default title"}</h1>
      }

      function HomePage() {
        const names = ["Ada Lovelace", "Grace Hopper", "Margaret Hamilton"]

        const [likes, setLikes] = React.useState(0)

        function handleClick() {
          setLikes(likes + 1)
        }

        return (
          <div>
            <Header title="Develop. Preview. Ship." />
            <ul>
              {names.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>

            <button onClick={handleClick}>Like ({likes})</button>
          </div>
        )
      }

      const root = ReactDOM.createRoot(app);
      root.render(<HomePage />);
    </script>
  </body>
</html>
```

In the last few chapters, you were introduced to three essential React concepts: **components**, **props**, and **state**. Having a strong foundation in these will help you get started building React applications.

When it comes to learning React, **the best way to learn is to build**. You can gradually adopt React by using `<script>` and what you've learned so far to add small components to an existing website. However, many developers have found the user and developer experience React enables valuable enough to dive right in and write their whole frontend application in React.

## From React to Next.js

While React excels at building UI, it does take some work to independently build that UI into a fully functioning scalable application. There are also newer React features, like Server and Client Components, that require a framework. The good news is that Next.js handles much of the setup and configuration and has additional features to help you build React applications.

Next, we'll migrate the example from React to Next.js, discuss how Next.js works, and introduce you to the differences between Server and Client Components.


<!-- Source: 09-installation.mdx -->
## Installing Next.js

---
title: Installing Next.js
description: Learn how to install Next.js and refactor your code.
summary:
  current: You've installed Next.js and are ready to start building your first app.
  next: Learn when to use Server and Client Components.
---

When you use Next.js in your project, you do not need to load the `react` and `react-dom` scripts from [unpkg.com](http://unpkg.com) anymore. Instead, you can install these packages locally using `npm` or your preferred package manager.

> **Note**: To use Next.js, you will need to have Node.js version **18.17.0** or above installed on your machine ([see minimum version requirement](/docs/getting-started/installation)), you can [download it here](https://nodejs.org/en/).

To do so, create a new file in the same directory as your `index.html` file, called `package.json` with an empty object `{}`.

```json filename="package.json" highlight={1}
{}
```

In your [terminal](https://code.visualstudio.com/docs/terminal/basics), run the following command in the root of your project:

```script filename="Terminal"
npm install react@latest react-dom@latest next@latest
```

Once the installation is complete, you should be able to see your project dependencies listed inside your `package.json` file:

```json filename="package.json"
{
  "dependencies": {
    "next": "^14.0.3",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  }
}
```

Don't worry if you're on later versions than the ones shown above, as long as you have the `next`, `react`, and `react-dom` packages installed, you're good to go.

You will also notice a new file called `package-lock.json` file that contains detailed information about the exact versions of each package.

Jumping back to the `index.html` file, you can delete the following code:

1. The `<html>` and `<body>` tags.
2. The `<div>` element with the `id` of `app`.
3. The `react` and `react-dom` scripts since you've installed them with NPM.
4. The `Babel` script because Next.js has a compiler that transforms JSX into valid JavaScript browsers can understand.
5. The `<script type="text/jsx">` tag.
6. The `document.getElementById()` and `ReactDom.createRoot()` methods.
7. The `React.` part of the `React.useState(0)` function

After deleting the lines above, add the following import to the top of your file:

```jsx filename="index.html"
import { useState } from 'react';
```

Your code should look like this:

```jsx filename="index.html" highlight={1}
import { useState } from 'react';

function Header({ title }) {
  return <h1>{title ? title : 'Default title'}</h1>;
}

function HomePage() {
  const names = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'];

  const [likes, setLikes] = useState(0);

  function handleClick() {
    setLikes(likes + 1);
  }

  return (
    <div>
      <Header title="Develop. Preview. Ship." />
      <ul>
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>

      <button onClick={handleClick}>Like ({likes})</button>
    </div>
  );
}
```

The only code left in the HTML file is JSX, so you can change the file type from `.html` to `.js` or `.jsx`.

## Creating your first page

Next.js uses file-system routing. This means that instead of using code to define the routes of your application, you can use folders and files.

Here's how you can create your first page in Next.js:

1. Create a new folder called [app](/docs/app/building-your-application/routing#the-app-router) and move the `index.js` file inside it.
2. Rename your `index.js` file to `page.js`. This will be the main page of your application.
3. Add `export default` to your `<HomePage>` component to help Next.js distinguish which component to render as the main component of the page.

```jsx filename="app/page.js" highlight={7}
import { useState } from 'react';

function Header({ title }) {
  return <h1>{title ? title : 'Default title'}</h1>;
}

export default function HomePage() {
  // ...
}
```

## Running the development server

Next, let's run your development server so you can see the changes in your new page while developing. Add a `"next dev"` script to your `package.json` file:

```json filename="package.json" highlight={2-4}
{
  "scripts": {
    "dev": "next dev"
  },
  "dependencies": {
    "next": "^14.0.3",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  }
}
```

Check what happens by running `npm run dev` in your terminal. You'll notice two things:

1. When you navigate to [localhost:3000](http://localhost:3000), you should see the following error:

<Image
  alt="Next.js Error Message: You're importing a component that needs useState. It only works in a Client component..."
  srcLight="/learn/light/learn-usestate-rsc-error.png"
  srcDark="/learn/dark/learn-usestate-rsc-error.png"
  width={1600}
  height={894}
/>

This is because Next.js uses React Server Components, a new feature that allows React to render on the server. Server Components don't support `useState`, so you'll need to use a Client Component instead.

In the next chapter, we'll discuss the main differences between Server and Client Components and fix this error.

2. A new file called `layout.js` was automatically created inside the `app` folder. This is the main layout of your application. You can use it to add UI elements that are shared across all pages (e.g. navigation, footer, etc).

```jsx filename="/app/layout.js"
export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

## Summary

Looking at the migration so far, you may already be getting a sense of the benefits of using Next.js:

- You removed the React and Babel scripts; a taste of the complex tooling and configuration you no longer have to think about.
- You created your first page.

> **Additional Reading:**
>
> - [Next.js Routing Fundamentals](/docs/app/building-your-application/routing)
> - [Defining Routes](/docs/app/building-your-application/routing/defining-routes)
> - [Pages and Layouts](/docs/app/building-your-application/routing/pages-and-layouts)


<!-- Source: 10-server-and-client-components.mdx -->
## Server and Client Components

---
title: Server and Client Components
description: Learn about the server and client environments and when to use each.
summary:
  current: You've learned how to use Server and Client Components.
  next: What's next?
---

To understand how Server and Client Components work, it's helpful to be familiar with two foundational web concepts:

- The [environments](#server-and-client-environments) your application code can be executed in: the server and the client.
- The [network boundary](#network-boundary) that separates server and client code.

## Server and Client Environments

In the context of web applications:

<Image
  alt="Diagram showing a browser on the left and a server on the right, separated by a network boundary."
  srcLight="/learn/light/learn-client-and-server-environments.png"
  srcDark="/learn/dark/learn-client-and-server-environments.png"
  width={1600}
  height={672}
/>

- The **client** refers to the browser on a user’s device that sends a request to a server for your application code. It then turns the response it receives from the server into an interface the user can interact with.
- The **server** refers to the computer in a data center that stores your application code, receives requests from a client, does some computation, and sends back an appropriate response.

Each environment has its own set of capabilities and constraints. For example, by moving rendering and data fetching to the server, you can reduce the amount of code sent to the client, which can improve your application's performance. But, as you learned earlier, to make your UI interactive, you need to update the DOM on the client.

Therefore, the code you write for the server and the client is not always the same. Certain operations (e.g. data fetching or managing user state) are better suited for one environment over the other.

## Network Boundary

The **Network Boundary** is a conceptual line that separates the different environments.

In React, you choose where to place the network boundary in your component tree. For example, you can fetch data and render a user's posts on the server (using Server Components), then render the interactive `LikeButton` for each post on the client (using Client Components).

Similarly, you can create a `Nav` component that is rendered on the server and shared across pages, but if you want to show an active state for links, you can render the list of `Links` on the client.

<Image
  alt="A component tree showing a layout that has 3 components as its children: Nav, Page, and Footer. The page component has 2 children: Posts and LikeButton. The Posts component is rendered on the server, and the LikeButton component is rendered on the client."
  srcLight="/learn/light/learn-client-server-modules.png"
  srcDark="/learn/dark/learn-client-server-modules.png"
  width={1600}
  height={627}
/>

Behind the scenes, the components are split into two module graphs. The **server module graph (or tree)** contains all the Server Components that are rendered on the server, and the **client module graph (or tree)** contains all Client Components.

After Server Components are rendered, a special data format called the **React Server Component Payload (RSC)** is sent to the client. The RSC payload contains:

1. The rendered result of Server Components.
2. Placeholders (or holes) for where Client Components should be rendered and references to their JavaScript files.

React uses this information to consolidate the Server and Client Components and update the DOM on the client.

Let's see how this works.

## Using Client Components

As you learned in the last chapter, Next.js uses Server Components by default - this is to improve your application's performance and means you don't have to take additional steps to adopt them.

Looking back at the error in your browser, Next.js is warning you that you're trying to `useState` inside a Server Component. You can fix this by moving the interactive "Like" button to a Client Component.

Create a new file called `like-button.js` inside the `app` folder that exports a `LikeButton` component:

```jsx filename="/app/like-button.js" highlight={1}
export default function LikeButton() {}
```

Move the `<button>` element and the `handleClick()` function from `page.js` to your new `LikeButton` component:

```jsx filename="/app/like-button.js" highlight={2-4,6}
export default function LikeButton() {
  function handleClick() {
    setLikes(likes + 1);
  }

  return <button onClick={handleClick}>Like ({likes})</button>;
}
```

Next, move the `likes` state and the import:

```jsx filename="/app/like-button.js" highlight={1,4}
import { useState } from 'react';

export default function LikeButton() {
  const [likes, setLikes] = useState(0);

  function handleClick() {
    setLikes(likes + 1);
  }

  return <button onClick={handleClick}>Like ({likes})</button>;
}
```

Now, to make the `LikeButton` a Client Component, add the React `'use client'` directive at the top of the file. This tells React to render the component on the client.

```jsx filename="/app/like-button.js" highlight={1}
'use client';

import { useState } from 'react';

export default function LikeButton() {
  const [likes, setLikes] = useState(0);

  function handleClick() {
    setLikes(likes + 1);
  }

  return <button onClick={handleClick}>Like ({likes})</button>;
}
```

Back in your `page.js` file, import the `LikeButton` component into your page:

```jsx filename="/app/page.js" highlight={1,18}
import LikeButton from './like-button';

function Header({ title }) {
  return <h1>{title ? title : 'Default title'}</h1>;
}

export default function HomePage() {
  const names = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'];

  return (
    <div>
      <Header title="Develop. Preview. Ship." />
      <ul>
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      <LikeButton />
    </div>
  );
}
```

Save both files and view your app in the browser. Now that there are no errors, once you make changes and save, you should notice the browser automatically updates to reflect the change.

This feature is called [Fast Refresh](/docs/architecture/fast-refresh). It gives you instantaneous feedback on any edits you make and comes pre-configured with Next.js.

## Summary

To recap, you learned about the server and client environments and when to use each. You also learned that Next.js uses React Server Components by default to improve performance, and how you can opt into Client Components to smaller parts of your UI interactive.

> **Additional Reading**
>
> There's a lot more to learn about Server and Client Components. Here are some additional resources:
>
> - [Server Components Docs](/docs/app/building-your-application/rendering/server-components)
> - [Client Component Docs](/docs/app/building-your-application/rendering/client-components)
> - [Composition Patterns](/docs/app/building-your-application/rendering/composition-patterns)
> - [The "use client" Directive](https://react.dev/reference/react/use-client)
> - [The "use server" Directive](https://react.dev/reference/react/use-server)


<!-- Source: 11-next-steps.mdx -->
## Next Steps

---
title: Next Steps
description: Resources to help you continue learning React and Next.js.
summary:
  current: Now that you've completed the final chapter, you're ready for the next steps.
  next: Continue learning Next.js by taking the Next.js Dashboard Course!
---

Congratulations on creating your first Next.js application!

To summarize, you explored the foundational knowledge for React and Next.js, and you migrated from a simple React Application to a Next.js application.

## What's next?

### Continue learning React

Over the years, many courses, videos, and articles have been created to help developers learn React. While it's hard to recommend resources that will fit your learning style, one invaluable reference is the [React Documentation](https://react.dev/) which contains interactive sandboxes to help you practice the topics.

### Learn Next.js by building a dashboard app

Continue learning Next.js by [creating a dashboard app](/learn/dashboard-app) - this course will introduce you to the **main** Next.js features and get you practicing by building a more complex project.


<!-- Source: index.mdx -->
## React Foundations

---
title: React Foundations
description: Learn the fundamental JavaScript and React concepts that'll help you get started with Next.js.
summary:
  current: Now that you've been introduced to the course, let's dive in.
  next: Learn what React and Next.js are, and how they can help you build modern web applications.
---

To effectively learn Next.js, it helps to be familiar with JavaScript, React, and related web development concepts. But JavaScript and React are vast topics. How do you know when you're ready to start using Next.js?

Welcome to the React Foundations course! This beginner-friendly, example-led course will guide you through the prerequisite knowledge for Next.js. You will build a simple project step-by-step; starting with a JavaScript application, then migrating it to React and Next.js.

Each section builds on the previous one, so you can choose where to start depending on what you already know.

### Prerequisite knowledge

This tutorial assumes knowledge of HTML, CSS, JavaScript, and no knowledge of React. If you're already familiar with React, you can skip to the [From React to Next.js](/learn/react-foundations/from-react-to-nextjs) chapter or take [Dashboard App](/learn/dashboard-app) course.

### System requirements

Before you start this course, make sure you have the following installed:

- Node.js 20.12.0 or later installed.
- Operating systems: macOS, Windows (including WSL), or Linux.
- VSCode or another text editor of your choice.

### Join the conversation

If you have questions about anything related to Next.js or this course, you're welcome to ask our community on [Discord](https://discord.gg/Q3AsD4efFC).
