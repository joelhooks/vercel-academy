# DASHBOARD APP



<!-- Source: 01-getting-started.mdx -->
## Getting Started

---
title: Getting Started
description: Create a new Next.js application using the dashboard starter example and explore the project.
summary:
  current: Congratulations! You've created a Next.js application using the starter example and ran the development server.
  next: Let's work on your home page and discuss the different ways you can style your application.
---

## Creating a new project

We recommend using [`pnpm`](https://pnpm.io/) as your package manager, as it's faster and more efficient than `npm` or `yarn`. If you don't have `pnpm` installed, you can install it globally by running:

```bash filename="Terminal"
npm install -g pnpm
```

To create a Next.js app, open your terminal, [`cd`](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Command_line#basic_built-in_terminal_commands) into the folder you'd like to keep your project, and run the following command:

```bash filename="Terminal"
npx create-next-app@latest nextjs-dashboard --example "https://github.com/vercel/next-learn/tree/main/dashboard/starter-example" --use-pnpm
```

This command uses [`create-next-app`](/docs/app/api-reference/create-next-app), a Command Line Interface (CLI) tool that sets up a Next.js application for you. In the command above, you're also using the `--example` flag with the [starter example](https://github.com/vercel/next-learn/tree/main/dashboard/starter-example) for this course.

## Exploring the project

Unlike tutorials that have you write code from scratch, much of the code for this course is already written for you. This better reflects real-world development, where you'll likely be working with existing codebases.

Our goal is to help you focus on learning the main features of Next.js, without having to write _all_ the application code.

After installation, open the project in your code editor and navigate to `nextjs-dashboard`.

```bash filename="Terminal"
cd nextjs-dashboard
```

Let's spend some time exploring the project.

### Folder structure

You'll notice that the project has the following folder structure:

<Image
  alt="Folder structure of the dashboard project, showing the main folders and files: app, public, and config files."
  srcLight="/learn/light/learn-folder-structure.png"
  srcDark="/learn/dark/learn-folder-structure.png"
  width="1600"
  height="606"
/>

- **`/app`**: Contains all the routes, components, and logic for your application, this is where you'll be mostly working from.
- **`/app/lib`**: Contains functions used in your application, such as reusable utility functions and data fetching functions.
- **`/app/ui`**: Contains all the UI components for your application, such as cards, tables, and forms. To save time, we've pre-styled these components for you.
- **`/public`**: Contains all the static assets for your application, such as images.
- **Config Files**: You'll also notice config files such as `next.config.ts` at the root of your application. Most of these files are created and pre-configured when you start a new project using `create-next-app`. You will not need to modify them in this course.

Feel free to explore these folders, and don't worry if you don't understand everything the code is doing yet.

### Placeholder data

When you're building user interfaces, it helps to have some placeholder data. If a database or API is not yet available, you can:

- Use placeholder data in JSON format or as JavaScript objects.
- Use a 3rd party service like [mockAPI](https://mockapi.io/).

For this project, we've provided some placeholder data in `app/lib/placeholder-data.ts`. Each JavaScript object in the file represents a table in your database. For example, for the invoices table:

```js filename="/app/lib/placeholder-data.ts"
const invoices = [
  {
    customer_id: customers[0].id,
    amount: 15795,
    status: 'pending',
    date: '2022-12-06',
  },
  {
    customer_id: customers[1].id,
    amount: 20348,
    status: 'pending',
    date: '2022-11-14',
  },
  // ...
];
```

In the chapter on [setting up your database](/learn/dashboard-app/setting-up-your-database), you'll use this data to _seed_ your database (populate it with some initial data).

### TypeScript

You may also notice most files have a `.ts` or `.tsx` suffix. This is because the project is written in TypeScript. We wanted to create a course that reflects the modern web landscape.

It's okay if you don't know TypeScript - we'll provide the TypeScript code snippets when required.

For now, take a look at the `/app/lib/definitions.ts` file. Here, we manually define the types that will be returned from the database. For example, the invoices table has the following types:

```tsx filename="/app/lib/definitions.ts"
export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};
```

By using TypeScript, you can ensure you don't accidentally pass the wrong data format to your components or database, like passing a `string` instead of a `number` to invoice `amount`.

> **If you're a TypeScript developer:**
>
> - We're manually declaring the data types, but for better type-safety, we recommend [Prisma](https://www.prisma.io/) or [Drizzle](https://orm.drizzle.team/), which automatically generates types based on your database schema.
> - Next.js detects if your project uses TypeScript and automatically installs the necessary packages and configuration. Next.js also comes with a [TypeScript plugin](https://nextjs.org/docs/app/building-your-application/configuring/typescript#typescript-plugin) for your code editor, to help with auto-completion and type-safety.

## Running the development server

Run `pnpm i` to install the project's packages.

```bash filename="Terminal"
pnpm i
```

Followed by `pnpm dev` to start the development server.

```bash filename="Terminal"
pnpm dev
```

`pnpm dev` starts your Next.js development server on port `3000`. Let's check to see if it's working.

Open [http://localhost:3000](http://localhost:3000/) on your browser. Your home page should look like this, which is intentionally unstyled:

<Image
  alt="Unstyled page with the title 'Acme', a description, and login link."
  srcLight="/learn/light/acme-unstyled.png"
  srcDark="/learn/dark/acme-unstyled.png"
  width="1600"
  height="400"
/>


<!-- Source: 02-css-styling.mdx -->
## CSS Styling

---
title: CSS Styling
description: Style your Next.js application with Tailwind and CSS modules.
summary:
  current: Well done! You've learned about the different ways of styling a Next.js application.
  next: Continue working on your home page by adding a hero image and a custom font.
---

Currently, your home page doesn't have any styles. Let's look at the different ways you can style your Next.js application.

<InThisChapter
  topics={[
    {
      icon: 'file',
      description: 'How to add a global CSS file to your application.',
    },
    {
      icon: 'pencil',
      description: 'Two different ways of styling: Tailwind and CSS modules.',
    },
    {
      icon: 'code-bracket',
      description: 'How to conditionally add class names with the <code>clsx</code> utility package.'
    },

]}
/>

## Global styles

If you look inside the `/app/ui` folder, you'll see a file called `global.css`. You can use this file to add CSS rules to **all** the routes in your application - such as CSS reset rules, site-wide styles for HTML elements like links, and more.

You can import `global.css` in any component in your application, but it's usually good practice to add it to your top-level component. In Next.js, this is the [root layout](/docs/app/api-reference/file-conventions/layout#root-layouts) (more on this later).

Add global styles to your application by navigating to `/app/layout.tsx` and importing the `global.css` file:

```tsx filename="/app/layout.tsx" highlight={1}
import '@/app/ui/global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

With the development server still running, save your changes and preview them in the browser. Your home page should now look like this:

<Image
  alt="Styled page with the logo 'Acme', a description, and login link."
  srcLight="/learn/light/home-page-with-tailwind.png"
  srcDark="/learn/dark/home-page-with-tailwind.png"
  width="960"
  height="566"
/>

But wait a second, you didn't add any CSS rules, where did the styles come from?

If you take a look inside `global.css`, you'll notice some `@tailwind` directives:

```css filename="/app/ui/global.css"
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Tailwind

[Tailwind](https://tailwindcss.com/) is a CSS framework that speeds up the development process by allowing you to quickly write [utility classes](https://tailwindcss.com/docs/utility-first) directly in your React code.

In Tailwind, you style elements by adding class names. For example, adding `"text-blue-500"` will turn the `<h1>` text blue:

```tsx
<h1 className="text-blue-500">I'm blue!</h1>
```

Although the CSS styles are shared globally, each class is singularly applied to each element. This means if you add or delete an element, you don't have to worry about maintaining separate stylesheets, style collisions, or the size of your CSS bundle growing as your application scales.

When you use `create-next-app` to start a new project, Next.js will ask if you want to use Tailwind. If you select `yes`, Next.js will automatically install the necessary packages and configure Tailwind in your application.

If you look at `/app/page.tsx`, you'll see that we're using Tailwind classes in the example.

```tsx filename="/app/page.tsx"
import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Page() {
  return (
    // These are Tailwind classes:
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
    // ...
  )
}
```

Don't worry if this is your first time using Tailwind. To save time, we've already styled all the components you'll be using.

Let's play with Tailwind! Copy the code below and paste it above the `<p>` element in `/app/page.tsx`:

```html filename="/app/page.tsx"
<div
  className="relative w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-black"
/>
```

<Quiz
  answers={[
    'A yellow star',
    'A blue triangle',
    'A black triangle',
    'A red circle',
  ]}
  question="What shape do you see when using the code snippet above?"
  hint="Make sure you've added the triangle to the right place in the code!"
  correctAnswer="A black triangle"
  explanation="The border class names are used to create a triangle shape."
/>

If you prefer writing traditional CSS rules or keeping your styles separate from your JSX - CSS Modules are a great alternative.

## CSS Modules

[CSS Modules](/docs/basic-features/built-in-css-support) allow you to scope CSS to a component by automatically creating unique class names, so you don't have to worry about style collisions as well.

We'll continue using Tailwind in this course, but let's take a moment to see how you can achieve the same results from the quiz above using CSS modules.

Inside `/app/ui`, create a new file called `home.module.css` and add the following CSS rules:

```css filename="/app/ui/home.module.css"
.shape {
  height: 0;
  width: 0;
  border-bottom: 30px solid black;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
}
```

Then, inside your `/app/page.tsx` file import the styles and replace the Tailwind class names from the `<div>` you've added with `styles.shape`:

```tsx filename="/app/page.tsx" highlight={4,9}
import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className={styles.shape} />
    // ...
  )
}
```

Save your changes and preview them in the browser. You should see the same shape as before.

Tailwind and CSS modules are the two most common ways of styling Next.js applications. Whether you use one or the other is a matter of preference - you can even use both in the same application!

<Quiz
  answers={[
    'Increase the global scope of CSS classes, making them easier to manage across different files.',
    'Provide a way to make CSS classes locally scoped to components by default, reducing the risk of styling conflicts.',
    'Automatically compress and minify CSS files for faster page loading.',
  ]}
  question={`What is one benefit of using CSS modules?`}
  hint="CSS Modules are a great option for reducing styling conflicts!"
  correctAnswer="Provide a way to make CSS classes locally scoped to components by default, reducing the risk of styling conflicts."
  explanation="CSS Modules create unique class names for each component, so you don't have to worry about style collisions."
/>

## Using the `clsx` library to toggle class names

There may be cases where you may need to conditionally style an element based on state or some other condition.

[`clsx`](https://www.npmjs.com/package/clsx) is a library that lets you toggle class names easily. We recommend taking a look at [documentation](https://github.com/lukeed/clsx) for more details, but here's the basic usage:

- Suppose that you want to create an `InvoiceStatus` component which accepts `status`. The status can be `'pending'` or `'paid'`.
- If it's `'paid'`, you want the color to be green. If it's `'pending'`, you want the color to be gray.

You can use `clsx` to conditionally apply the classes, like this:

```tsx filename="/app/ui/invoices/status.tsx" highlight={9,10}
import clsx from 'clsx';

export default function InvoiceStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-sm',
        {
          'bg-gray-100 text-gray-500': status === 'pending',
          'bg-green-500 text-white': status === 'paid',
        },
      )}
    >
    // ...
)}
```

<Quiz
  answers={[
    '`status.tsx` and `pagination.tsx`',
    '`table.tsx` and `status.tsx`',
    '`nav-links.tsx` and `table.tsx`',
  ]}
  question={`Search for "clsx" in your code editor, what components use it to conditionally apply class names?`}
  hint="Not in table.tsx!"
  correctAnswer="`status.tsx` and `pagination.tsx`"
  explanation="The `status.tsx` and `pagination.tsx` components use `clsx` to conditionally apply class names."
/>

## Other styling solutions

In addition to the approaches we've discussed, you can also style your Next.js application with:

- Sass which allows you to import `.css` and `.scss` files.
- CSS-in-JS libraries such as [styled-jsx](https://github.com/vercel/styled-jsx), [styled-components](https://github.com/vercel/next.js/tree/canary/examples/with-styled-components), and [emotion](https://github.com/vercel/next.js/tree/canary/examples/with-emotion).

Take a look at the [CSS documentation](/docs/app/building-your-application/styling) for more information.


<!-- Source: 03-optimizing-fonts-images.mdx -->
## Optimizing Fonts and Images

---
title: Optimizing Fonts and Images
description: Optimize fonts and images with the Next.js built-in components.
summary:
  current: You've learned how to optimize fonts and images using Next.js.
  next: Let's create your dashboard routes using nested layouts and pages!
---

In the previous chapter, you learned how to style your Next.js application. Let's continue working on your home page by adding a custom font and a hero image.

<InThisChapter
  topics={[
    {
      icon: 'text-title',
      description: 'How to add custom fonts with <code>next/font</code>.',
    },
    {
      icon: 'image',
      description: 'How to add images with <code>next/image</code>.',
    },
    {
      icon: 'check-circle',
      description: 'How fonts and images are optimized in Next.js.',
    },
  ]}
/>

## Why optimize fonts?

Fonts play a significant role in the design of a website, but using custom fonts in your project can affect performance if the font files need to be fetched and loaded.

[Cumulative Layout Shift](https://vercel.com/blog/how-core-web-vitals-affect-seo) is a metric used by Google to evaluate the performance and user experience of a website. With fonts, layout shift happens when the browser initially renders text in a fallback or system font and then swaps it out for a custom font once it has loaded. This swap can cause the text size, spacing, or layout to change, shifting elements around it.

<Image
  alt="Mock UI showing initial load of a page, followed by a layout shift as the custom font loads."
  srcLight="/learn/light/font-layout-shift.png"
  srcDark="/learn/dark/font-layout-shift.png"
  width="1600"
  height="495"
/>

Next.js automatically optimizes fonts in the application when you use the `next/font` module. It downloads font files at build time and hosts them with your other static assets. This means when a user visits your application, there are no additional network requests for fonts which would impact performance.

<Quiz
  answers={[
    'It causes additional network requests which improve performance.',
    'It disables all custom fonts.',
    'It preloads all fonts at runtime.',
    'It hosts font files with other static assets so that there are no additional network requests.',
  ]}
  question="How does Next.js optimize fonts?"
  hint="Additional requests can impact performance."
  correctAnswer="It hosts font files with other static assets so that there are no additional network requests."
  explanation="Next.js downloads font files at build time and hosts them with your other static assets. This means when a user visits your application, there are no additional network requests for fonts which would impact performance."
/>

## Adding a primary font

Let's add a custom Google font to your application to see how this works.

In your `/app/ui` folder, create a new file called `fonts.ts`. You'll use this file to keep the fonts that will be used throughout your application.

Import the `Inter` font from the `next/font/google` module - this will be your primary font. Then, specify what [subset](https://fonts.google.com/knowledge/glossary/subsetting) you'd like to load. In this case, `'latin'`:

```tsx filename="/app/ui/fonts.ts" highlight={1,3}
import { Inter } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });
```

Finally, add the font to the `<body>` element in `/app/layout.tsx`:

```tsx filename="/app/layout.tsx" highlight={2,11}
import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
```

By adding `Inter` to the `<body>` element, the font will be applied throughout your application. Here, you're also adding the Tailwind [`antialiased`](https://tailwindcss.com/docs/font-smoothing) class which smooths out the font. It's not necessary to use this class, but it adds a nice touch.

Navigate to your browser, open dev tools and select the `body` element. You should see `Inter` and `Inter_Fallback` are now applied under styles.

## Practice: Adding a secondary font

You can also add fonts to specific elements of your application.

Now it's your turn! In your `fonts.ts` file, import a secondary font called `Lusitana` and pass it to the `<p>` element in your `/app/page.tsx` file. In addition to specifying a subset like you did before, you should also specify different font **weights**. For example, `400` (normal) and `700` (bold).

Once you're ready, expand the code snippet below to see the solution.

> **Hints:**
>
> - If you're unsure what weight options to pass to a font, check the TypeScript errors in your code editor.
> - Visit the [Google Fonts](https://fonts.google.com/) website and search for `Lusitana` to see what options are available.
> - See the documentation for [adding multiple fonts](/docs/app/building-your-application/optimizing/fonts#using-multiple-fonts) and the [full list of options](/docs/app/api-reference/components/font#font-function-arguments).

<Reveal>

```tsx filename="/app/ui/fonts.ts" highlight={1,5-8}
import { Inter, Lusitana } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });

export const lusitana = Lusitana({
  weight: ['400', '700'],
  subsets: ['latin'],
});
```

```tsx filename="/app/page.tsx" highlight={4,8-11}
import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';

export default function Page() {
  return (
    // ...
    <p
      className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}
    >
      <strong>Welcome to Acme.</strong> This is the example for the{' '}
      <a href="https://nextjs.org/learn/" className="text-blue-500">
        Next.js Learn Course
      </a>
      , brought to you by Vercel.
    </p>
    // ...
  );
}
```

</Reveal>

Finally, the `<AcmeLogo />` component also uses Lusitana. It was commented out to prevent errors, you can now uncomment it:

```tsx filename="/app/page.tsx" highlight={7}
// ...

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        <AcmeLogo />
        {/* ... */}
      </div>
    </main>
  );
}
```

Great, you've added two custom fonts to your application! Next, let's add a hero image to the home page.

## Why optimize images?

Next.js can serve **static assets**, like images, under the top-level [`/public`](/docs/app/building-your-application/optimizing/static-assets) folder. Files inside `/public` can be referenced in your application.

With regular HTML, you would add an image as follows:

```tsx
<img
  src="/hero.png"
  alt="Screenshots of the dashboard project showing desktop version"
/>
```

However, this means you have to manually:

- Ensure your image is responsive on different screen sizes.
- Specify image sizes for different devices.
- Prevent layout shift as the images load.
- Lazy load images that are outside the user's viewport.

Image Optimization is a large topic in web development that could be considered a specialization in itself. Instead of manually implementing these optimizations, you can use the `next/image` component to automatically optimize your images.

## The `<Image>` component

The `<Image>` Component is an extension of the HTML `<img>` tag, and comes with automatic image optimization, such as:

- Preventing layout shift automatically when images are loading.
- Resizing images to avoid shipping large images to devices with a smaller viewport.
- Lazy loading images by default (images load as they enter the viewport).
- Serving images in modern formats, like [WebP](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types#webp) and [AVIF](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types#avif_image), when the browser supports it.

## Adding the desktop hero image

Let's use the `<Image>` component. If you look inside the `/public` folder, you'll see there are two images: `hero-desktop.png` and `hero-mobile.png`. These two images are completely different, and they'll be shown depending if the user's device is a desktop or mobile.

In your `/app/page.tsx` file, import the component from [`next/image`](https://nextjs.org/docs/api-reference/next/image). Then, add the image under the comment:

```tsx filename="/app/page.tsx" highlight={5,12-18}
import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function Page() {
  return (
    // ...
    <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
      {/* Add Hero Images Here */}
      <Image
        src="/hero-desktop.png"
        width={1000}
        height={760}
        className="hidden md:block"
        alt="Screenshots of the dashboard project showing desktop version"
      />
    </div>
    //...
  );
}
```

Here, you're setting the `width` to `1000` and `height` to `760` pixels. It's good practice to set the `width` and `height` of your images to avoid layout shift, these should be an aspect ratio **identical** to the source image. These values are _not_ the size the image is rendered, but instead the size of the actual image file used to understand the aspect ratio.

You'll also notice the class `hidden` to remove the image from the DOM on mobile screens, and `md:block` to show the image on desktop screens.

This is what your home page should look like now:

<Image
  alt="Styled home page with a custom font and hero image"
  srcLight="/learn/light/home-page-with-hero.png"
  srcDark="/learn/dark/home-page-with-hero.png"
  width="960"
  height="566"
/>

## Practice: Adding the mobile hero image

Now it's your turn! Under the image you've just added, add another `<Image>` component for `hero-mobile.png`.

- The image should have a `width` of `560` and `height` of `620` pixels.
- It should be shown on mobile screens, and hidden on desktop - you can use dev tools to check if the desktop and mobile images are swapped correctly.

Once you're ready, expand the code snippet below to see the solution.

<Reveal>

```tsx filename="/app/page.tsx" highlight={19-25}
import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function Page() {
  return (
    // ...
    <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
      {/* Add Hero Images Here */}
      <Image
        src="/hero-desktop.png"
        width={1000}
        height={760}
        className="hidden md:block"
        alt="Screenshots of the dashboard project showing desktop version"
      />
      <Image
        src="/hero-mobile.png"
        width={560}
        height={620}
        className="block md:hidden"
        alt="Screenshot of the dashboard project showing mobile version"
      />
    </div>
    //...
  );
}
```

</Reveal>

Great! Your home page now has a custom font and hero images.

<Quiz
  answers={['True', 'False']}
  question={`True or False: Images without dimensions and web fonts are common causes of layout shift.`}
  hint="It's true!"
  correctAnswer="True"
  explanation="Images without dimensions and web fonts are common causes of layout shift due to the browser having to download additional resources."
/>

## Recommended reading

There's a lot more to learn about these topics, including optimizing remote images and using local font files. If you'd like to dive deeper into fonts and images, see:

- [Image Optimization Docs](/docs/app/building-your-application/optimizing/images)
- [Font Optimization Docs](/docs/app/building-your-application/optimizing/fonts)
- [Improving Web Performance with Images (MDN)](https://developer.mozilla.org/en-US/docs/Learn/Performance/Multimedia)
- [Web Fonts (MDN)](https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Web_fonts)
- [How Core Web Vitals Affect SEO](https://vercel.com/blog/how-core-web-vitals-affect-seo)
- [How Google handles JavaScript throughout the indexing process](https://vercel.com/blog/how-google-handles-javascript-throughout-the-indexing-process)


<!-- Source: 04-creating-layouts-and-pages.mdx -->
## Creating Layouts and Pages

---
title: Creating Layouts and Pages
description: Create the dashboard routes and a shared layout that can be shared between multiple pages.
summary:
  current: Nice, the dashboard app is slowly starting to come together.
  next: Learn how to navigate between dashboard pages using the `<Link>` component.
---

So far, your application only has a home page. Let's learn how you can create more routes with **layouts** and **pages**.

<InThisChapter
  topics={[
    {
      icon: 'route',
      description:
        'Create the <code>dashboard</code> routes using file-system routing.',
    },
    {
      icon: 'folder-closed',
      description:
        'Understand the role of folders and files when creating new route segments.',
    },
    {
      icon: 'layout',
      description:
        'Create a nested layout that can be shared between multiple dashboard pages.',
    },
    {
      icon: 'sort-descending',
      description:
        'Understand what colocation, partial rendering, and the root layout are.',
    },
  ]}
/>

## Nested routing

Next.js uses file-system routing where **folders** are used to create nested routes. Each folder represents a **route segment** that maps to a **URL segment**.

<Image
  alt="Diagram showing how folders map to URL segments"
  srcLight="/learn/light/folders-to-url-segments.png"
  srcDark="/learn/dark/folders-to-url-segments.png"
  width="1600"
  height="594"
/>

You can create separate UIs for each route using `layout.tsx` and `page.tsx` files.

`page.tsx` is a special Next.js file that exports a React component, and it's required for the route to be accessible. In your application, you already have a page file: `/app/page.tsx` - this is the home page associated with the route `/`.

To create a nested route, you can nest folders inside each other and add `page.tsx` files inside them. For example:

<Image
  alt="Diagram showing how adding a folder called dashboard creates a new route '/dashboard'"
  srcLight="/learn/light/dashboard-route.png"
  srcDark="/learn/dark/dashboard-route.png"
  width="1600"
  height="444"
/>

`/app/dashboard/page.tsx` is associated with the `/dashboard` path. Let's create the page to see how it works!

## Creating the dashboard page

Create a new folder called `dashboard` inside `/app`. Then, create a new `page.tsx` file inside the `dashboard` folder with the following content:

```tsx filename="/app/dashboard/page.tsx"
export default function Page() {
  return <p>Dashboard Page</p>;
}
```

Now, make sure that the development server is running and visit http://localhost:3000/dashboard. You should see the "Dashboard Page" text.

This is how you can create different pages in Next.js: create a new route segment using a folder, and add a `page` file inside it.

By having a special name for `page` files, Next.js allows you to [colocate](/docs/app/building-your-application/routing#colocation) UI components, test files, and other related code with your routes. Only the content inside the `page` file will be publicly accessible. For example, the `/ui` and `/lib` folders are _colocated_ inside the `/app` folder along with your routes.

## Practice: Creating the dashboard pages

Let's practice creating more routes. In your dashboard, create two more pages:

1. **Customers Page**: The page should be accessible on http://localhost:3000/dashboard/customers. For now, it should return a `<p>Customers Page</p>` element.
2. **Invoices Page**: The invoices page should be accessible on http://localhost:3000/dashboard/invoices. For now, also return a `<p>Invoices Page</p>` element.

Spend some time tackling this exercise, and when you're ready, expand the toggle below for the solution:

<Reveal>
You should have the following folder structure:

<Image
  alt="Diagram showing how adding a folder called login creates a new route '/login'"
  srcLight="/learn/light/routing-solution.png"
  srcDark="/learn/dark/routing-solution.png"
  width="1600"
  height="849"
/>

Customers Page:

```tsx filename="/app/dashboard/customers/page.tsx"
export default function Page() {
  return <p>Customers Page</p>;
}
```

Invoices Page:

```tsx filename="/app/dashboard/invoices/page.tsx"
export default function Page() {
  return <p>Invoices Page</p>;
}
```

</Reveal>

## Creating the dashboard layout

Dashboards have some sort of navigation that is shared across multiple pages. In Next.js, you can use a special `layout.tsx` file to create UI that is shared between multiple pages. Let's create a layout for the dashboard pages!

Inside the `/dashboard` folder, add a new file called `layout.tsx` and paste the following code:

```tsx filename="/app/dashboard/layout.tsx"
import SideNav from '@/app/ui/dashboard/sidenav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
```

A few things are going on in this code, so let's break it down:

First, you're importing the `<SideNav />` component into your layout. Any components you import into this file will be part of the layout.

The `<Layout />` component receives a `children` prop. This child can either be a page or another layout. In your case, the pages inside `/dashboard` will automatically be nested inside a `<Layout />` like so:

<Image
  alt="Folder structure with dashboard layout nesting the dashboard pages as children"
  srcLight="/learn/light/shared-layout.png"
  srcDark="/learn/dark/shared-layout.png"
  width="1600"
  height="687"
/>

Check that everything is working correctly by saving your changes and checking your localhost. You should see the following:

<Image
  alt="Dashboard page with a sidenav and a main content area"
  srcLight="/learn/light/shared-layout-page.png"
  srcDark="/learn/dark/shared-layout-page.png"
  width="960"
  height="565"
/>

One benefit of using layouts in Next.js is that on navigation, only the page components update while the layout won't re-render. This is called [partial rendering](/docs/app/building-your-application/routing/linking-and-navigating#4-partial-rendering) which preserves client-side React state in the layout when transitioning between pages.

<Image
  alt="Folder structure showing the dashboard layout nesting the dashboard pages, but only the pages UI swap on navigation"
  srcLight="/learn/light/partial-rendering-dashboard.png"
  srcDark="/learn/dark/partial-rendering-dashboard.png"
  width="1600"
  height="1000"
/>

## Root layout

In Chapter 3, you imported the `Inter` font into another layout: `/app/layout.tsx`. As a reminder:

```tsx filename="/app/layout.tsx"
import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
```

This is called a [root layout](/docs/app/api-reference/file-conventions/layout#root-layouts) and is required in every Next.js application. Any UI you add to the root layout will be shared across **all** pages in your application. You can use the root layout to modify your `<html>` and `<body>` tags, and add metadata (you'll learn more about metadata in [a later chapter](/learn/dashboard-app/adding-metadata)).

Since the new layout you've just created (`/app/dashboard/layout.tsx`) is unique to the dashboard pages, you don't need to add any UI to the root layout above.

<Quiz
  answers={[
    'To act as a global error handler',
    'To fetch data and manage state across the entire application',
    'To share UI across multiple pages',
    'To act as the entry point for the entire application',
  ]}
  explanation="That's right, the layout file is the best way to create a shared layout that all pages in your application can use."
  hint="The layout file exists to share common UI across pages."
  question="What is the purpose of the layout file in Next.js?"
  correctAnswer="To share UI across multiple pages"
/>


<!-- Source: 05-navigating-between-pages.mdx -->
## 'Navigating Between Pages'

---
title: 'Navigating Between Pages'
description: 'Learn how to use the <Link> component to navigate between pages.'
summary:
  current: You've learned how to link between pages and leverage client-side navigation in Next.js.
  next: Let's create a database to start fetching real data!
---

In the previous chapter, you created the dashboard layout and pages. Now, let's add some links to allow users to navigate between the dashboard routes.

<InThisChapter
  topics={[
    {
      icon: 'logo-next',
      description: 'How to use the <code>next/link</code> component.',
    },
    {
      icon: 'link',
      description:
        'How to show an active link with the <code>usePathname()</code> hook.',
    },
    {
      icon: 'paper-airplane',
      description: 'How navigation works in Next.js.',
    },
  ]}
/>

## Why optimize navigation?

To link between pages, you'd traditionally use the `<a>` HTML element. At the moment, the sidebar links use `<a>` elements, but notice what happens when you navigate between the home, invoices, and customers pages on your browser.

Did you see it?

There's a full page refresh on each page navigation!

## The `<Link>` component

In Next.js, you can use the `<Link />` Component to link between pages in your application. `<Link>` allows you to do [client-side navigation](/docs/app/building-your-application/routing/linking-and-navigating#how-routing-and-navigation-works) with JavaScript.

To use the `<Link />` component, open `/app/ui/dashboard/nav-links.tsx`, and import the `Link` component from [`next/link`](/docs/app/api-reference/components/link). Then, replace the `<a>` tag with `<Link>`:

```tsx filename="/app/ui/dashboard/nav-links.tsx" highglight={6,16,23}
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

// ...

export default function NavLinks() {
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
```

As you can see, the `Link` component is similar to using `<a>` tags, but instead of `<a href="…">`, you use `<Link href="…">`.

Save your changes and check to see if it works in your localhost. You should now be able to navigate between the pages without seeing a full refresh. Although parts of your application are rendered on the server, there's no full page refresh, making it feel like a native web app. Why is that?

### Automatic code-splitting and prefetching

To improve the navigation experience, Next.js automatically code splits your application by route segments. This is different from a traditional React [SPA](https://nextjs.org/docs/app/building-your-application/upgrading/single-page-applications), where the browser loads all your application code on the initial page load.

Splitting code by routes means that pages become isolated. If a certain page throws an error, the rest of the application will still work. This is also less code for the browser to parse, which makes your application faster.

Furthermore, in production, whenever [`<Link>`](/docs/api-reference/next/link) components appear in the browser's viewport, Next.js automatically **prefetches** the code for the linked route in the background. By the time the user clicks the link, the code for the destination page will already be loaded in the background, and this is what makes the page transition near-instant!

Learn more about [how navigation works](/docs/app/building-your-application/routing/linking-and-navigating#how-routing-and-navigation-works).

<Quiz
  answers={[
    'Downloads additional CSS',
    'Preloads images',
    'Prefetches the code for the linked route',
    'Enables lazy loading for the linked route',
  ]}
  question={`What does Next.js do when a <Link> component appears in the browser’s viewport in a production environment?`}
  hint="Prefetching!"
  correctAnswer="Prefetches the code for the linked route"
  explanation="Next.js automatically prefetches the code for the linked route in the background. By the time the user clicks the link, the code for the destination page will already be loaded in the background, and this is what makes the page transition near-instant!"
/>

## Pattern: Showing active links

A common UI pattern is to show an active link to indicate to the user what page they are currently on. To do this, you need to get the user's current path from the URL. Next.js provides a hook called [`usePathname()`](/docs/app/api-reference/functions/use-pathname) that you can use to check the path and implement this pattern.

Since [`usePathname()`](https://nextjs.org/docs/app/api-reference/functions/use-pathname) is a React hook, you'll need to turn `nav-links.tsx` into a Client Component. Add React's `"use client"` directive to the top of the file, then import `usePathname()` from `next/navigation`:

```tsx filename="/app/ui/dashboard/nav-links.tsx" highglight={1,9}
'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// ...
```

Next, assign the path to a variable called `pathname` inside your `<NavLinks />` component:

```tsx filename="/app/ui/dashboard/nav-links.tsx" highglight={2}
export default function NavLinks() {
  const pathname = usePathname();
  // ...
}
```

> **Note**: `nav-links.tsx` is not a special file for Next.js — it can be named whatever you want. If you rename it, ensure that you update the import statements accordingly.

You can use the `clsx` library introduced in the chapter on [CSS styling](/learn/dashboard-app/css-styling) to conditionally apply class names when the link is active. When `link.href` matches the `pathname`, the link should be displayed with blue text and a light blue background.

Here's the final code for `nav-links.tsx`:

```tsx filename="/app/ui/dashboard/nav-links.tsx" highglight={10,25-30}
'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// ...

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
```

Save and check your localhost. You should now see the active link highlighted in blue.


<!-- Source: 06-setting-up-your-database.mdx -->
## Setting Up Your Database

---
title: Setting Up Your Database
description: Setup a database for your application and seed it with initial data.
summary:
  current: With your database now set up and integrated, you can continue building your application.
  next: Let's discuss the different ways you can fetch data from your database, including using APIs, SQL, and alternatives.
---

Before you can continue working on your dashboard, you'll need some data. In this chapter, you'll be setting up a PostgreSQL database from one of [Vercel's marketplace integrations](https://vercel.com/marketplace?category=databases). If you're already familiar with PostgreSQL and would prefer to use your own database provider, you can skip this chapter and set it up on your own. Otherwise, let's continue!

<InThisChapter
  topics={[
    {
      icon: 'logo-github',
      description: 'Push your project to GitHub.',
    },
    {
      icon: 'logo-vercel',
      description:
        'Set up a Vercel account and link your GitHub repo for instant previews and deployments.',
    },
    {
      icon: 'postgres',
      description: 'Create and link your project to a Postgres database.',
    },
    {
      icon: 'database',
      description: 'Seed the database with initial data.',
    },
  ]}
/>

## Create a GitHub repository

To start, let's push your repository to GitHub if you haven't already. This will make it easier to set up your database and deploy.

If you need help setting up your repository, take a look at [this guide on GitHub](https://help.github.com/en/github/getting-started-with-github/create-a-repo).

> **Good to know:**
>
> - You can also use other git providers like GitLab or Bitbucket.
> - If you're new to GitHub, we recommend the [GitHub Desktop App](https://desktop.github.com/) for a simplified development workflow.

## Create a Vercel account

Visit [vercel.com/signup](https://vercel.com/signup) to create an account. Choose the free "hobby" plan. Select **Continue with GitHub** to connect your GitHub and Vercel accounts.

## Connect and deploy your project

Next, you'll be taken to this screen where you can select and **import** the GitHub repository you've just created:

<Image
  alt="Screenshot of Vercel Dashboard, showing the import project screen with a list of the user's GitHub Repositories"
  srcLight="/learn/light/import-git-repo.png"
  srcDark="/learn/dark/import-git-repo.png"
  width="960"
  height="511"
/>
Name your project and click **Deploy**.

<Image
  alt="Deployment screen showing the project name field and a deploy button"
  srcLight="/learn/light/configure-project.png"
  srcDark="/learn/dark/configure-project.png"
  width="960"
  height="491"
/>

Hooray! 🎉
Your project is now deployed.

<Image
  alt="Project overview screen showing the project name, domain, and deployment status"
  srcLight="/learn/light/deployed-project.png"
  srcDark="/learn/dark/deployed-project.png"
  width="960"
  height="479"
/>

By connecting your GitHub repository, whenever you push changes to your **main** branch, Vercel will automatically redeploy your application with no configuration needed. When opening pull requests, you'll also have [instant preview URLs](https://vercel.com/docs/deployments/preview-deployments#preview-urls) which allow you to catch deployment errors early and share a preview of your project with team members for feedback.

## Create a Postgres database

Next, to set up a database, click **Continue to Dashboard** and select the **Storage** tab from your project dashboard. Select **Create Database**. Depending on when your Vercel account was created, you may see options like Neon or Supabase. Choose your preferred provider and click **Continue**.

<Image
  alt="Connect Store screen showing the Postgres option along with KV, Blob and Edge Config"
  srcLight="/learn/light/create-database.png"
  srcDark="/learn/dark/create-database.png"
  width="960"
  height="513"
/>

Choose your region and storage plan, if required. The [default region](https://vercel.com/docs/functions/configuring-functions/region) for all Vercel projects is **Washington D.C (iad1)**, and we recommend choosing this if available to reduce [latency](https://developer.mozilla.org/en-US/docs/Web/Performance/Understanding_latency) for data requests.

<Image
  alt="Database creation modal showing the database name and region"
  srcLight="/learn/light/database-region.png"
  srcDark="/learn/dark/database-region.png"
  width="960"
  height="513"
/>

Once connected, navigate to the `.env.local` tab, click **Show secret** and **Copy Snippet**. Make sure you reveal the secrets before copying them.

<Image
  alt="The .env.local tab showing the hidden database secrets"
  srcLight="/learn/light/database-dashboard.png"
  srcDark="/learn/dark/database-dashboard.png"
  width="960"
  height="358"
/>

Navigate to your code editor and rename the `.env.example` file to **`.env`**. Paste in the copied contents from Vercel.

> **Important:** Go to your `.gitignore` file and make sure `.env` is in the ignored files to prevent your database secrets from being exposed when you push to GitHub.

## Seed your database

Now that your database has been created, let's seed it with some initial data.

We've included an API you can access in the browser, which will run a seed script to populate the database with an initial set of data.

The script uses **SQL** to create the tables, and the data from `placeholder-data.ts` file to populate them after they've been created.

Ensure your local development server is running with `pnpm run dev` and navigate to [`localhost:3000/seed`](http://localhost:3000/seed) in your browser. When finished, you will see a message "Database seeded successfully" in the browser. Once completed, you can delete this file.

<Quiz
  answers={[
    'Deleting all data in the database',
    'Importing the schema of a database',
    'Populating the database with an initial set of data',
    'Creating relationships between tables in a database',
  ]}
  hint="Read the section above"
  question="What is 'seeding' in the context of databases?"
  correctAnswer="Populating the database with an initial set of data"
  explanation="That's right! Seeding is useful when you want to have some data to work with as you build your application."
/>

> **Troubleshooting**:
>
> - Make sure to reveal your database secrets before copying it into your `.env` file.
> - The script uses `bcrypt` to hash the user's password, if `bcrypt` isn't compatible with your environment, you can update the script to use [`bcryptjs`](https://www.npmjs.com/package/bcryptjs) instead.
> - If you run into any issues while seeding your database and want to run the script again, you can drop any existing tables by running `DROP TABLE tablename` in your database query interface. See the [executing queries section](#executing-queries) below for more details. But be careful, this command will delete the tables and all their data. It's ok to do this with your example app since you're working with placeholder data, but you shouldn't run this command in a production app.

## Executing queries

Let's execute a query to make sure everything is working as expected. We'll use another Router Handler, `app/query/route.ts`, to query the database. Inside this file, you'll find a `listInvoices()` function that has the following SQL query.

```sql
SELECT invoices.amount, customers.name
FROM invoices
JOIN customers ON invoices.customer_id = customers.id
WHERE invoices.amount = 666;
```

Uncomment the file, remove the `Response.json() block`, and navigate to [`localhost:3000/query`](http://localhost:3000/query) in your browser. You should see that an invoice `amount` and `name` is returned.

<Quiz
  answers={[
    'Lee Robinson',
    'Evil Rabbit',
    'Delba de Oliveira',
    'Michael Novotny',
  ]}
  question="Which customer does this invoice belong to?"
  hint="Make sure your seed script and query is running correctly."
  correctAnswer="Evil Rabbit"
  explanation="That's right!"
/>


<!-- Source: 07-fetching-data.mdx -->
## Fetching Data

---
title: Fetching Data
description: Learn about the different ways to fetch data in Next.js, and fetch data for your dashboard page using Server Components.
summary:
  current: You've learned about some of the different ways to fetch data in Next.js.
  next: Learn about the different rendering modes in Next.js.
---

Now that you've created and seeded your database, let's discuss the different ways you can fetch data for your application, and build out your dashboard overview page.

<InThisChapter
  topics={[
    {
      icon: 'database',
      description:
        'Learn about some approaches to fetching data: APIs, ORMs, SQL, etc.',
    },
    {
      icon: 'servers',
      description:
        'How Server Components can help you access back-end resources more securely.',
    },
    {
      icon: 'alignment-right',
      description: 'What network waterfalls are.',
    },
    {
      icon: 'connection',
      description:
        'How to implement parallel data fetching using a JavaScript Pattern.',
    },
  ]}
/>

## Choosing how to fetch data

### API layer

APIs are an intermediary layer between your application code and database. There are a few cases where you might use an API:

- If you're using third-party services that provide an API.
- If you're fetching data from the client, you want to have an API layer that runs on the server to avoid exposing your database secrets to the client.

In Next.js, you can create API endpoints using [Route Handlers](/docs/app/building-your-application/routing/route-handlers).

### Database queries

When you're creating a full-stack application, you'll also need to write logic to interact with your database. For [relational databases](https://aws.amazon.com/relational-database/) like Postgres, you can do this with SQL or with an [ORM](https://vercel.com/docs/storage/vercel-postgres/using-an-orm).

There are a few cases where you have to write database queries:

- When creating your API endpoints, you need to write logic to interact with your database.
- If you are using React Server Components (fetching data on the server), you can skip the API layer, and query your database directly without risking exposing your database secrets to the client.

<Quiz
  question="In which of these scenarios should you not query your database directly?"
  answers={[
    "When you're fetching data on the client",
    "When you're fetching data on the server",
    "When you're creating your own API layer to interact with your database",
  ]}
  explanation="That's right, you should not query your database directly when fetching data on the client as this would expose your database secrets."
  hint="Think about when you'd use an API layer."
  correctAnswer="When you're fetching data on the client"
/>

Let's learn more about React Server Components.

### Using Server Components to fetch data

By default, Next.js applications use **React Server Components**. Fetching data with Server Components is a relatively new approach and there are a few benefits of using them:

- Server Components support JavaScript Promises, providing a solution for asynchronous tasks like data fetching natively. You can use `async/await` syntax without needing `useEffect`, `useState` or other data fetching libraries.
- Server Components run on the server, so you can keep expensive data fetches and logic on the server, only sending the result to the client.
- Since Server Components run on the server, you can query the database directly without an additional API layer. This saves you from writing and maintaining additional code.

<Quiz
  question="What's one advantage of using React Server Components to fetch data?"
  answers={[
    'They automatically protect you from SQL injection.',
    'They allow you to query the database directly from the server without an additional API layer.',
    'They require you to use an API layer and create endpoints.',
  ]}
  explanation="Server components allow you fetch data directly from your database."
  hint="See the advantages of using React Server Components."
  correctAnswer="They allow you to query the database directly from the server without an additional API layer."
/>

### Using SQL

For your dashboard application, you'll write database queries using the [postgres.js](https://github.com/porsager/postgres) library and SQL. There are a few reasons why we'll be using SQL:

- SQL is the industry standard for querying relational databases (e.g. ORMs generate SQL under the hood).
- Having a basic understanding of SQL can help you understand the fundamentals of relational databases, allowing you to apply your knowledge to other tools.
- SQL is versatile, allowing you to fetch and manipulate specific data.
- The `postgres.js` library provides protection against [SQL injections](https://github.com/porsager/postgres?tab=readme-ov-file#query-parameters).

Don't worry if you haven't used SQL before - we have provided the queries for you.

Go to `/app/lib/data.ts`. Here you'll see that we're using `postgres`. The `sql` [function](https://github.com/porsager/postgres) allows you to query your database:

```ts filename="/app/lib/data.ts"
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// ...
```

You can call `sql` anywhere on the server, like a Server Component. But to allow you to navigate the components more easily, we've kept all the data queries in the `data.ts` file, and you can import them into the components.

<Quiz
  question="What does SQL allow you to do in terms of fetching data?"
  answers={[
    'Fetch all your data indiscriminately',
    'Fetch and manipulate specific data',
    'Automatically cache data for better performance',
    'Change the database schema on the fly',
  ]}
  hint="See the why we're using SQL section"
  correctAnswer="Fetch and manipulate specific data"
  explanation="SQL allows you to write targeted queries to fetch and manipulate specific data"
/>

> **Note:** If you used your own database provider in Chapter 6, you'll need to update the database queries to work with your provider. You can find the queries in `/app/lib/data.ts`.

## Fetching data for the dashboard overview page

Now that you understand different ways of fetching data, let's fetch data for the dashboard overview page. Navigate to `/app/dashboard/page.tsx`, paste the following code, and spend some time exploring it:

```tsx filename="/app/dashboard/page.tsx"
import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';

export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* <Card title="Collected" value={totalPaidInvoices} type="collected" /> */}
        {/* <Card title="Pending" value={totalPendingInvoices} type="pending" /> */}
        {/* <Card title="Total Invoices" value={numberOfInvoices} type="invoices" /> */}
        {/* <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        /> */}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* <RevenueChart revenue={revenue}  /> */}
        {/* <LatestInvoices latestInvoices={latestInvoices} /> */}
      </div>
    </main>
  );
}
```

The code above is intentionally commented out. We will now begin to example each piece.

- The `page` is an **async** server component. This allows you to use `await` to fetch data.
- There are also 3 components which receive data: `<Card>`, `<RevenueChart>`, and `<LatestInvoices>`. They are currently commented out and not yet implemented.

## Fetching data for **`<RevenueChart/>`**

To fetch data for the `<RevenueChart/>` component, import the `fetchRevenue` function from `data.ts` and call it inside your component:

```tsx filename="/app/dashboard/page.tsx" highlight={5,7,8}
import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { fetchRevenue } from '@/app/lib/data';

export default async function Page() {
  const revenue = await fetchRevenue();
  // ...
}
```

Next, let's do the following:

1. Uncomment the `<RevenueChart/>` component.
2. Navigate to the component file (`/app/ui/dashboard/revenue-chart.tsx`) and uncomment the code inside it.
3. Check `localhost:3000` and you should see a chart that uses `revenue` data.

<Image
  alt="Revenue chart showing the total revenue for the last 12 months"
  srcLight="/learn/light/recent-revenue.png"
  srcDark="/learn/dark/recent-revenue.png"
  width="960"
  height="566"
/>

Let's continue importing more data and displaying it on the dashboard.

## Fetching data for **`<LatestInvoices/>`**

For the `<LatestInvoices />` component, we need to get the latest 5 invoices, sorted by date.

You could fetch all the invoices and sort through them using JavaScript. This isn't a problem as our data is small, but as your application grows, it can significantly increase the amount of data transferred on each request and the JavaScript required to sort through it.

Instead of sorting through the latest invoices in-memory, you can use an SQL query to fetch only the last 5 invoices. For example, this is the SQL query from your `data.ts` file:

```ts filename="/app/lib/data.ts"
// Fetch the last 5 invoices, sorted by date
const data = await sql<LatestInvoiceRaw[]>`
  SELECT invoices.amount, customers.name, customers.image_url, customers.email
  FROM invoices
  JOIN customers ON invoices.customer_id = customers.id
  ORDER BY invoices.date DESC
  LIMIT 5`;
```

In your page, import the `fetchLatestInvoices` function:

```jsx filename="/app/dashboard/page.tsx" highlight={5,9}
import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { fetchRevenue, fetchLatestInvoices } from '@/app/lib/data';

export default async function Page() {
  const revenue = await fetchRevenue();
  const latestInvoices = await fetchLatestInvoices();
  // ...
}
```

Then, uncomment the `<LatestInvoices />` component. You will also need to uncomment the relevant code in the `<LatestInvoices />` component itself, located at `/app/ui/dashboard/latest-invoices`.

If you visit your localhost, you should see that only the last 5 are returned from the database. Hopefully, you're beginning to see the advantages of querying your database directly!

<Image
  alt="Latest invoices component alongside the revenue chart"
  srcLight="/learn/light/latest-invoices.png"
  srcDark="/learn/dark/latest-invoices.png"
  width="960"
  height="566"
/>

## Practice: Fetch data for the `<Card>` components

Now it's your turn to fetch data for the `<Card>` components. The cards will display the following data:

- Total amount of invoices collected.
- Total amount of invoices pending.
- Total number of invoices.
- Total number of customers.

Again, you might be tempted to fetch all the invoices and customers, and use JavaScript to manipulate the data. For example, you could use `Array.length` to get the total number of invoices and customers:

```jsx
const totalInvoices = allInvoices.length;
const totalCustomers = allCustomers.length;
```

But with SQL, you can fetch only the data you need. It's a little longer than using `Array.length`, but it means less data needs to be transferred during the request. This is the SQL alternative:

```ts filename="/app/lib/data.ts"
const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
```

The function you will need to import is called `fetchCardData`. You will need to destructure the values returned from the function.

> **Hint:**
>
> - Check the card components to see what data they need.
> - Check the `data.ts` file to see what the function returns.

Once you're ready, expand the toggle below for the final code:

<Reveal>

```ts filename="/app/dashboard/page.tsx" highlight={8,14-19}
import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import {
  fetchRevenue,
  fetchLatestInvoices,
  fetchCardData,
} from '@/app/lib/data';

export default async function Page() {
  const revenue = await fetchRevenue();
  const latestInvoices = await fetchLatestInvoices();
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart revenue={revenue} />
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  );
}
```

</Reveal>

Great! You've now fetched all the data for the dashboard overview page. Your page should look like this:

<Image
  alt="Dashboard page with all the data fetched"
  srcLight="/learn/light/complete-dashboard.png"
  srcDark="/learn/dark/complete-dashboard.png"
  width="960"
  height="566"
/>

However... there are two things you need to be aware of:

1. The data requests are unintentionally blocking each other, creating a **request waterfall**.
2. By default, Next.js **prerenders** routes to improve performance, this is called **Static Rendering**. So if your data changes, it won't be reflected in your dashboard.

Let's discuss number 1 in this chapter, then look into detail at number 2 in the next chapter.

## What are request waterfalls?

A "waterfall" refers to a sequence of network requests that depend on the completion of previous requests. In the case of data fetching, each request can only begin once the previous request has returned data.

<Image
  alt="Diagram showing time with sequential data fetching and parallel data fetching"
  srcLight="/learn/light/sequential-parallel-data-fetching.png"
  srcDark="/learn/dark/sequential-parallel-data-fetching.png"
  width="1600"
  height="525"
/>

For example, we need to wait for `fetchRevenue()` to execute before `fetchLatestInvoices()` can start running, and so on.

```tsx filename="/app/dashboard/page.tsx"
const revenue = await fetchRevenue();
const latestInvoices = await fetchLatestInvoices(); // wait for fetchRevenue() to finish
const {
  numberOfInvoices,
  numberOfCustomers,
  totalPaidInvoices,
  totalPendingInvoices,
} = await fetchCardData(); // wait for fetchLatestInvoices() to finish
```

This pattern is not necessarily bad. There may be cases where you want waterfalls
because you want a condition to be satisfied before you make the next request. For
example, you might want to fetch a user's ID and profile information first. Once
you have the ID, you might then proceed to fetch their list of friends. In this case,
each request is contingent on the data returned from the previous request.

However, this behavior can also be unintentional and impact performance.

<Quiz
  question="When might you want to use a waterfall pattern?"
  answers={[
    'To satisfy a condition before making the next request',
    'To make all requests simultaneously',
    'To reduce the server load by doing one fetch at a time',
  ]}
  hint="Think about the advantages of using a waterfall pattern"
  correctAnswer="To satisfy a condition before making the next request"
  explanation="For example, you might want to fetch a user's ID and profile information first. Once you have the ID, you might then proceed to fetch their list of friends."
/>

## Parallel data fetching

A common way to avoid waterfalls is to initiate all data requests at the same time - in parallel.

In JavaScript, you can use the [`Promise.all()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) or [`Promise.allSettled()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled) functions to initiate all promises at the same time. For example, in `data.ts`, we're using `Promise.all()` in the `fetchCardData()` function:

```jsx filename="/app/lib/data.ts" highlight={10-14}
export async function fetchCardData() {
  try {
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);
    // ...
  }
}
```

By using this pattern, you can:

- Start executing all data fetches at the same time, which is faster than waiting for each request to complete in a waterfall.
- Use a native JavaScript pattern that can be applied to any library or framework.

However, there is one **disadvantage** of relying only on this JavaScript pattern: what happens if one data request is slower than all the others? Let's find out more in the next chapter.


<!-- Source: 08-static-and-dynamic-rendering.mdx -->
## Static and Dynamic Rendering

---
title: Static and Dynamic Rendering
description: Understand how rendering works in Next.js, and make your dashboard app dynamic.
summary:
  current: Nice! You've just learned about static and dynamic rendering in Next.js.
  next: Learn how to improve your user's experience by adding streaming.
---

In the previous chapter, you fetched data for the Dashboard Overview page. However, we briefly discussed two limitations of the current setup:

1. The data requests are creating an unintentional waterfall.
2. The dashboard is static, so any data updates will not be reflected on your application.

<InThisChapter
  topics={[
    {
      icon: 'lightning',
      description:
        "What static rendering is and how it can improve your application's performance.",
    },
    {
      icon: 'lightning',
      description: 'What dynamic rendering is and when to use it.',
    },
    {
      icon: 'box',
      description: 'Different approaches to make your dashboard dynamic.',
    },
    {
      icon: 'clock',
      description: 'Simulate a slow data fetch to see what happens.',
    },
  ]}
/>

### What is Static Rendering?

With static rendering, data fetching and rendering happens on the server at build time (when you deploy) or when [revalidating data](/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#revalidating-data).

Whenever a user visits your application, the cached result is served. There are a couple of benefits of static rendering:

- **Faster Websites** - Prerendered content can be cached and globally distributed when deployed to platforms like [Vercel](https://vercel.com/). This ensures that users around the world can access your website's content more quickly and reliably.
- **Reduced Server Load** - Because the content is cached, your server does not have to dynamically generate content for each user request. This can reduce compute costs.
- **SEO** - Prerendered content is easier for search engine crawlers to index, as the content is already available when the page loads. This can lead to improved search engine rankings.

Static rendering is useful for UI with **no data** or **data that is shared across users**, such as a static blog post or a product page. It might not be a good fit for a dashboard that has personalized data which is regularly updated.

The opposite of static rendering is dynamic rendering.

<Quiz
  question="Why might static rendering not be a good fit for a dashboard app?"
  answers={[
    'Because it makes the website slower',
    'Because the server load will increase',
    'Because the application will not reflect the latest data changes',
    'Because you need a Content Delivery Network',
  ]}
  hint="Do you need your Dashboard data to change often?"
  correctAnswer="Because the application will not reflect the latest data changes"
  explanation="When your data updates, you want to show the latest changes in your dashboard. Static Rendering is not a good fit for this use case."
/>

## What is Dynamic Rendering?

With dynamic rendering, content is rendered on the server for each user at **request time** (when the user visits the page). There are a couple of benefits of dynamic rendering:

- **Real-Time Data** - Dynamic rendering allows your application to display real-time or frequently updated data. This is ideal for applications where data changes often.
- **User-Specific Content** - It's easier to serve personalized content, such as dashboards or user profiles, and update the data based on user interaction.
- **Request Time Information** - Dynamic rendering allows you to access information that can only be known at request time, such as cookies or the URL search parameters.

<Quiz
  question="What kind of information is typically only known at request time?"
  answers={['Database schema', 'URL Path', 'Cookies and URL search params']}
  hint="What are some things that are user specific?"
  correctAnswer="Cookies and URL search params"
  explanation="Cookies and URL search params"
/>

## Simulating a Slow Data Fetch

The dashboard application we're building is dynamic.

However, there is still one problem mentioned in the previous chapter. What happens if one data request is slower than all the others?

Let's simulate a slow data fetch. In `app/lib/data.ts`, uncomment the `console.log` and `setTimeout` inside `fetchRevenue()`:

```tsx filename="/app/lib/data.ts" highlight={5-6,10}
export async function fetchRevenue() {
  try {
    // We artificially delay a response for demo purposes.
    // Don't do this in production :)
    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue[]>`SELECT * FROM revenue`;

    console.log('Data fetch completed after 3 seconds.');

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}
```

Now open http://localhost:3000/dashboard/ in a new tab and notice how the page takes longer to load. In your terminal, you should also see the following messages:

```jsx
Fetching revenue data...
Data fetch completed after 3 seconds.
```

Here, you've added an artificial 3-second delay to simulate a slow data fetch. The result is that now your whole page is blocked from showing UI to the visitor while the data is being fetched. Which brings us to a common challenge developers have to solve:

With dynamic rendering, **your application is only as fast as your slowest data fetch.**


<!-- Source: 09-streaming.mdx -->
## Streaming

---
title: Streaming
description: Improve your application's loading experience with streaming and loading skeletons.
summary:
  current: You've learned how to stream components with Suspense and loading skeletons.
  next: An early look into Partial Prerendering - a new experimental rendering model built with streaming.
---

In the previous chapter, you learned about the different rendering methods of Next.js. We also discussed how slow data fetches can impact the performance of your application. Let's look at how you can improve the user experience when there are slow data requests.

<InThisChapter
  topics={[
    {
      icon: 'servers',
      description: 'What streaming is and when you might use it.',
    },
    {
      icon: 'connection',
      description:
        'How to implement streaming with <code>loading.tsx</code> and Suspense.',
    },
    {
      icon: 'layout-dashed',
      description: 'What loading skeletons are.',
    },
    {
      icon: 'router',
      description:
        'What Next.js Route Groups are, and when you might use them.',
    },
    {
      icon: 'clock',
      description:
        'Where to place React Suspense boundaries in your application.',
    },
  ]}
/>

## What is streaming?

Streaming is a data transfer technique that allows you to break down a route into smaller "chunks" and progressively stream them from the server to the client as they become ready.

<Image
  alt="Diagram showing time with sequential data fetching and parallel data fetching"
  srcLight="/learn/light/server-rendering-with-streaming.png"
  srcDark="/learn/dark/server-rendering-with-streaming.png"
  width="1600"
  height="618"
/>

By streaming, you can prevent slow data requests from blocking your whole page. This allows the user to see and interact with parts of the page without waiting for all the data to load before any UI can be shown to the user.

<Image
  alt="Diagram showing time with sequential data fetching and parallel data fetching"
  srcLight="/learn/light/server-rendering-with-streaming-chart.png"
  srcDark="/learn/dark/server-rendering-with-streaming-chart.png"
  width="1600"
  height="450"
/>

Streaming works well with React's component model, as each component can be considered a _chunk_.

There are two ways you implement streaming in Next.js:

1. At the page level, with the `loading.tsx` file (which creates `<Suspense>` for you).
2. At the component level, with `<Suspense>` for more granular control.

Let's see how this works.

<Quiz
  question="What is one advantage of streaming?"
  answers={[
    'Data requests become more secure through chunk encryption',
    'All chunks are rendered only after they are received in full',
    'Chunks are rendered in parallel, reducing the overall load time',
  ]}
  hint="See the diagram"
  correctAnswer="Chunks are rendered in parallel, reducing the overall load time"
  explanation="One advantage of this approach is that you can significantly reduce your page's overall loading time."
/>

## Streaming a whole page with `loading.tsx`

In the `/app/dashboard` folder, create a new file called `loading.tsx`:

```tsx filename="/app/dashboard/loading.tsx"
export default function Loading() {
  return <div>Loading...</div>;
}
```

Refresh http://localhost:3000/dashboard, and you should now see:

<Image
  alt="Dashboard page with 'Loading...' text"
  srcLight="/learn/light/loading-page.png"
  srcDark="/learn/dark/loading-page.png"
  width="960"
  height="501"
/>

A few things are happening here:

1. `loading.tsx` is a special Next.js file built on top of React Suspense. It allows you to create fallback UI to show as a replacement while page content loads.
2. Since `<SideNav>` is static, it's shown immediately. The user can interact with `<SideNav>` while the dynamic content is loading.
3. The user doesn't have to wait for the page to finish loading before navigating away (this is called interruptable navigation).

Congratulations! You've just implemented streaming. But we can do more to improve the user experience. Let's show a loading skeleton instead of the `Loading…` text.

### Adding loading skeletons

A loading skeleton is a simplified version of the UI. Many websites use them as a placeholder (or fallback) to indicate to users that the content is loading. Any UI you add in `loading.tsx` will be embedded as part of the static file, and sent first. Then, the rest of the dynamic content will be streamed from the server to the client.

Inside your `loading.tsx` file, import a new component called `<DashboardSkeleton>`:

```tsx filename="/app/dashboard/loading.tsx" highlight={1,4}
import DashboardSkeleton from '@/app/ui/skeletons';

export default function Loading() {
  return <DashboardSkeleton />;
}
```

Then, refresh http://localhost:3000/dashboard, and you should now see:

<Image
  alt="Dashboard page with loading skeletons"
  srcLight="/learn/light/loading-page-with-skeleton.png"
  srcDark="/learn/dark/loading-page-with-skeleton.png"
  width="960"
  height="501"
/>

### Fixing the loading skeleton bug with route groups

Right now, your loading skeleton will apply to the invoices.

Since `loading.tsx` is a level higher than `/invoices/page.tsx` and `/customers/page.tsx` in the file system, it's also applied to those pages.

We can change this with [Route Groups](https://nextjs.org/docs/app/building-your-application/routing/route-groups). Create a new folder called `/(overview)` inside the dashboard folder. Then, move your `loading.tsx` and `page.tsx` files inside the folder:

<Image
  alt="Folder structure showing how to create a route group using parentheses"
  srcLight="/learn/light/route-group.png"
  srcDark="/learn/dark/route-group.png"
  width="1600"
  height="444"
/>

Now, the `loading.tsx` file will only apply to your dashboard overview page.

Route groups allow you to organize files into logical groups without affecting the URL path structure. When you create a new folder using parentheses `()`, the name won't be included in the URL path. So `/dashboard/(overview)/page.tsx` becomes `/dashboard`.

Here, you're using a route group to ensure `loading.tsx` only applies to your dashboard overview page. However, you can also use route groups to separate your application into sections (e.g. `(marketing)` routes and `(shop)` routes) or by teams for larger applications.

### Streaming a component

So far, you're streaming a whole page. But you can also be more granular and stream specific components using React Suspense.

Suspense allows you to defer rendering parts of your application until some condition is met (e.g. data is loaded). You can wrap your dynamic components in Suspense. Then, pass it a fallback component to show while the dynamic component loads.

If you remember the slow data request, `fetchRevenue()`, this is the request that is slowing down the whole page. Instead of blocking your whole page, you can use Suspense to stream only this component and immediately show the rest of the page's UI.

To do so, you'll need to move the data fetch to the component, let's update the code to see what that'll look like:

Delete all instances of `fetchRevenue()` and its data from `/dashboard/(overview)/page.tsx`:

```tsx filename="/app/dashboard/(overview)/page.tsx" highlight={5,8}
import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { fetchLatestInvoices, fetchCardData } from '@/app/lib/data'; // remove fetchRevenue

export default async function Page() {
  const revenue = await fetchRevenue() // delete this line
  const latestInvoices = await fetchLatestInvoices();
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();

  return (
    // ...
  );
}
```

Then, import `<Suspense>` from React, and wrap it around `<RevenueChart />`. You can pass it a fallback component called `<RevenueChartSkeleton>`.

```tsx filename="/app/dashboard/(overview)/page.tsx" highligh={6,7,34-36}
import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { fetchLatestInvoices, fetchCardData } from '@/app/lib/data';
import { Suspense } from 'react';
import { RevenueChartSkeleton } from '@/app/ui/skeletons';

export default async function Page() {
  const latestInvoices = await fetchLatestInvoices();
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  );
}
```

Finally, update the `<RevenueChart>` component to fetch its own data and remove the prop passed to it:

```tsx filename="/app/ui/dashboard/revenue-chart.tsx" highlight={4,8,9}
import { generateYAxis } from '@/app/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchRevenue } from '@/app/lib/data';

// ...

export default async function RevenueChart() { // Make component async, remove the props
  const revenue = await fetchRevenue(); // Fetch data inside the component

  const chartHeight = 350;
  const { yAxisLabels, topLabel } = generateYAxis(revenue);

  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  return (
    // ...
  );
}

```

Now refresh the page, you should see the dashboard information almost immediately, while a fallback skeleton is shown for `<RevenueChart>`:

<Image
  alt="Dashboard page with revenue chart skeleton and loaded Card and Latest Invoices components"
  srcLight="/learn/light/loading-revenue-chart.png"
  srcDark="/learn/dark/loading-revenue-chart.png"
  width="960"
  height="563"
/>

### Practice: Streaming `<LatestInvoices>`

Now it's your turn! Practice what you've just learned by streaming the `<LatestInvoices>` component.

Move `fetchLatestInvoices()` down from the page to the `<LatestInvoices>` component. Wrap the component in a `<Suspense>` boundary with a fallback called `<LatestInvoicesSkeleton>`.

Once you're ready, expand the toggle to see the solution code:

<Reveal>

Dashboard Page:

```tsx filename="/app/dashboard/(overview)/page.tsx" highlight={5,9,40-42}
import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data'; // Remove fetchLatestInvoices
import { Suspense } from 'react';
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
} from '@/app/ui/skeletons';

export default async function Page() {
  // Remove `const latestInvoices = await fetchLatestInvoices()`
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}
```

`<LatestInvoices>` component. Remember to remove the props from the component:

```tsx filename="/app/ui/dashboard/latest-invoices.tsx" highlight={5,7,8}
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { fetchLatestInvoices } from '@/app/lib/data';

export default async function LatestInvoices() { // Remove props
  const latestInvoices = await fetchLatestInvoices();

  return (
    // ...
  );
}
```

</Reveal>

## Grouping components

Great! You're almost there, now you need to wrap the `<Card>` components in Suspense. You can fetch data for each individual card, but this could lead to a _popping_ effect as the cards load in, this can be visually jarring for the user.

So, how would you tackle this problem?

To create more of a _staggered_ effect, you can group the cards using a wrapper component. This means the static `<SideNav/>` will be shown first, followed by the cards, etc.

In your `page.tsx` file:

1. Delete your `<Card>` components.
2. Delete the `fetchCardData()` function.
3. Import a new **wrapper** component called `<CardWrapper />`.
4. Import a new **skeleton** component called `<CardsSkeleton />`.
5. Wrap `<CardWrapper />` in Suspense.

```tsx filename="/app/dashboard/(overview)/page.tsx" highlight={1,6,16-18}
import CardWrapper from '@/app/ui/dashboard/cards';
// ...
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
  CardsSkeleton,
} from '@/app/ui/skeletons';

export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      // ...
    </main>
  );
}
```

Then, move into the file `/app/ui/dashboard/cards.tsx`, import the `fetchCardData()` function, and invoke it inside the `<CardWrapper/>` component. Make sure to uncomment any necessary code in this component.

```tsx filename="/app/ui/dashboard/cards.tsx" highlight={2, 7-12}
// ...
import { fetchCardData } from '@/app/lib/data';

// ...

export default async function CardWrapper() {
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();

  return (
    <>
      <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <Card
        title="Total Customers"
        value={numberOfCustomers}
        type="customers"
      />
    </>
  );
}
```

Refresh the page, and you should see all the cards load in at the same time. You can use this pattern when you want multiple components to load in at the same time.

## Deciding where to place your Suspense boundaries

Where you place your Suspense boundaries will depend on a few things:

1. How you want the user to experience the page as it streams.
2. What content you want to prioritize.
3. If the components rely on data fetching.

Take a look at your dashboard page, is there anything you would've done differently?

Don't worry. There isn't a right answer.

- You could stream the **whole page** like we did with `loading.tsx`... but that may lead to a longer loading time if one of the components has a slow data fetch.
- You could stream **every component** individually... but that may lead to UI _popping_ into the screen as it becomes ready.
- You could also create a _staggered_ effect by streaming **page sections**. But you'll need to create wrapper components.

Where you place your suspense boundaries will vary depending on your application. In general, it's good practice to move your data fetches down to the components that need it, and then wrap those components in Suspense. But there is nothing wrong with streaming the sections or the whole page if that's what your application needs.

Don't be afraid to experiment with Suspense and see what works best, it's a powerful API that can help you create more delightful user experiences.

<Quiz
  question="In general, what is considered good practice when working with Suspense and data fetching?"
  answers={[
    'Move data fetches up to the parent component',
    'Avoid using Suspense for data fetching',
    'Move data fetches down to the components that need it',
    'Use Suspense only for error boundaries',
  ]}
  hint="See the previous section"
  correctAnswer="Move data fetches down to the components that need it"
  explanation="By moving data fetching down to the components that need it, you can create more granular Suspense boundaries. This allows you to stream specific components and prevent the UI from blocking."
/>

## Looking ahead

Streaming and Server Components give us new ways to handle data fetching and loading states, ultimately with the goal of improving the end user experience.

In the next chapter, you'll learn about Partial Prerendering, a new Next.js rendering model built with streaming in mind.


<!-- Source: 10-partial-prerendering.mdx -->
## Partial Prerendering

---
title: Partial Prerendering
description: An early look into Partial Prerendering and how it works.
summary:
  current: You've learned about Partial Prerendering, a new rendering model introduced in Next.js 14.
  next: Learn how to implement search and pagination with Next.js APIs.
---

So far, you've learned about static and dynamic rendering, and how to stream dynamic content that depends on data. In this chapter, let's learn how to combine static rendering, dynamic rendering, and streaming in the same route with **Partial Prerendering (PPR)**.

> Partial Prerendering is an experimental feature introduced in Next.js 14. The content of this page may be updated as the feature progresses in stability. **PPR is only available with the Next.js canary releases** (`next@canary`), not in the stable version of Next.js. We do not yet recommend using Partial Prerendering in production.

To install the canary release of Next.js, run:

```bash
pnpm install next@canary
```

<InThisChapter
  topics={[
    {
      icon: 'layout',
      description: 'What Partial Prerendering is.',
    },
    {
      icon: 'settings-gear',
      description: 'How Partial Prerendering works.',
    },
  ]}
/>

## Static vs. Dynamic Routes

For most web apps built today, you either choose between static and dynamic rendering for your **entire application**, or for a **specific route**. And in Next.js, if you call a [dynamic function](/docs/app/building-your-application/routing/route-handlers#dynamic-functions) in a route (like querying your database), the _entire_ route becomes dynamic.

However, most routes are _not_ fully static or dynamic. For example, consider an [ecommerce site](https://partialprerendering.com/). You might want to statically render the majority of the product information page, but you may want to fetch the user's cart and recommended products dynamically, this allows you to show personalized content to your users.

Going back to your dashboard page, what components would you consider static vs. dynamic?

Once you're ready, click the button below to see how we would split the dashboard route:

<Reveal>

<Image
  alt="Diagram showing how the sidenav is static while page's children are dynamic"
  srcLight="/learn/light/dashboard-static-dynamic-components.png"
  srcDark="/learn/dark/dashboard-static-dynamic-components.png"
  width="1600"
  height="566"
/>

- The `<SideNav>` Component doesn't rely on data and is not personalized to the user, so it can be **static**.
- The components in `<Page>` rely on data that changes often and will be personalized to the user, so they can be **dynamic**.

</Reveal>

## What is Partial Prerendering?

Next.js 14 introduced an experimental version of **Partial Prerendering** – a new rendering model that allows you to combine the benefits of static and dynamic rendering in the same route. For example:

<Image
  alt="Partially Prerendered Product Page showing static nav and product information, and dynamic cart and recommended products"
  srcLight="/learn/light/thinking-in-ppr.png"
  srcDark="/learn/dark/thinking-in-ppr.png"
  width="1600"
  height="632"
/>

When a user visits a route:

- A static route shell that includes the navbar and product information is served, ensuring a fast initial load.
- The shell leaves holes where dynamic content like the cart and recommended products will load in asynchronously.
- The async holes are streamed in parallel, reducing the overall load time of the page.

<Quiz
  question="What are the holes in the context of Partial Prerendering?"
  answers={[
    'Locations where JavaScript is disabled',
    'Locations where dynamic content will load asynchronously',
    'Locations where third-party scripts are loaded',
  ]}
  hint="See the diagram"
  correctAnswer="Locations where dynamic content will load asynchronously"
  explanation="That's right! Holes are locations where dynamic content will load asynchronously at request time."
/>

## How does Partial Prerendering work?

Partial Prerendering uses React's [Suspense](https://react.dev/reference/react/Suspense) (which you learned about in the previous chapter) to defer rendering parts of your application until some condition is met (e.g. data is loaded).

The Suspense fallback is embedded into the initial HTML file along with the static content. At build time (or during revalidation), the static content is **prerendered** to create a static shell. The rendering of dynamic content is **postponed** until the user requests the route.

Wrapping a component in Suspense doesn't make the component itself dynamic, but rather Suspense is used as a boundary between your static and dynamic code.

Let's see how you can implement PPR in your dashboard route.

## Implementing Partial Prerendering

Enable PPR for your Next.js app by adding the [`ppr`](https://rc.nextjs.org/docs/app/api-reference/next-config-js/ppr) option to your `next.config.mjs` file:

```js filename="next.config.ts" highlight={4-6}
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    ppr: 'incremental'
  }
};

export default nextConfig;
```

The `'incremental'` value allows you to adopt PPR for specific routes.

Next, add the `experimental_ppr` segment config option to your dashboard layout:

```tsx filename="/app/dashboard/layout.tsx" highlight={3}
import SideNav from '@/app/ui/dashboard/sidenav';

export const experimental_ppr = true;

// ...
```

That's it. You may not see a difference in your application in development, but you should notice a performance improvement in production. Next.js will prerender the static parts of your route and defer the dynamic parts until the user requests them.

The great thing about Partial Prerendering is that you don't need to change your code to use it. As long as you're using Suspense to wrap the dynamic parts of your route, Next.js will know which parts of your route are static and which are dynamic.

We believe PPR has the potential to [become the default rendering model for web applications](https://vercel.com/blog/partial-prerendering-with-next-js-creating-a-new-default-rendering-model), bringing together the best of static site and dynamic rendering. However, it is still experimental. We hope to stabilize it in the future and make it the default way of building with Next.js.

You can now revert these changes and move on to the next chapter.

## Summary

To recap, you've done a few things to optimize data fetching in your application so far:

1. Created a database in the same region as your application code to reduce latency between your server and database.
2. Fetched data on the server with React Server Components. This allows you to keep expensive data fetches and logic on the server, reduces the client-side JavaScript bundle, and prevents your database secrets from being exposed to the client.
3. Used SQL to only fetch the data you needed, reducing the amount of data transferred for each request and the amount of JavaScript needed to transform the data in-memory.
4. Parallelize data fetching with JavaScript - where it made sense to do so.
5. Implemented Streaming to prevent slow data requests from blocking your whole page, and to allow the user to start interacting with the UI without waiting for everything to load.
6. Move data fetching down to the components that need it, thus isolating which parts of your routes should be dynamic.

In the next chapter, we'll look at two common patterns you might need to implement when fetching data: search and pagination.


<!-- Source: 11-adding-search-and-pagination.mdx -->
## Adding Search and Pagination

---
title: Adding Search and Pagination
description: Add search and pagination to your dashboard application using Next.js APIs.
summary:
  current: Your dashboard now has search and pagination functionality!
  next: Learn how to mutate data with Server Actions.
---

In the previous chapter, you improved your dashboard's initial loading performance with streaming. Now let's move on to the `/invoices` page, and learn how to add search and pagination.

<InThisChapter
  topics={[
    {
      icon: 'logo-next',
      description:
        'Learn how to use the Next.js APIs: <code>useSearchParams</code>, <code>usePathname</code>, and <code>useRouter</code>.',
    },
    {
      icon: 'magnifying-glass-small',
      description: 'Implement search and pagination using URL search params.',
    },
  ]}
/>

## Starting code

Inside your `/dashboard/invoices/page.tsx` file, paste the following code:

```tsx filename="/app/dashboard/invoices/page.tsx"
import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';

export default async function Page() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      {/*  <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense> */}
      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </div>
  );
}
```

Spend some time familiarizing yourself with the page and the components you'll be working with:

1. `<Search/>` allows users to search for specific invoices.
2. `<Pagination/>` allows users to navigate between pages of invoices.
3. `<Table/>` displays the invoices.

Your search functionality will span the client and the server. When a user searches for an invoice on the client, the URL params will be updated, data will be fetched on the server, and the table will re-render on the server with the new data.

## Why use URL search params?

As mentioned above, you'll be using URL search params to manage the search state. This pattern may be new if you're used to doing it with client side state.

There are a couple of benefits of implementing search with URL params:

- **Bookmarkable and shareable URLs**: Since the search parameters are in the URL, users can bookmark the current state of the application, including their search queries and filters, for future reference or sharing.
- **Server-side rendering**: URL parameters can be directly consumed on the server to render the initial state, making it easier to handle server rendering.
- **Analytics and tracking**: Having search queries and filters directly in the URL makes it easier to track user behavior without requiring additional client-side logic.

## Adding the search functionality

These are the Next.js client hooks that you'll use to implement the search functionality:

- **`useSearchParams`**- Allows you to access the parameters of the current URL. For example, the search params for this URL `/dashboard/invoices?page=1&query=pending` would look like this: `{page: '1', query: 'pending'}`.
- **`usePathname`** - Lets you read the current URL's pathname. For example, for the route `/dashboard/invoices`, `usePathname` would return `'/dashboard/invoices'`.
- **`useRouter`** - Enables navigation between routes within client components programmatically. There are [multiple methods](/docs/app/api-reference/functions/use-router#userouter) you can use.

Here's a quick overview of the implementation steps:

1. Capture the user's input.
2. Update the URL with the search params.
3. Keep the URL in sync with the input field.
4. Update the table to reflect the search query.

### 1. Capture the user's input

Go into the `<Search>` Component (`/app/ui/search.tsx`), and you'll notice:

- `"use client"` - This is a Client Component, which means you can use event listeners and hooks.
- `<input>` - This is the search input.

Create a new `handleSearch` function, and add an `onChange` listener to the `<input>` element. `onChange` will invoke `handleSearch` whenever the input value changes.

```tsx filename="/app/ui/search.tsx" highlight={6-8, 18-20}
'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Search({ placeholder }: { placeholder: string }) {
  function handleSearch(term: string) {
    console.log(term);
  }

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
```

Verify that it's working correctly by opening the console in your browser developer tools, then type into the search field. You should see the search term logged to the browser console.

Great! You're capturing the user's search input. Now, you need to update the URL with the search term.

### 2. Update the URL with the search params

Import the `useSearchParams` hook from `next/navigation` and assign it to a variable:

```tsx filename="/app/ui/search.tsx" highlight={4,7}
'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams } from 'next/navigation';

export default function Search() {
  const searchParams = useSearchParams();

  function handleSearch(term: string) {
    console.log(term);
  }
  // ...
}
```

Inside `handleSearch,` create a new [`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) instance using your new `searchParams` variable.

```tsx filename="/app/ui/search.tsx" highlight={10}
'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams } from 'next/navigation';

export default function Search() {
  const searchParams = useSearchParams();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
  }
  // ...
}
```

`URLSearchParams` is a Web API that provides utility methods for manipulating the URL query parameters. Instead of creating a complex string literal, you can use it to get the params string like `?page=1&query=a`.

Next, `set` the params string based on the user’s input. If the input is empty, you want to `delete` it:

```tsx filename="/app/ui/search.tsx" highlight={11-15}
'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams } from 'next/navigation';

export default function Search() {
  const searchParams = useSearchParams();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
  }
  // ...
}
```

Now that you have the query string. You can use Next.js's `useRouter` and `usePathname` hooks to update the URL.

Import `useRouter` and `usePathname` from `'next/navigation'`, and use the `replace` method from `useRouter()` inside `handleSearch`:

```tsx filename="/app/ui/search.tsx" highlight={4,8-9,18}
'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }
}
```

Here's a breakdown of what's happening:

- `${pathname}` is the current path, in your case, `"/dashboard/invoices"`.
- As the user types into the search bar, `params.toString()` translates this input into a URL-friendly format.
- `replace(${pathname}?${params.toString()})` updates the URL with the user's search data. For example, `/dashboard/invoices?query=lee` if the user searches for "Lee".
- The URL is updated without reloading the page, thanks to Next.js's client-side navigation (which you learned about in the chapter on [navigating between pages](/learn/dashboard-app/navigating-between-pages).

### 3. Keeping the URL and input in sync

To ensure the input field is in sync with the URL and will be populated when sharing, you can pass a `defaultValue` to input by reading from `searchParams`:

```tsx filename="/app/ui/search.tsx" highlight={7}
<input
  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
  placeholder={placeholder}
  onChange={(e) => {
    handleSearch(e.target.value);
  }}
  defaultValue={searchParams.get('query')?.toString()}
/>
```

> **`defaultValue` vs. `value` / Controlled vs. Uncontrolled**
>
> If you're using state to manage the value of an input, you'd use the `value` attribute to make it a controlled component. This means React would manage the input's state.
>
> However, since you're not using state, you can use `defaultValue`. This means the native input will manage its own state. This is okay since you're saving the search query to the URL instead of state.

### 4. Updating the table

Finally, you need to update the table component to reflect the search query.

Navigate back to the invoices page.

Page components [accept a prop called `searchParams`](/docs/app/api-reference/file-conventions/page), so you can pass the current URL params to the `<Table>` component.

```tsx filename="/app/dashboard/invoices/page.tsx" highlight={9-17,28-30}
import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </div>
  );
}
```

If you navigate to the `<Table>` Component, you'll see that the two props, `query` and `currentPage`, are passed to the
`fetchFilteredInvoices()` function which returns the invoices that match the query.

```tsx filename="/app/ui/invoices/table.tsx"
// ...
export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const invoices = await fetchFilteredInvoices(query, currentPage);
  // ...
}
```

With these changes in place, go ahead and test it out. If you search for a term, you'll update the URL, which will send a new request to the server, data will be fetched on the server, and only the invoices that match your query will be returned.

> **When to use the `useSearchParams()` hook vs. the `searchParams` prop?**
>
> You might have noticed you used two different ways to extract search params. Whether you use one or the other depends on whether you're working on the client or the server.
>
> - `<Search>` is a Client Component, so you used the `useSearchParams()` hook to access the params from the client.
> - `<Table>` is a Server Component that fetches its own data, so you can pass the `searchParams` prop from the page to the component.
>
> As a general rule, if you want to read the params from the client, use the `useSearchParams()` hook as this avoids having to go back to the server.

### Best practice: Debouncing

Congratulations! You've implemented search with Next.js! But there's something you can do to optimize it.

Inside your `handleSearch` function, add the following `console.log`:

```tsx filename="/app/ui/search.tsx" highlight={2}
function handleSearch(term: string) {
  console.log(`Searching... ${term}`);

  const params = new URLSearchParams(searchParams);
  if (term) {
    params.set('query', term);
  } else {
    params.delete('query');
  }
  replace(`${pathname}?${params.toString()}`);
}
```

Then type "Delba" into your search bar and check the console in dev tools. What is happening?

```bash filename="Dev Tools Console"
Searching... D
Searching... De
Searching... Del
Searching... Delb
Searching... Delba
```

You're updating the URL on every keystroke, and therefore querying your database on every keystroke! This isn't a problem as our application is small, but imagine if your application had thousands of users, each sending a new request to your database on each keystroke.

**Debouncing** is a programming practice that limits the rate at which a function can fire. In our case, you only want to query the database when the user has stopped typing.

> **How Debouncing Works:**
>
> 1. **Trigger Event**: When an event that should be debounced (like a keystroke in the search box) occurs, a timer starts.
> 2. **Wait**: If a new event occurs before the timer expires, the timer is reset.
> 3. **Execution**: If the timer reaches the end of its countdown, the debounced function is executed.

You can implement debouncing in a few ways, including manually creating your own debounce function. To keep things simple, we'll use a library called [`use-debounce`](https://www.npmjs.com/package/use-debounce).

Install `use-debounce`:

```bash filename="Terminal"
pnpm i use-debounce
```

In your `<Search>` Component, import a function called `useDebouncedCallback`:

```tsx filename="/app/ui/search.tsx" highlight={2, 5, 15}
// ...
import { useDebouncedCallback } from 'use-debounce';

// Inside the Search Component...
const handleSearch = useDebouncedCallback((term) => {
  console.log(`Searching... ${term}`);

  const params = new URLSearchParams(searchParams);
  if (term) {
    params.set('query', term);
  } else {
    params.delete('query');
  }
  replace(`${pathname}?${params.toString()}`);
}, 300);
```

This function will wrap the contents of `handleSearch`, and only run the code after a specific time once the user has stopped typing (300ms).

Now type in your search bar again, and open the console in dev tools. You should see the following:

```bash filename="Dev Tools Console"
Searching... Delba
```

By debouncing, you can reduce the number of requests sent to your database, thus saving resources.

<Quiz
  answers={[
    'It speeds up database queries',
    'It makes the URL bookmarkable',
    'It prevents a new database query on every keystroke',
    'It helps in SEO optimization',
  ]}
  question="What problem does debouncing solve in the search feature?"
  hint="Check the section above!"
  correctAnswer="It prevents a new database query on every keystroke"
  explanation="That's right! Debouncing prevents a new database query on every keystroke, thus saving resources."
/>

## Adding pagination

After introducing the search feature, you'll notice the table displays only 6 invoices at a time. This is because the `fetchFilteredInvoices()` function in `data.ts` returns a maximum of 6 invoices per page.

Adding pagination allows users to navigate through the different pages to view all the invoices. Let's see how you can implement pagination using URL params, just like you did with search.

Navigate to the `<Pagination/>` component and you'll notice that it's a Client Component. You don't want to fetch data on the client as this would expose your database secrets (remember, you're not using an API layer). Instead, you can fetch the data on the server, and pass it to the component as a prop.

In `/dashboard/invoices/page.tsx`, import a new function called `fetchInvoicesPages` and pass the `query` from `searchParams` as an argument:

```tsx filename="/app/dashboard/invoices/page.tsx" highlight={2,15}
// ...
import { fetchInvoicesPages } from '@/app/lib/data';

export default async function Page(
  props: {
    searchParams?: Promise<{
      query?: string;
      page?: string;
    }>;
  }
) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicesPages(query);

  return (
    // ...
  );
}
```

`fetchInvoicesPages` returns the total number of pages based on the search query. For example, if there are 12 invoices that match the search query, and each page displays 6 invoices, then the total number of pages would be 2.

Next, pass the `totalPages` prop to the `<Pagination/>` component:

```tsx filename="/app/dashboard/invoices/page.tsx" highlight={27}
// ...

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
```

Navigate to the `<Pagination/>` component and import the `usePathname` and `useSearchParams` hooks. We will use this to get the current page and set the new page. Make sure to also uncomment the code in this component. Your application will break temporarily as you haven't implemented the `<Pagination/>` logic yet. Let's do that now!

```tsx filename="/app/ui/invoices/pagination.tsx" highlight={7,10-12}
'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { generatePagination } from '@/app/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  // ...
}
```

Next, create a new function inside the `<Pagination>` Component called `createPageURL`. Similarly to the search, you'll use `URLSearchParams` to set the new page number, and `pathName` to create the URL string.

```tsx filename="/app/ui/invoices/pagination.tsx" highlight={14-18}
'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { generatePagination } from '@/app/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  // ...
}
```

Here's a breakdown of what's happening:

- `createPageURL` creates an instance of the current search parameters.
- Then, it updates the "page" parameter to the provided page number.
- Finally, it constructs the full URL using the pathname and updated search parameters.

The rest of the `<Pagination>` component deals with styling and different states (first, last, active, disabled, etc). We won't go into detail for this course, but feel free to look through the code to see where `createPageURL` is being called.

Finally, when the user types a new search query, you want to reset the page number to 1. You can do this by updating the `handleSearch` function in your `<Search>` component:

```tsx filename="/app/ui/search.tsx" highlight={14}
'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

```

## Summary

Congratulations! You've just implemented search and pagination using URL search params and Next.js APIs.

To summarize, in this chapter:

- You've handled search and pagination with URL search parameters instead of client state.
- You've fetched data on the server.
- You're using the `useRouter` router hook for smoother, client-side transitions.

These patterns are different from what you may be used to when working with client-side React, but hopefully, you now better understand the benefits of using URL search params and lifting this state to the server.


<!-- Source: 12-mutating-data.mdx -->
## Mutating Data

---
title: Mutating Data
description: Mutate data using React Server Actions, and revalidate the Next.js cache.
summary:
  current: Congratulations! You learned how to mutate data using forms and React Server Actions.
  next: Let's explore best practices for mutating data with forms, including error handling and accessibility.
---

In the previous chapter, you implemented search and pagination using URL Search Params and Next.js APIs. Let's continue working on the Invoices page by adding the ability to create, update, and delete invoices!

<InThisChapter
  topics={[
    {
      icon: 'logo-react',
      description:
        'What React Server Actions are and how to use them to mutate data.',
    },
    {
      icon: 'file-text',
      description: 'How to work with forms and Server Components.',
    },
    {
      icon: 'data-point',
      description:
        'Best practices for working with the native <code>FormData</code> object, including type validation.',
    },
    {
      icon: 'refresh-clockwise',
      description:
        'How to revalidate the client cache using the <code>revalidatePath</code> API.',
    },
    {
      icon: 'route',
      description: 'How to create dynamic route segments with specific IDs.',
    },
  ]}
/>

## What are Server Actions?

React Server Actions allow you to run asynchronous code directly on the server. They eliminate the need to create API endpoints to mutate your data. Instead, you write asynchronous functions that execute on the server and can be invoked from your Client or Server Components.

Security is a top priority for web applications, as they can be vulnerable to various threats. This is where Server Actions come in. They include features like encrypted closures, strict input checks, error message hashing, host restrictions, and more — all working together to significantly enhance your application security.

## Using forms with Server Actions

In React, you can use the `action` attribute in the `<form>` element to invoke actions. The action will automatically receive the native [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) object, containing the captured data.

For example:

```tsx
// Server Component
export default function Page() {
  // Action
  async function create(formData: FormData) {
    'use server';

    // Logic to mutate data...
  }

  // Invoke the action using the "action" attribute
  return <form action={create}>...</form>;
}
```

An advantage of invoking a Server Action within a Server Component is progressive enhancement - forms work even if JavaScript has not yet loaded on the client. For example, without slower internet connections.

## Next.js with Server Actions

Server Actions are also deeply integrated with Next.js [caching](https://nextjs.org/docs/app/building-your-application/caching). When a form is submitted through a Server Action, not only can you use the action to mutate data, but you can also revalidate the associated cache using APIs like `revalidatePath` and `revalidateTag`.

<Quiz
  answers={[
    'Improved SEO.',
    'Progressive Enhancement.',
    'Faster Websites.',
    'Data Encryption.',
  ]}
  question="What's one benefit of using a Server Actions?"
  hint="We give you the answer a few sentences above!"
  correctAnswer="Progressive Enhancement."
  explanation="That's right! This allows users to interact with the form and submit data even if the JavaScript for the form hasn't been loaded yet or if it fails to load."
/>

Let's see how it all works together!

## Creating an invoice

Here are the steps you'll take to create a new invoice:

1. Create a form to capture the user's input.
2. Create a Server Action and invoke it from the form.
3. Inside your Server Action, extract the data from the `formData` object.
4. Validate and prepare the data to be inserted into your database.
5. Insert the data and handle any errors.
6. Revalidate the cache and redirect the user back to invoices page.

### 1. Create a new route and form

To start, inside the `/invoices` folder, add a new route segment called `/create` with a `page.tsx` file:

<Image
  alt="Invoices folder with a nested create folder, and a page.tsx file inside it"
  srcLight="/learn/light/create-invoice-route.png"
  srcDark="/learn/dark/create-invoice-route.png"
  width="1600"
  height="363"
/>

You'll be using this route to create new invoices. Inside your `page.tsx` file, paste the following code, then spend some time studying it:

```tsx filename="/dashboard/invoices/create/page.tsx"
import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';

export default async function Page() {
  const customers = await fetchCustomers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Create Invoice',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}
```

Your page is a Server Component that fetches `customers` and passes it to the `<Form>` component. To save time, we've already created the `<Form>` component for you.

Navigate to the `<Form>` component, and you'll see that the form:

- Has one `<select>` (dropdown) element with a list of **customers**.
- Has one `<input>` element for the **amount** with `type="number"`.
- Has two `<input>` elements for the status with `type="radio"`.
- Has one button with `type="submit"`.

On http://localhost:3000/dashboard/invoices/create, you should see the following UI:

<Image
  alt="Create invoices page with breadcrumbs and form"
  srcLight="/learn/light/create-invoice-page.png"
  srcDark="/learn/dark/create-invoice-page.png"
  width="960"
  height="563"
/>

### 2. Create a Server Action

Great, now let's create a Server Action that is going to be called when the form is submitted.

Navigate to your `lib/` directory and create a new file named `actions.ts`. At the top of this file, add the React [`use server`](https://react.dev/reference/react/use-server) directive:

```tsx filename="/app/lib/actions.ts"
'use server';
```

By adding the `'use server'`, you mark all the exported functions within the file as Server Actions. These server functions can then be imported and used in Client and Server components. Any functions included in this file that are _not_ used will be automatically removed from the final application bundle.

You can also write Server Actions directly inside Server Components by adding `"use server"` inside the action. But for this course, we'll keep them all organized in a separate file. We recommend having a separate file for your actions.

In your `actions.ts` file, create a new async function that accepts `formData`:

```tsx filename="/app/lib/actions.ts" highlight={3}
'use server';

export async function createInvoice(formData: FormData) {}
```

Then, in your `<Form>` component, import the `createInvoice` from your `actions.ts` file. Add a `action` attribute to the `<form>` element, and call the `createInvoice` action.

```tsx filename="/app/ui/invoices/create-form.tsx" highlight={10,18}
import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createInvoice } from '@/app/lib/actions';

export default function Form({
  customers,
}: {
  customers: CustomerField[];
}) {
  return (
    <form action={createInvoice}>
      // ...
  )
}
```

> **Good to know**:
> In HTML, you'd pass a URL to the `action` attribute. This URL would be the destination where your form data should be submitted (usually an API endpoint).
>
> However, in React, the `action` attribute is considered a special prop - meaning React builds on top of it to allow actions to be invoked.
>
> Behind the scenes, Server Actions create a `POST` API endpoint. This is why you don't need to create API endpoints manually when using Server Actions.

### 3. Extract the data from `formData`

Back in your `actions.ts` file, you'll need to extract the values of `formData`, there are a [couple of methods](https://developer.mozilla.org/en-US/docs/Web/API/FormData) you can use. For this example, let's use the [`.get(name)`](https://developer.mozilla.org/en-US/docs/Web/API/FormData/get) method.

```tsx filename="/app/lib/actions.ts" highlight={3,4-10}
'use server';

export async function createInvoice(formData: FormData) {
  const rawFormData = {
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  };
  // Test it out:
  console.log(rawFormData);
}
```

> **Tip:** If you're working with forms that have many fields, you may want to consider using the [`entries()`](https://developer.mozilla.org/en-US/docs/Web/API/FormData/entries) method with JavaScript's [`Object.fromEntries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries).

To check everything is connected correctly, try out the form. After submitting, you should see the data you just entered into the form logged in your **terminal** (not the browser).

Now that your data is in the shape of an object, it'll be much easier to work with.

### 4. Validate and prepare the data

Before sending the form data to your database, you want to ensure it's in the correct format and with the correct types. If you remember from earlier in the course, your invoices table expects data in the following format:

```tsx filename="/app/lib/definitions.ts"
export type Invoice = {
  id: string; // Will be created on the database
  customer_id: string;
  amount: number; // Stored in cents
  status: 'pending' | 'paid';
  date: string;
};
```

So far, you only have the `customer_id`, `amount`, and `status` from the form.

#### Type validation and coercion

It's important to validate that the data from your form aligns with the expected types in your database. For instance, if you add a `console.log` inside your action:

```tsx
console.log(typeof rawFormData.amount);
```

You'll notice that `amount` is of type `string` and not `number`. This is because `input` elements with `type="number"` actually return a string, not a number!

To handle type validation, you have a few options. While you can manually validate types, using a type validation library can save you time and effort. For your example, we'll use [Zod](https://zod.dev/), a TypeScript-first validation library that can simplify this task for you.

In your `actions.ts` file, import Zod and define a schema that matches the shape of your form object. This schema will validate the `formData` before saving it to a database.

```tsx filename="/app/lib/actions.ts" highlight={3,5-11,13}
'use server';

import { z } from 'zod';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  // ...
}
```

The `amount` field is specifically set to coerce (change) from a string to a number while also validating its type.

You can then pass your `rawFormData` to `CreateInvoice` to validate the types:

```tsx filename="/app/lib/actions.ts" highlight={3}
// ...
export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
}
```

#### Storing values in cents

It's usually good practice to store monetary values in cents in your database to eliminate JavaScript floating-point errors and ensure greater accuracy.

Let's convert the amount into cents:

```tsx filename="/app/lib/actions.ts" highlight={8}
// ...
export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  const amountInCents = amount * 100;
}
```

#### Creating new dates

Finally, let's create a new date with the format "YYYY-MM-DD" for the invoice's creation date:

```tsx filename="/app/lib/actions.ts" highlight={9}
// ...
export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];
}
```

### 5. Inserting the data into your database

Now that you have all the values you need for your database, you can create an SQL query to insert the new invoice into your database and pass in the variables:

```tsx filename="/app/lib/actions.ts" highlight={2,15-18}
import { z } from 'zod';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// ...

export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;
}
```

Right now, we're not handling any errors. We'll talk about this in the next chapter. For now, let's move on to the next step.

### 6. Revalidate and redirect

Next.js has a client-side router cache that stores the route segments in the user's browser for a time. Along with [prefetching](/docs/app/building-your-application/routing/linking-and-navigating#1-prefetching), this cache ensures that users can quickly navigate between routes while reducing the number of requests made to the server.

Since you're updating the data displayed in the invoices route, you want to clear this cache and trigger a new request to the server. You can do this with the [`revalidatePath`](/docs/app/api-reference/functions/revalidatePath) function from Next.js:

```tsx filename="/app/lib/actions.ts" highlight={5,23}
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// ...

export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;

  revalidatePath('/dashboard/invoices');
}
```

Once the database has been updated, the `/dashboard/invoices` path will be revalidated, and fresh data will be fetched from the server.

At this point, you also want to redirect the user back to the `/dashboard/invoices` page. You can do this with the [`redirect`](/docs/app/api-reference/functions/redirect) function from Next.js:

```tsx filename="/app/lib/actions.ts" highlight={6,14}
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// ...

export async function createInvoice(formData: FormData) {
  // ...

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}
```

Congratulations! You've just implemented your first Server Action. Test it out by adding a new invoice, if everything is working correctly:

1. You should be redirected to the `/dashboard/invoices` route on submission.
2. You should see the new invoice at the top of the table.

## Updating an invoice

The updating invoice form is similar to the create an invoice form, except you'll need to pass the invoice `id` to update the record in your database. Let's see how you can get and pass the invoice `id`.

These are the steps you'll take to update an invoice:

1. Create a new dynamic route segment with the invoice `id`.
2. Read the invoice `id` from the page params.
3. Fetch the specific invoice from your database.
4. Pre-populate the form with the invoice data.
5. Update the invoice data in your database.

### 1. Create a Dynamic Route Segment with the invoice `id`

Next.js allows you to create [Dynamic Route Segments](/docs/app/building-your-application/routing/dynamic-routes) when you don't know the exact segment name and want to create routes based on data. This could be blog post titles, product pages, etc. You can create dynamic route segments by wrapping a folder's name in square brackets. For example, `[id]`, `[post]` or `[slug]`.

In your `/invoices` folder, create a new dynamic route called `[id]`, then a new route called `edit` with a `page.tsx` file. Your file structure should look like this:

<Image
  alt="Invoices folder with a nested [id] folder, and an edit folder inside it"
  srcLight="/learn/light/edit-invoice-route.png"
  srcDark="/learn/dark/edit-invoice-route.png"
  width="1600"
  height="444"
/>

In your `<Table>` component, notice there's a `<UpdateInvoice />` button that receives the invoice's `id` from the table records.

```tsx filename="/app/ui/invoices/table.tsx" highlight={11}
export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  return (
    // ...
    <td className="flex justify-end gap-2 whitespace-nowrap px-6 py-4 text-sm">
      <UpdateInvoice id={invoice.id} />
      <DeleteInvoice id={invoice.id} />
    </td>
    // ...
  );
}
```

Navigate to your `<UpdateInvoice />` component, and update the `href` of the `Link` to accept the `id` prop. You can use template literals to link to a dynamic route segment:

```tsx filename="/app/ui/invoices/buttons.tsx" highlight={9}
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

// ...

export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/invoices/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}
```

### 2. Read the invoice `id` from page `params`

Back on your `<Page>` component, paste the following code:

```tsx filename="/app/dashboard/invoices/[id]/edit/page.tsx"
import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}
```

Notice how it's similar to your `/create` invoice page, except it imports a different form (from the `edit-form.tsx` file). This form should be **pre-populated** with a `defaultValue` for the customer's name, invoice amount, and status. To pre-populate the form fields, you need to fetch the specific invoice using `id`.

In addition to `searchParams`, page components also accept a prop called `params` which you can use to access the `id`. Update your `<Page>` component to receive the prop:

```tsx filename="/app/dashboard/invoices/[id]/edit/page.tsx" highlight={5-6}
import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  // ...
}
```

### 3. Fetch the specific invoice

Then:

- Import a new function called `fetchInvoiceById` and pass the `id` as an argument.
- Import `fetchCustomers` to fetch the customer names for the dropdown.

You can use `Promise.all` to fetch both the invoice and customers in parallel:

```tsx filename="/dashboard/invoices/[id]/edit/page.tsx" highlight={3,8-11}
import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);
  // ...
}
```

You will see a temporary TypeScript error for the `invoice` prop in your terminal because `invoice` could be potentially `undefined`. Don't worry about it for now, you'll resolve it in the next chapter when you add error handling.

Great! Now, test that everything is wired correctly. Visit http://localhost:3000/dashboard/invoices and click on the Pencil icon to edit an invoice. After navigation, you should see a form that is pre-populated with the invoice details:

<Image
  alt="Edit invoices page with breadcrumbs and form"
  srcLight="/learn/light/edit-invoice-page.png"
  srcDark="/learn/dark/edit-invoice-page.png"
  width="960"
  height="563"
/>

The URL should also be updated with an `id` as follows: `http://localhost:3000/dashboard/invoice/uuid/edit`

> **UUIDs vs. Auto-incrementing Keys**
>
> We use UUIDs instead of incrementing keys (e.g., 1, 2, 3, etc.). This makes the URL longer; however, UUIDs eliminate the risk of ID collision, are globally unique, and reduce the risk of enumeration attacks - making them ideal for large databases.
>
> However, if you prefer cleaner URLs, you might prefer to use auto-incrementing keys.

### 4. Pass the `id` to the Server Action

Lastly, you want to pass the `id` to the Server Action so you can update the right record in your database. You **cannot** pass the `id` as an argument like so:

```tsx filename="/app/ui/invoices/edit-form.tsx"
// Passing an id as argument won't work
<form action={updateInvoice(id)}>
```

Instead, you can pass `id` to the Server Action using JS `bind`. This will ensure that any values passed to the Server Action are encoded.

```tsx filename="/app/ui/invoices/edit-form.tsx" highlight={2,11,13}
// ...
import { updateInvoice } from '@/app/lib/actions';

export default function EditInvoiceForm({
  invoice,
  customers,
}: {
  invoice: InvoiceForm;
  customers: CustomerField[];
}) {
  const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);

  return <form action={updateInvoiceWithId}>{/* ... */}</form>;
}
```

> **Note:** Using a hidden input field in your form also works (e.g. `<input type="hidden" name="id" value={invoice.id} />`). However, the values will appear as full text in the HTML source, which is not ideal for sensitive data.

Then, in your `actions.ts` file, create a new action, `updateInvoice`:

```tsx filename="/app/lib/actions.ts"
// Use Zod to update the expected types
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

// ...

export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  const amountInCents = amount * 100;

  await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}
```

Similarly to the `createInvoice` action, here you are:

1. Extracting the data from `formData`.
2. Validating the types with Zod.
3. Converting the amount to cents.
4. Passing the variables to your SQL query.
5. Calling `revalidatePath` to clear the client cache and make a new server request.
6. Calling `redirect` to redirect the user to the invoice's page.

Test it out by editing an invoice. After submitting the form, you should be redirected to the invoices page, and the invoice should be updated.

## Deleting an invoice

To delete an invoice using a Server Action, wrap the delete button in a `<form>` element and pass the `id` to the Server Action using `bind`:

```tsx filename="/app/ui/invoices/buttons.tsx" highlight={1,6,9}
import { deleteInvoice } from '@/app/lib/actions';

// ...

export function DeleteInvoice({ id }: { id: string }) {
  const deleteInvoiceWithId = deleteInvoice.bind(null, id);

  return (
    <form action={deleteInvoiceWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4" />
      </button>
    </form>
  );
}
```

Inside your `actions.ts` file, create a new action called `deleteInvoice`.

```tsx filename="/app/lib/actions.ts"
export async function deleteInvoice(id: string) {
  await sql`DELETE FROM invoices WHERE id = ${id}`;
  revalidatePath('/dashboard/invoices');
}
```

Since this action is being called in the `/dashboard/invoices` path, you don't need to call `redirect`. Calling `revalidatePath` will trigger a new server request and re-render the table.

## Further reading

In this chapter, you learned how to use Server Actions to mutate data. You also learned how to use the `revalidatePath` API to revalidate the Next.js cache and `redirect` to redirect the user to a new page.

You can also read more about [security with Server Actions](https://nextjs.org/blog/security-nextjs-server-components-actions) for additional learning.


<!-- Source: 13-error-handling.mdx -->
## Handling Errors

---
title: Handling Errors
description: Handle errors gracefully with error.tsx and notFound.
summary:
  current: Nice, you're now able to handle errors gracefully in your application.
  next: Let's continue exploring ways to improve your user's experience. You'll learn about server-side form validation and improving accessibility.
---

In the previous chapter, you learned how to mutate data using Server Actions. Let's see how you can handle errors _gracefully_ using JavaScript's `try/catch` statements and Next.js APIs for uncaught exceptions.

<InThisChapter
  topics={[
    {
      icon: 'shield-off',
      description:
        'How to use the special <code>error.tsx</code> file to catch errors in your route segments, and show a fallback UI to the user.',
    },
    {
      icon: 'warning',
      description:
        'How to use the <code>notFound</code> function and <code>not-found</code> file to handle 404 errors (for resources that don’t exist).',
    },
  ]}
/>

## Adding `try/catch` to Server Actions

First, let's add JavaScript's `try/catch` statements to your Server Actions to allow you to handle errors gracefully.

If you know how to do this, spend a few minutes updating your Server Actions, or you can copy the code below:

<Reveal>

```tsx filename="/app/lib/actions.ts"
export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    // We'll log the error to the console for now
    console.error(error);
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}
```

</Reveal>

<Reveal>

```tsx filename="/app/lib/actions.ts"
export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  const amountInCents = amount * 100;

  try {
    await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
      `;
  } catch (error) {
    // We'll log the error to the console for now
    console.error(error);
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}
```

</Reveal>

Note how `redirect` is being called outside of the `try/catch` block. This is because `redirect` works by throwing an error, which would be caught by the `catch` block. To avoid this, you can call `redirect` **after** `try/catch`. `redirect` would only be reachable if `try` is successful.

We're gracefully handling these errors by catching the database issue, and returning a helpful message from our Server Action.

What happens if there is an uncaught exception in your action? We can simulate this by manually throwing an error. For example, in the `deleteInvoice` action, throw an error at the top of the function:

```tsx filename="/app/lib/actions.ts" highlight={2}
export async function deleteInvoice(id: string) {
  throw new Error('Failed to Delete Invoice');

  // Unreachable code block
  await sql`DELETE FROM invoices WHERE id = ${id}`;
  revalidatePath('/dashboard/invoices');
}
```

When you try to delete an invoice, you should see the error on localhost. When going to production, you want to more gracefully show a message to the user when something unexpected happens.

This is where Next.js [`error.tsx`](https://nextjs.org/docs/app/api-reference/file-conventions/error) file comes in. Ensure that you remove this manually added error after testing and before moving onto the next section.

## Handling all errors with `error.tsx`

The `error.tsx` file can be used to define a UI boundary for a route segment. It serves as a **catch-all** for unexpected errors and allows you to display a fallback UI to your users.

Inside your `/dashboard/invoices` folder, create a new file called `error.tsx` and paste the following code:

```tsx filename="/dashboard/invoices/error.tsx"
'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">Something went wrong!</h2>
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset()
        }
      >
        Try again
      </button>
    </main>
  );
}
```

There are a few things you'll notice about the code above:

- **"use client"** - `error.tsx` needs to be a Client Component.
- It accepts two props:
  - `error`: This object is an instance of JavaScript's native [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) object.
  - `reset`: This is a function to reset the error boundary. When executed, the function will try to re-render the route segment.

When you try to delete an invoice again, you should see the following UI:

<Image
  alt="The error.tsx file showing the props it accepts"
  srcLight="/learn/light/error-page.png"
  srcDark="/learn/dark/error-page.png"
  width="960"
  height="568"
/>

## Handling 404 errors with the `notFound` function

Another way you can handle errors gracefully is by using the `notFound` function. While `error.tsx` is useful for catching uncaught exceptions, `notFound` can be used when you try to fetch a resource that doesn't exist.

For example, visit http://localhost:3000/dashboard/invoices/2e94d1ed-d220-449f-9f11-f0bbceed9645/edit.

This is a fake UUID that doesn't exist in your database.

You'll immediately see `error.tsx` kicks in because this is a child route of `/invoices` where `error.tsx` is defined.

However, if you want to be more specific, you can show a 404 error to tell the user the resource they're trying to access hasn't been found.

You can confirm that the resource hasn't been found by going into your `fetchInvoiceById` function in `data.ts`, and console logging the returned `invoice`:

```tsx filename="/app/lib/data.ts" highlight={6}
export async function fetchInvoiceById(id: string) {
  try {
    // ...

    console.log(invoice); // Invoice is an empty array []
    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}
```

Now that you know the invoice doesn't exist in your database, let's use `notFound` to handle it. Navigate to `/dashboard/invoices/[id]/edit/page.tsx`, and import `{ notFound }` from `'next/navigation'`.

Then, you can use a conditional to invoke `notFound` if the invoice doesn't exist:

```tsx filename="/dashboard/invoices/[id]/edit/page.tsx" highlight={3,12-14}
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  if (!invoice) {
    notFound();
  }

  // ...
}
```

Then, to show error UI to the user, create a `not-found.tsx` file inside the `/edit` folder.

<Image
  alt="The not-found.tsx file inside the edit folder"
  srcLight="/learn/light/not-found-file.png"
  srcDark="/learn/dark/not-found-file.png"
  width="1600"
  height="525"
/>

Inside the `not-found.tsx` file, paste the following the code:

```tsx filename="/dashboard/invoices/[id]/edit/not-found.tsx"
import Link from 'next/link';
import { FaceFrownIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <FaceFrownIcon className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the requested invoice.</p>
      <Link
        href="/dashboard/invoices"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        Go Back
      </Link>
    </main>
  );
}
```

Refresh the route, and you should now see the following UI:

<Image
  alt="404 Not Found Page"
  srcLight="/learn/light/404-not-found-page.png"
  srcDark="/learn/dark/404-not-found-page.png"
  width="960"
  height="568"
/>

That's something to keep in mind, `notFound` will take precedence over `error.tsx`, so you can reach out for it when you want to handle more specific errors!

<Quiz
  answers={['404.tsx', 'not-found.tsx', 'error.tsx', 'catch-all.tsx']}
  question="Which file in Next.js serves as a catch-all for unexpected errors in your route segments?"
  hint="The answer is in the question!"
  correctAnswer="error.tsx"
  explanation="The `error.tsx` file serves as a catch-all for unexpected errors and allows you to display a fallback UI to your users."
/>

## Further reading

To learn more about error handling in Next.js, check out the following documentation:

- [Error Handling](https://nextjs.org/docs/app/building-your-application/routing/error-handling)
- [`error.js` API Reference](https://nextjs.org/docs/app/api-reference/file-conventions/error)
- [`notFound()` API Reference](https://nextjs.org/docs/app/api-reference/functions/not-found)
- [`not-found.js` API Reference](https://nextjs.org/docs/app/api-reference/file-conventions/not-found)


<!-- Source: 14-improving-accessibility.mdx -->
## Improving Accessibility

---
title: Improving Accessibility
description: Implement server-side form validation and improve accessibility in your forms.
summary:
  current: Great, you've learned how to improve accessibility in your forms with React Form Status and Server-side Validation.
  next: Your application is almost ready, in the next chapter, you'll learn how to add authentication to your application using NextAuth.js.
---

In the previous chapter, we looked at how to catch errors (including 404 errors) and display a fallback to the user. However, we still need to discuss another piece of the puzzle: form validation. Let's see how to implement server-side validation with Server Actions, and how you can show form errors using React's [`useActionState`](https://react.dev/reference/react/useActionState) hook - while keeping accessibility in mind!

<InThisChapter
  topics={[
    {
      icon: 'accessibility',
      description:
        'How to use <code>eslint-plugin-jsx-a11y</code> with Next.js to implement accessibility best practices.',
    },
    {
      icon: 'file-text',
      description: 'How to implement server-side form validation.',
    },
    {
      icon: 'logo-react',
      description:
        'How to use the React <code>useActionState</code> hook to handle form errors, and display them to the user.',
    },
  ]}
/>

## What is accessibility?

Accessibility refers to designing and implementing web applications that everyone can use, including those with disabilities. It's a vast topic that covers many areas, such as keyboard navigation, semantic HTML, images, colors, videos, etc.

While we won't go in-depth into accessibility in this course, we'll discuss the accessibility features available in Next.js and some common practices to make your applications more accessible.

> If you'd like to learn more about accessibility, we recommend the [Learn Accessibility](https://web.dev/learn/accessibility/) course by [web.dev](https://web.dev/).

## Using the ESLint accessibility plugin in Next.js

Next.js includes the [`eslint-plugin-jsx-a11y`](https://www.npmjs.com/package/eslint-plugin-jsx-a11y) plugin in its ESLint config to help catch accessibility issues early. For example, this plugin warns if you have images without `alt` text, use the `aria-*` and `role` attributes incorrectly, and more.

Optionally, if you would like to try this out, add `next lint` as a script in your `package.json` file:

```tsx filename="/package.json" highlight={5}
"scripts": {
    "build": "next build",
    "dev": "next dev",
    "start": "next start",
    "lint": "next lint"
},
```

Then run `pnpm lint` in your terminal:

```bash filename="Terminal"
pnpm lint
```

This will guide you through installing and configuring ESLint for your project. If you were to run `pnpm lint` now, you should see the following output:

```bash filename="Terminal"
✔ No ESLint warnings or errors
```

However, what would happen if you had an image without `alt` text? Let's find out!

Go to `/app/ui/invoices/table.tsx` and remove the `alt` prop from the image. You can use your editor's search feature to quickly find the `<Image>`:

```tsx filename="/app/ui/invoices/table.tsx" highlight={6}
<Image
  src={invoice.image_url}
  className="rounded-full"
  width={28}
  height={28}
  alt={`${invoice.name}'s profile picture`} // Delete this line
/>
```

Now run `pnpm lint` again, and you should see the following warning:

```bash filename="Terminal"
./app/ui/invoices/table.tsx
45:25  Warning: Image elements must have an alt prop,
either with meaningful text, or an empty string for decorative images. jsx-a11y/alt-text
```

While adding and configuring a linter is not a required step, it can be helpful to catch accessibility issues in your development process.

## Improving form accessibility

There are three things we're already doing to improve accessibility in our forms:

- **Semantic HTML**: Using semantic elements (`<input>`, `<option>`, etc) instead of `<div>`. This allows assistive technologies (AT) to focus on the input elements and provide appropriate contextual information to the user, making the form easier to navigate and understand.
- **Labelling**: Including `<label>` and the `htmlFor` attribute ensures that each form field has a descriptive text label. This improves AT support by providing context and also enhances usability by allowing users to click on the label to focus on the corresponding input field.
- **Focus Outline**: The fields are properly styled to show an outline when they are in focus. This is critical for accessibility as it visually indicates the active element on the page, helping both keyboard and screen reader users to understand where they are on the form. You can verify this by pressing `tab`.

These practices lay a good foundation for making your forms more accessible to many users. However, they don't address **form validation** and **errors**.

## Form validation

Go to http://localhost:3000/dashboard/invoices/create, and submit an empty form. What happens?

You get an error! This is because you're sending empty form values to your Server Action. You can prevent this by validating your form on the client or the server.

### Client-Side validation

There are a couple of ways you can validate forms on the client. The simplest would be to rely on the form validation provided by the browser by adding the `required` attribute to the `<input>` and `<select>` elements in your forms. For example:

```tsx filename="/app/ui/invoices/create-form.tsx" highlight={7}
<input
  id="amount"
  name="amount"
  type="number"
  placeholder="Enter USD amount"
  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
  required
/>
```

Submit the form again. The browser will display a warning if you try to submit a form with empty values.

This approach is generally okay because some ATs support browser validation.

An alternative to client-side validation is server-side validation. Let's see how you can implement it in the next section. For now, delete the `required` attributes if you added them.

### Server-Side validation

By validating forms on the server, you can:

- Ensure your data is in the expected format before sending it to your database.
- Reduce the risk of malicious users bypassing client-side validation.
- Have one source of truth for what is considered _valid_ data.

In your `create-form.tsx` component, import the `useActionState` hook from `react`. Since `useActionState` is a hook, you will need to turn your form into a Client Component using `"use client"` directive:

```tsx filename="/app/ui/invoices/create-form.tsx" highlight={1,4}
'use client';

// ...
import { useActionState } from 'react';
```

Inside your Form Component, the `useActionState` hook:

- Takes two arguments: `(action, initialState)`.
- Returns two values: `[state, formAction]` - the form state, and a function to be called when the form is submitted.

Pass your `createInvoice` action as an argument of `useActionState`, and inside your `<form action={}>` attribute, call `formAction`.

```tsx filename="/app/ui/invoices/create-form.tsx" highlight={5,7}
// ...
import { useActionState } from 'react';

export default function Form({ customers }: { customers: CustomerField[] }) {
  const [state, formAction] = useActionState(createInvoice, initialState);

  return <form action={formAction}>...</form>;
}
```

The `initialState` can be anything you define, in this case, create an object with two empty keys: `message` and `errors`, and import the `State` type from your `actions.ts` file. `State` does not yet exist, but we will create it next:

```tsx filename="/app/ui/invoices/create-form.tsx" highlight={2,6}
// ...
import { createInvoice, State } from '@/app/lib/actions';
import { useActionState } from 'react';

export default function Form({ customers }: { customers: CustomerField[] }) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createInvoice, initialState);

  return <form action={formAction}>...</form>;
}
```

This may seem confusing initially, but it'll make more sense once you update the server action. Let's do that now.

In your `action.ts` file, you can use Zod to validate form data. Update your `FormSchema` as follows:

```tsx filename="/app/lib/actions.ts" highlight={4,8,10}
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});
```

- `customerId` - Zod already throws an error if the customer field is empty as it expects a type `string`. But let's add a friendly message if the user doesn't select a customer.
- `amount` - Since you are coercing the amount type from `string` to `number`, it'll default to zero if the string is empty. Let's tell Zod we always want the amount greater than 0 with the `.gt()` function.
- `status` - Zod already throws an error if the status field is empty as it expects "pending" or "paid". Let's also add a friendly message if the user doesn't select a status.

Next, update your `createInvoice` action to accept two parameters - `prevState` and `formData`:

```tsx filename="/app/lib/actions.ts" highlight={1-8,10}
export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createInvoice(prevState: State, formData: FormData) {
  // ...
}
```

- `formData` - same as before.
- `prevState` - contains the state passed from the `useActionState` hook. You won't be using it in the action in this example, but it's a required prop.

Then, change the Zod `parse()` function to `safeParse()`:

```tsx filename="/app/lib/actions.ts" highlight={3}
export async function createInvoice(prevState: State, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  // ...
}
```

`safeParse()` will return an object containing either a `success` or `error` field. This will help handle validation more gracefully without having put this logic inside the `try/catch` block.

Before sending the information to your database, check if the form fields were validated correctly with a conditional:

```tsx filename="/app/lib/actions.ts" highlight={10-15}
export async function createInvoice(prevState: State, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  // ...
}
```

If `validatedFields` isn't successful, we return the function early with the error messages from Zod.

> **Tip:** console.log `validatedFields` and submit an empty form to see the shape of it.

Finally, since you're handling form validation separately, outside your try/catch block, you can return a specific message for any database errors, your final code should look like this:

```tsx filename="/app/lib/actions.ts"
export async function createInvoice(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  // Insert data into the database
  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}
```

Great, now let's display the errors in your form component. Back in the `create-form.tsx` component, you can access the errors using the form `state`.

Add a **ternary operator** that checks for each specific error. For example, after the customer's field, you can add:

```tsx filename="/app/ui/invoices/create-form.tsx" highlight={14,27-34}
<form action={formAction}>
  <div className="rounded-md bg-gray-50 p-4 md:p-6">
    {/* Customer Name */}
    <div className="mb-4">
      <label htmlFor="customer" className="mb-2 block text-sm font-medium">
        Choose customer
      </label>
      <div className="relative">
        <select
          id="customer"
          name="customerId"
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          defaultValue=""
          aria-describedby="customer-error"
        >
          <option value="" disabled>
            Select a customer
          </option>
          {customers.map((name) => (
            <option key={name.id} value={name.id}>
              {name.name}
            </option>
          ))}
        </select>
        <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
      </div>
      <div id="customer-error" aria-live="polite" aria-atomic="true">
        {state.errors?.customerId &&
          state.errors.customerId.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </div>
    // ...
  </div>
</form>
```

> **Tip:** You can console.log `state` inside your component and check if everything is wired correctly. Check the console in Dev Tools as your form is now a Client Component.

In the code above, you're also adding the following aria labels:

- `aria-describedby="customer-error"`: This establishes a relationship between the `select` element and the error message container. It indicates that the container with `id="customer-error"` describes the `select` element. Screen readers will read this description when the user interacts with the `select` box to notify them of errors.
- `id="customer-error"`: This `id` attribute uniquely identifies the HTML element that holds the error message for the `select` input. This is necessary for `aria-describedby` to establish the relationship.
- `aria-live="polite"`: The screen reader should politely notify the user when the error inside the `div` is updated. When the content changes (e.g. when a user corrects an error), the screen reader will announce these changes, but only when the user is idle so as not to interrupt them.

# Practice: Adding aria labels

Using the example above, add errors to your remaining form fields. You should also show a message at the bottom of the form if any fields are missing. Your UI should look like this:

<Image
  alt="Create invoice form showing error messages for each field."
  srcLight="/learn/light/form-validation-page.png"
  srcDark="/learn/dark/form-validation-page.png"
  width="960"
  height="568"
/>

Once you're ready, run `pnpm lint` to check if you're using the aria labels correctly.

If you'd like to challenge yourself, take the knowledge you've learned in this chapter and add form validation to the `edit-form.tsx` component.

You'll need to:

- Add `useActionState` to your `edit-form.tsx` component.
- Edit the `updateInvoice` action to handle validation errors from Zod.
- Display the errors in your component, and add aria labels to improve accessibility.

Once you're ready, expand the code snippet below to see the solution:

<Reveal>

**Edit Invoice Form:**

```tsx filename="/app/ui/invoices/edit-form.tsx"
// ...
import { updateInvoice, State } from '@/app/lib/actions';
import { useActionState } from 'react';

export default function EditInvoiceForm({
  invoice,
  customers,
}: {
  invoice: InvoiceForm;
  customers: CustomerField[];
}) {
  const initialState: State = { message: null, errors: {} };
  const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);
  const [state, formAction] = useActionState(updateInvoiceWithId, initialState);

  return <form action={formAction}>{/* ... */}</form>;
}
```

**Server Action:**

```tsx filename="/app/lib/actions.ts"
export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}
```

</Reveal>


<!-- Source: 15-adding-authentication.mdx -->
## Adding Authentication

---
title: Adding Authentication
description: Add authentication to protect your dashboard routes using NextAuth.js, Server Actions, and Middleware.
summary:
  current: You added authentication to your application and protected your dashboard routes.
  next: Finish your application by learning how to add metadata in preparation for sharing.
---

In the previous chapter, you finished building the invoices routes by adding form validation and improving accessibility. In this chapter, you'll be adding authentication to your dashboard.

<InThisChapter
  topics={[
    {
      icon: 'check-circle',
      description: 'What is authentication.',
    },
    {
      icon: 'logo-next',
      description: 'How to add authentication to your app using NextAuth.js.',
    },
    {
      icon: 'lock-closed',
      description:
        'How to use Middleware to redirect users and protect your routes.',
    },
    {
      icon: 'logo-react',
      description:
        "How to use React's <code>useActionState</code> to handle pending states and form errors.",
    },
  ]}
/>

## What is authentication?

Authentication is a key part of many web applications today. It's how a system checks if the user is who they say they are.

A secure website often uses multiple ways to check a user's identity. For instance, after entering your username and password, the site may send a verification code to your device or use an external app like Google Authenticator. This 2-factor authentication (2FA) helps increase security. Even if someone learns your password, they can't access your account without your unique token.

### Authentication vs. Authorization

In web development, authentication and authorization serve different roles:

- **Authentication** is about making sure the user is who they say they are. You're proving your identity with something you have like a username and password.
- **Authorization** is the next step. Once a user's identity is confirmed, authorization decides what parts of the application they are allowed to use.

So, authentication checks who you are, and authorization determines what you can do or access in the application.

<Quiz
  answers={[
    'Authentication determines what you can access. Authorization verifies your identity.',
    'Authentication and authorization both decide what parts of the application a user can access.',
    'Authentication verifies your identity. Authorization determines what you can access.',
    'There is no difference; both terms mean the same.',
  ]}
  question="Which of the following best describes the difference between authentication and authorization?"
  hint="Check the section above!"
  correctAnswer="Authentication verifies your identity. Authorization determines what you can access."
  explanation="That's right! Although they sound similar, authentication verifies your identity while authorization determines what you can access."
/>

## Creating the login route

Start by creating a new route in your application called `/login` and paste the following code:

```tsx filename="/app/login/page.tsx"
import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';
import { Suspense } from 'react';

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <AcmeLogo />
          </div>
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
```

You'll notice the page imports `<LoginForm />`, which you'll update later in the chapter. This component is wrapped with React `<Suspense>` because it will access information from the incoming request (URL search params).

## NextAuth.js

We will be using [NextAuth.js](https://nextjs.authjs.dev/) to add authentication to your application. NextAuth.js abstracts away much of the complexity involved in managing sessions, sign-in and sign-out, and other aspects of authentication. While you can manually implement these features, the process can be time-consuming and error-prone. NextAuth.js simplifies the process, providing a unified solution for auth in Next.js applications.

## Setting up NextAuth.js

Install NextAuth.js by running the following command in your terminal:

```bash filename="Terminal"
pnpm i next-auth@beta
```

Here, you're installing the `beta` version of NextAuth.js, which is compatible with Next.js 14+.

Next, generate a secret key for your application. This key is used to encrypt cookies, ensuring the security of user sessions. You can do this by running the following command in your terminal:

```bash filename="Terminal"
# macOS
openssl rand -base64 32
# Windows can use https://generate-secret.vercel.app/32
```

Then, in your `.env` file, add your generated key to the `AUTH_SECRET` variable:

```bash filename=".env" highlight={1}
AUTH_SECRET=your-secret-key
```

For auth to work in production, you'll need to update your environment variables in your Vercel project too. Check out this [guide](https://vercel.com/docs/environment-variables) on how to add environment variables on Vercel.

### Adding the pages option

Create an `auth.config.ts` file at the root of our project that exports an `authConfig` object. This object will contain the configuration options for NextAuth.js. For now, it will only contain the `pages` option:

```tsx filename="/auth.config.ts"
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
} satisfies NextAuthConfig;
```

You can use the `pages` option to specify the route for custom sign-in, sign-out, and error pages. This is not required, but by adding `signIn: '/login'` into our `pages` option, the user will be redirected to our custom login page, rather than the NextAuth.js default page.

## Protecting your routes with Next.js Middleware

Next, add the logic to protect your routes. This will prevent users from accessing the dashboard pages unless they are logged in.

```tsx filename="/auth.config.ts" highlight={7-21}
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
```

The `authorized` callback is used to verify if the request is authorized to access a page with [Next.js Middleware](/docs/app/building-your-application/routing/middleware). It is called before a request is completed, and it receives an object with the `auth` and `request` properties. The `auth` property contains the user's session, and the `request` property contains the incoming request.

The `providers` option is an array where you list different login options. For now, it's an empty array to satisfy NextAuth config. You'll learn more about it in the [Adding the Credentials provider](#adding-the-credentials-provider) section.

Next, you will need to import the `authConfig` object into a Middleware file. In the root of your project, create a file called `middleware.ts` and paste the following code:

```tsx filename="/middleware.ts"
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export default NextAuth(authConfig).auth;

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
```

Here you're initializing NextAuth.js with the `authConfig` object and exporting the `auth` property. You're also using the `matcher` option from Middleware to specify that it should run on specific paths.

The advantage of employing Middleware for this task is that the protected routes will not even start rendering until the Middleware verifies the authentication, enhancing both the security and performance of your application.

### Password hashing

It's good practice to **hash** passwords before storing them in a database. Hashing converts a password into a fixed-length string of characters, which appears random, providing a layer of security even if the user's data is exposed.

When seeding your database, you used a package called `bcrypt` to hash the user's password before storing it in the database. You will use it _again_ later in this chapter to compare that the password entered by the user matches the one in the database. However, you will need to create a separate file for the `bcrypt` package. This is because `bcrypt` relies on Node.js APIs not available in Next.js Middleware.

Create a new file called `auth.ts` that spreads your `authConfig` object:

```tsx filename="/auth.ts"
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
});
```

### Adding the Credentials provider

Next, you will need to add the `providers` option for NextAuth.js. `providers` is an array where you list different login options such as Google or GitHub. For this course, we will focus on using the [Credentials provider](https://authjs.dev/getting-started/providers/credentials-tutorial) only.

The Credentials provider allows users to log in with a username and a password.

```tsx filename="/auth.ts" highlight={3,7}
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [Credentials({})],
});
```

> **Good to know:**
>
> There are other alternative providers such as [OAuth](https://authjs.dev/getting-started/providers/oauth-tutorial) or [email](https://authjs.dev/getting-started/providers/email-tutorial). See the [NextAuth.js docs](https://authjs.dev/getting-started/providers) for a full list of options.

### Adding the sign in functionality

You can use the `authorize` function to handle the authentication logic. Similarly to Server Actions, you can use `zod` to validate the email and password before checking if the user exists in the database:

```tsx filename="/auth.ts" highlight={4,9-15}
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
      },
    }),
  ],
});
```

After validating the credentials, create a new `getUser` function that queries the user from the database.

```tsx filename="/auth.ts" highlight={5-7,9-17,28-31}
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
    return user[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
        }

        return null;
      },
    }),
  ],
});
```

Then, call `bcrypt.compare` to check if the passwords match:

```tsx filename="/auth.ts" highlight={7,22,24,27-28}
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// ...

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        // ...

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});
```

Finally, if the passwords match you want to return the user, otherwise, return `null` to prevent the user from logging in.

### Updating the login form

Now you need to connect the auth logic with your login form. In your `actions.ts` file, create a new action called `authenticate`. This action should import the `signIn` function from `auth.ts`:

```tsx filename="/app/lib/actions.ts"
'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

// ...

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
```

If there's a `'CredentialsSignin'` error, you want to show an appropriate error message. You can learn about NextAuth.js errors in [the documentation](https://errors.authjs.dev)

Finally, in your `login-form.tsx` component, you can use React's `useActionState` to call the server action, handle form errors, and display the form's pending state:

```tsx filename="app/ui/login-form.tsx" highlight={1,11-13,16-21,24,70-73,79-84}
'use client';

import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form action={formAction} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please log in to continue.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <Button className="mt-4 w-full" aria-disabled={isPending}>
          Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
```

## Adding the logout functionality

To add the logout functionality to `<SideNav />`, call the `signOut` function from `auth.ts` in your `<form>` element:

```tsx filename="/ui/dashboard/sidenav.tsx" highlight={5,15-18}
import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      // ...
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/' });
          }}
        >
          <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
```

## Try it out

Now, try it out. You should be able to log in and out of your application using the following credentials:

- Email: `user@nextmail.com`
- Password: `123456`


<!-- Source: 16-adding-metadata.mdx -->
## Adding Metadata

---
title: Adding Metadata
description: Learn how to add metadata to your Next.js application.
summary:
  current: Congratulations! You've added metadata to your application and learned about the Metadata API.
  next: Continue exploring Next.js
---

Metadata is crucial for SEO and shareability. In this chapter, we'll discuss how you can add metadata to your Next.js application.

<InThisChapter
  topics={[
    {
      icon: 'information',
      description: 'What metadata is.',
    },
    {
      icon: 'box',
      description: 'Types of metadata.',
    },
    {
      icon: 'image',
      description: 'How to add an Open Graph image using metadata.',
    },
    {
      icon: 'logo-next',
      description: 'How to add a favicon using metadata.',
    },
  ]}
/>

## What is metadata?

In web development, metadata provides additional details about a webpage. Metadata is not visible to the users visiting the page. Instead, it works behind the scenes, embedded within the page's HTML, usually within the `<head>` element. This hidden information is crucial for search engines and other systems that need to understand your webpage's content better.

## Why is metadata important?

Metadata plays a significant role in enhancing a webpage's SEO, making it more accessible and understandable for search engines and social media platforms. Proper metadata helps search engines effectively index webpages, improving their ranking in search results. Additionally, metadata like Open Graph improves the appearance of shared links on social media, making the content more appealing and informative for users.

## Types of metadata

There are various types of metadata, each serving a unique purpose. Some common types include:

**Title Metadata**: Responsible for the title of a webpage that is displayed on the browser tab. It's crucial for SEO as it helps search engines understand what the webpage is about.

```html
<title>Page Title</title>
```

**Description Metadata**: This metadata provides a brief overview of the webpage content and is often displayed in search engine results.

```html
<meta name="description" content="A brief description of the page content." />
```

**Keyword Metadata**: This metadata includes the keywords related to the webpage content, helping search engines index the page.

```html
<meta name="keywords" content="keyword1, keyword2, keyword3" />
```

**Open Graph Metadata**: This metadata enhances the way a webpage is represented when shared on social media platforms, providing information such as the title, description, and preview image.

```html
<meta property="og:title" content="Title Here" />
<meta property="og:description" content="Description Here" />
<meta property="og:image" content="image_url_here" />
```

**Favicon Metadata**: This metadata links the favicon (a small icon) to the webpage, displayed in the browser's address bar or tab.

```html
<link rel="icon" href="path/to/favicon.ico" />
```

## Adding metadata

Next.js has a Metadata API that can be used to define your application metadata. There are two ways you can add metadata to your application:

- **Config-based**: Export a [static `metadata` object](/docs/app/api-reference/functions/generate-metadata#metadata-object) or a dynamic [`generateMetadata` function](/docs/app/api-reference/functions/generate-metadata#generatemetadata-function) in a `layout.js` or `page.js` file.
- **File-based**: Next.js has a range of special files that are specifically used for metadata purposes:

  - `favicon.ico`, `apple-icon.jpg`, and `icon.jpg`: Utilized for favicons and icons
  - `opengraph-image.jpg` and `twitter-image.jpg`: Employed for social media images
  - `robots.txt`: Provides instructions for search engine crawling
  - `sitemap.xml`: Offers information about the website's structure

You have the flexibility to use these files for static metadata, or you can generate them programmatically within your project.

With both these options, Next.js will automatically generate the relevant `<head>` elements for your pages.

### Favicon and Open Graph image

In your `/public` folder, you'll notice you have two images: `favicon.ico` and `opengraph-image.jpg`.

Move these images to the root of your `/app` folder.

After doing this, Next.js will automatically identify and use these files as your favicon and OG image. You can verify this by checking the `<head>` element of your application in dev tools.

> **Good to know:** You can also create dynamic OG images using the [`ImageResponse`](/docs/app/api-reference/functions/image-response) constructor.

### Page title and descriptions

You can also include a [`metadata` object](/docs/app/api-reference/functions/generate-metadata#metadata-fields) from any `layout.js` or `page.js` file to add additional page information like title and description. Any metadata in `layout.js` will be inherited by all pages that use it.

In your root layout, create a new `metadata` object with the following fields:

```tsx filename="/app/layout.tsx" highlight={1,3-7}
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Acme Dashboard',
  description: 'The official Next.js Course Dashboard, built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function RootLayout() {
  // ...
}
```

Next.js will automatically add the title and metadata to your application.

But what if you want to add a custom title for a specific page? You can do this by adding a `metadata` object to the page itself. Metadata in nested pages will override the metadata in the parent.

For example, in the `/dashboard/invoices` page, you can update the page title:

```tsx filename="/app/dashboard/invoices/page.tsx" highlight={1,3-5}
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Invoices | Acme Dashboard',
};
```

This works, but we are repeating the title of the application in every page. If something changes, like the company name, you'd have to update it on every page.

Instead, you can use the `title.template` field in the `metadata` object to define a template for your page titles. This template can include the page title, and any other information you want to include.

In your root layout, update the `metadata` object to include a template:

```tsx filename="/app/layout.tsx" highlight={1,3-10}
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard',
  },
  description: 'The official Next.js Learn Dashboard built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};
