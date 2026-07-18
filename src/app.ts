import express from 'express';
import mongoose from 'mongoose';
import router from './routes/routes.js';

import path from 'path'
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

const ip: string = "127.0.0.1";
const port: number = 8000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/api', router);
app.set('json spaces', 2);

//connect to mongoDB
try{
    mongoose.connect('mongodb://127.0.0.1:27017/textilera');
    console.log("successful connection")
} catch ( e: unknown){
    if(e instanceof Error)
        console.error("Error Message: ", e);
}

app.listen(port, ip, () => {
    console.log(`listening at ip: ${ip} and port: ${port}`);
    console.log(`URI: http://${ip}:${port}/`);
});
