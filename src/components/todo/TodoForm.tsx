import { useState, type ComponentProps } from 'react';

interface TodoFormProps {
	onAdd: (title: string) => void;
}

const isBlank = (value: string): value is string => 
	!value || value.trim().length === 0;

export function TodoForm({ onAdd }: TodoFormProps) {
	const [title, setTitle] = useState('');
	
	const handleEvent = (): void => {
		const trimmedTitle: string = title.trim();
		
		if (isBlank(trimmedTitle)) return;
		
		onAdd(trimmedTitle);
		setTitle('');
	};
	
	const handleSubmit = (
		event: Parameters<
			NonNullable<
				ComponentProps<'form'>['onSubmit']
			>
		>[0]
	): void => {
		event.preventDefault();
		handleEvent();
	};
	
	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="todo-title">New todo</label>
			<input
				id="todo-title"
				value={title}
				onChange={event => setTitle(event.target.value)}
				placeholder="What needs to be done?"
				autoComplete="off"
			/>
			<button
				className="todo-add-btn"
				type="submit"
			>Add</button>
		</form>
	);
}