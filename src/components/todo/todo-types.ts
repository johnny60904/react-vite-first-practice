export interface Todo {
	id        : string; // crypto.randomUUID()
	title     : string;
	completed : boolean;
}

const todoFilter = {
	All       : 'All',
	Active    : 'Active',
	Completed : 'Completed',
} as const;

export type TodoFilter = typeof todoFilter[keyof typeof todoFilter];
