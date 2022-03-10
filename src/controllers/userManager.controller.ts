import {getRepository, Repository} from "typeorm";
import {User, UserProps} from "../models/user.models";
import {Itinerary} from "../models/itinerary.model";
import {ItineraryRate, ItineraryRateProps} from "../models/itineraryRate.model";


export class UserManagerController {

    private static instance: UserManagerController;
    private userRepository: Repository<User>;

    private constructor() {
        this.userRepository = getRepository(User);
    }

    public static async getInstance(): Promise<UserManagerController> {
        if (UserManagerController.instance === undefined) {
            UserManagerController.instance = new UserManagerController();
        }
        return UserManagerController.instance;
    }

    public async updateUser(id: string, props: UserProps) {
        const result = await this.userRepository.update(id, props);
        return !(result.affected === undefined || result.affected <= 0);
    }

    public async getUserById(id: string): Promise<User | undefined> {
        return this.userRepository.findOne(id)
        /*return this.projectRepository.createQueryBuilder("project")
            .leftJoinAndSelect("project.user", "projectUser")
            .where("project.id = :id", {id: id})
            .getOne();*/
    }

    public async getAllUser(): Promise<User[]> {
        return this.userRepository.find();
    }

    public async searchUser(pseudo : string): Promise<User[]> {
        pseudo = "%" + pseudo + "%";
        return await this.userRepository.createQueryBuilder("user")
            .where("user.pseudo like :pseudo",{pseudo : pseudo})
            .limit(5)
            .getMany();
    }

    public async deleteUserById(id: string) {
        await this.userRepository.softDelete(id);
    }

    public async rateItinerary(props: ItineraryRateProps, itineraryId: string, user: Express.User | undefined){

        const itinerary = await getRepository(Itinerary).findOne(itineraryId)
        const itineraryRate = getRepository(ItineraryRate).create({...props, user: user, itinerary: itinerary});
        return await getRepository(ItineraryRate).save(itineraryRate);

    }
}
