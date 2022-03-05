import { Plans } from "../../infra/typeorm/entities/Plans"
import { IPlansRepository, ICreatePlansDTO } from "../IPlansRepository"


class PlansRepositoryInMemory implements IPlansRepository {

  plans: Plans[] = []

  async create({ namePlan, numberPlan }: ICreatePlansDTO): Promise<void> {
    const plan = new Plans()

    Object.assign(plan, {
      namePlan, numberPlan
    })

    this.plans.push(plan)

  }
  async findByName(namePlan: string): Promise<Plans> {
    const plan = this.plans.find(plan => plan.namePlan === namePlan)
    return plan
  }

  async list(): Promise<Plans[]> {
    const listAll = this.plans
    return listAll
  }

}

export { PlansRepositoryInMemory }