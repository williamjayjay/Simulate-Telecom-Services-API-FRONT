import { Plans } from "../infra/typeorm/entities/Plans";


interface ICreatePlansDTO {
  namePlan: string;
  numberPlan: number;
}

interface IPlansRepository {
  create({ namePlan, numberPlan }: ICreatePlansDTO): Promise<void>

  list(): Promise<Plans[]>

  findByName(namePlan: string): Promise<Plans>

}

export { IPlansRepository, ICreatePlansDTO }