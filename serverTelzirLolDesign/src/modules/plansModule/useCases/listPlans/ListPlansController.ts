import { Request, Response } from "express";
import { container } from "tsyringe";
import ServiceResultWeb from "../../../../shared/errors/ServiceResults/ServiceResultWeb";
import { ListPlansUseCase } from "./ListPlansUseCase";


class ListPlansController {


  async handle(request: Request, response: Response): Promise<Response> {

    const listPlansUseCase = container.resolve(ListPlansUseCase)

    const all = await listPlansUseCase.execute()

    const serviceResultWeb = new ServiceResultWeb(
      true,
      'ok',
      all,
      200,
    );

    return response.status(200).json(serviceResultWeb);

  }

}

export { ListPlansController }