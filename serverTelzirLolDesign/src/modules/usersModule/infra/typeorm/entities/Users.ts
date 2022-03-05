import { Column, Entity, PrimaryColumn } from "typeorm"
import { v4 as uuidV4 } from "uuid"

@Entity("users")
class Users {
  @PrimaryColumn()
  id?: string;

  @Column()
  userOrigin: string;

  @Column()
  userDestiny: string;

  @Column()
  userValPerMinute: string;

  @Column()
  userNamePlan: string;

  @Column()
  time: number;

  @Column()
  withPlan: string;

  @Column()
  noPlan: string;

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}

export { Users }