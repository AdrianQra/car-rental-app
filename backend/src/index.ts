import express, { Express } from 'express';
import * as swaggerJson from './swagger.json';
import swaggerUi from 'swagger-ui-express';
import { connectToMongo } from './config/db';
import { errorHandler } from './config/error-handler';
import { RegisterRoutes } from './routes';
import { updateCurrentAddressesOfRentedCars } from './rented-cars/rented-cars.service';

const app: Express = express();
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

RegisterRoutes(app);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));
app.use(errorHandler);

connectToMongo(app);
app.on("successfullMongoConnection", () => {
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
  setInterval(() => {
    updateCurrentAddressesOfRentedCars();
  }, 5000);
});