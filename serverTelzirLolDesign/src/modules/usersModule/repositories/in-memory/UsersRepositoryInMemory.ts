import { Users } from "../../infra/typeorm/entities/Users"
import { IUsersRepository, ICreateUsersDTO } from "../IUsersRepository"


class UsersRepositoryInMemory implements IUsersRepository {

  users: Users[] = []


  async findByOrigin(userOrigin: string): Promise<Users> {

    const user = this.users.find(user => user.userOrigin === userOrigin)
    return user

  }

  async create({ userOrigin, userDestiny, userValPerMinute, userNamePlan, time, noPlan, withPlan }: ICreateUsersDTO): Promise<any> {
    const user = new Users()

    Object.assign(user, {
      userDestiny, userValPerMinute, userOrigin, userNamePlan, time
    })

    this.users.push(user)
  }

}


export { UsersRepositoryInMemory }