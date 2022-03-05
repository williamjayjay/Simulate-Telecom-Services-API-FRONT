import ServiceResultWeb from "../../../../shared/errors/ServiceResults/ServiceResultWeb"
import { AreaCodeRepositoryInMemory } from "../../../areaCodeModule/repositories/in-memory/AreaCodeRepositoryInMemory"
import { CreateAreaCodeUseCase } from "../../../areaCodeModule/useCases/createAreaCode/CreateAreaCodeUseCase"
import { PlansRepositoryInMemory } from "../../../plansModule/repositories/in-memory/PlansRepositoryInMemory"
import { CreatePlansUseCase } from "../../../plansModule/useCases/createPlans/CreatePlansUseCase"
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory"
import { CreateUsersUseCase } from "./CreateUsersUseCase"


let createUsersUseCase: CreateUsersUseCase
let usersInMemory: UsersRepositoryInMemory

let plansInMemory: PlansRepositoryInMemory
let createPlansUseCase: CreatePlansUseCase


let areaCodeInMemory: AreaCodeRepositoryInMemory
let createAreaCodeUseCase: CreateAreaCodeUseCase


describe("Create User", () => {

  beforeEach(() => {
    usersInMemory = new UsersRepositoryInMemory()
    areaCodeInMemory = new AreaCodeRepositoryInMemory()
    plansInMemory = new PlansRepositoryInMemory()

    createAreaCodeUseCase = new CreateAreaCodeUseCase(areaCodeInMemory)
    createPlansUseCase = new CreatePlansUseCase(plansInMemory)
    createUsersUseCase = new CreateUsersUseCase(usersInMemory, areaCodeInMemory, plansInMemory)

  })


  it("should be able to create a new users", async () => {

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


    if (!areaCodeCreated) {
      throw new Error('AreaCode not created');
    }

    const plans = {
      namePlan: 'Test plan 60',
      numberPlan: 60
    }

    await createPlansUseCase.execute({
      namePlan: plans.namePlan,
      numberPlan: plans.numberPlan,
    })

    const plansCreated =
      await plansInMemory
        .findByName(plans.namePlan)

    if (!plansCreated) {
      throw new Error('Plans not created');
    }


    const users = {
      userOrigin: areaCodeCreated.origin,
      userDestiny: areaCodeCreated.destiny,
      userNamePlan: plansCreated.namePlan,
      time: 60,
    }

    const resultCreated = await createUsersUseCase.execute({
      userDestiny: users.userDestiny,
      userOrigin: users.userOrigin,
      userNamePlan: users.userNamePlan,
      time: users.time,
    })

    const userCreated =
      await usersInMemory
        .findByOrigin(users.userOrigin)

    expect(userCreated).toHaveProperty("id")

  })

})