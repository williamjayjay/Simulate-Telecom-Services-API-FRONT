import ServiceResultWeb from "../../../../shared/errors/ServiceResults/ServiceResultWeb"
import { AreaCodeRepositoryInMemory } from "../../repositories/in-memory/AreaCodeRepositoryInMemory"
import { CreateAreaCodeUseCase } from "./CreateAreaCodeUseCase"

let createAreaCodeUseCase: CreateAreaCodeUseCase
let areaCodeInMemory: AreaCodeRepositoryInMemory

describe("Create AreaCode", () => {

  beforeEach(() => {
    areaCodeInMemory = new AreaCodeRepositoryInMemory()

    createAreaCodeUseCase = new CreateAreaCodeUseCase(areaCodeInMemory)

  })


  it("should be able to create a new areaCode", async () => {

    const areaCode = {
      origin: "011",
      destiny: "016",
      valPerMinute: "1.70"
    }

    await createAreaCodeUseCase.execute({
      origin: areaCode.origin,
      destiny: areaCode.destiny,
      valPerMinute: areaCode.valPerMinute

    })

    const areaCodeCreated =
      await areaCodeInMemory
        .findOriginAndDestiny(
          areaCode.origin, areaCode.destiny)


    expect(areaCodeCreated).toHaveProperty("id")

  })


  it("should not be able to create a new areaCode with origin and destiny exists ", async () => {

    expect(async () => {

      const areaCode = {
        origin: "011",
        destiny: "016",
        valPerMinute: "1.70"
      }

      await createAreaCodeUseCase.execute({
        origin: areaCode.origin,
        destiny: areaCode.destiny,
        valPerMinute: areaCode.valPerMinute
      })

      await createAreaCodeUseCase.execute({
        origin: areaCode.origin,
        destiny: areaCode.destiny,
        valPerMinute: areaCode.valPerMinute
      })

    }).rejects.toBeInstanceOf(ServiceResultWeb)


  })
})