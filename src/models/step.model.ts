import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {StepRate} from "./stepRate.model";
import {ItineraryStep} from "./itineraryStep.model";

export interface StepProps {
    name: string;
    description: string;
    longitude: number;
    latitude: number;
    mark: number;
    image: string;
}

@Entity()
export class Step implements StepProps {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({type: "varchar", length: 255, unique: true, nullable: false})
    name!: string;

    @Column({type: "varchar", nullable: false})
    description!: string;

    @Column({type: "float", nullable: false})
    longitude!: number;

    @Column({type: "float", nullable: false})
    latitude!: number;

    @Column({type: "float", nullable: true})
    mark!: number;

    @Column({type: "varchar", nullable: true})
    image!: string;

    @OneToMany(() => StepRate, stepRate => stepRate.step)
    stepRates!: StepRate[];

    @OneToMany(() => ItineraryStep, itinerary => itinerary.step)
    itinerarySteps!: ItineraryStep[];


    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt!: Date;

}
