import { AreaCodeRepositoryInMemory } from "../../repositories/in-memory/AreaCodeRepositoryInMemory"
import { CreateAreaCodeUseCase } from "../createAreaCode/CreateAreaCodeUseCase"
import { ListAreaCodesUseCase } from "../listAreaCodes/ListAreaCodesUseCase"


let listAreaCodesUseCase: ListAreaCodesUseCase
let createAreaCodeUseCase: CreateAreaCodeUseCase
let areaCodeInMemory: AreaCodeRepositoryInMemory

describe("List AreaCode", () => {

  beforeEach(() => {
    areaCodeInMemory = new AreaCodeRepositoryInMemory()

    listAreaCodesUseCase = new ListAreaCodesUseCase(areaCodeInMemory)
    createAreaCodeUseCase = new CreateAreaCodeUseCase(areaCodeInMemory)
  })


  it("should be able to list a areaCodes", async () => {

    const areaCode = {
      origin: "011",
      destiny: "017",
      valPerMinute: "1.70"
    }

    const areaCodeCreated = await createAreaCodeUseCase.execute({
      origin: areaCode.origin,
      destiny: areaCode.destiny,
      valPerMinute: areaCode.valPerMinute

    })

    const areaCode2 = {
      origin: "016",
      destiny: "011",
      valPerMinute: "1.70"
    }

    const areaCodeCreated2 = await createAreaCodeUseCase.execute({
      origin: areaCode2.origin,
      destiny: areaCode2.destiny,
      valPerMinute: areaCode2.valPerMinute

    })

    const allAreasCodes = await listAreaCodesUseCase.execute();

    expect(allAreasCodes);

  })


})