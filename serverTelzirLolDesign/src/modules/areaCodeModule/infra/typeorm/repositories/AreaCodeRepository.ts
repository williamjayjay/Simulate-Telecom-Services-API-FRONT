import { getRepository, Repository } from "typeorm";
import { IAreaCodeRepository, ICreateAreaCodeDTO } from "../../../repositories/IAreaCodeRepository";
import { AreaCode } from "../entities/AreaCode";

class AreaCodeRepository implements IAreaCodeRepository {

  private repository: Repository<AreaCode>

  constructor() {
    this.repository = getRepository(AreaCode)
  }

  async create({ destiny, valPerMinute, origin }: ICreateAreaCodeDTO): Promise<void> {

    const areaCode = this.repository.create({
      origin,
      destiny,
      valPerMinute
    })

    await this.repository.save(areaCode)
  }

  async list(): Promise<AreaCode[]> {
    const areaCodes = await this.repository.find()
    return areaCodes
  }

  async findByOrigin(origin: string): Promise<AreaCode> {
    const areaCode = await this.repository.findOne({ origin })
    return areaCode
  }

  async findByDestiny(destiny: string): Promise<AreaCode> {
    const areaCode = await this.repository.findOne({ destiny })
    return areaCode
  }

  async findOriginAndDestiny(origin: string, destiny: string): Promise<AreaCode> {

    const areaCode = await this.repository.findOne({ origin, destiny })

    return areaCode
  }





}

export { AreaCodeRepository }
