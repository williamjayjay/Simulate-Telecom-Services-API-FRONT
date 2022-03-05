import { getRepository, Repository } from "typeorm";
import { IUsersRepository, ICreateUsersDTO } from "../../repositories/IUsersRepository";
import { Users } from "../typeorm/entities/Users";


class UsersRepository implements IUsersRepository {

  private repository: Repository<Users>

  constructor() {
    this.repository = getRepository(Users)
  }

  async findByOrigin(userOrigin: string): Promise<Users> {
    const user = await this.repository.findOne(userOrigin)

    return user
  }

  async create({ userDestiny, userValPerMinute, userOrigin, userNamePlan, time, noPlan, withPlan, id }: ICreateUsersDTO): Promise<Users> {
    const users = this.repository.create({
      userDestiny, userValPerMinute, userOrigin, userNamePlan, time, noPlan, withPlan,
    })
    const resultUsers = await this.repository.save(users)
    return resultUsers;

  }


}

export { UsersRepository }
