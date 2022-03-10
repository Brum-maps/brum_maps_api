import express from "express";
import {ItineraryController} from "../controllers/itinerary.controller";



const itineraryRouter = express.Router();

itineraryRouter.get("/getAll", async function (req, res) {
    const itineraryController = await ItineraryController.getInstance();
    const itineraries = await itineraryController.getAll();
    try {
        res.json(itineraries);
    } catch (err) {
        res.status(400).end();
    }
});


itineraryRouter.get("/:itineraryId", async function (req, res) {
    const itineraryId = req.params.itineraryId;
    const itineraryController = await ItineraryController.getInstance();
    try {
        const itinerary = await itineraryController.getItineraryById(itineraryId);
        res.json(itinerary);
    } catch (err) {
        res.status(400).json(err);
    }
});

itineraryRouter.get("/search/:search", async function (req, res) {
    const search = req.params.search;
    const itineraryController = await ItineraryController.getInstance();
    try {
        const itinerary = await itineraryController.getItineraryBySearch(search);
        res.json(itinerary);
    } catch (err) {
        res.status(400).json(err);
    }
});

itineraryRouter.put("/:itineraryId",async function (req, res) {
    const itineraryId = req.params.itineraryId;
    const itineraryController = await ItineraryController.getInstance();
    try {
        await itineraryController.updateItineraryById(itineraryId, {...req.body});
        res.status(204).end();
    } catch (err) {
        res.status(400).end();
    }
});

itineraryRouter.post("/",async function (req, res) {
    const itineraryController = await ItineraryController.getInstance();
    try {
        const itinerary = await itineraryController.createItinerary({...req.body});
        res.status(201).json(itinerary);
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

itineraryRouter.delete("/:itineraryId", async function (req, res) {
    const itineraryId = req.params.itineraryId;
    try {
        const itineraryController = await ItineraryController.getInstance();
        await itineraryController.deleteItineraryById(itineraryId);
        res.status(204).end();
    } catch (err) {
        res.status(400).end();
    }
});
itineraryRouter.post("/rateItinerary/:itineraryid", async function (req, res) {

    const itineraryController = await ItineraryController.getInstance();
    const itineraryId = req.params.itineraryid
    try {
        const itineraryRate = await itineraryController.rateItinerary({...req.body}, itineraryId, req.user);

        const update = itineraryController.updateItineraryRateById(itineraryId);
        res.status(201).json(update);

    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

itineraryRouter.get("/averagerate/:averageRate", async function (req, res) {
    const averageRate = parseInt(req.params.averageRate);
    const itineraryController = await ItineraryController.getInstance();
    try {
        const itinerary = await itineraryController.getItineraryByAverageRate(averageRate);
        res.json(itinerary);
    } catch (err) {
        res.status(400).json(err);
    }

});

itineraryRouter.get("/duration/:durationmin/:durationmax", async function (req, res) {
    const durationMin = parseInt(req.params.durationmin);
    const durationMax = parseInt(req.params.durationmax);
    const itineraryController = await ItineraryController.getInstance();
    try {
        const itinerary = await itineraryController.getItineraryByDuration(durationMin,durationMax);
        res.json(itinerary);
    } catch (err) {
        res.status(400).json(err);
    }

});

itineraryRouter.get("/distance/:distancemin/:distancemax", async function (req, res) {
    const distanceMin = parseInt(req.params.distancemin);
    const distanceMax = parseInt(req.params.distancemax);
    const itineraryController = await ItineraryController.getInstance();
    try {
        const itinerary = await itineraryController.getItineraryByDistance(distanceMin,distanceMax);
        res.json(itinerary);
    } catch (err) {
        res.status(400).json(err);
    }

});

itineraryRouter.delete("/itineraryRate/:itineraryRateId", async function (req, res) {
    const itineraryRateId = req.params.itineraryRateId;
    try {
        const itineraryController = await ItineraryController.getInstance();
        await itineraryController.deleterateItinerary(itineraryRateId);
        res.status(204).end();
    } catch (err) {
        res.status(400).end();
    }
});




export {
    itineraryRouter
}
