import { useCallback, useEffect, useReducer } from 'react';
import type { Todo } from './todo-types';
import { todosReducer } from './todos-reducer';
import { loadTodos, saveTodos } from './todos-storage';

function useTodos(): {
	todos          : Todo[];
	addTodo        : (title: string) => void;
	toggleTodo     : (id: string) => void;
	completeAll    : () => void;
	clearCompleted : () => void;
	deleteTodo     : (id: string) => void;
} {
	const [todos, dispatch] = useReducer(
		todosReducer,     // reducer
		undefined,        // initial args
		() => loadTodos() // init
	);
	
	useEffect(() => {
		try {
			saveTodos(todos);
		} catch (error) {
			console.error('Failed to save todos: ', error);
		}
	}, [todos]);
	
	const addTodo = useCallback((title: string): void => {
		const todo: Todo = {
			id: crypto.randomUUID(),
			title,
			completed: false
		}
		
		dispatch({ type: 'Add', todo });
	}, []);
	
	const toggleTodo = useCallback((id: string): void => {
		dispatch({ type: 'Toggle', id })
	}, []);
	
	const completeAll = useCallback((): void => {
		dispatch({ type: 'CompleteAll' })
	}, []);
	
	const clearCompleted = useCallback((): void => {
		dispatch({ type: 'ClearCompleted' })
	}, []);
	
	const deleteTodo = useCallback((id: string): void => {
		dispatch({ type: 'Delete', id })
	}, []);
	
	return {
		todos,
		addTodo,
		toggleTodo,
		completeAll,
		clearCompleted,
		deleteTodo
	};
}

export default useTodos;
