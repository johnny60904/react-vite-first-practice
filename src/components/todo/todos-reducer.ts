import type { Todo } from './todo-types';

export const todoActionType = {
	Add            : 'Add',
	Toggle         : 'Toggle',
	CompleteAll    : 'CompleteAll',
	ClearCompleted : 'ClearCompleted',
	Delete         : 'Delete'
} as const satisfies Record<string, string>;

export type TodoAction = 
	| { type: 'Add'; todo: Todo; }
	| { type: 'Toggle' | 'Delete'; id: string; }
	| { type: 'CompleteAll' | 'ClearCompleted'; };

export function todosReducer(
	state: Todo[],
	action: TodoAction
): Todo[] {
	switch (action.type) {
		case todoActionType.Add:
			return [...state, action.todo];
		case todoActionType.Toggle:
			return state.map(todo => 
				todo.id === action.id
					? { ...todo, completed: !todo.completed }
					: todo
			);
		case todoActionType.CompleteAll:
			return state.map(todo => ({
				...todo,
				completed: true
			}));
		case todoActionType.ClearCompleted:
			return state.filter(todo => !todo.completed);
		case todoActionType.Delete:
			return state.filter(todo => todo.id !== action.id);
		default:
			throw new Error('Unreachable code path in "todoReducer()".');
	}
}
