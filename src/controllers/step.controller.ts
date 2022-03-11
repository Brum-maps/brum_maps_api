import {getRepository, Repository} from "typeorm";
import {Step, StepProps} from "../models/step.model";
import {StepRate, StepRateProps} from "../models/stepRate.model";


export class StepController {
    private static instance: StepController;
    private stepRepository: Repository<Step>;
    private stepRateRepository: Repository<StepRate>;

    private constructor() {
        this.stepRepository = getRepository(Step);
        this.stepRateRepository = getRepository(StepRate);
    }

    public static async getInstance(): Promise<StepController> {
        if (StepController.instance === undefined) {
            StepController.instance = new StepController();
        }
        return StepController.instance;
    }

    public async createStep(props: StepProps): Promise<Step>{

        const step = this.stepRepository.create({
            ...props
        });
        await this.stepRepository.save(step);

        return step;
    }

    public async updateStep(id: string, props: StepProps) {
        const result = await this.stepRepository.update(id, props);
        return !(result.affected === undefined || result.affected <= 0);
    }

    public async getAll(): Promise<Step[]> {
        return await this.stepRepository.find();
    }

    public async getStepById(id: string): Promise<Step | null> {
        return await this.stepRepository.findOneOrFail(id);
    }

    public async getStepBySearch(search: string): Promise<Step[] | null> {
        return await this.stepRepository.createQueryBuilder()
            .where("Step.name like :name", {name: "%"+search+"%"})
            .getMany()
    }

    public async deleteStepById(id: string) {
        await this.stepRepository.softDelete(id);
    }

    public async getAllStepRateByStep(step: Step) : Promise<StepRate[]> {
        return await this.stepRateRepository.find(
            { step : step }
        )
    }

    public async updateStepById(id: string, props: StepProps) {
        await this.stepRepository.update(id, props);
    }

    public async rateStep(props: StepRateProps) : Promise<StepRate>{
        const stepRate = this.stepRateRepository.create({
            ...props
        });
        await this.stepRateRepository.save(stepRate);

        return stepRate;
    }

    public async updateStepRate(step: Step){

        let stepRates : StepRate[];
        stepRates =
            await this.stepRateRepository.createQueryBuilder("stepRate")
                .where("stepRate.step.id = :step", {step: step.id})
                .getMany() ;

        let sum = 0
        stepRates.forEach((stepRate : StepRate) => {
            sum += parseInt(String(stepRate.rate));

        });
        console.log("ici : " + stepRates);
        console.log("sum",  sum)
        let average = sum / stepRates.length;
        console.log(average)

        return await this.stepRepository.createQueryBuilder()
            .update(Step)
            .set({ mark: average})
            .where("id = :stepId", { stepId : step.id })
            .execute();

    }

    public async getRandomSteps(limit: number){

        return await this.stepRepository.createQueryBuilder()
            .take(limit)
            .orderBy("RANDOM()")
            .getMany()
    }


}
