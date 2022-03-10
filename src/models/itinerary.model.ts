import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, JoinColumn, OneToMany, OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

import {Duration} from "moment";
import {ItineraryRate} from "./itineraryRate.model";

export interface ItineraryProps {
    name: string;
    description: string;
    duration: number;
    distance: number;
    averageRate : number;
}

// @Entity({database: "TODO"})
export class Itinerary implements ItineraryProps {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({nullable: false})
    name!: string;

    @Column({nullable: false})
    description!: string;

    @Column({nullable: false})
    duration!: number;

    @Column({nullable: true})
    distance!: number;

    @Column({nullable: true})
    averageRate!: number;

    @OneToMany(() => ItineraryRate, itineraryRate => itineraryRate.itinerary)
    itineraryRates!: ItineraryRate[]

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt!: Date;
}
