# PAGES ROUTER



<!-- Source: 01-create-nextjs-app-setup.mdx -->
## Set up a new Next.js app

---
title: Set up a new Next.js app
---

First, let’s make sure that your development environment is ready.

- If you don’t have **Node.js** installed, [install it from here](https://nodejs.org/en/). You’ll need Node.js version **18** or higher.
- You’ll be using your own text editor and terminal app for this tutorial.

> If you are on Windows, we recommend [downloading Git for Windows](https://gitforwindows.org/) and use Git Bash that comes with it, which supports the UNIX-specific commands in this tutorial. [Windows Subsystem for Linux (WSL)](https://docs.microsoft.com/en-us/windows/wsl/install-win10) is another option.

### Create a Next.js app

To create a Next.js app, open your terminal, `cd` into the directory you’d like to create the app in, and run the following command:

```shell
npx create-next-app@latest nextjs-blog --use-npm --example "https://github.com/vercel/next-learn/tree/main/basics/learn-starter"
```

> Under the hood, this uses the tool called [`create-next-app`](/docs/api-reference/create-next-app), which bootstraps a Next.js app for you. It uses [this template](https://github.com/vercel/next-learn/tree/main/basics/learn-starter) through the `--example` flag.
>
> If it doesn’t work, please take a look at [this page](https://github.com/vercel/next-learn/blob/main/basics/errors/install.md).

### Run the development server

You now have a new directory called `nextjs-blog`. Let’s `cd` into it:

```shell
cd nextjs-blog
```

Then, run the following command:

```shell
npm run dev
```

This starts your Next.js app’s "development server" (more on this later) on port **3000**.

Let’s check to see if it’s working. Open [http://localhost:3000](http://localhost:3000) from your browser.

<Quiz
  question="What text do you see on the page?"
  answers={['Welcome to Next.js!', 'Hello Next.js!']}
  correctAnswer="Welcome to Next.js!"
/>


<!-- Source: 02-create-nextjs-app-welcome-to-nextjs.mdx -->
## Welcome to Next.js

---
title: Welcome to Next.js
---

You should see a page like this when you access [http://localhost:3000](http://localhost:3000). This is the starter template page which shows some helpful information about Next.js.

<Image
  alt="Welcome to Next.js"
  src="/learn/pages-router/create-nextjs-app/welcome-to-nextjs.png"
  width={1576 / 2}
  height={1019 / 2}
/>

> **Help is available:** If you get stuck, you can reach out to the community on [GitHub Discussions](https://github.com/vercel/next.js/discussions).

Let’s try to edit this page next!


<!-- Source: 03-create-nextjs-app-editing-the-page.mdx -->
## Editing the Page

---
title: Editing the Page
---

Let’s try editing the starter page.

- Make sure the Next.js development server is still running.
- Open `pages/index.js` with your text editor.
- Find the text that says **"Welcome to"** under the `<h1>` tag and change it to **"Learn"**.
- Save the file.

As soon as you save the file, the browser automatically updates the page with the new text:

<Image
  alt="Learn Next.js"
  src="/learn/pages-router/create-nextjs-app/learn-nextjs.png"
  width={1030 / 2}
  height={384 / 2}
/>

The Next.js development server has [Fast Refresh](/docs/basic-features/fast-refresh) enabled. When you make changes to files, Next.js automatically applies the changes in the browser almost instantly. No refresh needed! This will help you iterate on your app quickly.

### Next Up: Creating Pages

Great job! That’s it for the first lesson.

In the next lesson, we’ll talk about _creating more pages and navigating between pages_.

> You should keep the development server running, but if you want to restart it, hit <kbd>Ctrl + c</kbd> to stop the server.


<!-- Source: 04-navigate-between-pages.mdx -->
## Navigate Between Pages

---
title: Navigate Between Pages
---

So far, the Next.js app we created only has one page. Websites and web applications generally have many different pages.

Let's explore how to add more pages to our application.

## What You’ll Learn in This Lesson

In this lesson, you will:

- Create a new page using the integrated [file system routing](/docs/routing/introduction).
- Learn how to use the [`Link`](https://nextjs.org/docs/api-reference/next/link) component to enable client-side navigation between pages.
- Learn about built-in support for code splitting and prefetching.

> If you’re looking for detailed documentation on Next.js routing, take a look at the [routing documentation](/docs/routing/introduction).


<!-- Source: 05-navigate-between-pages-setup.mdx -->
## Set up pages

---
title: Set up pages
---

**If you’re continuing from the previous lesson,** you can skip this page.

### Download Starter Code (Optional)

If you’re NOT continuing from the previous lesson, you can download, install, and run the starter code for this lesson below. This sets up a `nextjs-blog` directory such that it’s identical to the result of the previous lesson.

Again, this is NOT necessary if you’ve just finished the previous lesson.

```shell
npx create-next-app@latest nextjs-blog --use-npm --example "https://github.com/vercel/next-learn/tree/main/basics/navigate-between-pages-starter"
```

Then follow the instructions from the command output (`cd` into the directory and start the development server).


<!-- Source: 06-navigate-between-pages-pages-in-nextjs.mdx -->
## Pages in Next.js

---
title: Pages in Next.js
---

In Next.js, a page is a React Component exported from a file in the [`pages` directory](/docs/basic-features/pages).

Pages are associated with a route based on their **file name**. For example, in development:

- `pages/index.js` is associated with the `/` route.
- `pages/posts/first-post.js` is associated with the `/posts/first-post` route.

We already have the `pages/index.js` file, so let’s create `pages/posts/first-post.js` to see how it works.

### Create a New Page

Create the `posts` directory under `pages`.

Create a file called `first-post.js` inside the `posts` directory with the following content:

```jsx
export default function FirstPost() {
  return <h1>First Post</h1>;
}
```

The component can have any name, but you must export it as a `default` export.

Now, make sure that the development server is running and visit [http://localhost:3000/posts/first-post](http://localhost:3000/posts/first-post). You should see the page:

<Image
  alt="First Post"
  src="/learn/pages-router/navigate-between-pages/first-post.png"
  width={656 / 2}
  height={282 / 2}
/>

This is how you can create different pages in Next.js.

Simply create a JS file under the [`pages` directory](/docs/basic-features/pages), and the path to the file becomes the URL path.

In a way, this is similar to building websites using HTML or PHP files. Instead of writing HTML you write JSX and use React Components.

Let's add a link to the newly added page so that we can navigate to it from the homepage.

<Quiz
  question="If you wanted to add a new route `/authors/me`, what would the file name be (including the directory)?"
  answers={['authors/me.js', 'pages/authors/me.js', 'routes/authors/me.js']}
  correctAnswer="pages/authors/me.js"
/>


<!-- Source: 07-navigate-between-pages-link-component.mdx -->
## Link Component

---
title: Link Component
---

When linking between pages on websites, you use the `<a>` HTML tag.

In Next.js, you can use the `Link` Component [`next/link`](/docs/api-reference/next/link) to link between pages in your application. `<Link>` allows you to do client-side navigation and accepts [props](https://nextjs.org/docs/api-reference/next/link#:~:text=Link%20accepts%20the%20following%20props%3A) that give you better control over the navigation behavior.

### Using `<Link>`

First, open `pages/index.js`, and import the `Link` component from [`next/link`](/docs/api-reference/next/link) by adding this line at the top:

```js
import Link from 'next/link';
```

Then find the `h1` tag that looks like this:

```jsx
<h1 className={styles.title}>
  Learn <a href="https://nextjs.org">Next.js!</a>
</h1>
```

And change it to:

```jsx
<h1 className={styles.title}>
  Read <Link href="/posts/first-post">this page!</Link>
</h1>
```

Next, open `pages/posts/first-post.js` and replace its content with the following:

```jsx
import Link from 'next/link';

export default function FirstPost() {
  return (
    <>
      <h1>First Post</h1>
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
    </>
  );
}
```

As you can see, the `Link` component is similar to using `<a>` tags, but instead of `<a href="…">`, you use `<Link href="…">`.

> **Note:** Before Next.js 12.2, it was required that the `Link` component wrapped an `<a>` tag, but [this is not required in versions 12.2 and above](https://nextjs.org/blog/next-12-2#:~:text=next/link%20no%20longer%20requires%20manually%20adding%20%3Ca%3E%20as%20a%20child.%20You%20can%20now%20opt%20into%20this%20behavior%20in%20a%20backward%2Dcompatible%20way.).

Let’s check to see if it works. You should now have a link on each page, allowing you to go back and forth:

<Image
  alt="Links"
  src="/learn/pages-router/navigate-between-pages/links.gif"
  width={990 / 2}
  height={344 / 2}
/>


<!-- Source: 08-navigate-between-pages-client-side.mdx -->
## Client-Side Navigation

---
title: Client-Side Navigation
---

The [`Link`](/docs/api-reference/next/link) component enables **client-side navigation** between two pages in the same Next.js app.

Client-side navigation means that the page transition happens _using JavaScript_, which is faster than the default navigation done by the browser.

Here’s a simple way you can verify it:

- Use the browser’s developer tools to change the `background` CSS property of `<html>` to `yellow`.
- Click on the links to go back and forth between the two pages.
- You’ll see that the yellow background persists between page transitions.

This shows that the browser does _not_ load the full page and client-side navigation is working.

<Image
  alt="Links"
  src="/learn/pages-router/navigate-between-pages/client-side.gif"
  width={700 / 1.5}
  height={558 / 1.5}
/>

If you’ve used `<a href="…">` instead of `<Link href="…">` and did this, the background color will be cleared on link clicks because the browser does a full refresh.

### Code splitting and prefetching

Next.js does code splitting automatically, so each page only loads what’s necessary for that page. That means when the homepage is rendered, the code for other pages is not served initially.

This ensures that the homepage loads quickly even if you have hundreds of pages.

Only loading the code for the page you request also means that pages become isolated. If a certain page throws an error, the rest of the application would still work.

Furthermore, in a production build of Next.js, whenever [`Link`](/docs/api-reference/next/link) components appear in the browser’s viewport, Next.js automatically **prefetches** the code for the linked page in the background. By the time you click the link, the code for the destination page will already be loaded in the background, and the page transition will be near-instant!

### Summary

Next.js automatically optimizes your application for the best performance by code splitting, client-side navigation, and prefetching (in production).

You create routes as files under [`pages`](/docs/basic-features/pages) and use the built-in [`Link`](/docs/api-reference/next/link) component. No routing libraries are required.

You can learn more about the `Link` component [in the API reference for `next/link`](/docs/api-reference/next/link) and routing in general [in the routing documentation](/docs/routing/introduction).

> **Note:** If you need to link to an <em>external</em> page outside the Next.js app, just use an `<a>` tag without `Link`.

<Quiz
  question="A user opens their browser and navigates to `your-blog.com/posts/first-post`. What JavaScript is initially loaded for this page?"
  answers={[
    'Only the JavaScript for /posts/first-post is loaded.',
    'JavaScript for the entire application is loaded.',
  ]}
  correctAnswer="Only the JavaScript for /posts/first-post is loaded."
/>


<!-- Source: 09-assets-metadata-css-layout-component.mdx -->
## Layout Component

---
title: Layout Component
---

First, let’s create a **Layout** component which will be shared across all pages.

- Create a top-level directory called `components`.
- Inside `components`, create a file called `layout.js` with the following content:

```jsx
export default function Layout({ children }) {
  return <div>{children}</div>;
}
```

Then, open `pages/posts/first-post.js`, add an import for the `Layout` component, and make it the outermost component:

```jsx
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout';

export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      <h1>First Post</h1>
      <h2>
        <Link href="/">← Back to home</Link>
      </h2>
    </Layout>
  );
}
```

### Adding CSS

Now, let’s add some styles to the `Layout` component. To do so, we’ll use [CSS Modules](/docs/basic-features/built-in-css-support#adding-component-level-css), which lets you import CSS files in a React component.

Create a file called `components/layout.module.css` with the following content:

```css
.container {
  max-width: 36rem;
  padding: 0 1rem;
  margin: 3rem auto 6rem;
}
```

> **Important:** To use [CSS Modules](/docs/basic-features/built-in-css-support#adding-component-level-css), the CSS file name must end with `.module.css`.

To use this `container` class inside `components/layout.js`, you need to:

- Import the CSS file and assign a name to it, like `styles`
- Use `styles.container` as the `className`

Open `components/layout.js` and replace its content with the following:

```jsx
import styles from './layout.module.css';

export default function Layout({ children }) {
  return <div className={styles.container}>{children}</div>;
}
```

If you go to [http://localhost:3000/posts/first-post](http://localhost:3000/posts/first-post) now, you should see that the text is now inside a centered container:

<Image
  alt="Layout"
  src="/learn/pages-router/assets-metadata-css/layout.png"
  width={1404 / 2}
  height={394 / 2}
/>

### Automatically Generates Unique Class Names

Now, if you take a look at the HTML in your browser’s devtools, you’ll notice that the `div` rendered by the `Layout` component has a class name that looks like `layout_container__...`:

<Image
  alt="Devtools"
  src="/learn/pages-router/assets-metadata-css/devtools.png"
  width={1322 / 2}
  height={134 / 2}
/>

This is what [CSS Modules](/docs/basic-features/built-in-css-support#adding-component-level-css) does: _It automatically generates unique class names_. As long as you use CSS Modules, you don’t have to worry about class name collisions.

Furthermore, Next.js’s code splitting feature works on [CSS Modules](/docs/basic-features/built-in-css-support#adding-component-level-css) as well. It ensures the minimal amount of CSS is loaded for each page. This results in smaller bundle sizes.

[CSS Modules](/docs/basic-features/built-in-css-support#adding-component-level-css) are extracted from the JavaScript bundles at build time and generate `.css` files that are loaded automatically by Next.js.

<Quiz
  question="What is one benefit of using CSS Modules?"
  answers={[
    'Increase the global scope of CSS classes',
    'Automatic CSS minification',
    'Generate unique class names to avoid name collisions',
  ]}
  correctAnswer="Generate unique class names to avoid name collisions"
/>


<!-- Source: 10-assets-metadata-css.mdx -->
## Assets, Metadata, and CSS

---
title: Assets, Metadata, and CSS
---

The second page we added currently does not have styling. Let's add some CSS to style the page.

Next.js has built-in support for [CSS](/docs/basic-features/built-in-css-support) and [Sass](/docs/basic-features/built-in-css-support#sass-support).
For this course, we will use CSS.

This lesson will also talk about how Next.js handles static assets like images and page metadata like the `<title>` tag.

### What You’ll Learn in This Lesson

In this lesson, you’ll learn:

- How to add [static files](/docs/basic-features/static-file-serving) (images, etc) to Next.js.
- How to customize what goes inside the `<head>` for each page.
- How to create a reusable React component which is styled using [CSS Modules](/docs/basic-features/built-in-css-support#adding-component-level-css).
- How to [add global CSS](/docs/basic-features/built-in-css-support#adding-a-global-stylesheet) in [`pages/_app.js`](/docs/advanced-features/custom-app).
- Some useful tips for styling in Next.js.

### Prerequisites

- Basic CSS knowledge. This course will go over how to add CSS in a Next.js app, but it won't cover CSS fundamentals.

> If you’re looking for detailed documentation on Next.js styling, take a look [at the CSS documentation](/docs/basic-features/built-in-css-support).


<!-- Source: 11-assets-metadata-css-setup.mdx -->
## Setup

---
title: Setup
---

**If you’re continuing from the previous lesson,** you can skip this page.

### Download Starter Code (Optional)

If you’re NOT continuing from the previous lesson, you can download, install, and run the starter code for this lesson below. This sets up a `nextjs-blog` directory such that it’s identical to the result of the previous lesson.

Again, this is NOT necessary if you’ve just finished the previous lesson.

```shell
npx create-next-app nextjs-blog --use-npm --example "https://github.com/vercel/next-learn/tree/main/basics/assets-metadata-css-starter"
```

Then follow the instructions from the command output (`cd` into the directory and start the development server).


<!-- Source: 12-assets-metadata-css-assets.mdx -->
## Assets

---
title: Assets
---

Next.js can serve **static assets**, like images, under **the top-level [`public` directory](/docs/basic-features/static-file-serving)**. Files inside `public` can be referenced from the root of the application similar to [`pages`](/docs/basic-features/pages).

The `public` directory is also useful for `robots.txt`, Google Site Verification, and any other static assets. Check out the documentation for [Static File Serving](/docs/basic-features/static-file-serving) to learn more.

### Download Your Profile Picture

First, let's retrieve your profile picture.

- **Download** your profile picture in `.jpg` format (or [use this file](https://github.com/vercel/next-learn/blob/main/basics/basics-final/public/images/profile.jpg)).
- Create an `images` directory inside of the [`public` directory](/docs/basic-features/static-file-serving).
- Save the picture as `profile.jpg` in the `public/images` directory.
- The image size can be around 400px by 400px.
- You may remove the unused SVG logo file directly under the [`public` directory](/docs/basic-features/static-file-serving).

### Unoptimized Image

With regular HTML, you would add your profile picture as follows:

```html
<img src="/images/profile.jpg" alt="Your Name" />
```

However, this means you have to manually handle:

- Ensuring your image is responsive on different screen sizes
- Optimizing your images with a third-party tool or library
- Only loading images when they enter the viewport

And more. Instead, Next.js provides an `Image` component out of the box to handle this for you.

### Image Component and Image Optimization

[`next/image`](/docs/api-reference/next/image) is an extension of the HTML `<img>` element, evolved for the modern web.

Next.js also has support for Image Optimization by default. This allows for resizing, optimizing, and serving images in modern formats like [WebP](https://developer.mozilla.org/docs/Web/Media/Formats/Image_types#webp) when the browser supports it. This avoids shipping large images to devices with a smaller viewport. It also allows Next.js to automatically adopt future image formats and serve them to browsers that support those formats.

Automatic Image Optimization works with any image source. Even if the image is hosted by an external data source, like a CMS, it can still be optimized.

### Using the Image Component

Instead of optimizing images at build time, Next.js optimizes images on-demand, as users request them. Unlike static site generators and static-only solutions, your build times aren't increased, whether shipping 10 images or 10 million images.

Images are lazy loaded by default. That means your page speed isn't penalized for images outside the viewport. Images load as they are scrolled into viewport.

Images are always rendered in such a way as to avoid [Cumulative Layout Shift](https://web.dev/cls/), a [Core Web Vital](https://web.dev/vitals/#core-web-vitals) that Google is going to [use in search ranking](https://webmasters.googleblog.com/2020/05/evaluating-page-experience.html).

Here's an example using [`next/image`](/docs/api-reference/next/image) to display our profile picture. The `height` and `width` props should be the desired rendering size, with an aspect ratio identical to the source image.

**Note:** We'll use this component later in "Polishing Layout", no need to copy it yet.

```jsx
import Image from 'next/image';

const YourComponent = () => (
  <Image
    src="/images/profile.jpg" // Route of the image file
    height={144} // Desired size with correct aspect ratio
    width={144} // Desired size with correct aspect ratio
    alt="Your Name"
  />
);
```

> To learn more about Automatic Image Optimization, check out the [documentation](/docs/basic-features/image-optimization).
>
> To learn more about the `Image` component, check out the [API reference for `next/image`](/docs/api-reference/next/image).

<Quiz
  question="What does `next/image` simplify for you?"
  answers={[
    'Uploading & storing images',
    'Resizing & optimizing images',
    'Cropping & color correcting images',
  ]}
  correctAnswer="Resizing & optimizing images"
/>


<!-- Source: 13-assets-metadata-css-metadata.mdx -->
## Metadata

---
title: Metadata
---

What if we wanted to modify the metadata of the page, such as the `<title>` HTML tag?

`<title>` is part of the `<head>` HTML tag, so let's dive into how we can modify the `<head>` tag in a Next.js page.

Open `pages/index.js` in your editor and find the following lines:

```jsx
<Head>
  <title>Create Next App</title>
  <link rel="icon" href="/favicon.ico" />
</Head>
```

Notice that `<Head>` is used instead of the lowercase `<head>`. `<Head>` is a React Component that is built into Next.js. It allows you to modify the `<head>` of a page.

You can import the `Head` component from the [`next/head`](/docs/api-reference/next/head) module.

### Adding `Head` to `first-post.js`

We haven't added a `<title>` to our `/posts/first-post` route. Let's add one.

Open the `pages/posts/first-post.js` file and add an import for `Head` from [`next/head`](/docs/api-reference/next/head) at the beginning of the file:

```js
import Head from 'next/head';
```

Then, update the exported `FirstPost` component to include the `Head` component. For now, we‘ll add just the `title` tag:

```jsx
export default function FirstPost() {
  return (
    <>
      <Head>
        <title>First Post</title>
      </Head>
      <h1>First Post</h1>
      <h2>
        <Link href="/">← Back to home</Link>
      </h2>
    </>
  );
}
```

Try accessing [http://localhost:3000/posts/first-post](http://localhost:3000/posts/first-post). The browser tab should now say "First Post". By using your browser’s developer tools, you should see that the `title` tag is added to `<head>`.

> To learn more about the `Head` component, check out the [API reference for `next/head`](/docs/api-reference/next/head).
>
> If you want to customize the `<html>` tag, for example to add the `lang` attribute, you can do so by creating a `pages/_document.js` file. Learn more in the [custom `Document` documentation](/docs/advanced-features/custom-document).


<!-- Source: 14-assets-metadata-css-third-party-javascript.mdx -->
## Third-Party JavaScript

---
title: Third-Party JavaScript
---

**Third-party JavaScript** refers to any scripts that are added from a third-party source. Usually,
third-party scripts are included in order to introduce newer functionality into a site that does not
need to be written from scratch, such as analytics, ads, and customer support widgets.

### Adding Third-Party JavaScript

Let's dive into how we can add a third-party script to a Next.js page.

Open `pages/posts/first-post.js` in your editor and find the following lines:

```jsx
<Head>
  <title>First Post</title>
</Head>
```

In addition to metadata, scripts that need to load and execute as soon as possible are usually added
within the `<head>` of a page. Using a regular HTML `<script>` element, an external script would be
added as follows:

```jsx
<Head>
  <title>First Post</title>
  <script src="https://connect.facebook.net/en_US/sdk.js" />
</Head>
```

This script contains the [Facebook SDK](https://developers.facebook.com/docs/javascript/quickstart)
which is commonly used to introduce Facebook social plugins and other functionality. Although this
approach works, including scripts in this manner does not give a clear idea of when it would load
with respect to the other JavaScript code fetched on the same page. If a particular script is
render-blocking and can delay page content from loading, this can significantly impact performance.

### Using the Script Component

[`next/script`](/docs/api-reference/next/script) is an extension of the HTML `<script>` element and
optimizes when additional scripts are fetched and executed.

In the same file, add an import for `Script` from `next/script` at the beginning of the file:

```jsx
import Script from 'next/script';
```

Now, update the `FirstPost` component to include the `Script` component:

```jsx
export default function FirstPost() {
  return (
    <>
      <Head>
        <title>First Post</title>
      </Head>
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={() =>
          console.log(`script loaded correctly, window.FB has been populated`)
        }
      />
      <h1>First Post</h1>
      <h2>
        <Link href="/">← Back to home</Link>
      </h2>
    </>
  );
}
```

Notice that a few additional properties have been defined in the Script component:

- `strategy` controls when the third-party script should load. A value of `lazyOnload` tells Next.js to load this particular script lazily during browser idle time
- `onLoad` is used to run any JavaScript code immediately after the script has finished loading. In this example, we log a message to the console that mentions that the script has loaded correctly

Try accessing [http://localhost:3000/posts/first-post](http://localhost:3000/posts/first-post). By
using your browser’s developer tools, you should see the message above logged in the `Console`
panel. In addition, you can run `window.FB` to see that the script has populated this global
variable.

**Note:** The Facebook SDK was only used as a contrived example to show how to add third-party
scripts to your application in a performant way. Now that you understand the basics of including
third-party functionality in Next.js, you can remove the Script component from `FirstPost` before
proceeding.

> To learn more about the `Script` component, check out the [documentation](/docs/basic-features/script).

<Quiz
  question="What does `next/script` simplify for you?"
  answers={[
    'Loading third-party scripts',
    'Minifying & compressing scripts',
    'Optimizing bundled script chunks',
  ]}
  correctAnswer="Loading third-party scripts"
/>


<!-- Source: 15-assets-metadata-css-css-styling.mdx -->
## CSS Styling

---
title: CSS Styling
---

Let’s now talk about **CSS styling**.

As you can see, our index page ([http://localhost:3000](http://localhost:3000)) already has some styles. If you look at your file structure, you'll see a folder called `styles` with two CSS files: a global stylesheet (`global.css`), and a CSS module (`Home.module.css`).

If your project doesn't have those files, you can download the starter code here:

```bash
npx create-next-app nextjs-blog --use-npm --example "https://github.com/vercel/next-learn/tree/main/basics/assets-metadata-css-starter"
```

### CSS Modules

[CSS modules](/docs/basic-features/built-in-css-support) allow you to locally scope CSS at the component-level by automatically creating unique class names. This allows you to use the same CSS class name in different files without worrying about class name collisions.

In addition to CSS modules, you can style your Next.js application in a variety of ways, including:

- Sass which allows you to import `.css` and `.scss` files.
- PostCSS libraries like [Tailwind CSS](https://github.com/vercel/next.js/tree/canary/examples/with-tailwindcss).
- CSS-in-JS libraries such as [styled-jsx](https://github.com/vercel/styled-jsx), [styled-components](https://github.com/vercel/next.js/tree/canary/examples/with-styled-components), and [emotion](https://github.com/vercel/next.js/tree/canary/examples/with-emotion)

In this lesson, we’ll talk about how to use [CSS Modules](/docs/basic-features/built-in-css-support#adding-component-level-css) and [Sass](/docs/basic-features/built-in-css-support#sass-support) in Next.js. Let’s dive in!


<!-- Source: 16-assets-metadata-css-global-styles.mdx -->
## Global Styles

---
title: Global Styles
---

[CSS Modules](/docs/basic-features/built-in-css-support#adding-component-level-css) are useful for component-level styles. But if you want some CSS to be loaded by **every page**, Next.js has support for that as well.

To load [global CSS](/docs/basic-features/built-in-css-support#adding-a-global-stylesheet) to your application, create a file called `pages/_app.js` with the following content:

```jsx
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

The default export of `_app.js` is a top-level React component that wraps all the pages in your application. You can use this component to keep state when navigating between pages, or to add global styles as we're doing here. [Learn more about `_app.js` file](/docs/advanced-features/custom-app).

### Restart the Development Server

**Important:** You need to restart the development server when you add [`pages/_app.js`](/docs/advanced-features/custom-app). Press <kbd>Ctrl + c</kbd> to stop the server and run:

```shell
npm run dev
```

### Adding Global CSS

In Next.js, you can add [global CSS](/docs/basic-features/built-in-css-support#adding-a-global-stylesheet) files by importing them from [`pages/_app.js`](/docs/advanced-features/custom-app). You **cannot** import global CSS anywhere else.

The reason that [global CSS](/docs/basic-features/built-in-css-support#adding-a-global-stylesheet) can't be imported outside of `pages/_app.js` is that global CSS affects all elements on the page.

If you were to navigate from the homepage to the `/posts/first-post` page, global styles from the homepage would affect `/posts/first-post` unintentionally.

You can place the global CSS file anywhere and use any name. So let’s do the following:

- Create a top-level `styles` directory and a `global.css` file.
- Add the following CSS inside `styles/global.css`. This code resets some styles and changes the color of the `a` tag:

```css
html,
body {
  padding: 0;
  margin: 0;
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    Segoe UI,
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    Fira Sans,
    Droid Sans,
    Helvetica Neue,
    sans-serif;
  line-height: 1.6;
  font-size: 18px;
}

* {
  box-sizing: border-box;
}

a {
  color: #0070f3;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

img {
  max-width: 100%;
  display: block;
}
```

Finally, import the CSS file inside the `pages/_app.js` file you've created earlier on:

```jsx
// `pages/_app.js`
import '../styles/global.css';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

Now, if you access [http://localhost:3000/posts/first-post](http://localhost:3000/posts/first-post), you’ll see that the styles are applied. Any styles imported in `_app.js` will be applied globally, to all pages of the application.

<Image
  alt="Global Styles"
  src="/learn/pages-router/assets-metadata-css/global-styles.png"
  width={484 / 2}
  height={316 / 2}
/>

> **If it didn’t work**: Make sure you restart the development server when you update `pages/_app.js`.

<Quiz
  question="Where can you import global CSS files?"
  answers={['Inside any file', 'Only inside pages/_app.js']}
  correctAnswer="Only inside pages/_app.js"
/>


<!-- Source: 17-assets-metadata-css-polishing-layout.mdx -->
## Polishing Layout

---
title: Polishing Layout
---

So far, we’ve only added minimal React and CSS code just to illustrate concepts such as [CSS Modules](/docs/basic-features/built-in-css-support#adding-component-level-css). Before we move on to our next lesson about [data fetching](/docs/basic-features/data-fetching), let’s polish our page styling and code.

### Update `components/layout.module.css`

First, open `components/layout.module.css` and replace its content with the following more polished styles for the layout and profile picture:

```css
.container {
  max-width: 36rem;
  padding: 0 1rem;
  margin: 3rem auto 6rem;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.backToHome {
  margin: 3rem 0 0;
}
```

### Create `styles/utils.module.css`

Second, let’s create a set of CSS utility classes (for text styles) that can be re-used across multiple components.

Add a new CSS file called `styles/utils.module.css` with the following content:

```css
.heading2Xl {
  font-size: 2.5rem;
  line-height: 1.2;
  font-weight: 800;
  letter-spacing: -0.05rem;
  margin: 1rem 0;
}

.headingXl {
  font-size: 2rem;
  line-height: 1.3;
  font-weight: 800;
  letter-spacing: -0.05rem;
  margin: 1rem 0;
}

.headingLg {
  font-size: 1.5rem;
  line-height: 1.4;
  margin: 1rem 0;
}

.headingMd {
  font-size: 1.2rem;
  line-height: 1.5;
}

.borderCircle {
  border-radius: 9999px;
}

.colorInherit {
  color: inherit;
}

.padding1px {
  padding-top: 1px;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.listItem {
  margin: 0 0 1.25rem;
}

.lightText {
  color: #666;
}
```

> You can reuse these utility classes throughout your application, and you may even use utility classes in your `global.css` file. Utility classes refer to an approach of writing CSS selectors rather than a method (e.g. global styles, CSS modules, Sass, etc). Learn more about [utility-first CSS](https://tailwindcss.com/docs/utility-first).

### Update `components/layout.js`

Third, open `components/layout.js` and replace its content with the following code, **changing** `Your Name` to an actual name:

```jsx
import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

const name = 'Your Name';
export const siteTitle = 'Next.js Sample Website';

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <Image
              priority
              src="/images/profile.jpg"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt=""
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <Image
                priority
                src="/images/profile.jpg"
                className={utilStyles.borderCircle}
                height={108}
                width={108}
                alt=""
              />
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/" className={utilStyles.colorInherit}>
                {name}
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Back to home</Link>
        </div>
      )}
    </div>
  );
}
```

Here’s what’s new:

- [`meta` tags](https://en.wikipedia.org/wiki/Meta_element) (like `og:image`), which are used to describe a page's content
- Boolean `home` prop which will adjust the size of the title and the image
- "Back to home" link at the bottom if `home` is `false`
- Added images with `next/image`, which are preloaded with the [priority](/docs/api-reference/next/image#priority) attribute

### Update `pages/index.js`

Finally, let's update the homepage.

Open `pages/index.js` and replace its content with:

```jsx
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
    </Layout>
  );
}
```

Then replace `[Your Self Introduction]` with your self-introduction. Here’s an example with the author’s profile:

<Image
  alt="Example"
  src="/learn/pages-router/assets-metadata-css/example.png"
  width={1268 / 2}
  height={864 / 2}
/>

That’s it! We now have the polished layout code and we're ready to move on to our data fetching lessons.

Before we wrap up this lesson, let’s talk about some helpful techniques related to Next.js’s CSS support on the next page.

<Quiz
  question="Why are CSS Modules useful?"
  answers={[
    'They automatically fix any cross-browser issues',
    'They scope styles at the component level',
  ]}
  correctAnswer="They scope styles at the component level"
/>


<!-- Source: 18-assets-metadata-css-styling-tips.mdx -->
## Styling Tips

---
title: Styling Tips
---

Here are some styling tips that might be helpful.

> You can just **read through** the following sections. No need to make changes to our app!

### Using `clsx` library to toggle classes

[`clsx`](https://www.npmjs.com/package/clsx) is a simple library that lets you toggle class names easily. You can install it using `npm install clsx` or `yarn add clsx`.

Please take a look at its [documentation](https://github.com/lukeed/clsx) for more details, but here's the basic usage:

- Suppose that you want to create an `Alert` component which accepts `type`, which can be `'success'` or `'error'`.
- If it's `'success'`, you want the text color to be green. If it's `'error'`, you want the text color to be red.

You can first write a CSS module (e.g. `alert.module.css`) like this:

```css
.success {
  color: green;
}
.error {
  color: red;
}
```

And use `clsx` like this:

```jsx
import styles from './alert.module.css';
import { clsx } from 'clsx';

export default function Alert({ children, type }) {
  return (
    <div
      className={clsx({
        [styles.success]: type === 'success',
        [styles.error]: type === 'error',
      })}
    >
      {children}
    </div>
  );
}
```

### Customizing PostCSS Config

Out of the box, with no configuration, Next.js compiles CSS using [PostCSS](https://postcss.org/).

To customize PostCSS config, you can create a top-level file called [`postcss.config.js`](/docs/advanced-features/customizing-postcss-config#customizing-plugins). This is useful if you're using libraries like [Tailwind CSS](https://tailwindcss.com/).

Here are the steps to add [Tailwind CSS](https://tailwindcss.com/). First, install the packages:

```shell
npm install -D tailwindcss autoprefixer postcss
```

Then, create a [`postcss.config.js`](/docs/advanced-features/customizing-postcss-config#customizing-plugins):

```js
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

We also recommend [configuring content sources](https://tailwindcss.com/docs/content-configuration) by specifying the `content` option on `tailwind.config.js`:

```js
// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    // For the best performance and to avoid false positives,
    // be as specific as possible with your content configuration.
  ],
};
```

> To learn more about custom PostCSS configuration, check out the [documentation for PostCSS](/docs/advanced-features/customizing-postcss-config).

> To easily get started with Tailwind CSS, [check out our example](https://github.com/vercel/next.js/tree/canary/examples/with-tailwindcss).

### Using Sass

Out of the box, Next.js allows you to import [Sass](/docs/basic-features/built-in-css-support#sass-support) using both the `.scss` and `.sass` extensions. You can use component-level Sass via [CSS Modules](/docs/basic-features/built-in-css-support#adding-component-level-css) and the `.module.scss` or `.module.sass` extension.

Before you can use Next.js' built-in Sass support, be sure to install [`sass`](https://github.com/sass/sass):

```shell
npm install -D sass
```

### That's it for this lesson!

To learn more about Next.js's built-in CSS Support and CSS Modules, check out the [CSS Documentation](/docs/basic-features/built-in-css-support).


<!-- Source: 19-data-fetching-blog-data.mdx -->
## Creating a simple blog architecture

---
title: Creating a simple blog architecture
---

The blog posts in our example will be stored as local markdown files in our application's directory (not fetched from an external data source), so we'll need to read the data from the file system.

In this section, we'll go through the steps of creating a blog that reads markdown data from the file system.

### Creating the markdown files

First, create a new top-level directory called **`posts`** (this is not the same as `pages/posts`) in your root folder. Inside `posts`, create two files: **`pre-rendering.md`** and **`ssg-ssr.md`**.

Now, copy the following code to `posts/pre-rendering.md`:

```md
---
title: 'Two Forms of Pre-rendering'
date: '2020-01-01'
---

Next.js has two forms of pre-rendering: **Static Generation** and **Server-side Rendering**. The difference is in **when** it generates the HTML for a page.

- **Static Generation** is the pre-rendering method that generates the HTML at **build time**. The pre-rendered HTML is then _reused_ on each request.
- **Server-side Rendering** is the pre-rendering method that generates the HTML on **each request**.

Importantly, Next.js lets you **choose** which pre-rendering form to use for each page. You can create a "hybrid" Next.js app by using Static Generation for most pages and using Server-side Rendering for others.
```

Then, copy the following code to `posts/ssg-ssr.md`:

```md
---
title: 'When to Use Static Generation v.s. Server-side Rendering'
date: '2020-01-02'
---

We recommend using **Static Generation** (with and without data) whenever possible because your page can be built once and served by CDN, which makes it much faster than having a server render the page on every request.

You can use Static Generation for many types of pages, including:

- Marketing pages
- Blog posts
- E-commerce product listings
- Help and documentation

You should ask yourself: "Can I pre-render this page **ahead** of a user's request?" If the answer is yes, then you should choose Static Generation.

On the other hand, Static Generation is **not** a good idea if you cannot pre-render a page ahead of a user's request. Maybe your page shows frequently updated data, and the page content changes on every request.

In that case, you can use **Server-Side Rendering**. It will be slower, but the pre-rendered page will always be up-to-date. Or you can skip pre-rendering and use client-side JavaScript to populate data.
```

> You might have noticed that each markdown file has a metadata section at the top containing `title` and `date`. This is called YAML Front Matter, which can be parsed using a library called [gray-matter](https://github.com/jonschlinkert/gray-matter).

### Installing gray-matter

First, install [gray-matter](https://github.com/jonschlinkert/gray-matter) which lets us parse the metadata in each markdown file.

```shell
npm install gray-matter
```

### Creating the utility function to read the file system

Next, we’ll create a utility function for parsing data from the file system. With this utility function, we’d like to:

- Parse each markdown file and get `title`, `date`, and file name (which will be used as `id` for the post URL).
- List the data on the index page, sorted by date.

Create a top-level directory called `lib` in the root directory. Then, inside `lib`, create a file called `posts.js`, and copy and paste this code:

```js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
```

> **Note:**
>
> You don't need to understand what the code above is doing in order to learn Next.js, the function is to make the blog example functional. But if you'd like to learn more:
>
> - [`fs`](https://nodejs.org/api/fs.html#fsreaddirsyncpath-options) is a Node.js module that lets you read files from the file system.
> - [`path`](https://nodejs.org/api/path.html#pathjoinpaths) is a Node.js module that lets you manipulate file paths.
> - [`matter`](https://www.npmjs.com/package/gray-matter) is a library that lets you parse the metadata in each markdown file.
> - In Next.js, the `lib` folder does not have an assigned name like the `pages` folder, so you can name it anything. It's usually convention to use `lib` or `utils`.

### Fetching the blog data

Now that the blog data is parsed, we need to add it to our index page (`pages/index.js`). We can do this with a Next.js data fetching method called [`getStaticProps()`](/docs/basic-features/data-fetching#getstaticprops-static-generation). In the next section, we'll learn how to implement `getStaticProps()`.

<Image
  alt="Index Page"
  src="/learn/pages-router/data-fetching/index-page.png"
  width={1246 / 2}
  height={948 / 2}
/>

Let’s do it on the next page!


<!-- Source: 20-data-fetching.mdx -->
## Pre-rendering and Data Fetching

---
title: Pre-rendering and Data Fetching
---

We’d like to create a blog (here’s [the desired result](https://next-learn-starter.vercel.app/)), but so far we’ve added no blog content.
In this lesson, we’ll learn how to fetch external blog data into our app. We’ll store the blog content in the file system, but it’ll work if the content is stored elsewhere (e.g. database or [Headless CMS](https://en.wikipedia.org/wiki/Headless_content_management_system)).

### What You’ll Learn in This Lesson

In this lesson, you’ll learn about:

- Next.js’ [pre-rendering](/docs/basic-features/pages#pre-rendering) feature.
- The two forms of pre-rendering: [Static Generation](/docs/basic-features/pages#static-generation-recommended) and [Server-side Rendering](/docs/basic-features/pages#server-side-rendering).
- Static Generation [with data](/docs/basic-features/pages#static-generation-with-data), and [without data](/docs/basic-features/pages#static-generation-without-data).
- [`getStaticProps`](/docs/basic-features/data-fetching#getstaticprops-static-generation) and how to use it to import external blog data into the index page.
- Some useful information on [`getStaticProps`](/docs/basic-features/data-fetching#getstaticprops-static-generation).


<!-- Source: 21-data-fetching-setup.mdx -->
## Set up

---
title: Set up
---

**If you’re continuing from the previous lesson,** you can skip this page.

### Download Starter Code (Optional)

If you’re NOT continuing from the previous lesson, you can download, install, and run the starter code for this lesson below. This sets up a `nextjs-blog` directory such that it’s identical to the result of the previous lesson.

Again, this is NOT necessary if you’ve just finished the previous lesson.

```shell
npx create-next-app@latest nextjs-blog --use-npm --example "https://github.com/vercel/next-learn/tree/main/basics/data-fetching-starter"
```

Then follow the instructions from the command output (`cd` into the directory and start the development server).

You should also update the following files:

- `public/images/profile.jpg` with your photo (Recommended: 400px width/height).
- `const name = '[Your Name]'` in `components/layout.js` with your name.
- `<p>[Your Self Introduction]</p>` in `pages/index.js` with your self introduction.


<!-- Source: 22-data-fetching-pre-rendering.mdx -->
## Pre-rendering

---
title: Pre-rendering
---

Before we talk about [data fetching](/docs/basic-features/data-fetching), let’s talk about one of the most important concepts in Next.js: [**Pre-rendering**](/docs/basic-features/pages#pre-rendering).

By default, Next.js pre-renders every page. This means that Next.js _generates HTML for each page in advance_, instead of having it all done by client-side JavaScript. Pre-rendering can result in better performance and [SEO](https://en.wikipedia.org/wiki/Search_engine_optimization).

Each generated HTML is associated with minimal JavaScript code necessary for that page. When a page is loaded by the browser, its JavaScript code runs and makes the page fully interactive. (This process is called **hydration**.)

### Check That Pre-rendering Is Happening

You can check that pre-rendering is happening by taking the following steps:

1. Disable JavaScript in your browser. ([Here’s how in Chrome](https://developer.chrome.com/docs/devtools/javascript/disable/)).
2. [Try accessing this page](https://next-learn-starter.vercel.app/) (the final result of this tutorial).

You should see that your app is rendered without JavaScript. That’s because Next.js has pre-rendered the app into static HTML, allowing you to see the app UI without running JavaScript.

> **Note**: You can also try the above steps on `localhost`, but CSS won’t be loaded if you disable JavaScript.

If your app is a plain React.js app (without Next.js), there’s no [pre-rendering](/docs/basic-features/pages#pre-rendering), so you won’t be able to see the app if you disable JavaScript. For example:

- Enable JavaScript in your browser and [check out this page](https://create-react-template.vercel.app/). This is a plain React.js app built with [Create React App](https://create-react-app.dev/).
- Now, disable JavaScript and access [the same page](https://create-react-template.vercel.app/) again.
- You won’t see the app anymore — instead, it’ll say "You need to enable JavaScript to run this app." This is because the app is not pre-rendered into static HTML.

### Summary: Pre-rendering vs. No Pre-rendering

Here’s a quick graphical summary:

<Image
  alt="Pre-rendering"
  src="/learn/pages-router/data-fetching/pre-rendering.png"
  width={1386 / 2}
  height={824 / 2}
/>

<Image
  alt="No pre-rendering"
  src="/learn/pages-router/data-fetching/no-pre-rendering.png"
  width={1386 / 2}
  height={688 / 2}
/>

Next, let’s talk about **two forms** of pre-rendering in Next.js.

<Quiz
  question="Which of the following is **not** a benefit of pre-rendering?"
  answers={[
    'Improved SEO',
    'Allows your application to work without JavaScript',
    'Allows your application to only run server-side',
  ]}
  correctAnswer="Allows your application to only run server-side"
/>


<!-- Source: 23-data-fetching-two-forms.mdx -->
## Two Forms of Pre-rendering

---
title: Two Forms of Pre-rendering
---

Next.js has two forms of pre-rendering: [**Static Generation**](/docs/basic-features/pages#static-generation-recommended) and [**Server-side Rendering**](/docs/basic-features/pages#server-side-rendering). The difference is in **when** it generates the HTML for a page.

- [**Static Generation**](/docs/basic-features/pages#static-generation-recommended) is the pre-rendering method that generates the HTML at **build time**. The pre-rendered HTML is then _reused_ on each request.
- [**Server-side Rendering**](/docs/basic-features/pages#server-side-rendering) is the pre-rendering method that generates the HTML on **each request**.

<Image
  alt="Static Generation"
  src="/learn/pages-router/data-fetching/static-generation.png"
  width={1386 / 2}
  height={744 / 2}
/>

<Image
  alt="Server-side Rendering"
  src="/learn/pages-router/data-fetching/server-side-rendering.png"
  width={1386 / 2}
  height={800 / 2}
/>

> In development mode (when you run `npm run dev` or `yarn dev`), pages are [pre-rendered](/docs/basic-features/pages#pre-rendering) on every request. This also applies to [Static Generation](https://nextjs.org/docs/basic-features/data-fetching/get-static-props#runs-on-every-request-in-development) to make it easier to develop. When going to production, Static Generation will happen once, at build time, and **not** on every request.

### Per-page Basis

Importantly, Next.js lets you **choose** which pre-rendering form to use for each page. You can create a "hybrid" Next.js app by using [Static Generation](/docs/basic-features/pages#static-generation-recommended) for most pages and using [Server-side Rendering](/docs/basic-features/pages#server-side-rendering) for others.

<Image
  alt="Per-page Basis"
  src="/learn/pages-router/data-fetching/per-page-basis.png"
  width={1156 / 2}
  height={902 / 2}
/>

### When to Use [Static Generation](/docs/basic-features/pages#static-generation-recommended) v.s. [Server-side Rendering](/docs/basic-features/pages#server-side-rendering)

We recommend using [**Static Generation**](/docs/basic-features/pages#static-generation-recommended) (with and without data) whenever possible because your page can be built once and served by CDN, which makes it much faster than having a server render the page on every request.

You can use [Static Generation](/docs/basic-features/pages#static-generation-recommended) for many types of pages, including:

- Marketing pages
- Blog posts
- E-commerce product listings
- Help and documentation

You should ask yourself: "Can I pre-render this page **ahead** of a user's request?" If the answer is yes, then you should choose [Static Generation](/docs/basic-features/pages#static-generation-recommended).

On the other hand, [Static Generation](/docs/basic-features/pages#static-generation-recommended) is **not** a good idea if you cannot pre-render a page ahead of a user's request. Maybe your page shows frequently updated data, and the page content changes on every request.

In that case, you can use [**Server-side Rendering**](/docs/basic-features/pages#server-side-rendering). It will be slower, but the pre-rendered page will always be up-to-date. Or you can skip pre-rendering and use client-side JavaScript to populate frequently updated data.

### We’ll Focus on Static Generation

In this lesson, we’ll focus on [Static Generation](/docs/basic-features/pages#static-generation-recommended). On the next page, we’ll talk about [Static Generation](/docs/basic-features/pages#static-generation-recommended) **with and without data**.

<Quiz
  question="When would you use **Server-side rendering?**"
  answers={[
    'When you have thousands of pages',
    'When the data needs to be up-to-date with every request',
    'When you are building a page specific to a user',
  ]}
  correctAnswer="When the data needs to be up-to-date with every request"
/>


<!-- Source: 24-data-fetching-with-data.mdx -->
## Static Generation with and without Data

---
title: Static Generation with and without Data
---

[Static Generation](/docs/pages/building-your-application/rendering/static-site-generation) can be done with and without data.

So far, all the pages we’ve created do not require fetching external data. Those pages will automatically be statically generated when the app is built for production.

<Image
  alt="Static Generation without Data"
  src="/learn/pages-router/data-fetching/static-generation-without-data.png"
  width={1246 / 2}
  height={784 / 2}
/>

However, for some pages, you might not be able to render the HTML without first fetching some external data. Maybe you need to access the file system, fetch external API, or query your database at build time. Next.js supports this case — [Static Generation **with data**](https://nextjs.org/docs/basic-features/pages#static-generation-with-data) — out of the box.

<Image
  alt="Static Generation with Data"
  src="/learn/pages-router/data-fetching/static-generation-with-data.png"
  width={1246 / 2}
  height={1050 / 2}
/>

### Static Generation with Data using `getStaticProps`

How does it work? Well, in Next.js, when you export a page component, you can also export an `async` function called [`getStaticProps`](/docs/basic-features/data-fetching#getstaticprops-static-generation). If you do this, then:

- [`getStaticProps`](/docs/basic-features/data-fetching#getstaticprops-static-generation) runs at build time in production, and…
- Inside the function, you can fetch external data and send it as props to the page.

```jsx
export default function Home(props) { ... }

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const data = ...

  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: ...
  }
}
```

Essentially, [`getStaticProps`](/docs/basic-features/data-fetching#getstaticprops-static-generation) allows you to tell Next.js: _"Hey, this page has some data dependencies — so when you pre-render this page at build time, make sure to resolve them first!"_

> **Note**: In development mode, [`getStaticProps`](/docs/basic-features/data-fetching#getstaticprops-static-generation) runs on each request instead.

### Let’s Use `getStaticProps`

It’s easier to learn by doing, so starting from the next page, we’ll use [`getStaticProps`](/docs/basic-features/data-fetching#getstaticprops-static-generation) to implement our blog.


<!-- Source: 25-data-fetching-implement-getstaticprops.mdx -->
## Implement getStaticProps

---
title: Implement getStaticProps
---

### Pre-rendering in Next.js

Next.js has two forms of pre-rendering: **Static Generation** and **Server-side Rendering**. The difference is in **when** it generates the HTML for a page.

- **Static Generation** is the pre-rendering method that generates the HTML at **build time**. The pre-rendered HTML is then _reused_ on each request.
- **Server-side Rendering** is the pre-rendering method that generates the HTML on **each request**.

Importantly, Next.js lets you **choose** which pre-rendering form to use for each page. You can create a "hybrid" Next.js app by using Static Generation for most pages and using Server-side Rendering for others.

### Using Static Generation (`getStaticProps()`)

Now, we need to add an import for `getSortedPostsData` and call it inside [`getStaticProps`](/docs/basic-features/data-fetching#getstaticprops-static-generation) in `pages/index.js`.

Open `pages/index.js` in your editor and add the following code above the exported `Home` component:

```js
import { getSortedPostsData } from '../lib/posts';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
```

By returning `allPostsData` inside the `props` object in `getStaticProps`, the blog posts will be passed to the `Home` component as a prop. Now you can access the blog posts like so:

```jsx
export default function Home ({ allPostsData }) { ... }
```

To display the blog posts, let's update the `Home` component to add another `<section>` tag with the data below the section with your self introduction. Don't forget to also change the props from `()` to `({ allPostsData })`:

```jsx
export default function Home({ allPostsData }) {
  return (
    <Layout home>
      {/* Keep the existing code here */}

      {/* Add this <section> tag below the existing <section> tag */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
```

You should now see the blog data if you access [http://localhost:3000](http://localhost:3000).

<Image
  alt="Blog Data"
  src="/learn/pages-router/data-fetching/blog-data.png"
  width={1156 / 2}
  height={578 / 2}
/>

Congratulations! We’ve successfully fetched external data (from the file system) and pre-rendered the index page with this data.

<Image
  alt="Index Page"
  src="/learn/pages-router/data-fetching/index-page.png"
  width={1246 / 2}
  height={948 / 2}
/>

Let’s talk about some tips for using [`getStaticProps`](/docs/basic-features/data-fetching#getstaticprops-static-generation) on the next page.


<!-- Source: 26-data-fetching-getstaticprops-details.mdx -->
## getStaticProps Details

---
title: getStaticProps Details
---

Here is some essential information you should know about [`getStaticProps`](/docs/basic-features/data-fetching#getstaticprops-static-generation).

### Fetch External API or Query Database

In `lib/posts.js`, we’ve implemented `getSortedPostsData` which fetches data from the file system. But you can fetch the data from other sources, like an external API endpoint, and it’ll work just fine:

```js
export async function getSortedPostsData() {
  // Instead of the file system,
  // fetch post data from an external API endpoint
  const res = await fetch('..');
  return res.json();
}
```

> **Note**: Next.js polyfills [`fetch()`](/docs/basic-features/supported-browsers-features) on both the client and server. You don't need to import it.

You can also query the database directly:

```js
import someDatabaseSDK from 'someDatabaseSDK'

const databaseClient = someDatabaseSDK.createClient(...)

export async function getSortedPostsData() {
  // Instead of the file system,
  // fetch post data from a database
  return databaseClient.query('SELECT posts...')
}
```

This is possible because [`getStaticProps`](/docs/basic-features/data-fetching#getstaticprops-static-generation) only **runs on the server-side**. It will never run on the client-side. It won’t even be included in the JS bundle for the browser. That means you can write code such as direct database queries without them being sent to browsers.

### Development vs. Production

- In **development** (`npm run dev` or `yarn dev`), [`getStaticProps`](/docs/basic-features/data-fetching#getstaticprops-static-generation) runs on _every request_.
- In **production**, [`getStaticProps`](/docs/basic-features/data-fetching#getstaticprops-static-generation) runs at _build time_. However, this behavior can be enhanced using the [`fallback` key](/docs/api-reference/data-fetching/get-static-paths#fallback-false) returned by [`getStaticPaths`](/docs/basic-features/data-fetching#getstaticpaths-static-generation)

Because it’s meant to be run at build time, you won’t be able to use data that’s only available during request time, such as query parameters or HTTP headers.

### Only Allowed in a Page

[`getStaticProps`](/docs/basic-features/data-fetching#getstaticprops-static-generation) can only be exported from a [**page**](/docs/basic-features/pages). You can’t export it from non-page files.

One of the reasons for this restriction is that React needs to have all the required data before the page is rendered.

### What If I Need to Fetch Data at Request Time?

Since [Static Generation](/docs/basic-features/pages#static-generation-recommended) happens once at build time, it's not suitable for data that updates frequently or changes on every user request.

In cases like this, where your data is likely to change, you can use [**Server-side Rendering**](/docs/basic-features/pages#server-side-rendering). Let's learn more about server-side rendering in the next section.

<Quiz
  question="Where does `getStaticProps` run?"
  answers={['Client-side', 'Server-side', 'Both']}
  correctAnswer="Server-side"
/>


<!-- Source: 27-data-fetching-request-time.mdx -->
## Fetching Data at Request Time

---
title: Fetching Data at Request Time
---

If you need to fetch data at **request time** instead of at build time, you can try [**Server-side Rendering**](/docs/basic-features/pages#server-side-rendering):

<Image
  alt="Server-side Rendering"
  src="/learn/pages-router/data-fetching/server-side-rendering-with-data.png"
  width={1246 / 2}
  height={1050 / 2}
/>

To use [Server-side Rendering](/docs/basic-features/pages#server-side-rendering), you need to export [`getServerSideProps`](/docs/basic-features/data-fetching#getserversideprops-server-side-rendering) instead of [`getStaticProps`](/docs/basic-features/data-fetching#getstaticprops-static-generation) from your page.

### Using `getServerSideProps`

Here’s the starter code for [`getServerSideProps`](/docs/basic-features/data-fetching#getserversideprops-server-side-rendering). It’s not necessary for our blog example, so we won’t be implementing it.

```jsx
export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    },
  };
}
```

Because [`getServerSideProps`](/docs/basic-features/data-fetching#getserversideprops-server-side-rendering) is called at request time, its parameter (`context`) contains request specific parameters.

You should use [`getServerSideProps`](/docs/basic-features/data-fetching#getserversideprops-server-side-rendering) only if you need to pre-render a page whose data must be fetched at request time. Time to first byte ([TTFB](https://web.dev/time-to-first-byte/)) will be slower than [`getStaticProps`](/docs/basic-features/data-fetching#getstaticprops-static-generation) because the server must compute the result on every request, and the result cannot be cached by a [CDN](https://vercel.com/docs/edge-network/overview) without extra configuration.

### Client-side Rendering

If you **do not** need to pre-render the data, you can also use the following strategy (called [**Client-side Rendering**](/docs/basic-features/data-fetching#fetching-data-on-the-client-side)):

- Statically generate (pre-render) parts of the page that do not require external data.
- When the page loads, fetch external data from the client using JavaScript and populate the remaining parts.

<Image
  alt="Client-side Rendering"
  src="/learn/pages-router/data-fetching/client-side-rendering.png"
  width={1246 / 2}
  height={1896 / 2}
/>

This approach works well for user dashboard pages, for example. Because a dashboard is a private, user-specific page, SEO is not relevant, and the page doesn’t need to be [pre-rendered](/docs/basic-features/pages#pre-rendering). The data is frequently updated, which requires request-time data fetching.

### SWR

The team behind Next.js has created a React hook for data fetching called [**SWR**](https://swr.vercel.app/). We highly recommend it if you’re fetching data on the client side. It handles caching, revalidation, focus tracking, refetching on interval, and more. We won’t cover the details here, but here’s an example usage:

```jsx
import useSWR from 'swr';

function Profile() {
  const { data, error } = useSWR('/api/user', fetch);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <div>hello {data.name}!</div>;
}
```

Check out the [SWR documentation](https://swr.vercel.app/) to learn more.

### That’s It!

In the next lesson, we’ll create pages for each blog post using [**dynamic routes**](/docs/routing/dynamic-routes).

> Again, you can get in-depth information about [`getStaticProps`](/docs/basic-features/data-fetching#getstaticprops-static-generation) and [`getServerSideProps`](/docs/basic-features/data-fetching#getserversideprops-server-side-rendering) in the [Data Fetching documentation](/docs/basic-features/data-fetching).

<Quiz
  question="When should you use **Client-side rendering?**"
  answers={[
    `When you can pre-render the data ahead of a user's request`,
    'When you need to fetch data at request time instead of build time',
    'Private, user-specific pages where SEO is not relevant',
  ]}
  correctAnswer="Private, user-specific pages where SEO is not relevant"
/>


<!-- Source: 28-dynamic-routes.mdx -->
## Dynamic Routes

---
title: Dynamic Routes
---

We’ve populated the index page with the blog data, but we still haven’t created individual blog pages yet (here’s the [desired result](https://next-learn-starter.vercel.app/)). We want the URL for these pages to depend on the blog data, which means we need to use [dynamic routes](/docs/routing/dynamic-routes).

### What You’ll Learn in This Lesson

In this lesson, you’ll learn:

- How to statically generate pages with [dynamic routes](/docs/routing/dynamic-routes) using [`getStaticPaths`](/docs/basic-features/data-fetching#getstaticpaths-static-generation).
- How to write [`getStaticProps`](/docs/basic-features/data-fetching#getstaticprops-static-generation) to fetch the data for each blog post.
- How to render markdown using [`remark`](https://github.com/remarkjs/remark).
- How to pretty-print date strings.
- How to link to a page with [dynamic routes](/docs/routing/dynamic-routes).
- Some useful information on [dynamic routes](/docs/routing/dynamic-routes).


<!-- Source: 29-dynamic-routes-setup.mdx -->
## Set up

---
title: Set up
---

**If you’re continuing from the previous lesson,** you can skip this page.

### Download Starter Code (Optional)

If you’re NOT continuing from the previous lesson, you can download, install, and run the starter code for this lesson below. This sets up a `nextjs-blog` directory such that it’s identical to the result of the previous lesson.

Again, this is NOT necessary if you’ve just finished the previous lesson.

```shell
npx create-next-app@latest nextjs-blog --use-npm --example "https://github.com/vercel/next-learn/tree/main/basics/dynamic-routes-starter"
```

Then follow the instructions from the command output (`cd` into the directory and start the development server).

You should also update the following files:

- `public/images/profile.jpg` with your photo (Recommended: 400px width/height).
- `const name = '[Your Name]'` in `components/layout.js` with your name.
- `<p>[Your Self Introduction]</p>` in `pages/index.js` with your self introduction.


<!-- Source: 30-dynamic-routes-page-path-external-data.mdx -->
## Page Path Depends on External Data

---
title: Page Path Depends on External Data
description:
---

In the previous lesson, we covered the case where the **page content** depends on external data. We used [`getStaticProps`](/docs/basic-features/data-fetching#getstaticprops-static-generation) to fetch required data to render the index page.

In this lesson, we’ll talk about the case where each **page path** depends on external data. Next.js allows you to statically generate pages with paths that depend on external data. This enables **dynamic URLs** in Next.js.

<Image
  alt="Page Path Depends on External Data"
  src="/learn/pages-router/dynamic-routes/page-path-external-data.png"
  width={1246 / 2}
  height={1050 / 2}
/>

### How to Statically Generate Pages with Dynamic Routes

In our case, we want to create [dynamic routes](/docs/routing/dynamic-routes) for blog posts:

- We want each post to have the path `/posts/<id>`, where `<id>` is the name of the markdown file under the top-level `posts` directory.
- Since we have `ssg-ssr.md` and `pre-rendering.md`, we’d like the paths to be `/posts/ssg-ssr` and `/posts/pre-rendering`.

### Overview of the Steps

We can do this by taking the following steps. **You don’t have to make these changes yet** — we’ll do it all on the next page.

First, we’ll create a page called **`[id].js`** under `pages/posts`. Pages that begin with `[` and end with `]` are [dynamic routes](/docs/routing/dynamic-routes) in Next.js.

In `pages/posts/[id].js`, we’ll write code that will render a post page — just like other pages we’ve created.

```jsx
import Layout from '../../components/layout';

export default function Post() {
  return <Layout>...</Layout>;
}
```

Now, here’s what’s new: We’ll export an async function called [`getStaticPaths`](/docs/basic-features/data-fetching#getstaticpaths-static-generation) from this page.
In this function, we need to return a list of **possible values** for `id`.

```jsx
import Layout from '../../components/layout';

export default function Post() {
  return <Layout>...</Layout>;
}

export async function getStaticPaths() {
  // Return a list of possible value for id
}
```

Finally, we need to implement [`getStaticProps`](/docs/basic-features/data-fetching#getstaticprops-static-generation) again - this time, to fetch necessary data for the blog post with a given `id`.
[`getStaticProps`](/docs/basic-features/data-fetching#getstaticprops-static-generation) is given `params`, which contains `id` (because the file name is `[id].js`).

```jsx
import Layout from '../../components/layout';

export default function Post() {
  return <Layout>...</Layout>;
}

export async function getStaticPaths() {
  // Return a list of possible value for id
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
}
```

Here’s a graphic summary of what we just talked about:

<Image
  alt="How to Statically Generate Pages with Dynamic Routes"
  src="/learn/pages-router/dynamic-routes/how-to-dynamic-routes.png"
  width={1246 / 2}
  height={1054 / 2}
/>

Let’s try this on the next page!


<!-- Source: 31-dynamic-routes-implement-getstaticpaths.mdx -->
## Implement getStaticPaths

---
title: Implement getStaticPaths
---

First, let’s set up the files:

- Create a file called **`[id].js`** inside the `pages/posts` directory.
- Also, **remove `first-post.js`** inside the `pages/posts` directory — we’ll no longer use this.

Then, open `pages/posts/[id].js` in your editor and paste the following code. We’ll fill in `...` later:

```jsx
import Layout from '../../components/layout';

export default function Post() {
  return <Layout>...</Layout>;
}
```

Then, open `lib/posts.js` and add the following `getAllPostIds` function at the bottom. It will return the list of file names (excluding `.md`) in the `posts` directory:

```jsx
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}
```

**Important**: The returned list is _not_ just an array of strings — it **must** be an array of objects that look like the comment above. Each object must have the `params` key and contain an object with the `id` key (because we’re using `[id]` in the file name). Otherwise, [`getStaticPaths`](/docs/pages/building-your-application/data-fetching/get-static-paths) will fail.

Finally, we'll import the `getAllPostIds` function and use it inside [`getStaticPaths`](/docs/pages/building-your-application/data-fetching/get-static-paths). Open `pages/posts/[id].js` and copy the following code above the exported `Post` component:

```js
import { getAllPostIds } from '../../lib/posts';

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}
```

- `paths` contains the array of known paths returned by `getAllPostIds()`, which include the params defined by `pages/posts/[id].js`. Learn more in the [`paths` key documentation](/docs/pages/api-reference/functions/get-static-paths#paths)
- Ignore [`fallback: false`]() for now — we’ll explain that later.

We’re almost done — but we still need to implement [`getStaticProps`](/docs/pages/building-your-application/data-fetching/get-static-props). Let’s do that on the next page!


<!-- Source: 32-dynamic-routes-implement-getstaticprops.mdx -->
## Implement getStaticProps

---
title: Implement getStaticProps
---

We need to fetch necessary data to render the post with the given `id`.

To do so, open `lib/posts.js` again and add the following `getPostData` function at the bottom. It will return the post data based on `id`:

```jsx
export function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Combine the data with the id
  return {
    id,
    ...matterResult.data,
  };
}
```

Then, open `pages/posts/[id].js` and replace this line:

```js
import { getAllPostIds } from '../../lib/posts';
```

with the following code:

```js
import { getAllPostIds, getPostData } from '../../lib/posts';

export async function getStaticProps({ params }) {
  const postData = getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
```

The post page is now using the `getPostData` function in `getStaticProps` to get the post data and return it as props.

Now, let's update the `Post` component to use `postData`. In `pages/posts/[id].js` replace the exported `Post` component with the following code:

```jsx
export default function Post({ postData }) {
  return (
    <Layout>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
    </Layout>
  );
}
```

That’s it! Try visiting these pages:

- [http://localhost:3000/posts/ssg-ssr](http://localhost:3000/posts/ssg-ssr)
- [http://localhost:3000/posts/pre-rendering](http://localhost:3000/posts/pre-rendering)

You should be able to see the blog data for each page:

<Image
  alt="Blog Data"
  src="/learn/pages-router/dynamic-routes/blog-data-post-page.png"
  width={948 / 2}
  height={738 / 2}
/>

Great! We’ve successfully generated [dynamic routes](/docs/routing/dynamic-routes).

### Something Wrong?

If you come across an error, make sure your files have the correct code:

- `pages/posts/[id].js` should [look like this](https://github.com/vercel/next-learn/blob/main/basics/dynamic-routes-step-1/pages/posts/%5Bid%5D.js).
- `lib/posts.js` should [look like this](https://github.com/vercel/next-learn/blob/main/basics/dynamic-routes-step-1/lib/posts.js).
- (If it’s still not working) The remaining code should [look like this](https://github.com/vercel/next-learn/tree/main/basics/dynamic-routes-step-1).

If you’re still stuck, feel free to ask the community on [GitHub Discussions](https://github.com/vercel/next.js/discussions). It’d be helpful if you could push your code to GitHub and link to it so others can take a look.

### Summary

Again, here’s the graphical summary of what we’ve done:

<Image
  alt="How to Statically Generate Pages with Dynamic Routes"
  src="/learn/pages-router/dynamic-routes/how-to-dynamic-routes.png"
  width={1246 / 2}
  height={1054 / 2}
/>

We still haven’t displayed the blog **markdown content**. Let’s do this next.

<Quiz
  question="How does `params.id` from `getStaticProps({ params })` know the key is named `id`?"
  answers={[
    'The front matter of the Markdown file',
    'The value from the file name',
  ]}
  correctAnswer="The value from the file name"
/>


<!-- Source: 33-dynamic-routes-render-markdown.mdx -->
## Render Markdown

---
title: Render Markdown
---

To render markdown content, we’ll use the [`remark`](https://github.com/remarkjs/remark) library. First, let’s install it:

```shell
npm install remark remark-html
```

Then, open `lib/posts.js` and add the following imports to the top of the file:

```js
import { remark } from 'remark';
import html from 'remark-html';
```

And update the `getPostData()` function in the same file as follows to use `remark`:

```js
export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
```

> **Important**: We added the **`async`** keyword to `getPostData` because we need to use `await` for `remark`. `async`/`await` allow you to fetch data [asynchronously](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/async_function).

That means we need to update [`getStaticProps`](/docs/basic-features/data-fetching#getstaticprops-static-generation) in `pages/posts/[id].js` to use `await` when calling `getPostData`:

```js
export async function getStaticProps({ params }) {
  // Add the "await" keyword like this:
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
}
```

Finally, update the `Post` component in `pages/posts/[id].js` to render `contentHtml` using [`dangerouslySetInnerHTML`](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml):

```jsx
export default function Post({ postData }) {
  return (
    <Layout>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  );
}
```

Try visiting these pages again:

- [http://localhost:3000/posts/ssg-ssr](http://localhost:3000/posts/ssg-ssr)
- [http://localhost:3000/posts/pre-rendering](http://localhost:3000/posts/pre-rendering)

You should now see the blog content:

<Image
  alt="How to Statically Generate Pages with Dynamic Routes"
  src="/learn/pages-router/dynamic-routes/markdown.png"
  width={1252 / 2}
  height={980 / 2}
/>

We’re almost done! Let’s polish each page next.


<!-- Source: 34-dynamic-routes-polishing-post-page.mdx -->
## Polishing the Post Page

---
title: Polishing the Post Page
---

### Adding `title` to the Post Page

In `pages/posts/[id].js`, let’s add the `title` tag using the post data. You'll need to add an import for [`next/head`](/docs/api-reference/next/head) at the top of the file and add the `title` tag by updating the `Post` component:

```jsx
// Add this import
import Head from 'next/head';

export default function Post({ postData }) {
  return (
    <Layout>
      {/* Add this <Head> tag */}
      <Head>
        <title>{postData.title}</title>
      </Head>

      {/* Keep the existing code here */}
    </Layout>
  );
}
```

### Formatting the Date

To format the date, we’ll use the [`date-fns`](https://date-fns.org/) library. First, install it:

```shell
npm install date-fns
```

Next, create a file called `components/date.js` and add the following `Date` component:

```jsx
import { parseISO, format } from 'date-fns';

export default function Date({ dateString }) {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>;
}
```

> **Note**: You can view the different `format()` string options on the [date-fns](https://date-fns.org/v2.16.1/docs/format) website.

Now, open `pages/posts/[id].js`, add an import for the `Date` component at the top of the file, and use it over `{postData.date}`:

```jsx
// Add this import
import Date from '../../components/date';

export default function Post({ postData }) {
  return (
    <Layout>
      {/* Keep the existing code here */}

      {/* Replace {postData.date} with this */}
      <Date dateString={postData.date} />

      {/* Keep the existing code here */}
    </Layout>
  );
}
```

If you access [http://localhost:3000/posts/pre-rendering](http://localhost:3000/posts/pre-rendering), you should now see the date written as **"January 1, 2020"**.

### Adding CSS

Finally, let’s add some CSS using the file `styles/utils.module.css` we added before. Open `pages/posts/[id].js`, then add an import for the CSS file, and replace the `Post` component with the following code:

```jsx
// Add this import at the top of the file
import utilStyles from '../../styles/utils.module.css';

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
```

If you access [http://localhost:3000/posts/pre-rendering](http://localhost:3000/posts/pre-rendering), the page should now look a little better:

<Image
  alt="Example"
  src="/learn/pages-router/dynamic-routes/post-page-css.png"
  width={1382 / 2}
  height={661 / 2}
/>

Great work! We’ll polish the index page next and we’ll be done!


<!-- Source: 35-dynamic-routes-polishing-index-page.mdx -->
## Polishing the Index Page

---
title: Polishing the Index Page
---

Next, let’s update our index page (`pages/index.js`). We need to add links to each post page using the [`Link`](/docs/api-reference/next/link) component.

Open `pages/index.js` and add the following imports at the top of the file for [`Link`](/docs/api-reference/next/link) and `Date`:

```js
import Link from 'next/link';
import Date from '../components/date';
```

Then, near the bottom of the `Home` component in the same file, replace the `li` tag with the following:

```jsx
<li className={utilStyles.listItem} key={id}>
  <Link href={`/posts/${id}`}>{title}</Link>
  <br />
  <small className={utilStyles.lightText}>
    <Date dateString={date} />
  </small>
</li>
```

If you go to http://localhost:3000, the page now has links to each article:

<Image
  alt="Links"
  src="/learn/pages-router/dynamic-routes/links.png"
  width={1152 / 2}
  height={472 / 2}
/>

> If something is not working, make sure your code [looks like this](https://github.com/vercel/next-learn/blob/main/basics/api-routes-starter/pages/posts/%5Bid%5D.js).

That’s it! Before we wrap up this lesson, let’s talk about some tips for [dynamic routes](/docs/routing/dynamic-routes) on the next page.


<!-- Source: 36-dynamic-routes-dynamic-routes-details.mdx -->
## Dynamic Routes Details

---
title: Dynamic Routes Details
---

Here is some essential information you should know about [dynamic routes](/docs/routing/dynamic-routes).

### Fetch External API or Query Database

Like [`getStaticProps`](/docs/basic-features/data-fetching#getstaticprops-static-generation), [`getStaticPaths`](/docs/basic-features/data-fetching#getstaticpaths-static-generation) can fetch data from any data source. In our example, `getAllPostIds` (which is used by [`getStaticPaths`](/docs/basic-features/data-fetching#getstaticpaths-static-generation)) may fetch from an external API endpoint:

```js
export async function getAllPostIds() {
  // Instead of the file system,
  // fetch post data from an external API endpoint
  const res = await fetch('..');
  const posts = await res.json();
  return posts.map((post) => {
    return {
      params: {
        id: post.id,
      },
    };
  });
}
```

### Development vs. Production

- In **development** (`npm run dev` or `yarn dev`), [`getStaticPaths`](/docs/basic-features/data-fetching#getstaticpaths-static-generation) runs on _every request_.
- In **production**, [`getStaticPaths`](/docs/basic-features/data-fetching#getstaticpaths-static-generation) runs at _build time_.

### Fallback

Recall that we returned `fallback: false` from [`getStaticPaths`](/docs/basic-features/data-fetching#getstaticpaths-static-generation). What does this mean?

If [`fallback` is `false`](/docs/basic-features/data-fetching#fallback-false), then any paths not returned by [`getStaticPaths`](/docs/basic-features/data-fetching#getstaticpaths-static-generation) will result in a **404 page**.

If [`fallback` is `true`](/docs/basic-features/data-fetching#fallback-true), then the behavior of [`getStaticProps`](/docs/basic-features/data-fetching#getstaticprops-static-generation) changes:

- The paths returned from [`getStaticPaths`](/docs/basic-features/data-fetching#getstaticpaths-static-generation) will be rendered to HTML at build time.
- The paths that have not been generated at build time will **not** result in a 404 page. Instead, Next.js will serve a "fallback" version of the page on the first request to such a path.
- In the background, Next.js will statically generate the requested path. Subsequent requests to the same path will serve the generated page, just like other pages pre-rendered at build time.

If [`fallback` is `blocking`](/docs/basic-features/data-fetching#fallback-blocking), then new paths will be server-side rendered with `getStaticProps`, and cached for future requests so it only happens once per path.

This is beyond the scope of our lessons, but you can learn more about `fallback: true` and `fallback: 'blocking'` in the [`fallback` documentation](/docs/api-reference/data-fetching/get-static-paths#fallback-false).

### Catch-all Routes

Dynamic routes can be extended to catch all paths by adding three dots (`...`) inside the brackets. For example:

- `pages/posts/[...id].js` matches `/posts/a`, but also `/posts/a/b`, `/posts/a/b/c` and so on.

If you do this, in [`getStaticPaths`](/docs/basic-features/data-fetching#getstaticpaths-static-generation), you must return an array as the value of the `id` key like so:

```js
return [
  {
    params: {
      // Statically Generates /posts/a/b/c
      id: ['a', 'b', 'c'],
    },
  },
  //...
];
```

And `params.id` will be an array in [`getStaticProps`](/docs/basic-features/data-fetching#getstaticprops-static-generation):

```js
export async function getStaticProps({ params }) {
  // params.id will be like ['a', 'b', 'c']
}
```

Take a look at the [catch all routes documentation](/docs/routing/dynamic-routes#catch-all-routes) to learn more.

### Router

If you want to access the Next.js router, you can do so by importing the [`useRouter`](/docs/api-reference/next/router#userouter) hook from [`next/router`](/docs/api-reference/next/router).

### 404 Pages

To create a [custom 404 page](/docs/advanced-features/custom-error-page#404-page), create `pages/404.js`. This file is statically generated at build time.

```jsx
// pages/404.js
export default function Custom404() {
  return <h1>404 - Page Not Found</h1>;
}
```

Take a look at our [Error Pages](/docs/advanced-features/custom-error-page) documentation to learn more.

### More Examples

We have created several examples to illustrate [`getStaticProps`](/docs/basic-features/data-fetching#getstaticprops-static-generation) and [`getStaticPaths`](/docs/basic-features/data-fetching#getstaticpaths-static-generation) — take a look at their source code to learn more:

- [Blog Starter using markdown files](https://github.com/vercel/next.js/tree/canary/examples/blog-starter) ([Demo](https://next-blog-starter.vercel.app/))
- [WordPress Example](https://github.com/vercel/next.js/tree/canary/examples/cms-wordpress) ([Demo](https://next-blog-wordpress.vercel.app/))
- [DatoCMS Example](https://github.com/vercel/next.js/tree/canary/examples/cms-datocms) ([Demo](https://next-blog-datocms.vercel.app/))
- [TakeShape Example](https://github.com/vercel/next.js/tree/canary/examples/cms-takeshape) ([Demo](https://next-blog-takeshape.vercel.app/))
- [Sanity Example](https://github.com/vercel/next.js/tree/canary/examples/cms-sanity) ([Demo](https://next-blog-sanity.vercel.app/))

### That’s it!

In the next lesson, we’ll talk about [API Routes](/docs/api-routes/introduction) in Next.js.

<Quiz
  question="You want to dynamically create product pages with the path `pages/products/[id].js`, where `[id]` refers to a specific product ID. What is the correct way to implement this?"
  answers={[
    'Use `getStaticPaths` to fetch an array of product IDs and use `getStaticProps` to fetch data for each product.',
    'Use `getStaticPaths` to fetch data for each product and use `getStaticProps` to fetch an array of product IDs.',
  ]}
  correctAnswer="Use `getStaticPaths` to fetch an array of product IDs and use `getStaticProps` to fetch data for each product."
/>


<!-- Source: 37-api-routes.mdx -->
## API Routes

---
title: API Routes
---

Next.js has support for [API Routes](/docs/api-routes/introduction), which let you easily create an API endpoint as a Node.js serverless function. Although it’s not necessary for our blog app, we’ll briefly talk about how to use it in this lesson.

### What You’ll Learn in This Lesson

In this lesson, you’ll learn:

- How to create an API Route.
- Some useful information on [API Routes](/docs/api-routes/introduction).


<!-- Source: 38-api-routes-setup.mdx -->
## Set up

---
title: Set up
---

**If you’re continuing from the previous lesson,** you can skip this page.

### Download Starter Code (Optional)

If you’re NOT continuing from the previous lesson, you can download, install, and run the starter code for this lesson below. This sets up a `nextjs-blog` directory such that it’s identical to the result of the previous lesson.

Again, this is NOT necessary if you’ve just finished the previous lesson.

```shell
npx create-next-app@latest nextjs-blog --use-npm --example "https://github.com/vercel/next-learn/tree/main/basics/api-routes-starter"
```

Then follow the instructions from the command output (`cd` into the directory and start the development server).

You should also update the following files:

- `public/images/profile.jpg` with your photo (Recommended: 400px width/height).
- `const name = '[Your Name]'` in `components/layout.js` with your name.
- `<p>[Your Self Introduction]</p>` in `pages/index.js` with your self introduction.


<!-- Source: 39-api-routes-creating-api-routes.mdx -->
## Creating API Routes

---
title: Creating API Routes
---

[API Routes](/docs/api-routes/introduction) let you create an API endpoint inside a Next.js app. You can do so by creating a **function** inside the `pages/api` directory that has the following format:

```js
// req = HTTP incoming message, res = HTTP server response
export default function handler(req, res) {
  // ...
}
```

> Learn more about the request handler above in the [API Routes documentation](/docs/api-routes/introduction).

They can be deployed as Serverless Functions (also known as Lambdas).

### Creating a simple API endpoint

Let’s try it out. Create a file called `hello.js` in `pages/api` with the following code:

```js
export default function handler(req, res) {
  res.status(200).json({ text: 'Hello' });
}
```

Try accessing it at [http://localhost:3000/api/hello](http://localhost:3000/api/hello). You should see `{"text":"Hello"}`. Note that:

- `req` is an instance of [http.IncomingMessage](https://nodejs.org/api/http.html#http_class_http_incomingmessage), plus some pre-built [middlewares](/docs/api-routes/api-middlewares).
- `res` is an instance of [http.ServerResponse](https://nodejs.org/api/http.html#http_class_http_serverresponse), plus some [helper functions](/docs/api-routes/response-helpers).

That’s it! Before we wrap up this lesson, let’s talk about some tips for using [API Routes](/docs/api-routes/introduction) on the next page.


<!-- Source: 40-api-routes-api-routes-details.mdx -->
## API Routes Details

---
title: API Routes Details
---

Here is some essential information you should know about [API Routes](/docs/api-routes/introduction).

### Do Not Fetch an API Route from `getStaticProps` or `getStaticPaths`

You should **not** fetch an API Route from [`getStaticProps`](/docs/basic-features/data-fetching#getstaticprops-static-generation) or [`getStaticPaths`](/docs/basic-features/data-fetching#getstaticpaths-static-generation). Instead, write your server-side code directly in [`getStaticProps`](/docs/basic-features/data-fetching#getstaticprops-static-generation) or [`getStaticPaths`](/docs/basic-features/data-fetching#getstaticpaths-static-generation) (or call a helper function).

Here’s why: [`getStaticProps`](/docs/basic-features/data-fetching#getstaticprops-static-generation) and [`getStaticPaths`](/docs/basic-features/data-fetching#getstaticpaths-static-generation) run only on the server-side and will never run on the client-side. Moreover, these functions will not be included in the JS bundle for the browser. That means you can write code such as direct database queries without sending them to browsers. Read the [Writing Server-Side code](/docs/basic-features/data-fetching/get-static-props#write-server-side-code-directly) documentation to learn more.

### A Good Use Case: Handling Form Input

A good use case for API Routes is handling form input. For example, you can create a form on your page and have it send a `POST` request to your API Route. You can then write code to directly save it to your database. The API Route code will not be part of your client bundle, so you can safely write server-side code.

```js
export default function handler(req, res) {
  const email = req.body.email;
  // Then save email to your database, etc...
}
```

### Preview Mode

[Static Generation](/docs/basic-features/pages#static-generation-recommended) is useful when your pages fetch data from a headless CMS. However, it’s not ideal when you’re writing a draft on your headless CMS and want to **preview** the draft immediately on your page. You’d want Next.js to render these pages at **request time** instead of build time and fetch the draft content instead of the published content. You’d want Next.js to bypass Static Generation only for this specific case.

Next.js has a feature called **Preview Mode** to solve the problem above, and it utilizes [API Routes](/docs/api-routes/introduction). To learn more about it take a look at our [Preview Mode](/docs/advanced-features/preview-mode) documentation.

### Dynamic API Routes

API Routes can be dynamic, just like regular pages. Take a look at our [Dynamic API Routes](/docs/api-routes/dynamic-api-routes) documentation to learn more.

### That’s It!

In the next and final basic lesson, we’ll talk about how to deploy your Next.js app to production.

<Quiz
  question="Which of the following is a good use case for an API Route?"
  answers={[
    'Saving incoming data to your database',
    'Securely communicating with a third-party API',
    'Previewing draft content from your CMS',
    'All of the above',
  ]}
  correctAnswer="All of the above"
/>


<!-- Source: 41-deploying-nextjs-app.mdx -->
## Deploying Your Next.js App

---
title: Deploying Your Next.js App
---

In this final basics lesson, we’ll deploy our Next.js app to production.

We’ll learn how to deploy Next.js to [Vercel](https://vercel.com), the platform built by the creators of Next.js. We’ll also talk about other deployment options.

> **Pre-requisite**: You need to have a [GitHub account](https://github.com/) for this lesson.

### What You’ll Learn in This Lesson

In this lesson, you’ll learn:

- How to deploy your Next.js app to [Vercel](https://vercel.com).
- The **DPS** Workflow: **D**evelop, **P**review, and **S**hip.
- How to deploy your Next.js app to your own hosting provider.


<!-- Source: 42-deploying-nextjs-app-setup.mdx -->
## Set up

---
title: Set up
---

**If you’re continuing from the previous lesson,** you can skip this page.

### Download Starter Code (Optional)

If you’re NOT continuing from the previous lesson, you can download, install, and run the starter code for this lesson below. This sets up a `nextjs-blog` directory such that it’s identical to the result of the previous lesson.

Again, this is NOT necessary if you’ve just finished the previous lesson.

```shell
npx create-next-app@latest nextjs-blog --use-npm --example "https://github.com/vercel/next-learn/tree/main/basics/basics-final"
```

Then follow the instructions from the command output (`cd` into the directory and start the development server).

You should also update the following files:

- `public/images/profile.jpg` with your photo (Recommended: 400px width/height).
- `const name = '[Your Name]'` in `components/layout.js` with your name.
- `<p>[Your Self Introduction]</p>` in `pages/index.js` with your self introduction.


<!-- Source: 43-deploying-nextjs-app-github.mdx -->
## Push to GitHub

---
title: Push to GitHub
---

Before we deploy, let’s push our Next.js app to [GitHub](https://github.com/vercel/next.js) if you haven’t done so already. This will make deployment easier.

- On your personal GitHub account, create a new repository called `nextjs-blog`.
- The repository can be public or private. You do **not** need to initialize it with a README or other files.
- If you need help setting up your repo, take a look at [this guide on GitHub](https://help.github.com/en/github/getting-started-with-github/create-a-repo).

Then:

- If you haven’t initialized the git repository locally for your Next.js app, do so now.
- Push the Next.js app to your GitHub repository.

To push to GitHub, you can run the following commands (replace `<username>` with your GitHub username):

```bash
git remote add origin https://github.com/<username>/nextjs-blog.git
git push -u origin main
```

Once your GitHub repository is ready, continue to the next page.


<!-- Source: 44-deploying-nextjs-app-deploy.mdx -->
## Deploy to Vercel

---
title: Deploy to Vercel
---

The easiest way to deploy Next.js to production is to use the **[Vercel](https://vercel.com)** platform developed by the creators of Next.js.

Vercel is a serverless platform for static and hybrid applications built to integrate with your headless content, commerce, or database. We make it easy for frontend teams to develop, preview, and ship delightful user experiences, where performance is the default. You can start using it for free — no credit card required.

### Create a Vercel Account

First, go to [Vercel](https://vercel.com/signup) to create a Vercel account. Choose **Continue with GitHub** and go through the sign up process.

### Import your `nextjs-blog` repository

Once you’re signed up, **import** your `nextjs-blog` repository on Vercel. You can do so from here: [Vercel](https://vercel.com/import).

- You’ll need to **Install Vercel for GitHub**. You can give it access to **All Repositories**.
- Once you’ve installed Vercel, import `nextjs-blog`.

You can use _default values_ for the following settings — no need to change anything. Vercel automatically detects that you have a Next.js app and chooses optimal build settings for you.

- Project Name
- Root Directory
- Build Command
- Output Directory
- Development Command

When you deploy, your Next.js app will start building. It should finish in under a minute.

> **Help is available**: If your deployment fails, you can always get help on [GitHub Discussions](https://github.com/vercel/next.js/discussions). To learn more about deployment, take a look at [our documentation](/docs/deployment).

When it’s done, you’ll get **deployment URLs**. Click on one of the URLs and you should see the Next.js starter page live.

Congratulations! You just deployed your Next.js app to production. On the next page, we’ll go into the details of Vercel and the recommended workflow.


<!-- Source: 45-deploying-nextjs-app-platform-details.mdx -->
## Next.js and Vercel

---
title: Next.js and Vercel
---

[Vercel](https://vercel.com) is made by the creators of Next.js and has first-class
support for Next.js. When you deploy your Next.js app to Vercel, the
following happens by default:

- Pages that use [Static Generation](/docs/basic-features/pages#static-generation-recommended) and assets (JS, CSS, images, fonts, etc) will automatically be served from the [Vercel CDN](https://vercel.com), which is blazingly fast.
- Pages that use [Server-Side Rendering](/docs/basic-features/pages#server-side-rendering) and [API routes](/docs/api-routes/introduction) will automatically become isolated [Serverless Functions](https://vercel.com/docs/serverless-functions/introduction). This allows page rendering and API requests to scale infinitely.

Vercel has many more features, such as:

- **Custom Domains:** Once deployed on Vercel, you can assign a custom domain to your Next.js app. Take a look at [our documentation](https://vercel.com/docs/concepts/projects/custom-domains) here.

- **Environment Variables:** You can also set environment variables on Vercel. Take a look at [our documentation](https://vercel.com/docs/build-step#environment-variables) here. You can then [use those environment variables](/docs/basic-features/environment-variables#loading-environment-variables) in your Next.js app.
- **Automatic HTTPS:** HTTPS is enabled by default (including custom domains) and doesn't require extra configuration. We auto-renew SSL certificates.

You can learn more about the platform in the [Vercel documentation](https://vercel.com/docs).

### Preview Deployment for Every Push

> The steps below are **optional** — you can try it or just read it through.

After deploying to Vercel, try doing the following if you can:

- Create a new **branch** on your app.
- Make some changes and push to GitHub.
- Create a new **pull request** ([GitHub help page](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)).

You should see a comment by the `vercel` bot on the pull request page.

<Image
  alt="Preview Deployment URL"
  src="/learn/pages-router/deploying-nextjs-app/vercel-bot.png"
  width={778 / 2}
  height={128 / 2}
/>

Try clicking on the **Preview** URL inside this comment. You should see the changes you just made.

When you have a pull request open, Vercel automatically creates a **preview deployment** for that branch on every push. The preview URL will always point to the latest preview deployment.

You can share this preview URL with your collaborators and get immediate feedback.

If your preview deployment looks good, **merge it to `main`**. When you do this, Vercel automatically creates a production deployment.

### Develop, Preview, Ship

We’ve just gone through the workflow we call **DPS**: **D**evelop, **P**review, and **S**hip.

- **Develop**: We’ve written code in Next.js and used the Next.js development server running to take advantage of its hot reloading feature.
- **Preview**: We’ve pushed changes to a branch on GitHub, and Vercel created a preview deployment that’s available via a URL. We can share this preview URL with others for feedback. In addition to doing _code reviews_, you can do _deployment previews_.
- **Ship**: We’ve merged the pull request to `main` to ship to production.

We strongly recommend using this workflow when developing Next.js apps — it will help you iterate on your app faster.


<!-- Source: 46-deploying-nextjs-app-other-hosting-options.mdx -->
## Other Hosting Options

---
title: Other Hosting Options
---

Next.js can be deployed to any hosting provider that supports Node.js.

If you’ve followed the instructions so far, your `package.json` should have the following `build` and `start` scripts:

```json
{
  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start"
  }
}
```

In your own hosting provider, run the `build` script once, which builds the production application in the `.next` folder.

```shell
npm run build
```

After building, the `start` script starts a Node.js server that supports hybrid pages, serving both statically generated and server-side rendered pages, and API Routes.

```shell
npm run start
```

> **Tip**: You can customize the `start` script in `package.json` to accept a `PORT` parameter by updating it as: `"start": "next start -p $PORT"`.

That’s it! If you have questions about deploying Next.js, you can ask our community on [GitHub Discussions](https://github.com/vercel/next.js/discussions).


<!-- Source: 47-next-steps.mdx -->
## Next Steps

---
title: Next Steps
---

Congratulations on finishing all the basics lessons! Here are some recommended steps:

### Share Your Next.js App

We encourage you to share the app you built in this tutorial on Twitter. If you do, please mention our team at [https://twitter.com/vercel](@vercel) so that we can take a look! We’d love to get your feedback on this tutorial as well.

### Use TypeScript with Next.js

If you prefer using [TypeScript](https://www.typescriptlang.org/), you can learn [how to use TypeScript with Next.js from here](/learn/excel/typescript).

### What to Learn Next

Take a look at [our documentation](/docs) to learn more. In particular, the following pages might be interesting:

- [**Data Fetching:**](/docs/basic-features/data-fetching) Learn in depth about data fetching.
- [**Environment Variables:**](/docs/basic-features/environment-variables) Learn more about the built-in support for Environment Variables.
- [**Search Engine Optimization:**](/learn/seo/introduction-to-seo) Learn how to optimize the SEO of your Next.js application.

### Join the Conversation

If you have questions about anything related to Next.js, you're always welcome to ask our community on [GitHub Discussions](https://github.com/vercel/next.js/discussions).


<!-- Source: index.mdx -->
## Pages Router

---
title: Pages Router
---

> **New App Router Course**: You're currently viewing the Pages Router course. [View the new App Router course here](/learn/dashboard-app).

To build a complete web application with React from scratch, there are many important details you need to consider:

- Code has to be bundled using a bundler like webpack and transformed using a compiler like Babel.
- You need to do production optimizations such as code splitting.
- You might want to statically pre-render some pages for performance and SEO. You might also want to use server-side rendering or client-side rendering.
- You might have to write some server-side code to connect your React app to your data store.

A _framework_ can solve these problems. But such a framework must have the right level of abstraction — otherwise it won’t be very useful. It also needs to have great "Developer Experience", ensuring you and your team have an amazing experience while writing code.

### Next.js: The React Framework

Enter **Next.js**, the React Framework. Next.js provides a solution to all of the above problems. But more importantly, it puts you and your team in the [pit of success](https://blog.codinghorror.com/falling-into-the-pit-of-success/) when building React applications.

Next.js aims to have best-in-class developer experience and many built-in features, such as:

- An intuitive [page-based](/docs/basic-features/pages) routing system (with support for [dynamic routes](/docs/routing/dynamic-routes))
- [Pre-rendering](/docs/basic-features/pages#pre-rendering), both [static generation](/docs/basic-features/pages#static-generation-recommended) (SSG) and [server-side rendering](/docs/basic-features/pages#server-side-rendering) (SSR) are supported on a per-page basis
- Automatic code splitting for faster page loads
- [Client-side routing](/docs/routing/introduction#linking-between-pages) with optimized prefetching
- [Built-in CSS](/docs/basic-features/built-in-css-support) and [Sass support](/docs/basic-features/built-in-css-support#sass-support), and support for any [CSS-in-JS](/docs/basic-features/built-in-css-support#css-in-js) library
- Development environment with [Fast Refresh](/docs/basic-features/fast-refresh) support
- [API routes](/docs/api-routes/introduction) to build API endpoints with Serverless Functions
- Fully extendable

Next.js is used in tens of thousands of production-facing websites and web applications, including many of the world's largest brands.

### About This Tutorial

This free interactive course will guide you through how to get started with Next.js.

In this tutorial, you’ll learn Next.js basics by creating a very simple **blog app**. Here’s an example of the final result:

**[https://next-learn-starter.vercel.app](https://next-learn-starter.vercel.app/)** ([source](https://github.com/vercel/next-learn/tree/main/basics/demo))

> This tutorial assumes basic knowledge of JavaScript and React. If you’ve never written React code, you should go through [the official React tutorial](https://react.dev/learn/tutorial-tic-tac-toe) first.
>
> If you’re looking for documentation instead, [visit the Next.js documentation](/docs/getting-started).

### Join the Conversation

If you have questions about anything related to Next.js or this course, you're welcome to ask our community on [Discord](https://discord.gg/Q3AsD4efFC).

Let’s get started!
