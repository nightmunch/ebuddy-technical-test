import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY || "SECEBUDDYRET";

const authMiddleware = (req: any, res: any, next: any) => {
	const token = req.headers.authorization;
	if (!token) {
		return res.status(401).send("Unauthorized");
	}

	try {
		const decoded = jwt.verify(token, SECRET_KEY);
		req.user = decoded;
		next();
	} catch (err) {
		return res.status(401).send("Unauthorized");
	}
};

export default authMiddleware;
