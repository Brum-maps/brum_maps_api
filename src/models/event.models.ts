import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany, OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import "reflect-metadata";
import {EventParticipant} from "./eventParticipant.model";


export interface EventProps {
    start_date: string;
    end_date: string;
    name: string;
    description: string;
    state: string;
}
@Entity()
export class Event implements EventProps {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({type: "date", nullable: false})
    start_date!: string;

    @Column({type: "date", nullable: false})
    end_date!: string;

    @Column({type: "varchar", length: 255, nullable: false})
    name!: string;

    @Column({type: "varchar", length: 255, nullable: false})
    description!: string;

    @Column({type: "varchar", length: 255, nullable: false})
    state!: string;

    @OneToOne(() => EventParticipant, eventParticipations => eventParticipations.id_event)
    eventParticipations!: EventParticipant[]
    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt!: Date;

}
