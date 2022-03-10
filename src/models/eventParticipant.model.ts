import {
    CreateDateColumn,
    DeleteDateColumn,
    Entity, ManyToOne, PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import "reflect-metadata";
import {User} from "./user.models";
import {Event} from "./event.models";

export interface EventParticipantProps {
    id_event: Event;
    id_user: User;
}
@Entity()
export class EventParticipant implements EventParticipantProps {
    @PrimaryGeneratedColumn("uuid")
    id!: string;
    @ManyToOne(()=> User, user => user.eventParticipations)
    id_user!: User

    @ManyToOne(()=> Event, event => event.eventParticipations)
    id_event!: Event

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt!: Date;


   // id_event: string;

}
