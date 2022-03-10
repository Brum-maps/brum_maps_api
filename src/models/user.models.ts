import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import "reflect-metadata";
import {ItineraryRate} from "./itineraryRate.model";
import {EventParticipant} from "./eventParticipant.model";


export interface UserProps {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    pseudo: string;
    image: string;
    role: string;
}

enum RoleEnum {
    ADMIN = "ADMIN",
    USER = "USER",
}

@Entity()
export class User implements UserProps {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({type: "varchar", length: 255, unique: true, nullable: false})
    email!: string;

    @Column({type: "varchar", nullable: false})
    password!: string;

    @Column({type: "varchar", length: 255, nullable: false})
    firstname!: string;

    @Column({type: "varchar", length: 255, nullable: false})
    lastname!: string;

    @Column({type: "varchar", length: 255, nullable: false})
    pseudo!: string;

    @Column({type: "enum", enum: RoleEnum, nullable: false})
    role!: string;

    @Column({type: "varchar", nullable: true})
    image!: string;

    // @OneToMany(() => ProductPurchaseHistory, productPurchaseHistory => productPurchaseHistory.user)
    // productPurchaseHistory: ProductPurchaseHistory[];
    @OneToMany(() => ItineraryRate, itineraryRate => itineraryRate.user)
    itineraryRates!: ItineraryRate[]

    @OneToMany(() => EventParticipant, eventParticipation => eventParticipation.id_user)
    eventParticipations!: EventParticipant[]



    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt!: Date;

}
