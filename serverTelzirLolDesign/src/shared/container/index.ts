import { container } from 'tsyringe'
import { IAreaCodeRepository } from '../../modules/areaCodeModule/repositories/IAreaCodeRepository'
import { AreaCodeRepository } from '../../modules/areaCodeModule/infra/typeorm/repositories/AreaCodeRepository'
import { IPlansRepository } from '../../modules/plansModule/repositories/IPlansRepository'
import { UsersRepository } from '../../modules/usersModule/infra/repositories/UsersRepository'
import { IUsersRepository } from '../../modules/usersModule/repositories/IUsersRepository'
import { PlansRepository } from '../../modules/plansModule/infra/typeorm/repositories/PlansRepository'

container.registerSingleton<IAreaCodeRepository>(
  "AreaCodeRepository",
  AreaCodeRepository
)

container.registerSingleton<IPlansRepository>(
  "PlansRepository",
  PlansRepository
)

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
)