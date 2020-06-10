import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application } from 'express';
import ThermostatController from './controllers/index';

const app: Application = express();
const port = 9090;
app.use(bodyParser.json());
app.use(cors());

app.get('/', ThermostatController.fetch);
app.patch('/', ThermostatController.update);

// start the Express server
app.listen(port, () => {
	console.log(`server started at http://localhost:${port}`);
});
