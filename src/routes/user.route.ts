import express from "express";
import {UserManagerController} from "../controllers/userManager.controller";

const userRouter = express.Router();


userRouter.post("/rateItinerary/:itineraryid/", async function (req, res) {
    const userController = await UserManagerController.getInstance();
    const itineraryId = req.body.itineraryid
    try {
        const itineraryRate = await userController.rateItinerary({...req.body}, itineraryId, req.user);
        res.status(201).json(itineraryRate);
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }

});

export {
    userRouter
}
