import { AreaCode } from "../../infra/typeorm/entities/AreaCode"
import { IAreaCodeRepository, ICreateAreaCodeDTO } from "../IAreaCodeRepository"

class AreaCodeRepositoryInMemory implements IAreaCodeRepository {

  areaCodes: AreaCode[] = []

  async create({ destiny, valPerMinute, origin }: ICreateAreaCodeDTO): Promise<void> {
    const areaCode = new AreaCode()

    Object.assign(areaCode, {
      destiny, valPerMinute, origin
    })

    this.areaCodes.push(areaCode)

  }
  async findByOrigin(origin: string): Promise<AreaCode> {
    const areaCode = this.areaCodes.find(areaCode => areaCode.origin === origin)
    return areaCode
  }
  findByDestiny(destiny: string): Promise<AreaCode> {
    throw new Error("Method not implemented.");
  }

  async findOriginAndDestiny(origin: string, destiny: string): Promise<AreaCode> {
    const areaCode = this.areaCodes.find(areaCode => areaCode.origin === origin && areaCode.destiny === destiny)
    return areaCode
  }

  async list(): Promise<AreaCode[]> {
    const listAll = this.areaCodes
    return listAll
  }

}

export { AreaCodeRepositoryInMemory }