```

The `%s` in the template will be replaced with the specific page title.

Now, in your `/dashboard/invoices` page, you can add the page title:

```tsx filename="/app/dashboard/invoices/page.tsx"
export const metadata: Metadata = {
  title: 'Invoices',
};
```

Navigate to the `/dashboard/invoices` page and check the `<head>` element. You should see the page title is now `Invoices | Acme Dashboard`.

## Practice: Adding metadata

Now that you've learned about metadata, practice by adding titles to your other pages:

1. `/login` page.
2. `/dashboard/` page.
3. `/dashboard/customers` page.
4. `/dashboard/invoices/create` page.
5. `/dashboard/invoices/[id]/edit` page.

The Next.js Metadata API is powerful and flexible, giving you full control over your application's metadata. Here, we've shown you how to add some basic metadata, but you can add multiple fields, including `keywords`, `robots`, `canonical`, and more. Feel free to explore the [documentation](/docs/app/api-reference/functions/generate-metadata), and add any additional metadata you want to your application.


<!-- Source: 17-next-steps.mdx -->
## Next Steps

---
title: Next Steps
description: Next.js Dashboard Course Conclusion
summary:
  current: Now that you've completed the final chapter, you're ready for the next steps.
  next: ''
---

Congratulations! You've completed the Next.js dashboard course where you learned about the main features of Next.js and best practices for building web applications.

But this is just the beginning—Next.js has many other features. It's designed to help you build small side projects, your next startup idea, or even large-scale applications with your team.

Here are some resources to continue exploring Next.js:

- [Next.js Documentation](/docs)
- [Next.js Templates](https://vercel.com/templates/next.js):
  - [Admin Dashboard Template](https://vercel.com/templates/next.js/admin-dashboard-tailwind-postgres-react-nextjs)
  - [Next.js Commerce](https://vercel.com/templates/next.js/nextjs-commerce)
  - [Blog Starter Kit](https://vercel.com/templates/next.js/blog-starter-kit)
  - [AI Chatbot](https://vercel.com/templates/next.js/nextjs-ai-chatbot)
  - [Image Gallery Starter](https://vercel.com/templates/next.js/image-gallery-starter)
- [Next.js Repository](https://github.com/vercel/next.js)
- [Vercel YouTube](https://www.youtube.com/@VercelHQ/videos)
- [Vercel Reddit](https://www.reddit.com/r/vercel/)

## Share your Next.js app

We encourage you to share the app you built in this tutorial on X. If you do, please mention our team at [@nextjs](https://twitter.com/nextjs) so that we can take a look! We'd love to get your feedback on this course as well.

We hope you enjoyed this course, and we encourage you to continue learning - by building.


<!-- Source: index.mdx -->
## App Router

---
title: App Router
description: Learn how to build a full-stack web application with the free, Next.js Foundations course.
summary:
  current: Now that you've been introduced to the course, let's dive in.
  next: Learn how to create a Next.js application and run your local development server.
---

Welcome to the Next.js Foundations course! In this free interactive course, you'll learn the main features of Next.js by building a full-stack web application.

## What we'll be building

<Image
  alt="Screenshots of the dashboard project showing desktop and mobile versions."
  srcLight="/learn/light/dashboard.png"
  srcDark="/learn/dark/dashboard.png"
  width="1378"
  height="816"
/>

For this course, we'll build a financial dashboard that has:

- A public home page.
- A login page.
- Dashboard pages that are protected by authentication.
- The ability for users to add, edit, and delete invoices.

The dashboard will also have an accompanying database, which you'll set up in [a later chapter](/learn/dashboard-app/setting-up-your-database).

By the end of the course, you'll have the essential skills needed to start building full-stack Next.js applications.

## Overview

Here's an overview of features you'll learn about in this course:

- **Styling**: The different ways to style your application in Next.js.
- **Optimizations**: How to optimize images, links, and fonts.
- **Routing**: How to create nested layouts and pages using file-system routing.
- **Data Fetching**: How to set up a Postgres database on Vercel, and best practices for fetching and streaming.
- **Search and Pagination**: How to implement search and pagination using URL search params.
- **Mutating Data:** How to mutate data using React Server Actions, and revalidate the Next.js cache.
- **Error Handling:** How to handle general and `404` not found errors.
- **Form Validation and Accessibility:** How to do server-side form validation and tips for improving accessibility.
- **Authentication**: How to add authentication to your application using [`NextAuth.js`](https://next-auth.js.org/) and Middleware.
- **Metadata**: How to add metadata and prepare your application for social sharing.

## Prerequisite knowledge

This course assumes you have a basic understanding of React and JavaScript. If you're new to React, we recommend going through our [React Foundations](/learn/react-foundations) course first to learn the fundamentals of React, such as components, props, state, and hooks, and newer features like Server Components and Suspense.

## System requirements

Before you start this course, make sure your system meets the following requirements:

- Node.js 18.18.0 or later installed. [Download here](https://nodejs.org/en).
- Operating systems: macOS, Windows (including WSL), or Linux.

In addition, you'll also need a [GitHub Account](https://github.com/join/) and a [Vercel Account](https://vercel.com/signup).

## Join the conversation

If you have questions about this course or would like to provide feedback, you can ask our community on [Reddit](https://reddit.com/r/vercel) or [GitHub](https://github.com/vercel/next-learn).
