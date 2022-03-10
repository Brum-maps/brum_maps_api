import express from "express";
import {EventController} from "../controllers/event.controller";

const eventRouter = express.Router();

eventRouter.post('/add', async function (req, res) {
    try{
        const eventController = await EventController.getInstance();
        const event = await eventController.addEvent({...req.body});
        res.status(201).json(event);
    }    catch (err) {
            res.status(404).json("bad query exception").send();

        }
    });

eventRouter.delete('/delete', async function (req, res) {
    try{
        const eventController = await EventController.getInstance();
        const event = await eventController.deleteEventById({...req.body});
        res.status(201).json(event);
    }    catch (err) {
        res.status(404).json("bad query exception").send();

    }
});

eventRouter.put('/update', async function (req, res) {
    try{
        const eventController = await EventController.getInstance();
        const event = await eventController.updateEvent(req.body.id ,{...req.body});
        res.status(201).json(event);
    }    catch (err) {
        res.status(404).json("bad query exception").send();

    }
});
eventRouter.get('/All', async function (req, res) {
    try{
        const eventController = await EventController.getInstance();
        const event = await eventController.getAllEvent();
        res.status(201).json(event);
    }    catch (err) {
        res.status(404).json("bad query exception").send();

    }
});
export {
    eventRouter
}
