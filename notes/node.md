## Node.js

JavaScript was originally created to run in the browser, but with Ryan Dahl's creation of Node.js, it can now run
outside of the browser. Node.js is a JavaScript runtime that uses the Chrome V8 engine to execute JavaScript code
and `libuv` to provide asynchronous I/O operations through an event-driven, non-blocking architecture.

#### `libuv`

This is a library written in C/C++ that talks to the operating system to execute work.  The library has been built
to work with many operating systems, including Unix and Microsoft.  It is used by other languages like Python to
provide asynchronous features, like reading a file, making a network request, etc.  Node.js uses `JS bindings`
to talk to `libuv`.

#### CommonJS Modules
This is the default module system used by Node.js.  This means we need to use `require` to import a module, and use
`module.exports` to expose functions or variables for use by other modules.  When a file is imported, it is 
executed once and then caches what is exported.  This means modules are Singleton by default and cached in
`require.cache`.  We can now easily change our project's module system from `CommonJS` to `ES Modules` by
either updating our `package.json` to have property, `"type": "module"`, or changing our file's extension
to `.mjs`.  This would allow us to use `import` instead of `require`, and `export` instead of
`module.exports`.

```
// CommonJS
const http = require('node:http');

const server = http.createServer();

module.exports = server;
```

```
// ES Modules
import http from 'node:http';

const server = http.createServer();

export default server;
```

#### Core Modules

Node gives us many core modules that we can use to do many things.

- `node:fs`: gives us an API to read and write files, and working with Streams
- `node:http` and `node:https`: gives us methods to create a server and handle requests/responses
- `node:event`: gives us EventEmitter class to create an Observable from `eventEmitter.on` to attach an event handler and `eventEmitter.emit` to trigger event handlers
- `node:path`: gives us a way to work with the local file system directories and paths
- `node:os`: gives us info on the device we're running on, `os.cpus().length` gives us count of core CPUs
- `node:cluster`: gives us a way to create worker processes with `cluster.fork()`
- `node:utils`: gives us utility functions like `promisify` to convert a function into a `Promise`
- `node:crypto`: is a tool for hashing passwords, encyrypting data, and generating random tokens

#### Common npm modules

For web development, we can use the core Node module, `http`, and `https`, to build our server, but we also are given `express`, which is a framework that gives us a more convenient way of handling and processing requests, and building responses.  It has a rich ecosystem that we can lean on instead of building everything from scratch.  `Express` is built on the `Middleware Pattern`, where `requests` and `responses` go through multiple `callbacks` or middlewares that takes an action.  Middlewares are callback functions that take in the `request` and `response` objects, and the `next` function.

```
const path = require('path');
const http = require('http');

const express = require('express');

const PORT = 3000;

// create our Express app
const app = express();

// middleware to log how much time it took to process a request, from being received to a response sent
app.use((req, res, next) => {
    const { method, url } = req;
    const start = Date.now();
    next();
    const duration = Date.now() - start;
    console.log(`${method} ${url} request took ${duration} milliseconds.`);
});

// endpoint handler to create a response which is the html file found in ./public/index.html
app.get('/', () => {
    return res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}...`);
});

```
