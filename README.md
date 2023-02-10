<p align="center">
  <a href="https://clerk.dev?utm_source=github&utm_medium=clerk_fastify" target="_blank" rel="noopener noreferrer">
    <img src="https://images.clerk.dev/static/logo-light-mode-400x400.png" height="64">
  </a>
  <br /> 
</p>

# Clerk Fastify Starter

This example shows how to use [Clerk](https://www.clerk.dev/?utm_source=github&utm_medium=starter_repos&utm_campaign=fastify_starter) with Fastify.

[![chat on Discord](https://img.shields.io/discord/856971667393609759.svg?logo=discord)](https://discord.com/invite/b5rXHjAg7A)
[![documentation](https://img.shields.io/badge/documentation-clerk-green.svg)](https://docs.clerk.dev)
[![twitter](https://img.shields.io/twitter/follow/ClerkDev?style=social)](https://twitter.com/intent/follow?screen_name=ClerkDev)

## Running the starter
To run the example locally you need to:

1. Sign up for a Clerk account at https://clerk.dev.
2. Go to [Clerk's dashboard](https://dashboard.clerk.dev/?utm_source=github&utm_medium=starter_repos&utm_campaign=fastify_starter) and create an application.
3. Clone the repo locally `git clone git@github.com:clerkinc/clerk-fastify-starter.git && cd clerk-fastify-starter`
4. Set the required Clerk environment variables as shown in [the example env file](./.env.sample).
5. `npm install` the required dependencies.
6. `npm run start` to launch the demo Fastify server.

## Contents
This example repo contains the following examples:
- `./src/index.ts`: Basic Clerk and Fastify usage. Run the example with `npm run start`
- `./src/authenticating-specific-routes.ts`: Instead of using Clerk globally, this examples show how to use Clerk for a subset of your routes, using the `register` Fastify helper. Run the example with `npm run start:specific-routes`.
- `./src/using-runtime-keys.ts`: Instead of setting environment variables, this examples shows how to initialise Clerk by passing the required API keys directly to `clerkPlugin`. Run the example with `npm run start:runtime-keys`

## Learn more

To learn more about Clerk and Next.js, check out the following resources:

- [@clerk/fastify package README](https://github.com/clerkinc/javascript/blob/main/packages/fastify/README.md)
- [Clerk Documentation](https://clerk.dev/docs?utm_source=github&utm_medium=starter_repos&utm_campaign=fastify_starter)

## Contact

If you need support or have anything you would like to ask, please reach out in our [Discord channel](https://discord.com/invite/b5rXHjAg7A). We'd love to chat!
