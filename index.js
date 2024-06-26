import express from "express";
import cors from "cors";
import session from "express-session"; 
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRouter from "./routes/UserRouter.js";
import ClassesRoutes from "./routes/ClassesRoutes.js";
import HoursRoutes from "./routes/HoursRoutes.js";
import ObservationRoutes from "./routes/ObservationRoutes.js";
import SignatureRoutes from "./routes/SignatureRoutes.js";
import AuthRoutes from "./routes/AuthRoutes.js";
dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db,
    
});

//(async () => {
   // await db.sync();
;//})();

app.use(session({
        secret: process.env.SESS_SECRET,
        resave: false,
        saveUninitialized: true,
        store: store, 
        cookie: {
            secure: 'auto',
        },
    })
);

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
}));

app.use(express.json());
app.use(UserRouter);
app.use(ClassesRoutes);
app.use(HoursRoutes);
app.use(ObservationRoutes);
app.use(SignatureRoutes);
app.use(AuthRoutes);

//store.sync();

app.listen(process.env.APP_PORT, () => {

    console.log('server up and running...');
});
