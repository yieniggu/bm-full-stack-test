import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import userRoutes from "./routes/userRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

app.get('/', (_, res) => res.send('API is running'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});