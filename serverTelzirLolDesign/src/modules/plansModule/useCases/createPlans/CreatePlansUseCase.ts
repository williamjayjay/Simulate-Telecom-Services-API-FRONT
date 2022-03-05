import { inject, injectable } from "tsyringe"
import ServiceResultWeb from "../../../../shared/errors/ServiceResults/ServiceResultWeb";
import { IPlansRepository } from "../../repositories/IPlansRepository"

interface IRequest {
  namePlan: string;
  numberPlan: number;
}

@injectable()
class CreatePlansUseCase {
  constructor(
    @inject("PlansRepository")
    private plansRepository: IPlansRepository
  ) { }

  async execute({ namePlan, numberPlan }: IRequest): Promise<void> {

    const plansAlreadyExists = await this.plansRepository.findByName(
      namePlan,
    );

    if (plansAlreadyExists) {
      throw new ServiceResultWeb(
        false,
        'this plan alreaty exists.',
        null,
        401,
      );
    }

    await this.plansRepository.create({ namePlan, numberPlan })
  }

}

export { CreatePlansUseCase }