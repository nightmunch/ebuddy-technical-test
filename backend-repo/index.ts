import express from "express";

import userRoutes from "./routes/userRoutes";
import { errorHandler } from "./entities/ApiError";

const app = express();
const port = process.env.PORT || 3000;

app.use("/", userRoutes);

app.use(errorHandler);

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
