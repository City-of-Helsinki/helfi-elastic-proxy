# Paatokset Elastic proxy

This is a Node.js application for proxying requests to Elasticsearch server. Built with Express.js.

### Getting started

```console
foo@bar:~$ npm i
foo@bar:~$ npm run dev
```

If your Elastic is not running in localhost:9200, you may set the url with `ELASTIC_URL` env variable.

If you wish for this application to run in a port other than `3000`, you may set the port with `PORT `env variable.

### How it works
This application proxies requests from a frontend application to Elasticsearch backend. In this manner we don't need to make Elastic server publicly accessible.

For simplicity's sake, this application exposes only 3 endpoints:

```
/ping
/_search
/_msearch
```

`/ping` is used to verify that the proxy is alive. Other 2 endpoints proxy request as is to Elastic backend. Read Elastic docs regarding these endpoints to determine how they work.
