import express, {Express, Router} from "express";
import {getRepository} from "typeorm";
import {TypeormStore} from "connect-typeorm";
import {configureApi} from "../config/passport.config";
import passport from "passport";
import {Session} from "../models/session.models";
import {itineraryRouter} from "./itinerary.route";
import {userRouter} from "./user.route";
import {authRouter} from "./auth.route";

export function buildApiRoutes() {
    const router = Router();
    configureApi();
    // router.use(require('cors')({ credentials : true, origin: ["http://localhost:4200", "http://localhost:4201"]}));
    router.use("/", require('express-session')({
        secret: process.env.SECRET ,
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
    router.use("/user", userRouter);
    router.use("/auth", authRouter);
    // router.use(express.static('images_uploads',{cacheControl:true,maxAge:259200000}));

    return router;
}
