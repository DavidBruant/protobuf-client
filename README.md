# protobuf-client

Playing with protocol buffers on the client-side

## Install

```
npm install
npm start
```

## What is this?

A repo demo-ing protocol buffers on the web. The client generates a message `{a: 1, b: "ping"}`, but protobuffed, server responds with a protobuffed `{a: a+1, b: "pong"}` which, after decoded is displayed on the client side console.


# TODO

PR to protocol-buffer so brfs become a dependency and not just devDependency