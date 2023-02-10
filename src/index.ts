import "./loadEnv";

import Fastify from "fastify";
import { clerkClient, clerkPlugin, getAuth } from "@clerk/fastify";

const fastify = Fastify({ logger: true });

/**
 * Register the Clerk plugin globally.
 * By default, Clerk will initialise using the API keys from the environment if found.
 *
 * If you prefer to pass the keys to the plugin explicitly, see `src/using-runtime-keys.ts`
 * If you prefer to register the plugin for specific routes only, see `src/authenticating-specific-routes.ts`
 */
fastify.register(clerkPlugin);

fastify.get("/", async (req, reply) => {
  const { userId } = getAuth(req);
  const user = userId ? await clerkClient.users.getUser(userId) : null;
  return { user };
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
