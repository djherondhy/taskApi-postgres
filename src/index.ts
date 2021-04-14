import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from 'cors';
import {Request, Response} from "express";
import routes from "./routes";
import {Tasks} from "./entity/Tasks";

const app = express()

createConnection()
app.use(cors())
app.use(bodyParser.json())

app.use(routes)

app.listen(process.env.PORT || 3333)




