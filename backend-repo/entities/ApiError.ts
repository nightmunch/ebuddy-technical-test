import { Request, Response, NextFunction } from "express";

class ApiError extends Error {
	statusCode: number;
	errors: string | null;
	constructor(statusCode: number, message: string, errors: any = null) {
		super(message);
		this.statusCode = statusCode;
		this.errors = errors;
	}

	static badRequest(message: string, errors?: any) {
		return new ApiError(400, message, errors);
	}

	static unauthorized(message: string, errors?: any) {
		return new ApiError(401, message, errors);
	}

	static notFound(message: string, errors?: any) {
		return new ApiError(404, message, errors);
	}

	static internal(message: string, errors?: any) {
		return new ApiError(500, message, errors);
	}
}

export function errorHandler(
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) {
	if (err instanceof ApiError) {
		return res.status(err.statusCode).json({
			message: err.message,
			...(err.errors && { errors: err.errors }),
		});
	}
	return res.status(500).json({ message: "Internal server error" });
}

export default ApiError;
