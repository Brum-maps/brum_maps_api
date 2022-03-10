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

itineraryRouter.get("/:averageRate", async function (req, res) {
    const averageRate = parseInt(req.params.averageRate);
    const itineraryController = await ItineraryController.getInstance();
    try {
        const itinerary = await itineraryController.getItineraryByAverageRate(averageRate);
        res.json(itinerary);
    } catch (err) {
        res.status(400).json(err);
    }

});

// itineraryRouter.get("/:averageRate&:test", async function (req, res) {
//     const averageRate = parseInt(req.params.averageRate);
//     const test = parseInt(req.params.test);
//     const itineraryController = await ItineraryController.getInstance();
//     try {
//         const itinerary = await itineraryController.getItineraryByAverageRate(averageRate);
//         res.json(itinerary);
//     } catch (err) {
//         res.status(400).json(err);
//     }
//
// });




export {
    itineraryRouter
}
