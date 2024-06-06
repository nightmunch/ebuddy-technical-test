// write action using redux for user data

import { Action } from "@reduxjs/toolkit";
import { Dispatch } from "react";

type Dispatcher = {
	type: string;
	payload: any;
};

export const updateUserData = (data: object) => {
	return async (dispatch: Dispatch<Action<string>>) => {
		try {
			const response = await fetch("http://localhost:3000/update-user-data", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				throw new Error("Network response was not ok.");
			}

			const result = await response.json();

			dispatch({
				type: "UPDATE_USER_DATA",
				payload: result,
			});
		} catch (error) {
			console.error("Error updating user data:", error);
		}
	};
};
