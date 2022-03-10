import express from "express";
import {EventParticipantController} from "../controllers/eventParticipant.controller";

const eventParticipantRouter = express.Router();

eventParticipantRouter.post('/add', async function (req, res) {
    try{
        const eventController = await EventParticipantController.getInstance();
        const event = await eventController.addEventParticipant({...req.body});
        res.status(201).json(event);
    }    catch (err) {
        res.status(404).json("bad query exception").send();

    }
});

eventParticipantRouter.get('/All', async function (req, res) {
    try{
        const eventController = await EventParticipantController.getInstance();
        const event = await eventController.getAllEventParticipant();
        res.status(201).json(event);
    }    catch (err) {
        res.status(404).json("bad query exception").send();

    }
});
eventParticipantRouter.get('/All', async function (req, res) {
    try{
        const eventController = await EventParticipantController.getInstance();
        const event = await eventController.getAllEventParticipantById(req.body.id);
        res.status(201).json(event);
    }    catch (err) {
        res.status(404).json("bad query exception").send();

    }
});
eventParticipantRouter.delete('/delete', async function (req, res) {
    try{
        const eventController = await EventParticipantController.getInstance();
        const event = await eventController.deleteEventParticipantById({...req.body});
        res.status(201).json(event);
    }    catch (err) {
        res.status(404).json("bad query exception").send();

    }
});
export {
    eventParticipantRouter
}
