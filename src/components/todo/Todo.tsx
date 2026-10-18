import { useMemo, useState, type JSX } from 'react';
import { TodoForm } from './TodoForm';
import { TodoItem } from './TodoItem';
import type { TodoFilter } from './todo-types';
import useTodos from './useTodos';
import './todo.css';

function Todo(): JSX.Element {
	const {
		todos,
		addTodo,
		toggleTodo,
		completeAll,
		clearCompleted,
		deleteTodo
	} = useTodos();

	const [filter, setFilter] = useState<TodoFilter>('All');
	
	const visibleTodos = useMemo(() => {
		return todos.filter(todo => {
			switch (filter) {
				case 'All'       : return true;
				case 'Active'    : return !todo.completed;
				case 'Completed' : return todo.completed;
			}
		});
	}, [todos, filter]);
	
	const totalCount: number = useMemo(() => todos.length, [todos]);
	
	const completedCount: number = useMemo(() => 
		todos.filter(todo => 
			todo.completed).length
	, [todos]);
	
	const remainingCount: number = useMemo(() => 
		todos.filter(todo => 
			!todo.completed).length
	, [todos]);
	
	return (
		<div className="todo-app">
			<h1>Todo List</h1>
			<TodoForm onAdd={addTodo} />
			<div className="todo-actions">
				<button
					type="button"
					onClick={completeAll}
				>
					Complete All
				</button>
				
				<button
					type="button"
					onClick={clearCompleted}
				>
					Clear completed
				</button>
			</div>
			<nav aria-label="Filter todos" className="filters">
				<button
					type="button"
					aria-pressed={filter === 'All'}
					onClick={() => setFilter('All')}
				>
					All
				</button>
				
				<button
					type="button"
					aria-pressed={filter === 'Active'}
					onClick={() => setFilter('Active')}
				>
					Active
				</button>
				
				<button
					type="button"
					aria-pressed={filter === 'Completed'}
					onClick={() => setFilter('Completed')}
				>
					Completed
				</button>
			</nav>
			
			<section className="todo-summary" aria-label="Todo summary">
				<p>Total: {totalCount}</p>
				<p>Active: {remainingCount}</p>
				<p>Completed: {completedCount}</p>
			</section>
			
			<ul className="todo-list">
				{visibleTodos.map(todo => (
					<TodoItem
						key={todo.id}
						todo={todo}
						onToggle={toggleTodo}
						onDelete={deleteTodo}
					/>
				))}
			</ul>
			
			{visibleTodos.length === 0 && (
				<p className="empty-state">No todos to display</p>
			)}
		</div>
	);
}

export default Todo;
