import { describe, expect, it } from 'vitest';
import { loadTodos, saveTodos, STORAGE_KEY } from '../../../src/components/todo/todos-storage';
import type { Todo } from '../../../src/components/todo/todo-types';
import { TODO_TEST_DATA, INVALID_TODOS, type InvalidTodo } from './todo-test-data';

class FakeStorage {
	#_value: string | null;
	
	private constructor(value: string | null) {
		this.#_value = value;
	}
	
	public static of(value: string | null = null): FakeStorage {
		return new FakeStorage(value);
	}
	
	public get value(): string | null {
		return this.#_value;
	}
	
	public set value(newValue: string | null) {
		this.#_value = newValue;
	}
	
	public getItem(key: string): string | null {
		return key === STORAGE_KEY ? this.#_value : null;
	}
	
	public setItem(key: string, nextValue: string): void {
		if (key === STORAGE_KEY) {
			this.#_value = nextValue;
		}
	};
};

describe('todos storage', () => {
	it('returns an empty array when no data exists', () => {
		const storage: Pick<FakeStorage, 'getItem'> = FakeStorage.of();
		const result: Todo[] = loadTodos(storage);
		
		expect(result).toEqual([]);
	});
	
	it('loads valid todos', () => {
		const todos: Todo[] = [TODO_TEST_DATA[0]];
		const json: string = JSON.stringify(todos);
		const storage: Pick<FakeStorage, 'getItem'> = FakeStorage.of(json);
		const result: Todo[] = loadTodos(storage);
		
		expect(result).toEqual(todos);
	});
	
	it('rejects invalid todo data', () => {
		const todos: InvalidTodo[] = INVALID_TODOS;
		const json: string  = JSON.stringify(todos);
		const storage: Pick<FakeStorage, 'getItem'> = FakeStorage.of(json);
		const result: Todo[] = loadTodos(storage);
		
		expect(result).toEqual([]);
	});
	
	it('handles malformed JSON', () => {
		const json: string  = '{invalid json}';
		const storage: Pick<FakeStorage, 'getItem'> = FakeStorage.of(json);
		const result: Todo[] = loadTodos(storage);
		
		expect(result).toEqual([]);
	});
	
	it('saves todos as JSON', () => {
		const todos: Todo[] = [
			{ id: '1', title: 'Learn Vitest', completed: false }
		];
		const storage: Pick<FakeStorage, 'setItem' | 'getItem'> = FakeStorage.of();
		
		saveTodos(todos, storage);
		
		const result: Todo[] = loadTodos(storage);
		
		expect(result).toEqual(todos);
	});
});