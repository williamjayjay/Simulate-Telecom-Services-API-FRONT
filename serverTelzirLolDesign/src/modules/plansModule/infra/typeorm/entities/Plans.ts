import { Column, Entity, PrimaryColumn } from "typeorm"
import { v4 as uuidV4 } from "uuid"

@Entity("plans")
class Plans {
  @PrimaryColumn()
  id?: string;

  @Column()
  namePlan: string;

  @Column()
  numberPlan: number;

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}

export { Plans }