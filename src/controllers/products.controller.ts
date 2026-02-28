import { FastifyReply, FastifyRequest } from "fastify";
import { ProductFilters } from "../types";
import { getProducts } from "../services/products.service";
import { productFiltersSchema } from "../utils/validator";


export const listProducts = async (request: FastifyRequest<{Querystring:ProductFilters}>, reply: FastifyReply) => {

    const validation = productFiltersSchema.safeParse(request.query);

    if (!validation.success) {
        throw validation.error;
    }

    const result = await getProducts(validation.data as ProductFilters);
    reply.send(result);
}