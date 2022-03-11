import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, OneToMany, PrimaryGeneratedColumn,
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
    isActive: boolean;
    isPublic: boolean;
}

@Entity()
export class Itinerary implements ItineraryProps {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({type: "varchar",nullable: false})
    name!: string;

    @Column({type: "varchar",nullable: false})
    description!: string;

    @Column({type: "bigint",nullable: true})
    duration!: number;

    @Column({type: "float",nullable: true})
    distance!: number;

    @Column({type: "float",nullable: true})
    averageRate!: number;

    @Column({default:true, type: "boolean",nullable: true})
    isActive!: boolean;

    @Column({type: "boolean",nullable: true})
    isPublic!: boolean;

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
