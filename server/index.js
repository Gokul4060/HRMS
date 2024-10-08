import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import  express from "express";
import { errorHandler, routeNotFound } from "./middlewares/errorMiddlewaves.js";
import routes from "./routes/index.js";
import morgan from "morgan";
import chalk from "chalk";
import attendanceRoutes from "./routes/attendanceRoutes.js";

import leaveRoutes from "./routes/leaveRoute.js";

import { dbConnection } from "./utils/index.js"


dotenv.config();

dbConnection();

const PORT = process.env.PORT || 5000;

const app = express();


app.use(
    cors({
       origin: ["http://localhost:3000", "http://localhost:3001"],
       methods: ["GET", "POST", "DELETE", "PUT"],
       credentials: true,
    })
);



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use("/api", routes);
app.use(routeNotFound);
app.use(errorHandler);

app.use("/api/leave", leaveRoutes);
app.use("/api", attendanceRoutes);

app.listen(PORT, () => console.log((chalk.green.bold.bgCyan)`Server listening on ${PORT}`));