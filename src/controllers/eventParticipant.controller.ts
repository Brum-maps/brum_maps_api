import {EventParticipant, EventParticipantProps} from "../models/eventParticipant.model"
import {getRepository, Repository} from "typeorm";
import {Session} from "../models/session.models";
import {Event, EventProps} from "../models/event.models";
import {User} from "../models/user.models";

export class EventParticipantController {
    private static instance: EventParticipantController;
    private eventParticipantsRepository: Repository<EventParticipant>;
    private sessionRepository: Repository<Session>;

    private constructor() {
        this.eventParticipantsRepository = getRepository(EventParticipant);
        this.sessionRepository = getRepository(Session);
    }
    public static async getInstance(): Promise<EventParticipantController> {
        if (EventParticipantController.instance === undefined) {
            EventParticipantController.instance = new EventParticipantController();
        }
        return EventParticipantController.instance;
    }

    public async addEventParticipant(props: EventParticipantProps): Promise<EventParticipant> {
        const eventParticipant = this.eventParticipantsRepository.create({
            ...props,});
        await this.eventParticipantsRepository.save(eventParticipant)
        return eventParticipant;

    }
    public async getAllEventParticipantById(id : string): Promise<EventParticipant[]> {
        return this.eventParticipantsRepository.createQueryBuilder("eventParticipant")
            .where("eventParticipant.id like :id AND eventParticipant.id_event==user.id AND eventParticipant.id_event ",{id : id})
            .getMany();
    }

    public async deleteEventParticipantById(id: string) {
        await this.eventParticipantsRepository.softDelete(id);
    }

    public async getAllEventParticipant(): Promise<EventParticipant[]> {
        return this.eventParticipantsRepository.createQueryBuilder("eventParticipant")
            .where("eventParticipant.id_event==user.id AND eventParticipant.id_event==event.id ")
            .getMany();
    }
}