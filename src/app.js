import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import * as path from "path";
import { fileURLToPath } from "url";

/* import routers */

//import xRouter from './routers/x.js'

const routers = [
    //xRouter,
]

/* ==    -     == */

dotenv.config();
const PORT = process.env.PORT || 4000 

const app = express();
app.use(express.json(), cors(), ...routers);

app.get('/', ( {}, res) => res.sendFile(fileURLToPath(`${path.dirname(import.meta.url)}/index.html`)))

app.listen(PORT, () => console.log(`Server successfully running on port ${PORT}`));