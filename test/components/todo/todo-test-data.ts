import { type Todo } from '../../../src/components/todo/todo-types';

export const TODO_TEST_DATA: Todo[] = [
	{ id: '1', title: 'Learn React', completed: false },
	{ id: '2', title: 'Learn Typescript', completed: true }
];

export type InvalidTodo = {
	id        : number;
	title     : boolean;
	completed : string;
};

export const INVALID_TODOS: InvalidTodo[] = [
	{ id: 123, title: false, completed: 'yes' }
];