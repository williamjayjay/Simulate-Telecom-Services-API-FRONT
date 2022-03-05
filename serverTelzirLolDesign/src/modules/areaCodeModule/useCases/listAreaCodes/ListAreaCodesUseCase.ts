import { inject, injectable } from "tsyringe";
import ServiceResultWeb from "../../../../shared/errors/ServiceResults/ServiceResultWeb";
import { AreaCode } from "../../infra/typeorm/entities/AreaCode";
import { IAreaCodeRepository } from "../../repositories/IAreaCodeRepository";


@injectable()
class ListAreaCodesUseCase {
  constructor(
    @inject("AreaCodeRepository")
    private areaCodeRepository: IAreaCodeRepository
  ) { }

  async execute(): Promise<AreaCode[]> {
    const areaCodes = await this.areaCodeRepository.list()

    if (!areaCodes) {
      throw new ServiceResultWeb(
        false,
        'Areacode not exists',
        null,
        401,
      );
    }



    return areaCodes
  }

}

export { ListAreaCodesUseCase }