import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import "reflect-metadata";


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

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt!: Date;

}
