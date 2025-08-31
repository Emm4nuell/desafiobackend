import UserDao from "../dao/UserDao";
import bcrypt from "bcrypt";
import CreateUserRequest from "../models/user/CreateUserRequest";
import UpdateUserNameRequest from "../models/user/UpdateUserNameRequest";
import UpdatePasswordRequest from "../models/user/UpdatePasswordRequest";
import GlobalExcetion from "../exceptions/GlobalException";
import AuthUser from "../models/user/AuthUser";
import TokenUtil from "../utils/TokenUtil";

export default class UserService {
  private readonly userDao = new UserDao();
  private readonly generateToken = new TokenUtil();

  public async auth(request: AuthUser) {
    const user = await this.userDao.findByEmail(request.getEmail());
    if (user == null) {
      throw GlobalExcetion.notFound("Usuário não localizado na base de dados.");
    }

    const verify = await bcrypt.compare(request.getPassword(), user.password);

    if (verify) {
      const token = this.generateToken.generate(user.id, user.email);
      return token;
    }
  }

  public async create(request: CreateUserRequest) {
    const saltRounds = await bcrypt.genSalt(10);
    try {
      if (await this.userDao.existsByEmail(request.email)) {
        throw GlobalExcetion.conflict("Email já cadastrado na base de dados");
      }
      const user = await this.userDao.create(
        new CreateUserRequest(
          request.name,
          request.email,
          await bcrypt.hash(request.password, saltRounds)
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
      throw GlobalExcetion.nullValue("O id não pode ser nulo");
    }

    const user = await this.userDao.findById(id);
    if (user == null) {
      throw GlobalExcetion.nullPointerException(
        "Usuário não localizado na base de dados."
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...response } = user;
    return response;
  }

  public async updateUserName(id: string, req: UpdateUserNameRequest) {
    const response = this.userDao.updateNameEmail(id, req);
    return response;
  }

  public async deleteUser(id: string) {
    try {
      const user = await this.userDao.deleteUser(id);
      return user;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const err = error;
      if (err.code === "P2025") {
        throw GlobalExcetion.nullPointerException(
          "Usuário não localizado na base de dados."
        );
      }
      throw new Error("Erro ao deletar usuário");
    }
  }

  public async updatePasswordUser(id: string, req: UpdatePasswordRequest) {
    const userId = await this.userDao.findById(id);
    if (userId === null) {
      throw GlobalExcetion.nullPointerException(
        "Usuário não localizado na base de dados."
      );
    }
    const validation = await bcrypt.compare(req.password, userId?.password);
    if (validation) {
      const user = await this.userDao.updatePassword(id, req);
      return user;
    }
    throw GlobalExcetion.unauthorized("Usuário ou senha inválido.");
  }
}
