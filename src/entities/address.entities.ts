import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./users.entities";

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: false })
  cep: number;

  @Column({ type: "text", nullable: false })
  state: string;

  @Column({ type: "text", nullable: false })
  city: string;

  @Column({ type: "text", nullable: false })
  road: string;

  @Column({ type: "int", nullable: false })
  number: number;

  @Column({ type: "text", nullable: false })
  complement: string;

  @OneToOne(() => Users, (user) => user.address)
  user: Users;
}
