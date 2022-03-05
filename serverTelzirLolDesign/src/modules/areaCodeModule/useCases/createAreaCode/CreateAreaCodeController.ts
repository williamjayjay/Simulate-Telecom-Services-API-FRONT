import { Request, Response } from "express";
import { container } from "tsyringe";
import ServiceResultWeb from "../../../../shared/errors/ServiceResults/ServiceResultWeb";

import { AreaCode } from "../../infra/typeorm/entities/AreaCode";
import { CreateAreaCodeUseCase } from "./CreateAreaCodeUseCase";

class CreateAreaCodeController {

  async handle(request: Request, response: Response): Promise<Response> {
    const { origin, destiny, valPerMinute }: AreaCode = request.body

    if (!origin) {
      return response.status(500).json({ message: "error, field origin is required" })
    }

    if (!destiny) {
      return response.status(500).json({ message: "error, field destiny is required" })
    }

    if (!valPerMinute) {
      return response.status(500).json({ message: "error, field valPerMinute is required" })
    }

    const createAreaCodeUseCase = container.resolve(CreateAreaCodeUseCase)

    const areaCode = await createAreaCodeUseCase.execute({ destiny, valPerMinute, origin })

    const serviceResultWeb = new ServiceResultWeb(
      true,
      'ok',
      areaCode,
      200,
    );

    return response.status(200).json(serviceResultWeb);
  }

}

export { CreateAreaCodeController }