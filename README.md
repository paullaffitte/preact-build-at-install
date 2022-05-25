# preact-build-at-install

An example of how to use modern javascript features and tooling to skip building and bundling during development

---

## Introduction

The goal of this repository is to demonstrate that it's possible to do modern web-app development without the habitual burden of using a build tool. It was my dream since a few years already when I started to switch from `jQuery` to `react` and realized that I didn't like to have to use building tools instead of just doing plain old javascript.

I've done my research, and some article where quite interesting, [Back to Basics: A Possible Future Without JavaScript Build Tools](https://andrewduthie.com/2019/11/29/back-to-basics-a-possible-future-without-javascript-build-tools/) was a good source of inspiration. I discovered about modern javascript tooling with blazing fast bundlers like `esbuild`, `swc`, `vite`, `parcel`, and much more, that already make building less painful. But still, I want to push my idea to its limits, and try to skip the building process at least during development.

**Why using a build tool is boring?** You have to run a build tool during all the development process, it can crash, be slow, not reports his issues to the browser console. But most of all you have to remember to start it when starting to work, and wait after each change that they are compiled.

**How hell can you not build your source?** Modern browsers support the [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) statement, so you can import your dependencies from a directory served by your backend. By building and bundling your dependencies in order to include their subdependencies as well, you make them available to your frontend application. Since dependencies don't change too much over time, you can build them only when you add a new dependency. Your source code doesn't need to be compiled since it's standard modern javascript.

## How to use it

```bash
# install dependencies
npm install

# build dependencies (required for dev and prod)
npm run setup

# build the app (for production)
npm run build

# serve files in public directory with a basic http server
npm run serve
```

After running the above commands, in your browser open

- [localhost:3000/?dev](http://localhost:3000/?dev) for the development build.
- [localhost:3000](http://localhost:3000/) for the production build.

Notice that in development mode you can change the source code and after refreshing the page, you see the changes without the need to rebuild. In production mode however, you have to rebuild the app by running `npm run build` again.

## Frequently asked questions

**What about JSX?** It's not covered in this demonstration, since I don't think it will ever be possible as JSX is not standard javascript and thus requires compilation. To avoid this issue, I use [`preact`](https://preactjs.com/) with the library [`htm`](https://www.npmjs.com/package/htm) to write my components, it looks almost the same (``return html`<${MyComponent} prop=${value} />` `` instead of ``return <MyComponent prop={value} />;``), but preact is lighter than react, offers the same functionality and `htm` doesn't requires compilation as it is standard javascript. You can however, with the help of web and service workers, build your sources [in your browser](https://divriots.com/blog/vite-in-the-browser) with vite, but it's not our goal here.

**Why the production build needs to be bundled (index.bundle.js)** Dependencies have their dependencies too, and some are reused multiple times, in the case of react for example, it would be included in each dependency using it. Bundling allows to make the client download each dependency only once.

**What is the `<script type="importmap">` tag?** [Import maps](https://github.com/WICG/import-maps#the-basic-idea) allows to replace specific imports with another one. It is used to replace the react dependency with preact during development since some dependencies like `@mui/material` import react while it should import preact instead. That's also why you can see in `setup.js` that react, `react-dom` and others are defined as *external*, so they are not included in the build and the `import` statement remains. Thus, when react should be imported, preact is imported instead.
