// @vitest-environment jsdom

import { act } from 'react';
import {
	afterEach,
	beforeEach,
	describe,
	expect,
	it,
	vi // Alias: VitestUtils
} from 'vitest';
import { cleanup, renderHook } from '@testing-library/react';

import type { Todo } from '../../../src//components/todo/todo-types';
import { STORAGE_KEY } from '../../../src//components/todo/todos-storage';
import useTodos from '../../../src//components/todo/useTodos';

class TodosTestData {
	private constructor() {}
	
	public static readonly savedTodosInfo: {
		id: string,
		title: string;
		todos: Todo[];
		expectedToggled: Todo[];
	} = {
		id: 'todo-1',
		title: 'Learn React',
		todos: [
			{
				id: 'todo-1',
				title: 'Learn React',
				completed: false
			}
		],
		expectedToggled: [
			{
				id: 'todo-1',
				title: 'Learn React',
				completed: true
			}
		]
	};
	
	public static readonly addTodoInfo: {
		id: string,
		title: string;
		expected: Todo[];
		expectedToggled: Todo[];
	} = {
		id: 'generated-id',
		title: 'Learn hook testing',
		expected: [
			{
				id: 'generated-id',
				title: 'Learn hook testing',
				completed: false
			}
		],
		expectedToggled: [
			{
				id: 'generated-id',
				title: 'Learn hook testing',
				completed: true
			}
		]
	 };
}

afterEach(() => {
	cleanup();
	localStorage.clear();
	vi.unstubAllGlobals();
});

beforeEach(() => {
	localStorage.clear();
	
	vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
	
	vi.stubGlobal('crypto', {
		randomUUID: () => TodosTestData.addTodoInfo.id
	});
});

describe('useTodos', () => {
	it('loads saved todos during initialization', () => {
		const json: string = JSON.stringify(TodosTestData.savedTodosInfo.todos);
		
		localStorage.setItem(STORAGE_KEY, json);
		
		const { result } = renderHook(() => useTodos());
		
		expect(result.current.todos).toEqual(TodosTestData.savedTodosInfo.todos);
	});
	
	it('adds a todo and persists the updated state', () => {
		const { result } = renderHook(() => useTodos());
		
		act(() => {
			result.current.addTodo(TodosTestData.addTodoInfo.title);
		});
		
		const parsed: Todo[] = JSON.parse(
			localStorage.getItem(STORAGE_KEY) ?? '[]'
		);
		
		expect(result.current.todos).toEqual(TodosTestData.addTodoInfo.expected);
		expect(parsed).toEqual(TodosTestData.addTodoInfo.expected);
		expect(result.current.todos).toHaveLength(1);
	});
	
	it('toggles a todo and persists the updated state', () => {
		const json: string = JSON.stringify(TodosTestData.savedTodosInfo.todos);
		localStorage.setItem(STORAGE_KEY, json);
		const { result } = renderHook(() => useTodos());
		
		act(() => {
			result.current.toggleTodo(TodosTestData.savedTodosInfo.id)
		});
		
		const expected: Todo[] = TodosTestData.savedTodosInfo.expectedToggled;
		
		const parsed: Todo[] = JSON.parse(
			localStorage.getItem(STORAGE_KEY) ?? '[]'
		);
		
		expect(result.current.todos).toEqual(expected);
		expect(parsed).toEqual(expected);
		expect(result.current.todos).toHaveLength(1);
	});
	
	it('completes all todos and persists the updated state', () => {
		const { result } = renderHook(() => useTodos());
		
		act(() => {
			result.current.addTodo(TodosTestData.addTodoInfo.title);
		});
		
		const parsedAdded: Todo[] = JSON.parse(
			localStorage.getItem(STORAGE_KEY) ?? '[]'
		);
		
		expect(result.current.todos).toEqual(TodosTestData.addTodoInfo.expected);
		expect(parsedAdded).toEqual(TodosTestData.addTodoInfo.expected);
		
		act(() => {
			result.current.completeAll()
		});
		
		const parsedCompleted: Todo[] = JSON.parse(
			localStorage.getItem(STORAGE_KEY) ?? '[]'
		);
		
		expect(result.current.todos).toEqual(TodosTestData.addTodoInfo.expectedToggled);
		expect(result.current.todos).toHaveLength(1);
		expect(parsedCompleted).toEqual(TodosTestData.addTodoInfo.expectedToggled);
	});
	
	it('clears all completed todos and persists the updated state', () => {		
		const { result } = renderHook(() => useTodos());
		
		act(() => {
			result.current.addTodo(TodosTestData.addTodoInfo.title);
		});
		
		const parsedAdded: Todo[] = JSON.parse(
			localStorage.getItem(STORAGE_KEY) ?? '[]'
		);
		
		expect(result.current.todos).toEqual(TodosTestData.addTodoInfo.expected);
		expect(parsedAdded).toEqual(TodosTestData.addTodoInfo.expected);
		
		act(() => {
			result.current.completeAll()
		});
		
		const completedCount: number = result.current.todos.filter(todo => todo.completed).length;
		
		expect(completedCount).toBe(1);
		expect(result.current.todos).toEqual(TodosTestData.addTodoInfo.expectedToggled);
		expect(result.current.todos).toHaveLength(1);
		
		act(() => {
			result.current.clearCompleted()
		});
		
		const activeCount: number = result.current.todos.filter(todo => !todo.completed).length;
		
		const parsedCleared: Todo[] = JSON.parse(
			localStorage.getItem(STORAGE_KEY) ?? '[]'
		);
		
		expect(activeCount).toBe(0);
		expect(result.current.todos).toHaveLength(0);
		expect(result.current.todos).toEqual([]);
		expect(parsedCleared).toEqual([]);
	});
	
	it('deletes a todo and persists the updated state', () => {
		const { result } = renderHook(() => useTodos());
		
		act(() => {
			result.current.addTodo(TodosTestData.addTodoInfo.title);
		});
		
		const parsedAdded: Todo[] = JSON.parse(
			localStorage.getItem(STORAGE_KEY) ?? '[]'
		);
		
		expect(result.current.todos).toEqual(TodosTestData.addTodoInfo.expected);
		expect(parsedAdded).toEqual(TodosTestData.addTodoInfo.expected);
		
		act(() => {
			result.current.deleteTodo(TodosTestData.addTodoInfo.id);
		});
		
		const parsedDeleted: Todo[] = JSON.parse(
			localStorage.getItem(STORAGE_KEY) ?? '[]'
		);
		
		expect(result.current.todos).toEqual([]);
		expect(parsedDeleted).toEqual([]);
		expect(result.current.todos).toHaveLength(0);
	});
});