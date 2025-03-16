# SEO



<!-- Source: 01-importance-of-seo.mdx -->
## Why is SEO so important?

---
title: Why is SEO so important?
---

SEO is the key to increased conversion and confidence in your brand. Higher search ranking placement equates to more organic visitors.

**Search engine organic traffic** – visitors who come to your site through clicking a result in a search engine – is key to many businesses for three reasons:

- **Qualitative** – Increased chance that visitors turn into customers.
- **Trustable** – Higher confidence in your brand or mission.
- **Low-Cost** – Aside from the time and effort spent, having good SEO
  practices that result in higher search engine ranking is free. There is no
  direct cost to appear in top organic search results positions.

Search engine optimization is different from [Search Engine Marketing (SEM)](https://learndigital.withgoogle.com/digitalgarage/course/promote-business-online/lesson/54), where the content at the top of search results is 100% paid and distinguished from organic results with a `Sponsored` label.

### Three Pillars of Optimization

The process of optimizing a website can be divided into three main pillars:

- **Technical**: Optimize your website for crawling and web performance.
- **Creation**: Create a content strategy to target specific keywords.
- **Popularity**: Boost your site's presence online so search engines know you are a trusted source. This is done through the use of [backlinks](https://moz.com/learn/seo/backlinks), third-party sites that link back to your site.

The SEO discipline is broad and has [many facets](https://learningseo.io/), but as a Next.js developer, the first step is to understand how you can make your web app SEO-ready with some best practices.

<Quiz
  question="Why is it important to consider SEO?"
  answers={[
    'So your site is fast.',
    'So your site appears more often in search results.',
    'So your site has great UX.',
  ]}
  correctAnswer="So your site appears more often in search results."
/>


<!-- Source: 02-search-systems.mdx -->
## Search Systems

---
title: Search Systems
---

Search Systems are what you typically refer to as Search Engines (Google, Bing, DuckDuckGo, etc.). They are massively complex systems that tackle some of the biggest challenges in technology history.

Search Systems have four main responsibilities:

- **Crawling**: the process of going through the Web and parsing the content in all websites. This is a massive task as there are [over 350 million domains](https://www.businesswire.com/news/home/20200528005832/en/Internet-Grows-to-366.8-Million-Domain-Name-Registrations-at-the-End-of-the-First-Quarter-of-2020) available.
- **Indexing**: finding places to store all of the data gathered during the crawling stage so it can be accessed.
- **Rendering**: executing any resources on the page such as JavaScript that might enhance the features and enrich content on the site. This process doesn't happen for all pages that are crawled and sometimes it happens before the content is actually indexed. Rendering might happen after indexing if there are no available resources to perform the task at the time of the crawl.
- **Ranking**: querying data to craft relevant results pages based on user input. This is where the different ranking criteria are applied in Search engines to give users the best answer to fulfill their intent.

In the next section, we will learn more specifically how Googlebot works. Googlebot is Google's internet crawler, the part of the search system that gathers all the information needed to create the massive database of content to serve search results.

<Quiz
  question="What happens to a page's data after it has been crawled?"
  answers={[
    'It is thrown away in 99% of the cases.',
    'It is stored in an Index if it meets the required criteria by each search engine.',
    'A human decides if the pages should be indexed.',
  ]}
  correctAnswer="It is stored in an Index if it meets the required criteria by each search engine."
/>


<!-- Source: 03-webcrawlers.mdx -->
## What are Web Crawlers?

---
title: What are Web Crawlers?
---

In order for your website to appear in search results, Google (as well as other search engines such as Bing, Yandex, Baidu, Naver, Yahoo or DuckDuckGo) use web crawlers to navigate the website to discover websites and its web pages.

Different search engines have different [market shares](https://gs.statcounter.com/search-engine-market-share) in each country.

In this guide we cover Google, which is the biggest search engine in most countries. That being said, you might want to check other search engines and their guidelines, especially if your target customers are in [China](https://gs.statcounter.com/search-engine-market-share/all/china), [Russia](https://gs.statcounter.com/search-engine-market-share/all/russian-federation), [Japan](https://gs.statcounter.com/search-engine-market-share/all/japan) or [South Korea](https://gs.statcounter.com/search-engine-market-share/all/south-korea).

While there are some differences when it comes to Ranking and Rendering, most search engines work in a very similar way when it comes to Crawling and Indexing.

Web crawlers are a type of bot that emulate users and navigate through links found on the websites to index the pages. Web crawlers identify themselves using custom [user-agents](https://developer.mozilla.org/docs/Web/HTTP/Headers/User-Agent). Google [has several web crawlers](https://developers.google.com/search/docs/advanced/crawling/overview-google-crawlers), but the ones that are used more often are **Googlebot Desktop** and **Googlebot Smartphone**.

### How Does Googlebot Work?

<Image
  alt="Googlebot Flow Chart"
  src="/learn/pages-router/seo/googlebot.png"
  width={1440}
  height={960}
  caption="The journey the Googlebot makes to index webpages"
/>

A general overview of the process can be the following:

- **Find URLs**: Google sources URLs from many places, including [Google Search Console](https://search.google.com/search-console), links between websites, or [XML sitemaps](https://developers.google.com/search/docs/advanced/sitemaps/overview).
- **Add to Crawl Queue**: These URLs are added to the Crawl Queue for the Googlebot to process. URLs in the Crawl Queue usually last seconds there, but it can be up to a few days depending on the case, especially if the pages need to be rendered, indexed, or – if the URL is already indexed – refreshed. The pages will then enter the [Render Queue](/learn/seo/rendering-and-ranking).
- **HTTP Request**: The crawler makes an HTTP request to get the headers and acts according to the returned status code:
  - **200**: It crawls and parses the HTML.
  - **30X**: It follows the redirects.
  - **40X**: It notes the error and does not load the HTML.
  - **50X**: It may come back later to check if the status code has changed.
- **Render Queue**: The different services and components of the search system process the HTML and parse the content. If the page has some JavaScript client-side based content, the URLs might be added to a Render Queue. Render Queue is more costly for Google as it needs to use more resources to render JavaScript and therefore URLs rendered are a smaller percentage over the total pages out there on the internet. Some other search engines might not have the same rendering capacity as Google, and this is where Next.js can help with your rendering strategy.
- **Ready to be indexed**: If all criteria are met, the pages may be eligible to be indexed and shown in search results.

In the next few sections, we will take a deep dive into each of the main components of a search system's processes: [crawling and indexing](/learn/seo/crawling-and-indexing), and [rendering and ranking](/learn/seo/rendering-and-ranking).

<Quiz
  question="How can you identify if a user on your site is a web crawler?"
  answers={[
    'Via their IP address.',
    'Via their device type',
    'Via their interaction with the page.',
    'Via their User-Agent.',
  ]}
  correctAnswer="Via their User-Agent."
/>

### Further Reading

- **Google**: [SEO Starter Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- **MDN**: [MDN: User-Agents](https://developer.mozilla.org/docs/Web/HTTP/Headers/User-Agent)


<!-- Source: 04-crawling-and-indexing.mdx -->
## Crawling and Indexing

---
title: Crawling and Indexing
---

Now that we have a general overview of how search systems and Googlebot work, we'll deep-dive into several key parts that impact Crawling and Indexing.

In this lesson, we'll take a look at:

- HTTP status code fundamentals.
- Metadata and what web crawlers look for when parsing web content.
- How to communicate with Google so its search crawler knows when there is new content on your site.
- How to leverage meta robot tags and canonical links to indicate to search engines your desired indexing status.


<!-- Source: 05-status-codes.mdx -->
## What are HTTP Status Codes?

---
title: What are HTTP Status Codes?
---

[HTTP response status codes](https://developer.mozilla.org/docs/Web/HTTP/Status) indicate whether a specific HTTP request has been successfully completed.
There are many status codes, but only a handful are meaningful in an SEO context.

Let's take a look at them now.

### 200

The [`HTTP 200 OK`](https://developer.mozilla.org/docs/Web/HTTP/Status/200) success status response code indicates that the request has succeeded.

In order for a page to be indexed on Google it must return status code `200`. This is what you typically want to look for in
your pages in order for them to receive organic traffic. This is the default code that will be set when Next.js renders a page
successfully.

### 301/308

The [`HTTP 301 Moved Permanently`](https://developer.mozilla.org/docs/Web/HTTP/Status/301) redirect status response code indicates that the resource requested has been definitively moved to the destination URL.

This is a permanent redirect. In general, this is the most widely used redirect type.

Redirects can be used for a variety of reasons, but the main one is to indicate that a URL has been moved from point A to point B. Redirects are needed to ensure that, if a content is moved from one place to the other, you do not lose current and potential clients and that the bots can continue to index your site.

**Note**: Next.js [permanent redirects](/docs/api-reference/next.config.js/redirects) use 308 by default instead of 301 as it is the newer version and considered the better option.

The main difference between the two status codes is that a `301` allows for changing the request method from `POST` to `GET`, whereas a
`308` does not.

You can trigger a `308` redirect in Next.js by returning a redirect instead of props in the `getStaticProps()` function.

```jsx
//  pages/about.js
export async function getStaticProps(context) {
  return {
    redirect: {
      destination: '/',
      permanent: true, // triggers 308
    },
  };
}
```

You can also use the `permanent: true` key in redirects set in `next.config.js`.

```jsx
//next.config.js

module.exports = {
  async redirects() {
    return [
      {
        source: '/about',
        destination: '/',
        permanent: true, // triggers 308
      },
    ];
  },
};
```

### 302

The [`HTTP 302 Found`](https://developer.mozilla.org/docs/Web/HTTP/Status/302) redirect status response code indicates that the resource requested has been
temporarily moved to the destination URL.

In most cases, `302` redirects should be `301` redirects. This may not be the case if you are redirecting users temporarily to a certain page (e.g. a promotion page) or if you are redirecting users based on location.

### 404

The [`HTTP 404 Not Found`](https://developer.mozilla.org/docs/Web/HTTP/Status/404) client error response code indicates that the server can't find the requested
resource.

As noted above, pages that are moved should be redirected with a `HTTP 301` status code to the new location. When this doesn't happen, URLs may return a `404` status code. `404` Status Codes are not necessarily bad by default, as it's the desired outcome if a user happens to visit a URL that doesn't exist, but they shouldn't be a frequent error within your pages as it could lead to lackluster search rankings.

Next.js will automatically return a `404` status code for URLs that do not exist in your application.

In some cases, you might also want to return a `404` status code from page. You can do this by returning the following in place of props:

```jsx
export async function getStaticProps(context) {
  return {
    notFound: true, // triggers 404
  };
}
```

You can [create a custom 404 page](/docs/advanced-features/custom-error-page#404-page) that is statically generated at build time by creating `pages/404.js`.

Example:

```jsx
// pages/404.js
export default function Custom404() {
  return <h1>404 - Page Not Found</h1>;
}
```

### 410

The [`HTTP 410 Gone`](https://developer.mozilla.org/docs/Web/HTTP/Status/410) client error response code indicates that access to the target resource is no longer available at the origin server and that this condition is likely to be permanent.

This is not used very often, but you might want to look for this status code if you are deleting content on your website that won't exist any more.

Examples where a `HTTP 410 Gone` might be wise to use include:

- **E-Commerce**: Products permanently removed from inventory.
- **Forum**: Threads that have been deleted by the user.
- **Blog**: Blog post removed from site.

This status code informs bots that they should never return to crawl this content.

### 500

The [`HTTP 500 Internal Server Error`](https://developer.mozilla.org/docs/Web/HTTP/Status/500) response code indicates that the server encountered an unexpected condition that prevented it from fulfilling the request.

Next.js will automatically return a `500` status code for an unexpected application error. You can [create a custom `500` error page](/docs/advanced-features/custom-error-page#500-page) that is statically generated at build time by creating `pages/500.js`.

Example:

```jsx
// pages/500.js
export default function Custom500() {
  return <h1>500 - Server-side error occurred</h1>;
}
```

### 503

The [`HTTP 503 Service Unavailable`](https://developer.mozilla.org/docs/Web/HTTP/Status/503) server error response code indicates that the server is not ready to handle the request.

It's recommended to return this status code when your website is down and you predict that the website will be down by an extended period of time. This prevents losing rankings on a long-term basis.

<Quiz
  question="What status code indicates a page has been moved to a new URL?"
  answers={['404', '500', '418', '301/308']}
  correctAnswer="301/308"
/>


<!-- Source: 06-robots-txt.mdx -->
## What is a robots.txt File?

---
title: What is a robots.txt File?
---

A [robots.txt file](https://developers.google.com/search/docs/advanced/robots/intro) tells search engine crawlers which pages or files the crawler can or can't
request from your site. The `robots.txt` file is a web standard file that most [good bots](https://www.cloudflare.com/learning/bots/how-to-manage-good-bots) consume before requesting anything from a specific domain.

You might want to protect certain areas from your website from being crawled, and therefore indexed, such as your CMS or admin, user accounts in your e-commerce, or some API routes, to name a few. These files must be served at the root of each host, or alternatively you can redirect the root `/robots.txt` path to a destination URL and most bots will follow.

### How to add a robots.txt file to a Next.js project

Thanks to [static file serving](/docs/basic-features/static-file-serving) in Next.js we can easily add a `robots.txt` file. , we would create a new file named `robots.txt` the `public` folder in the root directory. An example of what you could put in this file would be:

```jsx
//robots.txt

# Block all crawlers for /accounts
User-agent: *
Disallow: /accounts

# Allow all crawlers
User-agent: *
Allow: /
```

When you run your app with `yarn dev`, it will now be available at [http://localhost:3000/robots.txt](http://localhost:3000/robots.txt) . Note that the `public` folder name is not part of the URL.

Do not name the public directory anything else. The name cannot be changed and is the only directory used to serve static assets.

<Quiz
  question="What is the purpose of a robots.txt file?"
  answers={[
    'To indicate which pages/files crawlers can access and crawl',
    'To provide crawlers a list of URLs to crawl',
    'To add notes about crawling',
    'All of the above',
  ]}
  correctAnswer="To indicate which pages/files crawlers can access and crawl"
/>

### Further Reading

- [Google: Create and Submit a `robots.txt` File](https://developers.google.com/search/docs/advanced/robots/create-robots-txt)


<!-- Source: 07-xml-sitemaps.mdx -->
## XML Sitemaps

---
title: XML Sitemaps
---

**Sitemaps** are the easiest way to communicate with Google. They indicate the URLs that belong to your website and when they update so that Google can easily detect new content and crawl your website more efficiently.

Even though XML Sitemaps are the most known and used ones, they can also be created via [RSS](https://developers.google.com/search/docs/advanced/sitemaps/build-sitemap) or [Atom](https://developers.google.com/search/docs/advanced/sitemaps/build-sitemap), or even via [Text](https://developers.google.com/search/docs/advanced/sitemaps/build-sitemap) files if you prefer maximum simplicity.

A sitemap is a file where you provide information about the pages, videos, and other files on your site, and the relationships between them. Search engines like Google read this file to more intelligently crawl your site.

According to [Google](https://developers.google.com/search/docs/advanced/sitemaps/overview):

You might need a sitemap if:

- **Your site is really large.** As a result, it's more likely Google web crawlers might overlook crawling some of your new or recently updated pages.
- **Your site has a large archive of content pages that are isolated or not well linked to each other.** If your site pages don't naturally reference each other, you can list them in a sitemap to ensure that Google doesn't overlook some of your pages.
- **Your site is new and has few external links to it.** Googlebot and other web crawlers navigate the web by following links from one page to another. As a result, Google might not discover your pages if no other sites link to them.
- **Your site has a lot of rich media content (video, images) or is shown in Google News.** If provided, Google can take additional information from sitemaps into account for search, where appropriate.

While sitemaps are not mandatory for great search engine performance, they can facilitate crawling and indexing to bots and hence your content will be picked up faster and rank accordingly.

It's strongly recommended to use sitemaps and make them dynamic as new content is populated across your website. Static sitemaps are also valid, but they might be less useful to Google as it won't serve for constant discovery purposes.

### How to Add Sitemaps to a Next.js Project

There are two options:

**Manual**: If you have a relatively simple and static site, you can manually create a `sitemap.xml` in the `public` directory of your project:

```xml
   <!-- public/sitemap.xml -->
   <xml version="1.0" encoding="UTF-8">
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>http://www.example.com/foo</loc>
       <lastmod>2021-06-01</lastmod>
     </url>
   </urlset>
   </xml>
```

**Dynamic**: If your site is dynamic, you can leverage `getServerSideProps` to generate an XML sitemap on-demand.

We can create a new page inside the pages directory such as `pages/sitemap.xml.js`. The goal of this page will be to hit our API to get data that will allow us to know the URLs of our dynamic pages. We will then write an XML file as the response for `/sitemap.xml`

Here is an example if you could try out for yourself:

```jsx
//pages/sitemap.xml.js
const EXTERNAL_DATA_URL = 'https://jsonplaceholder.typicode.com/posts';

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>https://jsonplaceholder.typicode.com</loc>
     </url>
     <url>
       <loc>https://jsonplaceholder.typicode.com/guide</loc>
     </url>
     ${posts
       .map(({ id }) => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/${id}`}</loc>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const request = await fetch(EXTERNAL_DATA_URL);
  const posts = await request.json();

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(posts);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
```

<Quiz
  question="What is the purpose of a sitemap?"
  answers={[
    'To show a map image of your site',
    'To communicate which URLs belong to your site and facilitate crawling',
    'To disallow certain URLs for crawlers',
    'None of the above',
  ]}
  correctAnswer="To communicate which URLs belong to your site and facilitate crawling"
/>

### Further Reading

- **Google**: [Learn about Sitemaps](https://developers.google.com/search/docs/advanced/sitemaps/overview)
- **Google**: [Overview of crawling and indexing topics](https://developers.google.com/search/docs/advanced/crawling/overview)


<!-- Source: 08-metatags.mdx -->
## Special Meta Tags for Search Engines

---
title: Special Meta Tags for Search Engines
---

**Meta robot tags** are directives that search engines will always respect. Adding these robots tags can make the indexation of your website easier.

There is a difference between directives and suggestions.

**Meta robots tags** or [`robots.txt`](/learn/seo/crawling-and-indexing/robots-txt) files are **directives** and will always be obeyed. ** Canonical tags **
are **recommendations** that Google can decide to obey or not.

There are many options when it comes to page-level meta tags, but the following are examples commonly associated with SEO:

```html
<meta name="robots" content="noindex,nofollow" />
```

The robots tag is probably the most common tag you will see. By default it will have the value `index,follow` so it does not need to specified, `all` is also a valid alternative version:

```html
<meta name="robots" content="all" />
```

By setting a robots tag to `noindex,nofollow` as in the example above, it will indicate to search engines:

- **noindex**: To not show this page in search results. Omitting `noindex` will indicate the
  page can be indexed and shown in search results. When building a website, you
  might not want to index certain pages. Common use cases include settings pages,
  internal search pages, policies, and more.
- **nofollow**: To not follow links on this page. Omitting this will allow robots to crawl and
  follow links on this page. Links found on other pages may enable crawling, so
  omitting `nofollow` will allow Google to crawl and follow links on this page. Links found on other pages may enable crawling, so if `link A` appears in pages `X` and `Y`, and `X` has a `nofollow` robots tag, but `Y` doesn't, Google may decide to crawl the link.

**Note:** You can see a [full list of directives](https://developers.google.com/search/docs/advanced/robots/robots_meta_tag#directives) in the Google official documentation.

### Googlebot tag

```html
<meta name="googlebot" content="noindex,nofollow" />
```

You may also see the `googlebot` tag sometimes. In most
cases the `robots` is all you will need. The `googlebot` tag is specific to Google. Use this tag if you
want to have a separate rule for Googlebot, and a general one for the rest of the
search bots.

In the case there is conflicting tags, the more restrictive tag applies.

You may be wondering why we need these tags if you can add URLs to your `robots.txt` that you do not want crawled. The meta tag gives
you flexibility to mark pages as `noindex` on demand.

For example, if you apply filters to a products page and you end up with no results, it would be common practice to `noindex` this page.

URLs that are restricted from bots crawling via robots.txt file will never be crawled by Google, but if the rules are added after pages are already indexed,
pages might remain indexed. The best way to make sure that a page is not indexed is using the `noindex` tag.

**Note:** Google can decide to index a page without crawling it. This is extremely rare, but happens when Google wants a page to fulfill a specific search result and has certainty that the page contains what users expect.

### Google tags

#### nositelinkssearchbox

```html
<meta name="google" content="nositelinkssearchbox" />
```

When users search for your site, Google Search results sometimes display a search box specific to your site, along with other direct links to your site. This tag tells Google not to show the sitelinks search box.

#### notranslate

```html
<meta name="google" content="notranslate" />
```

When Google recognizes that the site contents are not in the language that the user is likely to want to read, Google often provides a link to a translation in the search results.

In general, this gives you the chance to provide your unique and compelling content to a much larger group of users. However, there may be situations where this is not desired. This meta tag tells Google that you don't want them to provide a translation for this page.

### Example

Now that we have given a run through of some of the common tags you might come across, here is an example of a page putting some of them to use:

```jsx
import Head from 'next/head';

function IndexPage() {
  return (
    <div>
      <Head>
        <title>Meta Tag Example</title>
        <meta name="google" content="nositelinkssearchbox" key="sitelinks" />
        <meta name="google" content="notranslate" key="notranslate" />
      </Head>
      <p>Here we show some meta tags off!</p>
    </div>
  );
}

export default IndexPage;
```

As you can see in the example, we are using [next/head](https://nextjs.org/docs/api-reference/next/head) which is a built-in component for appending elements to the `head` of a page. To avoid duplicate tags in your `head` you can use the `key` property, which will make sure the tag is only rendered once.

<Quiz
  question="Where should meta tags live?"
  answers={[
    "In the page's <head>",
    "In the page's <body>",
    'In a <footer> element',
    'None of the above',
  ]}
  correctAnswer="In the page's <head>"
/>


<!-- Source: 09-canonical.mdx -->
## What are Canonical Tags?

---
title: What are Canonical Tags?
---

A **canonical** URL is the URL of the page that search engines think is most representative from a set of duplicate pages on your site.

While you can directly communicate canonical URLs to search engines, they can also decide to group several URLs without you notifying it. This might happen
automatically if Google can find a URL under several different paths.

While Google does a great job at detecting those, their systems work at massive scale and don't cover all edge cases. Canonical tags are an important
aspect to cover for your website to ensure great performance.

If Google finds several URLs that have the same content, it might decide to demote them in search results because they can be considered duplicated.

This also happens across domains, if you run two different websites and post the same content in each one, search engines can decide to pick one of them to
be ranked, or directly demote both.

This is where canonical tags are extremely useful. They let Google know which URLs are the original source of truth and which are duplicated. Lots of
duplicated pages across same or different domains can lead to bad rankings or even penalizations.

Let's imagine that our e-commerce shop allows products to be accessible via [example.com/products/phone](https://example.com/products/phone) and [example.com/phone](http://example.com/phone).

Both are valid, working URLs, but we use canonical to prevent the detection of duplicate content that we own. If we decided that `https://example.com/products/phone` should be considered for rankings, we would create a canonical tag:

```jsx
<link rel="canonical" href="https://example.com/products/phone" />
```

Canonical tags are fundamental in SEO performance, because not only can you create different URLs, but users or marketing tools can also create them.

Imagine that you are running some marketing campaigns on Google, then Google decides to add some [UTM parameters](https://ga-dev-tools.appspot.com/campaign-url-builder/). It's possible that this new, unique URL will be indexed by Googlebot so you want to be sure you are still showing your canonical tags to unify duplicate pages.

#### Example

```jsx
import Head from 'next/head';

function IndexPage() {
  return (
    <div>
      <Head>
        <title>Canonical Tag Example</title>
        <link
          rel="canonical"
          href="https://example.com/blog/original-post"
          key="canonical"
        />
      </Head>
      <p>This post exists on two URLs.</p>
    </div>
  );
}

export default IndexPage;
```

<Quiz
  question="What is the main purpose of a canonical?"
  answers={[
    'To de-duplicate pages',
    'To change the URL of a page',
    'To allow robots on a page',
    'All of the above',
  ]}
  correctAnswer="To de-duplicate pages"
/>

### Further Reading

- [Google: Consolidate Duplicate URLs](https://developers.google.com/search/docs/advanced/crawling/consolidate-duplicate-urls)
- [Next.js: i18n Routing](https://nextjs.org/docs/advanced-features/i18n-routing)


<!-- Source: 10-rendering-and-ranking.mdx -->
## Rendering and Ranking

---
title: Rendering and Ranking
---

JavaScript is an important part of the web development ecosystem. In the past, most programming languages were sending all content directly from the server.

With technology like JavaScript, fetching information from the browser became more popular than ever. This, in turn, affected search engines and their
ability to understand pages, as most bots were only parsing the initial HTML from the server and loading it to the browser.

In this lesson, we'll talk about:

- Rendering strategies, such as Client-Side Rendering (CSR), Incremental
  Static Regeneration (ISR), Static Site Generation (SSG), and Server-Side
  Rendering (SSR).
- How URL structure can impact SEO ranking.
- Incorporating headings and internal links to optimize your search engine
  results page ranking.

Let's dive in!


<!-- Source: 11-rendering-strategies.mdx -->
## Rendering Strategies

---
title: Rendering Strategies
---

### Static Site Generation (SSG)

[Static site generation](https://nextjs.org/docs/basic-features/pages#static-generation-recommended) is where your HTML is generated at build time. This HTML is then used for each request. Static site generation is probably the best type of rendering strategy for SEO as not only do you have all the HTML on page load because it's [pre-rendered](https://nextjs.org/docs/basic-features/pages#pre-rendering), but it also helps with page performance – now another ranking factor when it comes to SEO.

### Server-Side Rendering (SSR)

Like SSG, [Server-Side Rendering](https://nextjs.org/docs/basic-features/pages#server-side-rendering) (SSR) is pre-rendered, which also makes it great for SEO. Instead of being generated at build time, as in SSG, SSR's HTML is generated at request time. This is great for when you have pages that are very dynamic.

### Incremental Static Regeneration (ISR)

If you have a very large amount of pages, generating them all at build time may not be feasible. Next.js allows you to create or update static pages after you have built your site.

[Incremental Static Regeneration](https://nextjs.org/docs/basic-features/data-fetching#incremental-static-regeneration) enables developers and content editors to use static generation on a per-page basis, without needing to rebuild the entire site. With ISR, you can retain the benefits of static while scaling to millions of pages.

### Client Side Rendering (CSR)

[Client-Side Rendering](https://nextjs.org/docs/basic-features/data-fetching#fetching-data-on-the-client-side) allows developers to make their websites entirely rendered in the browser with JavaScript. On initial page load a single HTML file is generally served with little to no content until you fetch the JavaScript and the browser compiles everything.

As we commented above, in general Client-Side Rendering is **not** recommended for optimal SEO.

CSR is perfect for data heavy dashboards, account pages or any page that you do not require to be in any search engine index.

### Summary

The most important thing for SEO is that page data and metadata is available on page load without JavaScript. In this case SSG or SSR are going to be your
best options.

One of the major strengths of Next.js is that each one of the above rendering methods can be done on a per-page basis. You might want your blog posts
statically generated, your customers account dashboard client side rendered and then perhaps you have a news feed you want to server-side render.

### Further Reading

- Next.js: [Data Fetching](https://nextjs.org/docs/basic-features/data-fetching)
- Smashing Magazine: [A Complete Guide to Incremental Static Regeneration with Next.js](https://www.smashingmagazine.com/2021/04/incremental-static-regeneration-nextjs)
- Vercel: [Next.js: Server-side Rendering vs. Static Generation](https://vercel.com/blog/nextjs-server-side-rendering-vs-static-generation)

<Quiz
  question="Which of the following is good for SEO?"
  answers={[
    'Static Site Generation',
    'Server-Side Rendering',
    'Incremental Static Regeneration',
    'All of the above',
  ]}
  correctAnswer="All of the above"
/>


<!-- Source: 12-amp.mdx -->
## What about AMP?

---
title: What about AMP?
---

In 2016, Google began giving [search ranking preference](https://developers.google.com/search/docs/guides/about-amp) to web pages using [AMP](https://amp.dev/) – a technology that enables developers to create web pages that load faster on mobile devices –
at the cost of building and maintaining them over time.

With the [Core Web Vitals](https://web.dev/vitals/) page experience update, Google [dropped AMP pages as a requirement](https://developers.google.com/search/blog/2021/04/more-details-page-experience#details) to appear in search carousels. This is one of the last main benefits that Google had for AMP in terms of SEO purposes.

Since the introduction of AMP, newer technology, such as Next.js, has proven its ability to improve website experience without sacrificing Developer Experience (DX).

While Next.js offers [AMP support](https://nextjs.org/docs/advanced-features/amp-support/introduction), consider weighing the costs and benefits of having an AMP implementation in your website if it already has great Core Web Vitals scores.


<!-- Source: 13-url-structure.mdx -->
## URL Structure

---
title: URL Structure
---

URL Structure is an important part of an SEO strategy. While Google doesn't disclose which weight each part of SEO has, great URLs are considered a best practice no matter if they are a big or small ranking factor in the end.

You might want to follow some principles:

- **Semantic**: It's best to use URLs that are semantic, meaning that they use words instead of IDs or random numbers. Example: [`/learn/basics/create-nextjs-app`](/learn/basics/create-nextjs-app)is better than `/learn/course-1/lesson-1`
- **Patterns that are logical and consistent**: URLs should follow some sort of pattern that is consistent among pages. For example, you want to have a folder that groups all product pages, instead of having different paths for each product that you have.
- **Keyword focused**: Google still bases a considerable part of their systems on the keywords a website contains. You might want to use keywords in your URLs to facilitate understanding the purpose of the pages.
- **Not parameter-based**: Using parameters to build your URLs is generally not a good idea. They are not semantic in most cases, and search engines might confuse them and demote their rankings in results.

### How are Routes Defined in Next.js?

Next.js uses [file-system routing](/docs/routing/introduction) built on the [file-system routing](/docs/routing/introduction) built on the concept of [pages](/docs/basic-features/pages). When a file is added to
the `pages` directory, it is automatically available as a route. The files and folders inside the `pages` directory can be used to define most common patterns.

Let's take a look at a couple of simple URLs and how you would add them to
your Next.js router:

- **Homepage**: `https://www.example.com` → `pages/index.js`
- **Listings**: `https://www.example.com/products` → `pages/products.js` or `pages/products/index.js`
- **Detail**: `https://www.example.com/products/product` → `pages/products/product.js`

For a blog or e-commerce site you will likely want to use the product ID or
blog name as the slug for the URL. This is called [**dynamic routing**](/docs/routing/dynamic-routes):

- **Product:** `https://www.example.com/products/nextjs-shirt` → `pages/products/[product].js`
- **Blog:** `https://www.example.com/blog/seo-in-nextjs` → `pages/blog/[blog-name].js`

To use dynamic routing, you can add brackets to a page name inside your `products` or `blogs` subfolder.

Here's an example of a page optimized for this using SSG:

```jsx
// pages/blog/[slug].js

import Head from 'next/head';

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://www.example.com/api/posts');
  const posts = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));
  // Set fallback to blocking. Now any new post added post build will SSR
  // to ensure SEO. It will then be static for all subsequent requests
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://www.example.com/api/blog/${params.slug}`);
  const data = await res.json();

  return {
    props: {
      blog: data,
    },
  };
}

function BlogPost({ blog }) {
  return (
    <>
      <Head>
        <title>{blog.title} | My Site</title>
      </Head>
      <div>
        <h1>{blog.title}</h1>
        <p>{blog.text}</p>
      </div>
    </>
  );
}

export default BlogPost;
```

Here's another example using SSR:

```jsx
// pages/blog/[slug].js

import Head from 'next/head';
function BlogPost({ blog }) {
  return (
    <div>
      <Head>
        <title>{blog.title} | My Site</title>
      </Head>
      <div>
        <h1>{blog.title}</h1>
        <p>{blog.text}</p>
      </div>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const res = await fetch(`https://www.example.com/api/blog/${query.slug}`);
  const data = await res.json();

  return {
    props: {
      blog: data,
    },
  };
}

export default BlogPost;
```

### Further Reading

- Next.js: [Introduction to Routing](/docs/routing/introduction)
- Next.js: [Pages](/docs/basic-features/pages)
- Next.js: [Dynamic Routing](/docs/routing/dynamic-routes)


<!-- Source: 14-metadata.mdx -->
## Metadata

---
title: Metadata
---

Metadata is the abstract of the website's content and is used to attach a title, a description, and an image to the site.

### Title

The title tag is one of the most important SEO elements for two main reasons:

Firstly, it's what users see when they click to enter your website from search results.

Secondly, it's one of the main elements Google uses to understand what your page is about. Using keywords in the title is recommended because it usually leads to increased improved ranking positions in search engines.

Here's an example:

```html
<title>iPhone 12 XS Max For Sale in Colorado - Big Discounts | Apple</title>
```

This page contains all the main keywords and also makes it attractive for users showing a clear value proposition: Discounts!

### Description

The description meta tag is another important SEO element, but less so than the title. According to Google, this element is not taken into account for
ranking purposes, but it can affect your click-through-rate on search results.

Use the description meta tag to complement the information in your title. Work in more keywords to the content here if there are some that didn't fit in the
title. These keywords will appear in bold if a user's search contains them.

An example of a description meta tag in HTML:

```html
<meta
  name="description"
  content="Check out iPhone 12 XR Pro and iPhone 12 Pro Max. Visit your local store and for expert advice."
/>
```

This how it looks on the page when it's part of the search engine results page (SERP):

<Image
  src="/learn/pages-router/seo/serp-example.png"
  width={349}
  height={143}
  caption="Example of a SERP snippet with a Title and Description"
/>

In Next.js, we set the title and description in the [`Head` component](https://nextjs.org/docs/api-reference/next/head). This is how meta title and description tags might look like in Next.js:

```jsx
import Head from 'next/head';

function IndexPage() {
  return (
    <div>
      <Head>
        <title>
          iPhone 12 XS Max For Sale in Colorado - Big Discounts | Apple
        </title>
        <meta
          name="description"
          content="Check out iPhone 12 XR Pro and iPhone 12 Pro Max. Visit your local store and for expert advice."
          key="desc"
        />
      </Head>
      <h1>iPhones for Sale</h1>
      <p>insert a list of iPhones for sale.</p>
    </div>
  );
}

export default IndexPage;
```

The `Head` component can be used on any page in your application to describe or provide information about the page's contents.

### Open Graph

The [Open Graph protocol](https://ogp.me/), originally developed by Facebook, standardizes how metadata is used on any given web
page. You can provide as little or as much information as you would like, but all of the open graph pieces fit together to create a representation of the
site it's attached to.

Other social media companies (like Pinterest, Twitter, LinkedIn, etc), may also use open graph for displaying rich cards when sharing a URL. Twitter also
has tags of its [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup).

While these Open Graph tags have a lot of similarities with SEO related tags, they do not offer any benefit to search engine rankings, but they are still
recommended to use as people might share your content on social media or private messaging tools such as WhatsApp or Telegram.

You can add Open Graph tags by defining the `property` attribute in the meta tags inside the `Head` component. For example:

```jsx
import Head from 'next/head';

function IndexPage() {
  return (
    <div>
      <Head>
        <title>Cool Title</title>
        <meta name="description" content="Checkout our cool page" key="desc" />
        <meta property="og:title" content="Social Title for Cool Page" />
        <meta
          property="og:description"
          content="And a social description for our cool page"
        />
        <meta
          property="og:image"
          content="https://example.com/images/cool-page.jpg"
        />
      </Head>
      <h1>Cool Page</h1>
      <p>This is a cool page. It has lots of cool content!</p>
    </div>
  );
}

export default IndexPage;
```

Having a shareable link that offers a description and title, along with a picture that represents the page's content does not have a direct effect on
SEO rankings, but it indirectly increases the clickability of the link, which will ultimately lead to more visitors to your site.

### Structured Data and JSON-LD

Structured data facilitates the understanding of your pages to search engines. Over the years, there have been several vocabularies in place, but currently the main one is [schema.org](https://schema.org/).

According to the website, schema.org is a "collaborative, community activity with a mission to create, maintain, and promote schemas for structured data on the Internet, on web pages, in email messages, and beyond."

Schema.org's vocabulary can be used with many different encodings, including [RDFa](https://www.w3.org/TR/rdfa-primer/), [Microdata](https://www.w3.org/TR/microdata/), and [JSON-LD](https://www.w3.org/TR/json-ld11/).

Different search engines might adapt different vocabularies within schema.org, and no search engine covers all the use cases described the website's
vocabulary. Be sure to check which vocabularies are accepted in each case.

An example of a what a product page might look like adding the JSON-LD product schema data:

```jsx
import Head from 'next/head';

function ProductPage() {
  function addProductJsonLd() {
    return {
      __html: `{
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": "Executive Anvil",
      "image": [
        "https://example.com/photos/1x1/photo.jpg",
        "https://example.com/photos/4x3/photo.jpg",
        "https://example.com/photos/16x9/photo.jpg"
       ],
      "description": "Sleeker than ACME's Classic Anvil, the Executive Anvil is perfect for the business traveler looking for something to drop from a height.",
      "sku": "0446310786",
      "mpn": "925872",
      "brand": {
        "@type": "Brand",
        "name": "ACME"
      },
      "review": {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "4",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Fred Benson"
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.4",
        "reviewCount": "89"
      },
      "offers": {
        "@type": "Offer",
        "url": "https://example.com/anvil",
        "priceCurrency": "USD",
        "price": "119.99",
        "priceValidUntil": "2020-11-20",
        "itemCondition": "https://schema.org/UsedCondition",
        "availability": "https://schema.org/InStock"
      }
    }
  `,
    };
  }
  return (
    <div>
      <Head>
        <title>My Product</title>
        <meta
          name="description"
          content="Super product with free shipping."
          key="desc"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={addProductJsonLd()}
          key="product-jsonld"
        />
      </Head>
      <h1>My Product</h1>
      <p>Super product for sale.</p>
    </div>
  );
}

export default ProductPage;
```

In this example, the data is hardcoded as a string, but you can easily pass the data to the `addProductJsonLd` method to make it fully dynamic.

<Quiz
  question="Which of the following is used on social media?"
  answers={['Open Graph', 'JSON-LD', 'H1 Tag']}
  correctAnswer="Open Graph"
/>

### Further Reading

- Open Graph Protocol: [Documentation](https://ogp.me/)
- Google: [Intro to Structured Data](https://developers.google.com/search/docs/guides/intro-structured-data)
- Google: [Product Structured Data](https://developers.google.com/search/docs/data-types/product)
- Google: [Rich Results Tester](https://search.google.com/test/rich-results)


<!-- Source: 15-on-page-seo.mdx -->
## On Page SEO

---
title: On Page SEO
---

At a high level, on page SEO refers to the headings and links that make up the overall structure of the page. Headings indicate importance in the document and links connect the web together.

### Headings and H1

Headings help users understand the structure of a page and what they are going to read in the next paragraphs. They also facilitate the search engine's job
of understanding which parts of the page are the most important.

Headings go from 1-6 and Heading 1 tends to be thought of as the most important. It's recommended to use the H1 heading tag in each page. H1 should represent what the page is about and be similar to your `title` tag.

```jsx
function Page() {
  return <h1>Your Main Page Heading</h1>;
}
```

### Internal Links

The internet is connected by links. Without links from one website to another, the internet probably wouldn't exist. Websites that receive more links tend to
represent websites that are more trusted by users.

Google started this principle with the invention of the [PageRank Algorithm](https://web.stanford.edu/class/cs54n/handouts/24-GooglePageRankAlgorithm.pdf)
.

The PageRank algorithm, at a high level, is an algorithm that goes through every link on a database and scores domains based on how many links they
receive (quantity) and from which domains (quality). Lots of links from spam websites most likely have little to no value.

A link from a big national press website, however, is likely very valuable for search engines. This is why links are important and you should always include them both internally between your page, and also externally to other websites. Links always need to use `href` in order to be used for PageRank calculations.

### next/link

Next.js provides the [`Link` component](https://nextjs.org/docs/api-reference/next/link) that enables client-side transitions between routes. A simple use case would look something like the following:

```jsx
function NavLink({ href, name }) {
  return (
    <Link href={href}>
      <a>{name}</a>
    </Link>
  );
}

export default NavLink;
```

The `href` prop is required and will correctly add the link to the anchor tag, which is vital for SEO. When Google crawls a page, it will crawl
and follow this link without relying on JavaScript.

However, if the child of `Link` is a custom component that wraps an `a` tag, you must add `passHref` to `Link`. This is necessary if you’re using libraries like `styled-components`. Without this, the `a` tag will not have the `href` attribute, which affects your site’s SEO.

How to use `passHref`:

```jsx
import Link from 'next/link';
import styled from 'styled-components';

// This creates a custom component that wraps an <a> tag
const RedLink = styled.a`
  color: red;
`;

function NavLink({ href, name }) {
  // Must add passHref to Link
  return (
    <Link href={href} passHref>
      <RedLink>{name}</RedLink>
    </Link>
  );
}

export default NavLink;
```

If you use ESLint, Next.js has a rule to protect against this happening.

<Quiz
  question="Why are headings important for SEO?"
  answers={[
    'They help bots understand which text on the page can be more representative of the overall content.',
    'They help users to spend less time on the site.',
    'They are not important for SEO.',
    'All of the above.',
    'None of the above.',
  ]}
  correctAnswer="They help bots understand which text on the page can be more representative of the overall content."
/>

### Further Reading

- Next.js: [Link](https://nextjs.org/docs/api-reference/next/link)
- Next.js: [eslint-plugin-next](https://nextjs.org/docs/basic-features/eslint)


<!-- Source: 16-web-performance.mdx -->
## Web Performance & Core Web Vitals

---
title: Web Performance & Core Web Vitals
---

[Web Vitals](https://web.dev/vitals/) is an initiative created by Google to provide unified guidance and metrics to measure end-user page experience
on the web.

[Core Web Vitals](https://developers.google.com/search/blog/2020/11/timing-for-page-experience) is a subset of Web Vitals, and currently consists of three metrics that measure loading, interactivity, and visual stability. These metrics are [Largest Contentful Paint (LCP)](/learn/seo/web-performance/lcp), [First Input Delay (FID)](/learn/seo/web-performance/fid), and [Cumulative Layout Shift (CLS)](/learn/seo/web-performance/cls).

Achieving a great score in these three metrics will create a smoother website experience for your users.

Websites scoring poorly in each of the Core Web Vitals metrics will impact its search engine ranking as Google starts to use [Core Web Vitals as a ranking factor](https://developers.google.com/search/blog/2020/11/timing-for-page-experience) for their search algorithm. Poor vitals can have an impact on your web traffic and business.

In this lesson, you’ll learn:

- A short background on Core Web Vitals.
- Implications of Core Web Vitals in SEO and UX, and its impact on your website.
- Why you should care about Core Web Vitals in your development process and how to measure them.
- How to improve your Core Web Vitals with Next.js and monitor changes.


<!-- Source: 17-vitals-overview.mdx -->
## Web Vitals Overview

---
title: Web Vitals Overview
---

In this lesson, we will go through the different metrics, the impact that [Core Web Vitals](https://web.dev/vitals/) can have on your SEO,
and the importance they have over your user experience.

There are three different values when measuring Core Web Vitals:

**"Good"**, **"Needs Improvement"**, and **"Poor"**. These values differ based on the vital being measured:

<Image
  alt="Core Web Vitals"
  src="/learn/pages-router/seo/vitals-light.png"
  width={2062 / 2}
  height={960 / 2}
/>

You can approach Core Web Vitals in two different ways:

- **Try to achieve the highest score possible on each metric**. Striving for perfection is great, but it might be tricky on large websites with many dependencies.
- **Benchmark against competitors in your industry**. You are not competing with every perfectly optimized website in Google search, but with others ranking for your target keywords.

### Next Steps

In the following lessons, we will go through each vital to understand what it
measures.

<Quiz
  question="What is measured by Core Web Vitals?"
  answers={[
    'How many external scripts you are loading.',
    'Loading, interactivity, and visual stability.',
    'How accessible your website is.',
  ]}
  correctAnswer="Loading, interactivity, and visual stability."
/>


<!-- Source: 18-lcp.mdx -->
## Largest Contentful Paint (LCP)

---
title: Largest Contentful Paint (LCP)
---

<Image
  alt="Largest Contentful Paint"
  src="/learn/pages-router/seo/lcp.png"
  width={1440 / 2}
  height={960 / 2}
  caption="LCP shows how long it takes for the largest element to be loaded and visible for users."
/>

The **Largest Contentful Paint (LCP)** metric looks at the loading performance of your page. LCP measures the time it takes to get the largest element on the page visible within the viewport. This could be a large text block, video, or image that takes up the primary real estate on the page.

**Note:** This is not [First Contentful Paint (FCP)](https://web.dev/fcp/), which measures the time from when the page begins to load to when the first element
is rendered on screen.

As the DOM is rendered, the largest element on the page may change. The Largest Contentful Paint doesn't stop counting until the largest image orelement is seen on-screen.

<Image
  alt="Largest Contentful Paint Example"
  src="/learn/pages-router/seo/lcp-example.png"
  width={2062 / 2}
  height={960 / 2}
  caption="The Largest Contentful Paint doesn't stop counting until the largest image or element is seen on-screen."
/>

<Quiz
  question="What does Largest Contentful Paint (LCP) measure?"
  answers={[
    'LCP measures visual stability of a web page.',
    'LCP measures interactivity of a web page.',
    'LCP measures the loading performance of a web page.',
  ]}
  correctAnswer="LCP measures the loading performance of a web page."
/>

### Further Reading

- Google: [Largest Contentful Paint Documentation](https://web.dev/lcp/)
- Vercel: [Blog: Core Web Vitals - Largest Contentful Paint](https://vercel.com/blog/core-web-vitals#largest-contentful-paint)


<!-- Source: 19-fid.mdx -->
## First Input Delay (FID)

---
title: First Input Delay (FID)
---

The **First Input Delay (FID)** metric is the perception of an
end user’s experience while interacting with a web page. Imagine clicking
inside an input box only for nothing to happen – this frustration with the
interactivity and responsiveness of a site is caused by large input delays.

<Image
  alt="First Input Delay"
  src="/learn/pages-router/seo/fid.png"
  width={1440 / 2}
  height={960 / 2}
/>

FID requires real user data and cannot be measured in the lab (e.g. Google Lighthouse). However, the [Total Blocking Time (TBT)](https://web.dev/tbt) metric is lab-measurable and captures issues that affect interactivity.

<Image
  alt="First Input Delay Example"
  src="/learn/pages-router/seo/fid-example.png"
  width={2062 / 2}
  height={960 / 2}
  caption="FID happens when the browser’s
    main thread is performing other tasks and is unable to respond to the user’s
    request."
/>

<Quiz
  question="What does First Input Delay (FID) measure?"
  answers={[
    'FID measures the visual stability of a web page.',
    'FID measures the interactivity of a web page.',
    'FID measures the loading performance of a web page.',
  ]}
  correctAnswer="FID measures the interactivity of a web page."
/>

### Further Reading

- Google: [First Input Delay Documentation](https://web.dev/fid/)
- Vercel: [Blog: Core Web Vitals - First Input Delay](https://vercel.com/blog/core-web-vitals#first-input-delay)


<!-- Source: 20-cls.mdx -->
## Cumulative Layout Shift (CLS)

---
title: Cumulative Layout Shift (CLS)
---

<Image
  alt="Cumulative Layout Shift"
  src="/learn/pages-router/seo/cls.png"
  width={1440 / 2}
  height={960 / 2}
/>

The **Cumulative Layout Shift (CLS)** metric is a measure of your site’s overall layout stability. A site that unexpectedly shifts layout as the
page loads can lead to accidental user error and distraction.

Cumulative Layout Shift (CLS) occurs when elements have been shifted after initially being rendered by the DOM. Here, a button was rendered to the screen
after the text block, causing the block to shift downward. A combination of impact and distance is considered when calculating CLS.

<Image
  alt="Cumulative Layout Shift Example"
  src="/learn/pages-router/seo/cls-example.png"
  width={2062 / 2}
  height={960 / 2}
  caption="Elements that shift position when new elements render to screen affect CLS."
/>

Each element’s individual layout shift score is only counted toward CLS if unexpected movement occurs. If a new element is added to the DOM or an
existing element changes size, it doesn’t count toward layout shift if the loaded elements maintain their position.

<Quiz
  question="What are the three Core Web Vitals metrics?"
  answers={['FID, CLS, TBT', 'LCP, FID, CLS', 'CLS, FID, TBT']}
  correctAnswer="LCP, FID, CLS"
/>

### Further Reading

- Google: [Cumulative Layout Shift Documentation](https://web.dev/cls/)
- Vercel: [Blog: Core Web Vitals - Cumulative Layout Shift](https://vercel.com/blog/core-web-vitals#cumulative-layout-shift)


<!-- Source: 21-seo-impact.mdx -->
## SEO Impact

---
title: SEO Impact
---

The main objective of Google's search engine is to give users the best results
possible while taking localization and misspellings into account. In every
case, Google cares about giving users a fast and smooth result with great
website experience. [Web page speed](https://developers.google.com/web/updates/2018/07/search-ads-speed) on mobile devices has been a ranking factor since 2018. However, it's not
been clear what specific performance metrics the Google Search algorithm uses as
part of ranking until now.

This changed in June 2021, when Google provided [a set of specific metrics and ranges](https://developers.google.com/search/blog/2021/04/more-details-page-experience) to analyze and optimize your performance.

<Image
  alt="Search experience signals details for the June 2021 Google algorithm update."
  src="/learn/pages-router/seo/page-experience.png"
  width={2062 / 2}
  height={1312 / 2}
/>

### Lighthouse (v6) Weights for Vitals

The three metrics are not necessarily valued equally. In [Lighthouse](https://developers.google.com/web/tools/lighthouse), different weights are assigned to each of the Core Web Vitals:

- **Largest Contentful Paint**: 25%
- **Total Blocking Time**: 25%
- **First Contentful Paint**: 15%
- **Speed Index**: 15%
- **Time to Interactive**: 15%
- **Cumulative Layout Shift**: 5%

This is similar to [First Input Delay](/learn/seo/web-performance/fid).

**Note:** The Google ranking impact will be the same for all pages in the good range for all Core Web Vitals, regardless of their individual Core Web Vitals scores.

### UX Impact

Most conversations around Core Web Vitals are primarily focused on SEO.

While it's true that Core Web Vitals are an initiative designed to measure and push the improvement of page experience and search ranking, it's the users who ultimately benefit from these changes.

Core Web Vitals help to strive for the best page experience. According to a [study performed by Amazon in 2012](https://www.fastcompany.com/1825005/how-one-second-could-cost-amazon-16-billion-sales), one additional second of load time could potentially cost the company 1.6 billion USD. Studies like this showcase the importance of a great page experience and a fast website, both of which Core Web Vitals help to achieve.

### Further Reading

- Chromium: [The Science Behind Web Vitals](https://blog.chromium.org/2020/05/the-science-behind-web-vitals.html)


<!-- Source: 22-improve.mdx -->
## Improving your Core Web Vitals

---
title: Improving your Core Web Vitals
---

Let's look at how we can improve the Core Web Vitals of our example using Next.js features.

In this lesson, you’ll learn:

- What Lighthouse is and how we can use it.
- How to use `next/image` to automatically optimize images.
- How to dynamically import libraries and components to reduce your initial JS bundle.
- How to preconnect to third-party scripts.
- How Next.js optimizes web font loading by default.
- How to optimize loading of any third-party scripts.


<!-- Source: 23-lighthouse.mdx -->
## Introducing Lighthouse

---
title: Introducing Lighthouse
---

As we saw in the previous section, Core Web Vitals focus on aspects of the user experience via loading performance (Largest Contentful Paint), interactivity (First Input Delay), and visual stability (Cumulative Layout Shift).

In this lesson, we'll focus on how to measure Core Web Vitals through the use of a simulated environment called [Lighthouse](/docs/api-reference/cli#production).

**Note**: For this lesson we will be using [Chrome Dev Tools](https://developers.google.com/web/tools/lighthouse?hl=en#devtools). However, there are [many ways](/docs/api-reference/cli#production) to run Lighthouse.

Lighthouse works by running a series of audits on a provided URL. Based on these audits, it generates a report on how well the page performed. If there
are areas that need improvement, the report will provide insight on how to improve.

Let's take a look at two examples of a Lighthouse report to see the difference between a site that has healthy Core Web Vitals and one that does not.

### Optimized Example

To see an example of how Lighthouse works, we will use our [homepage](https://nextjs.org).

- Open [Chrome](https://www.google.com/chrome/).
- In an incognito window, navigate to `https://nextjs.org`.
- Open DevTools and click on **Lighthouse** tab.
- Click **Generate Report**.

This will now run a report which should take less than 60 seconds.

**Note**: It is important to run reports in an incognito window, as third-party plugins will affect your report.

In addition, ad blockers can block scripts from loading, which would give an incomplete audit. Consider setting a clean [persona](/docs/api-reference/cli#production) to measure performance.

Here's an example report:

<Image
  alt="Lighthouse Report for Next.js homepage"
  src="/learn/pages-router/seo/lighthouse.png"
  width={2766 / 3}
  height={2148 / 3}
  placeholder="blur"
/>

### Unoptimized Example

For the purpose of this tutorial, we have created an application without any optimizations.

#### Project Setup

This is a basic unoptimized application that allows visitors to do two things: search for a country to retrieve its population and click on a button to read
a pop-up modal. This application is meant to mimic the reality of working on large applications where the use of third-party libraries cannot be avoided.

#### Download Starter Code

```bash
npx create-next-app@latest nextjs-lighthouse --use-npm --example "https://github.com/vercel/next-learn/tree/main/seo"
```

#### Run Production Build

To get accurate reports from Lighthouse, your application should always be tested with a production build. To run a production build, change into the
project directory:

```bash
cd nextjs-lighthouse
```

Build your application by running `next build` and start the server in
[production mode](/docs/api-reference/cli#production) by running `next start`.

```bash
npm run build && npm run start
```

Let's run a Lighthouse report with Chrome DevTools. Once the report has completed, let's start to optimize the site and improve the vitals.

<Quiz
  question="Why should you run Lighthouse in incognito mode?"
  answers={[
    'To prevent site history from being saved.',
    'To stop extensions from negatively affecting load performance.',
    'So your browser history does not affect performance.',
  ]}
  correctAnswer="To stop extensions from negatively affecting load performance."
/>

### Further Reading

- Google Chrome: [Lighthouse Scoring Calculator](https://googlechrome.github.io/lighthouse/scorecalc/)


<!-- Source: 24-images.mdx -->
## Automatic Image Optimization

---
title: Automatic Image Optimization
description:
---

### Unoptimized Images

Using regular HTML, we have added our Hero image like so:

```html
<img src="large-image.jpg" alt="Large Image" />
```

However, this means we have to manually optimize a few things like:

- Ensuring our image is responsive on different screen sizes.
- Optimizing our images with a third-party tool or library.
- Lazy-loading images as they enter the viewport

### The Image Component

Next provides a [Image component](/docs/api-reference/next/image) that can handle these optimizations out-of-the-box for us.

`next/image` is an extension of the HTML `img` element, evolved for the modern web.

This means that resizing, optimizing, and serving images in modern formats like WebP (when the browser supports it) can be done automatically using `next/image`.

The component avoids shipping large images to devices with a smaller viewport and allows Next.js to adopt future image formats and serve those images to
browsers that support them.

Automatic Image Optimization works with any image source. Even if the image is hosted by an external data source, like a CMS, it can still be optimized.

### How does Automatic Image Optimization Work?

#### On-demand Optimization

Instead of optimizing images at build time, Next.js optimizes images on-demand as users request them. Unlike static site generators and static-only solutions, build times don't increase, whether shipping ten images or ten million images.

#### Lazy Loaded Images

Images are lazy loaded by default. Page speed won't be penalized for images
housed outside of the viewport. Images only load when they come into view.

#### Avoids CLS

Images are always rendered to avoid Cumulative Layout Shift (CLS).

### Using the Image Component

Let's update the app using `next/image` to display our hero image. The height and width props should be the desired rendering size, with an aspect ratio identical to the source image.

Open the `pages/index.js` file and add an import for

`Image` from `next/image` at the beginning of the file:

```jsx
import Image from 'next/image';
```

Then, replace the hero `img` with the `Image` component:

```jsx
// Before
<img src="large-image.jpg" alt="Large Image" />

// After
<Image src="/large-image.jpg" alt="Large Image" width={3048} height={2024} />
```

There's also an image in the footer. Let's replace this as well:

```jsx
// Before
<img src="/vercel.svg" alt="Vercel Logo" />

// After
<Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
```

Finally, run another Lighthouse report in Chrome DevTools and compare your results.

### Further Reading

- Next.js: [Automatic Image Optimization Documentation](/docs/basic-features/image-optimization)
- Next.js: [API Reference for `next/image`](/docs/api-reference/next/image)


<!-- Source: 25-dynamic-imports.mdx -->
## Dynamic Imports

---
title: Dynamic Imports
---

In this lesson, we will reduce the amount of JavaScript loaded during initial page load from third-party libraries.

Next.js supports ES2020 [dynamic `import()`](/docs/advanced-features/dynamic-import) for JavaScript. With it, you can import JavaScript modules dynamically and work with them. They also work with server-side rendering (SSR).

Think of dynamic imports as another way to split your code into manageable chunks.

Open the `pages/index.js` file and remove these two imports at the beginning of the file as we are going to dynamically import them further down the file.

```jsx
import Fuse from 'fuse.js';
import _ from 'lodash';
```

For now we also want to remove:

```jsx
const fuse = new Fuse(countries, {
  keys: ['name'],
  threshold: 0.3,
});
```

Now that we have removed this code, let's set up the search input to use the dynamically imported libraries.

We can replace the input with the following code:

```jsx
<input
  type="text"
  placeholder="Country search..."
  className={styles.input}
  onChange={async (e) => {
    const { value } = e.currentTarget;
    // Dynamically load libraries
    const Fuse = (await import('fuse.js')).default;
    const _ = (await import('lodash')).default;

    const fuse = new Fuse(countries, {
      keys: ['name'],
      threshold: 0.3,
    });

    const searchResult = fuse.search(value).map((result) => result.item);

    const updatedResults = searchResult.length ? searchResult : countries;
    setResults(updatedResults);

    // Fake analytics hit
    console.info({
      searchedAt: _.now(),
    });
  }}
/>
```

By using Dynamic Imports, this fixes the "Remove unused JavaScript" issue on page load. This also improves our Time to Interactive (TTI), which helps improve [First Input Delay (FID)](/learn/seo/web-performance/fid).

Let's run another Lighthouse Report in Chrome DevTools to view our progress.

### Further Reading

- Next.js: [Dynamic Imports Documentation](/docs/advanced-features/dynamic-import)


<!-- Source: 26-dynamic-import-components.mdx -->
## Dynamic Imports for Components

---
title: Dynamic Imports for Components
---

Next, let's turn our attention to a React component that is not needed on the initial page load.

React components can also be imported using dynamic imports, but in this case we use it in conjunction with `next/dynamic` to make sure it works just like any other React Component.

We will use this method to delay the loading of our modal with the `Hello World` code sample. By doing this we also remove two further third party libraries from the initial page load.

Open the `pages/index.js` file and add an import for `dynamic` from `next/dynamic` at the beginning of the file:

```jsx
import dynamic from 'next/dynamic';
```

We should also remove this line:

```jsx
import CodeSampleModal from '../components/CodeSampleModal';
```

We can now import it as a dynamic component by adding the following at the beginning of the file:

```jsx
const CodeSampleModal = dynamic(() => import('../components/CodeSampleModal'), {
  ssr: false,
});
```

`CodeSampleModal` will be the default component returned by `../components/CodeSampleModal`. It works like a regular React Component, and you can pass props to it as you normally would.

As we do not need this component on the server, we have used `ssr: false` to disable it.

Next, we want to defer the loading of this component until it's required by the user. To do this, we can wrap the component in a conditional that checks if the modal should be open, and if so, it will be loaded.

Wrap the `CodeSampleModal` component like so:

```jsx
{
  isModalOpen && (
    <CodeSampleModal
      isOpen={isModalOpen}
      closeModal={() => setIsModalOpen(false)}
    />
  );
}
```

Now, when `isModalOpen` is toggled to `true` for the first time, the JavaScript required will be requested.

With these optimizations the vitals should now look healthier. Let's run another Lighthouse report in Chrome DevTools to verify.

We are left with this two optimization suggestions:

- **Use HTTP2**: to solve this problem, we can deploy to somewhere that supports HTTP2 (e.g. [Vercel](https://www.vercel.com)).
- **Image elements do no have explicit `width` and `height`**: This is actually a [bug in lighthouse](https://github.com/GoogleChrome/lighthouse/issues/11631) and does not affect site performance.

### Further Reading

- Next.js: [Dynamic Imports Documentation](/docs/advanced-features/dynamic-import#basic-usage)


<!-- Source: 27-fonts.mdx -->
## Optimizing Fonts

---
title: Optimizing Fonts
---

[82% of web pages for desktop](https://almanac.httparchive.org/en/2020/fonts) use web fonts. Custom fonts are important for the branding, design, and cross-browser/device consistency of your site. However, using a web font should not come at the cost of performance.

Next.js has built-in [Automatic Webfont Optimization](/docs/basic-features/font-optimization) that inlines font CSS at build time, eliminating an extra round trip to fetch font declarations. This results in improvements to First Contentful Paint (FCP) and Largest Contentful Paint (LCP).

For example, here is the before and after of Next.js optimizing your font.

Before optimizing, an extra network request is needed:

```jsx
<link href="https://fonts.googleapis.com/css2?family=Inter" rel="stylesheet" />
```

After optimizing, Next.js inlines the font CSS for you:

```jsx
<style data-href="https://fonts.googleapis.com/css2?family=Inter">
  @font-face{font-family:'Inter';font-style:normal; }
</style>
```


<!-- Source: 28-third-party-scripts.mdx -->
## Optimizing Third-Party Scripts

---
title: Optimizing Third-Party Scripts
---

Many applications rely on third-party JavaScript to include different types of functionality, such as analytics, ads, and customer support widgets. However,
embedding third-party authored code can delay page content from rendering and affect user performance if it is loaded too early.

Next.js provides a built-in [Script component](/docs/basic-features/script) that optimizes loading for any third-party script, while giving developers the option to decide when to fetch and execute it.

### Using the Script Component

Using regular HTML, external scripts would need to be manually appended to `next/head`:

```jsx
import Head from 'next/head';

function IndexPage() {
  return (
    <div>
      <Head>
        <script src="https://www.googletagmanager.com/gtag/js?id=123" />
      </Head>
    </div>
  );
}
```

With the Next.js Script component, you can add it anywhere in the component without needing to use `next/head`:

```jsx
import Script from 'next/script';

function IndexPage() {
  return (
    <div>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=123"
      />
    </div>
  );
}
```

The Script component introduces a `strategy` property that allows you to decide when to fetch and execute a script for optimal loading. To not
negatively affect Largest Contentful Paint (LCP), most third-party scripts should be deferred to load after all the contents of a page has finished
loading, either immediately after the page becomes interactive (`strategy="afterInteractive"`) or lazily during browser idle time (`strategy="lazyOnload"`).

### Further Reading

- Next.js: [Script Component](/docs/basic-features/script)
- Next.js: [API Reference for `next/script`](/docs/api-reference/next/script)


<!-- Source: 29-monitor.mdx -->
## Monitoring your Core Web Vitals

---
title: Monitoring your Core Web Vitals
---

Once you have optimized your site, it's important to monitor while in production so you can continue to iterate. When monitoring Core Web Vitals,
tracking over time is key rather than relying on one-off lab tests.

In this lesson, you’ll learn more about:

- Next.js Speed Insights
- Next.js Custom Reporting
- CrUX Report
- Other tools for measurement


<!-- Source: 30-nextjs-speed-insights.mdx -->
## Next.js Speed Insights

---
title: Next.js Speed Insights
---

[Next.js Speed Insights](https://nextjs.org/analytics) allows you to analyze and measure the performance of pages using Core Web Vitals.

<Image
  alt="Next.js Speed Insights"
  src="/learn/pages-router/seo/analytics.png"
  width={2464 / 3}
  height={1726 / 3}
  placeholder="blur"
/>

You can start collecting your [Real Experience Score](https://vercel.com/docs/concepts/speed-insights#metrics) with zero-configuration on [Vercel deployments](https://vercel.com/docs/concepts/speed-insights).


<!-- Source: 31-custom-reporting.mdx -->
## Custom Reporting

---
title: Custom Reporting
---

It is also possible to use the built-in relayer Next.js Speed Insights uses and send the data to your own service or push them to Google Analytics.

Let's look at how we might add that now. We can add it to the demo app we have been optimizing.

We will use a `console.log` to look at the metrics in real time.

To do this we can leverage the `reportWebVitals` function provided by Next.js

**Note:** This is NOT necessary if you’ve just finished the previous
lessons.

```bash
npx create-next-app@latest nextjs-lighthouse --use-npm --example "https://github.com/vercel/next-learn/tree/main/seo"
```

Open `pages/\_app.js` and export the following function:

```jsx
export function reportWebVitals(metric) {
  console.log(metric);
}
```

Then build and start your application:

```bash
npm run build && npm run start
```

If you open up Chrome, you will see the metrics inside the DevTools console. You will also notice that **FID** will only trigger once you
interact with the page.

### Further Reading

- Next.js: [Measuring Performance](/docs/advanced-features/measuring-performance)


<!-- Source: 32-other-tools.mdx -->
## Other Tools

---
title: Other Tools
---

You can find field data collection in the following tools:

- [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/): Google's Page Speed measurement tool.
- [Chrome User Experience Report](https://developers.google.com/web/tools/chrome-user-experience-report): Field data open-source dataset.
- [Search Console](https://support.google.com/webmasters/answer/9205520): Google Search, Core Web Vitals report.

If you are looking for lab data, Google also offers several measurement tools:

- [Lighthouse](https://developers.google.com/web/tools/lighthouse?hl=en): Google's open-source, automated tool for improving the quality of web pages.
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/): Set of web developer tools built directly into the Google Chrome browser.

Note that for both tools, you will need to use [Total Blocking Time (TBT)](https://web.dev/tbt/) as an alternative to [First Input Delay (FID)](https://web.dev/fid/) since FID can only be measured through field data.

<Quiz
  question="When is the best time to track performance?"
  answers={[
    'Before you merge a pull request',
    'Run a report every day',
    'Track over time by monitoring real users',
  ]}
  correctAnswer="Track over time by monitoring real users"
/>


<!-- Source: 33-data-studio.mdx -->
## Data Studio (Chrome User Experience Report)

---
title: Data Studio (Chrome User Experience Report)
---

Another great free and open-source way of measuring your performance is to use the [Chrome User Experience Report](https://developers.google.com/web/tools/chrome-user-experience-report) dataset.

The [Chrome User Experience Report](https://developers.google.com/web/tools/chrome-user-experience-report) provides user experience metrics for how real-world Chrome users experience popular destinations on the web.

This dataset is publicly available [under BigQuery](https://console.cloud.google.com/bigquery?project=chrome-ux-report) and you can also consume it under [Google Data Studio](https://datastudio.google.com/overview) completely for free.

Luckily for you, there are [open-source dashboards available](https://g.co/chromeuxdash) that you can use as a template for tracking the performance of your website.

The only downside of this dataset is that, in order for your website to be included in the CrUX report, it will need to have a meaningful amount of visits otherwise it won't be included in the report due to lack of data. Hence this it may not the best option for work-in-progress or recently created websites.

Also, the data is updated on a monthly basis. Usually around 15 days after the month is finished, so you will see the data with certain delay and that might not be the most practical thing if you plan to work on improving your Core Web Vitals scores.

<Image
  alt="Data Studio example for chrome user experience report"
  src="/learn/pages-router/seo/data-studio.png"
  width={1600 / 2}
  height={1196 / 2}
  placeholder="blur"
/>

### Further Reading

- **Google**: [Example Dashboard (copy for free)](https://web.dev/chrome-ux-report-data-studio-dashboard/)


<!-- Source: 34-next-steps.mdx -->
## Next Steps

---
title: Next Steps
---

Great job!

You have finished the Search Engine Optimization and Core Web Vitals course!

### Recommended Next Steps:

- **Share**: Let us know that you've leveled up your SEO and Core Web Vitals knowledge through use of this tutorial on [Twitter](https://www.twitter.com/vercel). Let us know of any feedback you have.
- **Join the conversation**: If you have questions about anything related to Next.js, you're always welcome to ask our community on [GitHub Discussions](https://github.com/vercel/next.js/discussions) and [Discord](https://www.nextjs.org/discord).

Thanks to [Gary Meehan](https://twitter.com/garmeeh) and [Esteve Castells](https://twitter.com/estevecastells) for helping creating this course.


<!-- Source: index.mdx -->
## SEO

---
title: SEO
---

## What is SEO?

SEO stands for **Search Engine Optimization**. The goal of SEO is to create a strategy that will increase your rankings position in search engine results. The higher the ranking, the more organic traffic to your site, which ultimately leads to more business for you!

### What You’ll Learn in This Course

In this course, we'll talk about:

- Search Systems, and search engine robots such as Googlebot.
- The impact having an SEO strategy can make on your site.
- How to incorporate best SEO practices.
- Crawling, indexing, rendering, and ranking with Next.js.
- Web Performance topics including Core Web Vitals.

### Join the Conversation

If you have questions about anything related to Next.js or this course, you're welcome to ask our community on [Discord](https://discord.gg/Q3AsD4efFC).

Let’s get started!
