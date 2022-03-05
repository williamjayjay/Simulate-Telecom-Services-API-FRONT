import { Request, Response } from "express";
import { container } from "tsyringe";
import ServiceResultWeb from "../../../../shared/errors/ServiceResults/ServiceResultWeb";
import { ListAreaCodesUseCase } from "./ListAreaCodesUseCase";



class ListAreaCodesController {

  async handle(request: Request, response: Response): Promise<Response> {

    const listAreaCodeUseCase = container.resolve(ListAreaCodesUseCase)

    const all = await listAreaCodeUseCase.execute()

    const serviceResultWeb = new ServiceResultWeb(
      true,
      'ok',
      all,
      200,
    );

    return response.status(200).json(serviceResultWeb);

  }

}

export { ListAreaCodesController }