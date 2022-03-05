import { Request, Response } from "express";
import { container } from "tsyringe";
import ServiceResultWeb from "../../../../shared/errors/ServiceResults/ServiceResultWeb";
import { Users } from "../../infra/typeorm/entities/Users";
import { CreateUsersUseCase } from "./CreateUsersUseCase";


class CreateUsersController {


  async handle(request: Request, response: Response): Promise<Response> {
    const { userDestiny, userValPerMinute, userOrigin, userNamePlan, time, noPlan, withPlan }: Users = request.body

    if (!userOrigin) {
      return response.status(500).json({ message: `error, field userOrigin is required` })
    }

    if (!userDestiny) {
      return response.status(500).json({ message: `error, field userDestiny is required` })
    }

    if (!userNamePlan) {
      return response.status(500).json({ message: `error, field userNamePlan is required` })
    }

    if (!time) {
      return response.status(500).json({ message: `error, field time is required` })
    }


    const createUsersUseCase = container.resolve(CreateUsersUseCase)

    const plans = await createUsersUseCase.execute({ userDestiny, userValPerMinute, userOrigin, userNamePlan, time, noPlan, withPlan })

    const serviceResultWeb = new ServiceResultWeb(
      true,
      'ok',
      plans,
      200,
    );

    return response.status(200).json(serviceResultWeb);

  }

}

export { CreateUsersController }