### Tanstack Start

This is a proof of concept of Tanstack Start running on Fastify.
It's based on the `start-basic-react-query` starter ([source](https://github.com/TanStack/router/tree/main/examples/react/start-basic-react-query)).

### Structure

It only adds 2 files:
 - `/server.ts` (the main Fastify entrypoint)
 - `/src/server.ts` (contains the server handler and an optional `init` function to run before starting the server)

### Acknowledgements

The author is basically a mixture of [@notKamui](https://discord.com/channels/719702312431386674/1420419411679907871/1420428707763585099) (from the Discord server) and the [original express example](https://github.com/TanStack/router/blob/main/e2e/react-start/custom-basepath/express-server.ts). I've just put them together.