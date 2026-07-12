import express from 'express';

const app = express();

const ip: string = "127.0.0.1";
const port: number = 8000;

app.use(express.json);
app.set('json spaces', 2);

app.listen(port, ip, () => {
    console.log(`listening at ip: ${ip} and port: ${port}`);
    console.log(`URI: http://${ip}:${port}/`);
});
