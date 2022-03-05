import { Users } from "../infra/typeorm/entities/Users";


interface ICreateUsersDTO {
  id?: string;
  userOrigin: string;
  userDestiny: string;
  userValPerMinute?: string;
  userNamePlan: string;
  time: number;
  withPlan?: string;
  noPlan?: string;
}

interface IUsersRepository {
  create({
    id,
    userOrigin,
    userDestiny,
    userValPerMinute,
    userNamePlan,
    time,
    noPlan,
    withPlan }: ICreateUsersDTO): Promise<Users>

  findByOrigin(userOrigin: string): Promise<Users>

}

export { IUsersRepository, ICreateUsersDTO }