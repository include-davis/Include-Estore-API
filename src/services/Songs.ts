import prisma from "../prisma/client";

export default class Songs {
  // CREATE
  static async create({ input }) {
    const { name } = input;
    const song = await prisma.song.create({
      data: {
        name,
      },
    });
    return song;
  }

  // READ
  static async find({ id }) {
    return prisma.song.findUnique({ where: { id } });
  }

  static async findAll() {
    return prisma.song.findMany();
  }
}
