import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, JoinColumn, ManyToOne, OneToMany, OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

import {Duration} from "moment";
import {Itinerary} from "./itinerary.model";
import {User} from "./user.models";

export interface ItineraryRateProps {
    rate: number;
    comment: string;
}

// @Entity({database: "TODO"})
export class ItineraryRate implements ItineraryRateProps {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({nullable:! false})
    rate!: number;

    @Column({nullable: false})
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
