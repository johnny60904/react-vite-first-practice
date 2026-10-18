import { describe, expect, it } from 'vitest';
import { todosReducer } from '../../../src/components/todo/todos-reducer';
import { type Todo } from '../../../src/components/todo/todo-types';
import { TODO_TEST_DATA } from './todo-test-data';

describe('todosReducer', () => {
	it('adds a todo without modifying the original state', () => {
		const newTodo: Todo = {
			id: '3',
			title: 'Learn Vitest',
			completed: false
		};
		
		const result: Todo[] = todosReducer(
			TODO_TEST_DATA,
			{ type: 'Add', todo: newTodo }
		);
		
		expect(result).toHaveLength(3);
		expect(result[2]).toEqual(newTodo);
		expect(TODO_TEST_DATA).toHaveLength(2);
	});
	
	it('toggles the selected todo', () => {
		const result: Todo[] = todosReducer(
			TODO_TEST_DATA,
			{ type: 'Toggle', id: '1' }
		);
		
		expect(result[0].completed).toBe(true); // toggled (false -> true)
		expect(result[1].completed).toBe(true); // original: true
		expect(TODO_TEST_DATA[0].completed).toBe(false); // original: false
		expect(TODO_TEST_DATA).toHaveLength(2);
	});
	
	it('clears completed todos', () => {
		const result: Todo[] = todosReducer(
			TODO_TEST_DATA,
			{ type: 'ClearCompleted' }
		);
		
		expect(result).toEqual([TODO_TEST_DATA[0]]);
		expect(TODO_TEST_DATA).toHaveLength(2);
	});
	
	it('completes all todos', () => {
		const result: Todo[] = todosReducer(
			TODO_TEST_DATA,
			{ type: 'CompleteAll' }
		);
		
		const allCompleted: boolean = result.every(todo => todo.completed);
		
		expect(allCompleted).toBe(true);
		expect(TODO_TEST_DATA[0].completed).toBe(false);
		expect(TODO_TEST_DATA).toHaveLength(2);
	});
	
	it('deletes only the selected todo', () => {
		const result: Todo[] = todosReducer(
			TODO_TEST_DATA,
			{ type: 'Delete', id: '1' }
		);
		
		expect(result).toEqual([TODO_TEST_DATA[1]]);
		expect(TODO_TEST_DATA).toHaveLength(2);
	});
});