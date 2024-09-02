## CORS (Cross-Origin Resource Sharing)

`CORS` informs our browser how to treat requests coming from JavaScript from one `origin` to another.  By default, the browser will issue an error unless `CORS` has been set on the other `origin` explicitly stating that it allows requests from an `origin`.  

### `same-origin` policy

In order for resources to be of the `same-origin`, they must come from the same `protocol`, `domain`, and `port`.  These 3 conditions must be true, otherwise resources are not of the `same-origin`.  If a resource is fetched using `http` protocol and another is fetched with `https`, these are *NOT* of the same origin, regardless if these are from the same domain.

- a resource from `http://www.google.com:8080` is *NOT* of the `same-origin` as a resource from `https://www.google.com:8080`

The `same-origin` policy is used by the browser to determine if it should allow requests (coming from JavaScript) should be honored.  The browser will allow the same JavaScript to send data to another origin (server) because it leaves it to other origin to know how to handle the requests (whether it ignore, rejects, or processes it).  This only applies to JavaScript requests and not user interactions.

*Only applies to JS scripts doing a GET request to another origin*

### CORS Header

The server must explicitly state a whitelist of origins that it will tell the browser to allow requests to be sent to another origin via the `CORS Header`.

```
// this tells our browser to let scripts from https://www.google.com:8080 make GET requests to this server
access-control-allow-origin: https://www.google.com:8080 
```

```
// this tells our browser to let scripts from any origin to make GET requests to this server
access-control-allow-origin: *
```