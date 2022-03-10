import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, JoinColumn, OneToMany, OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

import {ItineraryRate} from "./itineraryRate.model";
import {ItineraryStep} from "./itineraryStep.model";

export interface ItineraryProps {
    name: string;
    description: string;
    duration: number;
    distance: number;
    averageRate : number;
}

@Entity()
export class Itinerary implements ItineraryProps {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({type: "varchar",nullable: false})
    name!: string;

    @Column({type: "varchar",nullable: false})
    description!: string;

    @Column({type: "bigint",nullable: false})
    duration!: number;

    @Column({type: "float",nullable: true})
    distance!: number;

    @Column({type: "float",nullable: true})
    averageRate!: number;

    @OneToMany(() => ItineraryRate, itineraryRate => itineraryRate.itinerary)
    itineraryRates!: ItineraryRate[]

    @OneToMany(() => ItineraryStep, itineraryStep => itineraryStep.itinerary)
    itinerarySteps!: ItineraryStep[]

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt!: Date;
}
