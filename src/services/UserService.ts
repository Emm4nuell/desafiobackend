import UserDao from "../dao/UserDao";
import bcrypt from "bcrypt";
import CreateUserRequest from "../models/user/CreateUserRequest";
import UpdateUserNameRequest from "../models/user/UpdateUserNameRequest";
import UpdatePasswordRequest from "../models/user/UpdatePasswordRequest";

class UserService {
  private readonly userDao = new UserDao();
  private readonly saltRounds = 10;

  public async create(request: CreateUserRequest) {
    try {
      if (await this.userDao.findByEmail(request.email)) {
        throw new Error("Email já cadastrado na base de dados");
      }
      const user = await this.userDao.create(
        new CreateUserRequest(
          request.name,
          request.email,
          await bcrypt.hash(request.password, this.saltRounds)
        )
      );
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async findById(id: string) {
    if (id == null) {
      throw new Error("O id não pode ser nulo");
    }

    const user = await this.userDao.findById(id);
    if (user == null) {
      throw new Error("Usuário não localizado");
    }
    return user;
  }

  public async updateUserName(id: string, req: UpdateUserNameRequest) {
    const response = this.userDao.updateNameEmail(id, req);
    return response;
  }

  public async deleteUser(id: string) {
    try {
      console.log(`ID a ser deletado:: ${id}`);
      const user = await this.userDao.deleteUser(id);
      return user;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const err = error;
      if (err.code === "P2025") {
        throw new Error("Usuário não localizado");
      }
      throw new Error("Erro ao deletar usuário");
    }
  }

  public async updatePasswordUser(id: string, req: UpdatePasswordRequest) {
    const userId = await this.userDao.findById(id);
    if (userId === null) {
      throw new Error("Usuário não localizado na base de dados.");
    }
    const validation = await bcrypt.compare(req.password, userId?.password);
    if (validation) {
      const user = await this.userDao.updatePassword(id, req);
      return user;
    }
    throw new Error("Senhas não conferem.");
  }
}

export default UserService;
