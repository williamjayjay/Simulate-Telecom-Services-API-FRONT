import { Column, Entity, PrimaryColumn } from "typeorm"
import { v4 as uuidV4 } from "uuid"

@Entity("areaCodes")
class AreaCode {
  @PrimaryColumn()
  id?: string;

  @Column()
  origin: string;

  @Column()
  destiny: string;

  @Column()
  valPerMinute: string;

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}

export { AreaCode }