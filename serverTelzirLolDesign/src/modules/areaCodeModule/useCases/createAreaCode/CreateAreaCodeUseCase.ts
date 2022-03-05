import { inject, injectable } from "tsyringe"
import ServiceResultWeb from "../../../../shared/errors/ServiceResults/ServiceResultWeb";
import { IAreaCodeRepository } from "../../repositories/IAreaCodeRepository";

interface IRequest {
  origin: string;
  destiny: string;
  valPerMinute: string;
}

@injectable()
class CreateAreaCodeUseCase {
  constructor(
    @inject("AreaCodeRepository")
    private areaCodeRepository: IAreaCodeRepository
  ) { }

  async execute({ origin, destiny, valPerMinute }: IRequest): Promise<void> {

    const destinyAndOriginAreaCodeAlreadyExists = await this.areaCodeRepository.findOriginAndDestiny(origin, destiny)

    if (destinyAndOriginAreaCodeAlreadyExists) {
      throw new ServiceResultWeb(
        false,
        'this origin or destiny alreaty exists.',
        null,
        401,
      );
    }

    await this.areaCodeRepository.create({ destiny, valPerMinute, origin })
  }

}

export { CreateAreaCodeUseCase }