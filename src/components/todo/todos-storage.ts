import type { Todo } from './todo-types';
import {
	isString,
	isBoolean,
	isArray,
	isArrayOf
} from '../../modules/types';

export const STORAGE_KEY: string = 'react-vite-first-practice.todos';

function isTodo(value: unknown): value is Todo {
	if (typeof value !== 'object' || value === null || value === undefined) return false;
	
	const candidate = value as {
		id?        : unknown;
		title?     : unknown;
		completed? : unknown;
	};
	
	return (
		(isString(candidate.id)) && 
		(isString(candidate.title)) && 
		(isBoolean(candidate.completed))
	);
}

export function loadTodos(
	storage: Pick<Storage, 'getItem'> = localStorage
): Todo[] {
    try {
        const savedTodos: string | null = storage.getItem(STORAGE_KEY);
        
        if (savedTodos === null) return [];
        
        const parsed: unknown = JSON.parse(savedTodos);
		
		if (!isArray(parsed)) return [];
		if (!parsed.every(isTodo)) return [];
		if (!isArrayOf<Todo>(parsed)) return [];
		
		return parsed;
    } catch {
        return [];
    }
}

export function saveTodos(
	todos: Todo[],
	storage: Pick<Storage, 'setItem'> = localStorage
): void {
	storage.setItem(
		STORAGE_KEY,
		JSON.stringify(todos)
	);
}
