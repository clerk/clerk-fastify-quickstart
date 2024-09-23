import "dotenv/config";
import Fastify from "fastify";
import { clerkClient, clerkPlugin, getAuth } from "@clerk/fastify";

const fastify = Fastify({ logger: true });

fastify.register(clerkPlugin);

// Declare a route and access the auth state for this request
fastify.get("/", async (req, reply) => {
  // Get userID from JWT passed in Authorization header
  const { userId } = getAuth(req);

  if (!userId) {
    return reply.code(401).send({ error: "Unauthorized request." });
  }

  const user = await clerkClient.users.getUser(userId);

  reply.send({ message: "Authentication state retrieved successfully." });

  return { user };
});

const start = async () => {
  try {
    await fastify.listen({ port: 8080 });
    fastify.log.info("Server is running on port 8080.");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
