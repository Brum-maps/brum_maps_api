const express = require("express");
import {getRepository} from "typeorm";
import {TypeormStore} from "connect-typeorm";
import {configureApi} from "../config/passport.config";
import passport from "passport";
import {Session} from "../models/session.models";
import {eventRouter} from "./event.route";
import {itineraryRouter} from "./itinerary.route";
import {authRouter} from "./auth.route";
import {stepRouter} from "./step.route";

export function buildApiRoutes() {
    const router = express.Router();
    configureApi();
    // router.use(require('cors')({ credentials : true, origin: ["http://localhost:4200", "http://localhost:4201"]}));
    router.use("/", require('express-session')({
        secret: process.env.SECRET,
        resave: true,
        saveUninitialized: true,
        store: new TypeormStore({
            cleanupLimit: 2,
            limitSubquery: false,
            ttl: 259200
        }).connect(getRepository(Session)),
    }));
    router.use(passport.initialize());
    router.use(passport.session());
    router.use("/itinerary", itineraryRouter);
    router.use("/step", stepRouter);
    router.use("/auth", authRouter);
    router.use("/event", eventRouter);

    return router;
}
