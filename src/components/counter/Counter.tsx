import { useState, type JSX } from 'react';
import './counter.css';

function Counter(): JSX.Element {
	const initializer: number = 0;
	const [count, setCount] = useState(initializer);
		
	const decrement = (): void => setCount(current => current - 1);
	const increment = (): void => setCount(current => current + 1);
	const reset = (): void => setCount(initializer);
	
	return (
		<div className="counter-app">
			<h1>React Counter</h1>
			
			<p className="counter-count" aria-live="polite">
				{count}
			</p>
			
			<div className="counter-actions">
				<button type="button" onClick={decrement}>
					Decrease
				</button>
				
				<button type="button" onClick={reset}>
					Reset
				</button>
				
				<button type="button" onClick={increment}>
					Increase
				</button>
			</div>
		</div>
	);
}

export default Counter;
