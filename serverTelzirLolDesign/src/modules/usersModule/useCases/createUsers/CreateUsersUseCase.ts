import { inject, injectable } from "tsyringe";
import ServiceResultWeb from "../../../../shared/errors/ServiceResults/ServiceResultWeb";
import { IAreaCodeRepository } from "../../../areaCodeModule/repositories/IAreaCodeRepository";
import { IPlansRepository } from "../../../plansModule/repositories/IPlansRepository";
import { Users } from "../../infra/typeorm/entities/Users";
import { ICreateUsersDTO, IUsersRepository } from "../../repositories/IUsersRepository"


@injectable()
class CreateUsersUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("AreaCodeRepository")
    private areaCodeRepository: IAreaCodeRepository,

    @inject("PlansRepository")
    private plansRepository: IPlansRepository
  ) { }

  async execute({ userDestiny, userValPerMinute, userOrigin, userNamePlan, time, noPlan, withPlan, id }: ICreateUsersDTO): Promise<Users> {

    const percentageCalc = (value, percent) => {
      const result: any = (parseFloat(value) * parseFloat(percent)) / 100;
      return parseFloat(result);
    }

    const destinyAndOriginAreaCodeAlreadyExists = await this.areaCodeRepository.findOriginAndDestiny(userOrigin, userDestiny)

    if (!destinyAndOriginAreaCodeAlreadyExists) {
      throw new ServiceResultWeb(
        false,
        'this origin or destiny not exists.',
        null,
        401,
      );
    }

    const plansAlreadyExists = await this.plansRepository.findByName(
      userNamePlan,
    );

    if (!plansAlreadyExists) {
      throw new ServiceResultWeb(
        false,
        'this plan not exists.',
        null,
        401,
      );
    }


    if (time > plansAlreadyExists.numberPlan) {

      const timeRest = time - plansAlreadyExists.numberPlan

      const valueMinuteMultTimeRest = parseFloat(destinyAndOriginAreaCodeAlreadyExists.valPerMinute) * timeRest

      const calcPercentage = percentageCalc(valueMinuteMultTimeRest, 10)

      const valueTotalWithPlan = valueMinuteMultTimeRest + calcPercentage

      const valueNotPlan = time * parseFloat(destinyAndOriginAreaCodeAlreadyExists.valPerMinute)

      const resultUserCreate = await this.usersRepository
        .create({
          userDestiny,
          userValPerMinute: destinyAndOriginAreaCodeAlreadyExists.valPerMinute,
          userOrigin,
          userNamePlan,
          time,
          noPlan: valueNotPlan.toString(),
          withPlan: valueTotalWithPlan.toString()
        })

      return resultUserCreate;
    }

    else {

      const valueNotPlan = time * parseFloat(destinyAndOriginAreaCodeAlreadyExists.valPerMinute)

      const resultUserCreate = await this.usersRepository
        .create({
          userDestiny,
          userValPerMinute: destinyAndOriginAreaCodeAlreadyExists.valPerMinute,
          userOrigin,
          userNamePlan,
          time,
          noPlan: valueNotPlan.toString(),
          withPlan: "0"
        })

      return resultUserCreate;

    }

  }

}

export { CreateUsersUseCase }