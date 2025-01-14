import { Record } from "./record";

export type Workout = {
	id: number;
	date: Date;
	records: Record[];
	comment: string;
};
