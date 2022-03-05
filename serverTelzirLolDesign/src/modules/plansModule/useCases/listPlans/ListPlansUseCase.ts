import { inject, injectable } from "tsyringe";
import ServiceResultWeb from "../../../../shared/errors/ServiceResults/ServiceResultWeb";
import { Plans } from "../../infra/typeorm/entities/Plans";
import { IPlansRepository } from "../../repositories/IPlansRepository"


@injectable()
class ListPlansUseCase {
  constructor(
    @inject("PlansRepository")
    private plansRepository: IPlansRepository
  ) { }

  async execute(): Promise<Plans[]> {
    const plans = await this.plansRepository.list()

    if (!plans) {
      throw new ServiceResultWeb(
        false,
        'Plans not exists.',
        null,
        401,
      );
    }

    return plans
  }

}

export { ListPlansUseCase }