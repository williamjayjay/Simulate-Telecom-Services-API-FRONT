import { PlansRepositoryInMemory } from "../../repositories/in-memory/PlansRepositoryInMemory"
import { CreatePlansUseCase } from "../createPlans/CreatePlansUseCase"
import { ListPlansUseCase } from "./ListPlansUseCase"


let listPlansUseCase: ListPlansUseCase
let createPlansUseCase: CreatePlansUseCase
let plansInMemory: PlansRepositoryInMemory

describe("List Plans", () => {

  beforeEach(() => {
    plansInMemory = new PlansRepositoryInMemory()

    createPlansUseCase = new CreatePlansUseCase(plansInMemory)
    listPlansUseCase = new ListPlansUseCase(plansInMemory)

  })


  it("should be able to list plans", async () => {

    const plans = {
      namePlan: 'Plano teste 60',
      numberPlan: 60
    }

    await createPlansUseCase.execute({
      namePlan: plans.namePlan,
      numberPlan: plans.numberPlan,
    })


    const plans2 = {
      namePlan: 'Plano teste 120',
      numberPlan: 120
    }

    await createPlansUseCase.execute({
      namePlan: plans2.namePlan,
      numberPlan: plans2.numberPlan,
    })


    const allPlans = await listPlansUseCase.execute();

    expect(allPlans);

  })



})