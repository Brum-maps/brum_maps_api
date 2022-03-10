import express from "express";
import {ensureLoggedIn, ensureLoggedOut} from "../middlewares/auth.middleware";
import passport from "passport";
import {AuthController} from "../controllers/auth.controller";
import {StepController} from "../controllers/step.controller";
import {ItineraryController} from "../controllers/itinerary.controller";
import {itineraryRouter} from "./itinerary.route";
import {Step} from "../models/step.model";
import {UserManagerController} from "../controllers/userManager.controller";

const stepRouter = express.Router();

stepRouter.post("/create", async function (req, res) {
    const stepController = await StepController.getInstance();
    console.log(req.body);
    try {
        const step = await stepController.createStep({...req.body});
        res.status(201).json(step);
    } catch (err) {
        console.log(err);
        res.status(409).send(err).end();
    }
});


stepRouter.put("/:stepId/update", async function (req, res) {

    const stepId = req.params.stepId;
    const stepController = await StepController.getInstance();

    try {
        const step = await stepController.updateStep(stepId, req.body);
        res.status(201).json(step);
    } catch (err) {
        res.status(400).send(err);
    }
});

stepRouter.get("/:stepId/get", async function (req, res) {
    const stepId = req.params.stepId;
    const stepController = await StepController.getInstance();
    try {
        const step = await stepController.getStepById(stepId);
        res.json(step).end();
    } catch (err) {
        res.status(400).json(err);
    }
});

stepRouter.get("/getAll", async function (req, res) {
    const stepController = await StepController.getInstance();
    try {
        const step = await stepController.getAll();
        res.json(step).end();
    } catch (err) {
        res.status(400).json(err);
    }
});

stepRouter.get("/:stepId/getRates", async function (req, res) {
    const stepId = req.params.stepId;
    const stepController = await StepController.getInstance();
    try {
        const step = await stepController.getStepById(stepId);
        const stepRates = await stepController.getAllStepRateByStep(step!);
        res.json(stepRates).end();
    } catch (err) {
        res.status(400).json(err);
    }
});

stepRouter.get("/randomSteps/:limit", async function (req, res) {
    const limit = parseInt(req.params.limit);
    const stepController = await StepController.getInstance();
    try {
        const steps = await stepController.getRandomSteps(limit);

        res.status(200).json(steps).end();
    } catch (err) {
        res.status(400).json(err);
    }
});

stepRouter.post("/:stepId/vote", async function (req, res) {
    const stepId = req.params.stepId;
    const stepController = await StepController.getInstance();
    const userController = await UserManagerController.getInstance();
    const user = req.user;
    const step = await stepController.getStepById(stepId);
    try {
        const rate = await stepController.rateStep({...req.body, user : user, step : step})
        await stepController.updateStepRate(step!);
        res.status(200).json(rate).end();
    } catch (err) {
        res.status(400).json(err);
    }
});


stepRouter.delete('/:stepId/delete', async function (req, res) {
    const stepId = req.params.stepId;
    const stepController = await StepController.getInstance();

    try {
        const deleted = await stepController.deleteStepById(stepId);
        res.status(204).end();
    } catch (err){
        res.status(500).end();
    }


});


export {
    stepRouter
}
