import express, { NextFunction, Request, Response } from "express";
import authMiddleware from "../middleware/authMiddleware";
import userCollection from "../repository/userCollection";
import ApiError from "../entities/ApiError";

const app = express();

app.post(
	"/update-user-data",
	authMiddleware,
	async (req: Request, res: Response, next: NextFunction) => {
		const userId = req.body.userId as string;
		const newUserData = req.body.newUserData;

		try {
			const userRef = userCollection.doc(userId);
			const doc = await userRef.update(newUserData);

			if (!doc) {
				next(ApiError.notFound("User not found"));
			} else {
				res.status(200).send("User data updated successfully!");
			}
		} catch (error) {
			next(ApiError.internal("Error updating user data", error));
		}
		res.send("User data updated successfully!");
	}
);

app.get(
	"/fetch-user-data",
	authMiddleware,
	async (req: Request, res: Response, next: NextFunction) => {
		const userId = req.query.userId as string;
		try {
			const userRef = userCollection.doc(userId);
			const doc = await userRef.get();
			if (!doc.exists) {
				next(ApiError.notFound("User not found"));
			} else {
				res.status(200).json({
					userId: doc.id,
					document: doc.data(),
				});
			}
		} catch (error) {
			next(ApiError.internal("Error fetching user data", error));
		}
	}
);
export default app;
