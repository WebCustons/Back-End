import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { hashSync } from "bcryptjs";
import { Address } from "./address.entities";
import { Adverts } from "./adverts.entities";
import { Comments } from "./comments.entities";
import { type } from "os";
import { string } from "zod";

export enum UserType {
  CUSTOMER = "customer",
  SELLER = "seller",
  ADMIN = "admin",
}

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", nullable: false })
  name: string;

  @Column({ type: "text", nullable: false, unique: true })
  email: string;

  @Column({ type: "varchar", length: 14, nullable: false, unique: true })
  cpf: string;

  @Column({ type: "bigint", nullable: false })
  phone: string;

  @Column({ type: "date", nullable: false })
  birth_date: Date;

  @Column({ type: "text", nullable: false })
  description: string;

  @Column({ type: "text", nullable: false })
  password: string;

  @Column({ type: "text", nullable: false })
  type_user: UserType;

  @Column({ type: "varchar", nullable: true })
  reset_token: string | null;

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  @OneToMany(() => Adverts, (adverts) => adverts.user)
  adverts: Adverts[];

  @OneToMany(() => Comments, (comment) => comment.user)
  comments: Comments[];

  @BeforeInsert()
  cryptoPassword() {
    this.password = hashSync(this.password, 10);
  }

  @BeforeUpdate()
  cryptoPasswordUpdate() {
    this.password = hashSync(this.password, 10);
  }
}
