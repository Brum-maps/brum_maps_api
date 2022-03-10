import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {ItineraryRate} from "./itineraryRate.model";
import {UserProps} from "./user.models";
import {StepRate} from "./stepRate.model";

export interface StepProps {
    name: string;
    description: string;
    longitude: number;
    latitude: number;
    start_date: Date;
    end_date: Date;
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

    @Column({type: "date", nullable: false})
    start_date!: Date;

    @Column({type: "date", nullable: false})
    end_date!: Date;

    @Column({type: "float", nullable: true})
    mark!: number;

    @Column({type: "varchar", nullable: true})
    image!: string;

    @OneToMany(() => StepRate, stepRate => stepRate.step)
    stepRates!: StepRate[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt!: Date;

}