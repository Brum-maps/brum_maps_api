import express, {Express} from "express";
import {createConnection, getRepository} from "typeorm";
import {config} from "dotenv";
import bodyParser from "body-parser";
import {buildApiRoutes} from "./routes/index.route";


config();

const port = process.env.PORT;

// @ts-ignore
createConnection({
    type: "postgres",
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + "/**/models/*.ts"],
    synchronize: true,
    logging: true,
    ssl: true,
    extra : {
        ssl : {
            rejectUnauthorized : false
        }
    }
}).then(connection => {
    const app: Express = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(require('cookie-parser')());
    app.use("/bru-maps", buildApiRoutes());
    app.listen(port, function () {
        console.log(`Listening on ${port}...`);
    });
}).catch(error => console.log(error));