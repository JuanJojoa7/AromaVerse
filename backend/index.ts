import * as dotenv from 'dotenv';
import express, { Express ,Request, Response } from 'express';
import { connectToDatabase } from './src/lib/DB';
import userRoutes from './src/routes/user.routes';
import productRoutes from './src/routes/product.routes';

dotenv.config();

const app : Express = express();
const port : number = (process.env.PORT as any || '3000');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req: Request, res: Response) => {
  res.send("Hello World");
})

app.use('/users', userRoutes);
app.use('/products', productRoutes);

// Conecta a la base de datos
connectToDatabase()
  .then(() => {
    console.log('Conexión a la base de datos establecida');

    // Iniciar el servidor
    app.listen(port, () => {
      console.log(`Servidor escuchando en http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Error al conectar a la base de datos:', err);
    process.exit(1); // Salir del proceso si falla la conexión
  });

export default app;

