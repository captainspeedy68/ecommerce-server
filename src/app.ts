import { Application, Request, Response } from 'express';
import cors from 'cors';
import express from 'express';
import { ProductRoute } from './app/modules/product/product.route';
import { OrderRoutes } from './app/modules/orders/order.routes';

const app: Application = express();

app.use(express.json());
app.use(cors());

// application routes
app.use('/api/products', ProductRoute);
app.use('/api/orders', OrderRoutes);

app.get('/', (req: Request, res: Response) => {
  const a: string = 'hellow';
  res.send(a);
});

export default app;
