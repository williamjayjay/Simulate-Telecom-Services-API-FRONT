import { AreaCode } from "../infra/typeorm/entities/AreaCode";

interface ICreateAreaCodeDTO {
  origin: string;
  destiny: string;
  valPerMinute: string;
}

interface IAreaCodeRepository {
  create({ destiny, valPerMinute, origin }: ICreateAreaCodeDTO): Promise<void>

  findByOrigin(origin: string): Promise<AreaCode>

  findByDestiny(destiny: string): Promise<AreaCode>

  findOriginAndDestiny(destiny: string, origin: string): Promise<AreaCode>

  list(): Promise<AreaCode[]>

}

export { IAreaCodeRepository, ICreateAreaCodeDTO }