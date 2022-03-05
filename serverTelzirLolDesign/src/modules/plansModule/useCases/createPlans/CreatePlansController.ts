import { Request, Response } from "express";
import { container } from "tsyringe";
import ServiceResultWeb from "../../../../shared/errors/ServiceResults/ServiceResultWeb";
import { Plans } from "../../infra/typeorm/entities/Plans";
import { CreatePlansUseCase } from "./CreatePlansUseCase";


class CreatePlansController {

  async handle(request: Request, response: Response): Promise<Response> {
    const { namePlan, numberPlan }: Plans = request.body

    if (typeof numberPlan !== "number") {
      return response.status(500).json({ message: "error , type number is required" })
    }

    if (!namePlan) {
      return response.status(500).json({ message: "error, field namePlan is required" })
    }

    const createPlansUseCase = container.resolve(CreatePlansUseCase)

    const plans = await createPlansUseCase.execute({ namePlan, numberPlan })

    const serviceResultWeb = new ServiceResultWeb(
      true,
      'ok',
      plans,
      200,
    );

    return response.status(200).json(serviceResultWeb);

  }

}

export { CreatePlansController }