const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
import authRoutes from "./routes/auth";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Asegúrate de que esta línea esté presente
app.use("/auth", authRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
