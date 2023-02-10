import Fastify from "fastify";
import { clerkPlugin, createClerkClient, getAuth } from "@clerk/fastify";
import { secrets } from "./secrets";

const fastify = Fastify({ logger: true });

const clerkOptions = {
  publishableKey: secrets.publishableKey,
  secretKey: secrets.secretKey,
};

/**
 * Create a new clerk client by explicitly passing in the API keys
 */
const clerkClient = createClerkClient(clerkOptions);

/**
 * Register the Clerk plugin and pass the clerkOptions object
 */
fastify.register(clerkPlugin, clerkOptions);

/**
 * Access the auth state using getAuth in your routes as usual
 */
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
