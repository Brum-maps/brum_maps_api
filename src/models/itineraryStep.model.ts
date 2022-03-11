import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, ManyToOne, PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

import {Itinerary} from "./itinerary.model";
import {Step} from "./step.model";

export interface ItineraryStepProps {
    order: number;
}

@Entity()
export class ItineraryStep implements ItineraryStepProps {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({type: "bigint",nullable: false})
    order!: number;


    @ManyToOne(()=> Itinerary, itinerary => itinerary.itinerarySteps)
    itinerary!: Itinerary

    @ManyToOne(()=> Step, step => step.itinerarySteps)
    step!: Step

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt!: Date;
}
