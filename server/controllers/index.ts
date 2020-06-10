import { Request, Response } from 'express';

interface IDataType {
	currentTemp: number;
	currentSetpoint: number;
	timestamp: number | null;
}

let customData: IDataType = {
	currentSetpoint: 16.5,
	currentTemp: 15.0,
	timestamp: null
};

class ThermostatController {
	static fetch = async (req: Request, res: Response) => {
		customData = { ...customData, timestamp: Date.now() };
		if (Math.random() < 0.5) {
			return res.status(202).send();
		}
		res.send(customData);
	}

	static update = async (req: Request, res: Response) => {
		console.log('req.body: ' + req.body);
		return setTimeout(() => {
			customData = {
				...customData,
				currentSetpoint: req.body.currentSetpoint,
				timestamp: Date.now()
			};
			res.status(204).send();
		}, 1000);
	}
}

export default ThermostatController;
