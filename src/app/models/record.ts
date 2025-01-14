import { Type } from "./type";

export type Record = {
	id: number;
	type: Type;
	weight?: number;
	reps: number;
	sets: number;
	comment: string;
};
