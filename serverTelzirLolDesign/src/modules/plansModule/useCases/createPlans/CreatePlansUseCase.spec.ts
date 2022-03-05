import ServiceResultWeb from "../../../../shared/errors/ServiceResults/ServiceResultWeb"
import { PlansRepositoryInMemory } from "../../repositories/in-memory/PlansRepositoryInMemory"
import { CreatePlansUseCase } from "./CreatePlansUseCase"

let createPlansUseCase: CreatePlansUseCase
let plansInMemory: PlansRepositoryInMemory

describe("Create Plans", () => {

  beforeEach(() => {
    plansInMemory = new PlansRepositoryInMemory()

    createPlansUseCase = new CreatePlansUseCase(plansInMemory)

  })


  it("should be able to create a new plan", async () => {

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

    expect(plansCreated).toHaveProperty("id")

  })


  it("should not be able to create a new plan with namePlan exists ", async () => {

    expect(async () => {

      const plans = {
        namePlan: 'Test plan 60',
        numberPlan: 60
      }

      await createPlansUseCase.execute({
        namePlan: plans.namePlan,
        numberPlan: plans.numberPlan,
      })

      await createPlansUseCase.execute({
        namePlan: plans.namePlan,
        numberPlan: plans.numberPlan,
      })


    }).rejects.toBeInstanceOf(ServiceResultWeb)


  })
})