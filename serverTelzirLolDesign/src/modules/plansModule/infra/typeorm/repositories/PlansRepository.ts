import { getRepository, Repository } from "typeorm";
import { ICreatePlansDTO, IPlansRepository } from "../../../repositories/IPlansRepository";
import { Plans } from "../entities/Plans";


class PlansRepository implements IPlansRepository {

  private repository: Repository<Plans>

  constructor() {
    this.repository = getRepository(Plans)
  }

  async create({ namePlan, numberPlan }: ICreatePlansDTO): Promise<void> {
    const plans = this.repository.create({
      namePlan,
      numberPlan
    })
    await this.repository.save(plans)

  }

  async list(): Promise<Plans[]> {
    const plans = await this.repository.find()
    return plans

  }

  async findByName(namePlan: string): Promise<Plans> {
    const plans = await this.repository.findOne({ namePlan })
    return plans

  }



}

export { PlansRepository }
