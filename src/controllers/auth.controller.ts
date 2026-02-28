import { FastifyReply, FastifyRequest } from "fastify";
import { loginUser, registerUser } from "../services/auth.service";
import { AuthRequest, RegisterRequest } from "../types";
import { loginSchema, registerSchema } from "../utils/validators";

export const register = async (request: FastifyRequest,reply: FastifyReply,) => {

  const validation = registerSchema.safeParse(request.body as RegisterRequest);

  if (!validation.success) {
    throw validation.error;
  }

  const user = await registerUser(validation.data);

  const token = request.server.jwt.sign({ userId: user.id });

  reply.status(201).send({
    user,
    token,
  });
};

export const login = async (request: FastifyRequest<{Body:AuthRequest}>, reply: FastifyReply) => {


  const validation = loginSchema.safeParse(request.body as AuthRequest);

  if (!validation.success) {
    throw validation.error;
  }

	const user = await loginUser(validation.data);

	const token = request.server.jwt.sign({ userId: user.id });
  
	reply.status(200).send({
		user,
		token,
	})
}