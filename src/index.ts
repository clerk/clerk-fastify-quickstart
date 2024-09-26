// dotenv must be imported before @clerk/fastify
import "dotenv/config";
import Fastify from "fastify";
import { clerkClient, clerkPlugin, getAuth } from "@clerk/fastify";

const fastify = Fastify({ logger: true });

fastify.register(clerkPlugin);

fastify.get("/", async (request, reply) => {
  return reply.send({
    message: "This is a public route",
  });
});

// A protected route that gets the current user's User object
fastify.get("/protected", async (request, reply) => {
  try {
    // Use `getAuth()` to get auth state from the request
    const { userId } = getAuth(request);

    // Protect the route from unauthenticated users
    if (!userId) {
      return reply.code(403).send({ error: "Unauthorized request" });
    }

    // Use `clerkClient` to access Clerk's Backend SDK methods
    const user = userId ? await clerkClient.users.getUser(userId) : null;

    return reply.send({
      message: "User retrieved successfully",
      user,
    });
  } catch (error) {
    fastify.log.error(error);
    return reply.code(500).send({ error: "Failed to retrieve user" });
  }
});

const start = async () => {
  try {
    await fastify.listen({ port: 8080 });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
