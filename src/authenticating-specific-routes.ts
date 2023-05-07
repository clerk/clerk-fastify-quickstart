import "./loadEnv";

import Fastify, { FastifyPluginCallback } from "fastify";
import { clerkClient, clerkPlugin, getAuth } from "@clerk/fastify";

const fastify = Fastify({ logger: true });

/**
 * Register Clerk only for a subset of your routes
 */
const protectedRoutes: FastifyPluginCallback = (instance, opts, done) => {
  instance.register(clerkPlugin);
  instance.get("/protected", async (request, reply) => {
    const { userId } = getAuth(request);
    if (!userId) {
      return reply.code(403).send();
    }

    const user = await clerkClient.users.getUser(userId);
    return { user };
  });
  done();
};

const publicRoutes: FastifyPluginCallback = (instance, opts, done) => {
  instance.get("/", async (request, reply) => {
    return {
      message:
        "This is a public endpoint. Request /protected to test the Clerk auth middleware",
    };
  });
  done();
};

/**
 * Register your routes as you normally would
 */
fastify.register(protectedRoutes);
fastify.register(publicRoutes);

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
