import {getRepository, MoreThanOrEqual, Repository} from "typeorm";
import {Itinerary, ItineraryProps} from "../models/itinerary.model";
import {ItineraryRate, ItineraryRateProps} from "../models/itineraryRate.model";
import {ItineraryStep, ItineraryStepProps} from "../models/itineraryStep.model";
import {Step} from "../models/step.model";

export class ItineraryController {
    private static instance: ItineraryController;
    private itineraryRepository: Repository<Itinerary>;
    private itineraryRateRepository: Repository<ItineraryRate>;

    private constructor() {
        this.itineraryRepository = getRepository(Itinerary);
        this.itineraryRateRepository = getRepository(ItineraryRate);
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

    public async updateItineraryRateById(itineraryId: string){
        console.log("itiid", itineraryId)
        let itineraryRates : ItineraryRate[];
         itineraryRates =
             await this.itineraryRateRepository.createQueryBuilder("itinerary_rate")
            .leftJoinAndSelect("itinerary_rate.itinerary", "itinerary")
                 .where("itinerary.id = :itineraryId", {itineraryId})
            .getMany() ;

        let sum = 0
        itineraryRates.forEach((itineraryRate : ItineraryRate) => {
            sum += parseInt(String(itineraryRate.rate));

        });

        console.log("sum",  sum)
        let average = sum / itineraryRates.length
        console.log(average)

        return await this.itineraryRepository.createQueryBuilder()
            .update(Itinerary)
            .set({ averageRate: average})
            .where("id = :itineraryId", { itineraryId : itineraryId })
            .execute();

    }

    public async updateItiniraryIsActive(itineraryId: string, props: ItineraryProps){
        return await this.itineraryRepository.createQueryBuilder()
            .update(Itinerary)
            .set({ isActive: props.isActive})
            .where("id = :itineraryId", { itineraryId : itineraryId })
            .execute();

    }

    public async updateItiniraryIsPublic(itineraryId: string, props: ItineraryProps){
        return await this.itineraryRepository.createQueryBuilder()
            .update(Itinerary)
            .set({ isActive: props.isPublic})
            .where("id = :itineraryId", { itineraryId : itineraryId })
            .execute();

    }

    public async rateItinerary(props: ItineraryRateProps, itineraryId: string, user: Express.User | undefined){

        const itinerary = await getRepository(Itinerary).findOne(itineraryId)
        const itineraryRate = getRepository(ItineraryRate).create({...props, user: user, itinerary: itinerary});
        return await getRepository(ItineraryRate).save(itineraryRate);

    }

    public async deleterateItinerary(id: string) {
        await getRepository(ItineraryRate).softDelete(id);
    }

    public async insertStepInItineraryByids(itineraryId: string, stepId: string, props: ItineraryStepProps) {
        const itinerary = await getRepository(Itinerary).findOne(itineraryId)
        const step = await getRepository(Step).findOne(stepId)
        const itineraryStep = getRepository(ItineraryStep).create({...props, step: step, itinerary: itinerary});
        return await getRepository(ItineraryStep).save(itineraryStep);
    }

}
