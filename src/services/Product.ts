import prisma from "../prisma/client";

export default class Product {
    // CREATE
    static async create({ input }) {
        console.log(input);
        const product = await prisma.product.create({
            data: input,
        });
        return product;
    }

    // READ
    static async find({ id }) {
        return prisma.product.findUnique({ where: { id } });
    }

    static async findAll({ ids }) {
        if (!ids) {
            return prisma.product.findMany();
        }
        return prisma.product.findMany({
            where: {
                id: {
                    in: ids,
                },
            },
        });
    }

    // UPDATE
    static async update({ id, input }) {
        try {
            const user = await prisma.user.update({
                where: {
                    id,
                },
                data: input,
            });
            return user;
        } catch (e) {
            return null;
        }
    }

    // DELETE
    static async delete({ id }) {
        try {
            await prisma.product.delete({
                where: {
                    id,
                },
            });
            return true;
        } catch (e) {
            return false;
        }
    }
}
