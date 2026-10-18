import { memo, type JSX } from 'react';
import type { Todo } from './todo-types';

interface TodoItemProps {
	todo     : Todo;
	onToggle : (id: string) => void;
	onDelete : (id: string) => void;
}

export const TodoItem = memo(function TodoItem({
	todo,
	onToggle,
	onDelete
}: TodoItemProps): JSX.Element {
	return (
		<li className="todo-item">
			<label className="todo-label">
				<input
					type="checkBox"
					checked={todo.completed}
					onChange={() => onToggle(todo.id)}
				/>
				
				<span
					className={todo.completed ? 'todo-title completed' : 'todo-title'}
				>
					{todo.title}
				</span>
			</label>
			
			<button
				className="todo-delete-btn"
				type="button"
				onClick={() => onDelete(todo.id)}
				aria-label={`Delete ${todo.title}`}
			>
				Delete
			</button>
		</li>
	);
});