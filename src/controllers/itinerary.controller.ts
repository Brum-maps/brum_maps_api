import {getRepository, LessThanOrEqual, MoreThanOrEqual, Repository} from "typeorm";
import {Itinerary, ItineraryProps} from "../models/itinerary.model";
import {Duration} from "moment";

export class ItineraryController {
    private static instance: ItineraryController;
    private itineraryRepository: Repository<Itinerary>;

    private constructor() {
        this.itineraryRepository = getRepository(Itinerary);
    }

    public static async getInstance(): Promise<ItineraryController> {
        if (ItineraryController.instance === undefined) {
            ItineraryController.instance = new ItineraryController();
        }
        return ItineraryController.instance;
    }

    public async getAll(): Promise<Itinerary[]> {
        return await this.itineraryRepository.find();
    }

    public async getItineraryById(id: string): Promise<Itinerary | null> {
        return await this.itineraryRepository.findOneOrFail(id);
    }
    public async createItinerary(props: ItineraryProps): Promise<Itinerary | null> {

        const itinerary = this.itineraryRepository.create({...props});
        return this.itineraryRepository.save(itinerary);
    }

    public async getItineraryByAverageRate(averageRate: number): Promise<Itinerary[] | null> {

        return await this.itineraryRepository.find(
            { where: { averageRate: MoreThanOrEqual(averageRate) } });
    }

    public async getItineraryByDuration(durationMin: number, durationMax: number): Promise<Itinerary[] | null> {

        return await this.itineraryRepository.createQueryBuilder("itinerary")
            .where("itinerary.duration >= :durationMin", {durationMin: durationMin})
            .andWhere("itinerary.duration <= :durationMax", {durationMax: durationMax})
            .getMany();

    }

    public async getItineraryByDistance(distanceMin: number, distanceMax: number): Promise<Itinerary[] | null> {

        return await this.itineraryRepository.createQueryBuilder("itinerary")
            .where("itinerary.distance >= :distanceMin", {distanceMin: distanceMin})
            .andWhere("itinerary.distance <= :distanceMax", {distanceMax: distanceMax})
            .getMany();

    }

    public async getItineraryBySearch(search: string): Promise<Itinerary[] | null> {
        return await this.itineraryRepository.createQueryBuilder("itinerary")
            .where("itinerary.name like :name", {name: "%"+search+"%"})
            .getMany()
    }


    public async deleteItineraryById(id: string) {
        await this.itineraryRepository.softDelete(id);
    }


    public async getItineraryByStep(search: string): Promise<Itinerary[] | null> {
        //TODO
        return null;
    }

    public async updateItineraryById(id: string, props: ItineraryProps) {
        await this.itineraryRepository.update(id, props);
    }
}
