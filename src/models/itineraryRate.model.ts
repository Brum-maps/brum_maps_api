import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, ManyToOne, PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

import {Itinerary} from "./itinerary.model";
import {User} from "./user.models";

export interface ItineraryRateProps {
    rate: number;
    comment: string;
}

@Entity()
export class ItineraryRate implements ItineraryRateProps {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({type: "varchar",nullable:true})
    rate!: number;

    @Column({type: "varchar",nullable: false})
    comment!: string;

    @ManyToOne(()=> Itinerary, itinerary => itinerary.itineraryRates)
    itinerary!: Itinerary

    @ManyToOne(()=> User, user => user.itineraryRates)
    user!: User

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt!: Date;
}
