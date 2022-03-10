import {Event, EventProps} from "../models/event.models";
import {getRepository, Repository} from "typeorm";
import {Session} from "../models/session.models";

export class EventController{
    private static instance: EventController;
    private eventRepository: Repository<Event>;
    private sessionRepository: Repository<Session>;

    private constructor() {
        this.eventRepository = getRepository(Event);
        this.sessionRepository = getRepository(Session);
    }
    public static async getInstance(): Promise<EventController> {
        if (EventController.instance === undefined) {
            EventController.instance = new EventController();
        }
        return EventController.instance;
    }

    public async addEvent(props: EventProps): Promise<Event> {
        const event = this.eventRepository.create({
            ...props,});
        await this.eventRepository.save(event)
       return event;

    }
    public async updateEvent(id: string, props: EventProps) {
        const result = await this.eventRepository.update(id, props);
        return !(result.affected === undefined || result.affected <= 0);
    }

    public async deleteEventById(id: string) {
        await this.eventRepository.softDelete(id);
    }
    public async getAllEvent(): Promise<Event[]> {
        return this.eventRepository.find();
    }

}