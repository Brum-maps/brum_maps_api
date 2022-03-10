import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

import {Duration} from "moment";
import {Itinerary} from "./itinerary.model";
import {User} from "./user.models";
import {Step} from "./step.model";

export interface StepRateProps {
    rate: number;
    comment: string;
    step: Step;
    user: User;
}

@Entity()
export class StepRate implements StepRateProps {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({type: "float",nullable:! false})
    rate!: number;

    @Column({type: "varchar",nullable: false})
    comment!: string;

    @ManyToOne(()=> Step, step => step.stepRates)
    step!: Step

    @ManyToOne(()=> User, user => user.stepRates)
    user!: User

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt!: Date;
}
