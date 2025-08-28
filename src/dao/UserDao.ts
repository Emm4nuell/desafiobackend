import prisma from "../config/database";
import CreateUserRequest from "../models/user/CreateUserRequest";
import UpdatePasswordRequest from "../models/user/UpdatePasswordRequest";
import UpdateUserNameRequest from "../models/user/UpdateUserNameRequest";

class UserDao {
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
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        name: true,
        email: true,
        id: true,
        password: true,
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

export default UserDao;
