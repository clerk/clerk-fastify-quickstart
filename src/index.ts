// dotenv must be imported before @clerk/fastify
import "dotenv/config";
import Fastify from "fastify";
import { clerkClient, clerkPlugin, getAuth } from "@clerk/fastify";

const fastify = Fastify({ logger: true });

fastify.register(clerkPlugin);

// Declare a route and access the auth state for this request
fastify.get("/", async (request, reply) => {
  const { userId } = getAuth(request);
  const user = userId ? await clerkClient.users.getUser(userId) : null;

  return reply.send({
    message: "Authentication state retrieved successfully.",
    user,
  });
});

// Protect a route and return 403 if user is unauthenticated
fastify.get("/protected", async (request, reply) => {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return reply.code(403).send({ error: "Unauthorized request." });
    }

    const user = await clerkClient.users.getUser(userId);

    return reply.send({
      message: "Authentication state retrieved successfully.",
      user,
    });
  } catch (error) {
    fastify.log.error(error);
    return reply
      .code(500)
      .send({ error: "Failed to retrieve user information." });
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
