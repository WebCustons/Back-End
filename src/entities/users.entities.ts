import {BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {hashSync} from 'bcryptjs';
import {Address} from './address.entities';
import {Adverts} from './adverts.entities';
import {Comments} from './comments.entities';

export enum UserType{
    CUSTOMER = 'customer',
    SELLER = 'seller',
    ADMIN = 'admin'
}


@Entity()
export class Users{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:'text', nullable:false})
    name:string;

    @Column({type:'text',  nullable:false, unique:true})
    email:string;

    @Column({type:'varchar', length:14,  nullable:false, unique:true})
    cpf:string;

    @Column({ type:'bigint', nullable:false})
    phone:string;

    @Column({type:'date', nullable:false})
    birth_date:Date;

    @Column({type:'text',nullable:false})
    description:string;

    @Column({type:'text',nullable:false})
    password:string;

    @Column({type:'text', nullable:false})
    type_user:UserType;

    @OneToOne(() => Address, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn()
    address:Address

    @OneToMany(() => Adverts, adverts => adverts.user, {cascade:true, onDelete:'CASCADE'})
    adverts:Adverts[]

    @OneToMany(()=>Comments, comment=>comment.user, {cascade:true, onDelete:'CASCADE'})
    comments:Comments[]

    @BeforeInsert()
    cryptoPassword(){
        this.password = hashSync(this.password,10)
    }

    @BeforeUpdate()
    cryptoPasswordUpdate(){
        this.password = hashSync(this.password,10)
    }
}
