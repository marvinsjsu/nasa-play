### Express

Express is the most popular Node web application framework per Stack Overflow polls.  It is an MVC framework which simplifies the handling of requests and responses via Middleware Pattern.  It is often used with MongoDB, where `model schema` are defined with `mongoose`, and we explicitly define the `controllers` where our application's business logic can live, and in the past, we've used `handlebars` as the templating engine to provide our `views`.  Express also gives use `Router` objects that make it easy to create API endpoints and bind paths to handlers.

This is the application structure I like to follow

```plaintext
.
├── node_modules/             # our application dependencies
├── data/                     # static data that we may include in bootstrapping our app
├── src/                      # our main code
|     └── constants/          # constants separated by context
|     └── controllers/        # endpoint handler definitions by entity  
|     └── middlewares/        # our custom middlewares like loggers and cors setter 
|     └── models/             # models via mongoose and setter/getter methods  
|     └── routes/             # bindings of paths to handlers  
|     └── services/           # our custom utils or libraries like for db connections
|     └── app.js              # our main Node application 
|     └── server.js           # our server definition
├── package.json        # Has scripts to build and run both client and server
└── README.md           # This README file
```



