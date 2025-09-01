import prisma from "../config/database";
import CreateUserRequest from "../models/user/CreateUserRequest";
import UpdatePasswordRequest from "../models/user/UpdatePasswordRequest";
import UpdateUserNameRequest from "../models/user/UpdateUserNameRequest";

export default class UserDao {
  async findAll(
    filtronome: string,
    filtroemail: string,
    page: number,
    limit: number
  ) {
    console.log(
      "filtronome: ",
      filtronome,
      "filtroemail: ",
      filtroemail,
      "page: ",
      page,
      "limit: ",
      limit
    );
    const list = await prisma.user.findMany({
      where: {
        AND: [
          filtronome
            ? { name: { contains: filtronome, mode: "insensitive" } }
            : {},
          filtroemail
            ? { email: { contains: filtroemail, mode: "insensitive" } }
            : {},
        ],
      },
      take: limit,
      skip: (page - 1) * limit,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        name: "asc",
      },
    });
    return list;
  }
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: { id: true, email: true, password: true },
    });
    return user;
  }
  async create(request: CreateUserRequest) {
    const user = await prisma.user.create({
      data: {
        name: request.name,
        email: request.email,
        password: request.password,
      },
    });
    return user;
  }
  async existsByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        name: true,
        email: true,
        id: true,
        password: false,
        createdAt: false,
        updatedAt: false,
      },
    });
    return !!user;
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        email: true,
        id: true,
        password: true,
        createdAt: false,
        updatedAt: false,
      },
    });
    if (!user) {
      return null;
    }
    return user;
  }

  async updateNameEmail(id: string, request: UpdateUserNameRequest) {
    const user = await prisma.user.update({
      where: { id },
      data: { name: request.name, email: request.email },
      select: {
        name: true,
        email: true,
        id: true,
        password: false,
        createdAt: false,
        updatedAt: false,
      },
    });
    if (!user) {
      return null;
    }
    return user;
  }

  async deleteUser(id: string) {
    const user = await prisma.user.delete({ where: { id } });
    return user;
  }

  async updatePassword(id: string, req: UpdatePasswordRequest) {
    const user = await prisma.user.update({
      where: { id },
      data: { password: req.newpassword },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return user;
  }
}
