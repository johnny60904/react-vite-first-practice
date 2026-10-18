import Counter from './components/counter/Counter';
import Todo from './components/todo/Todo';
import './App.css';

// destructor syntax (class property cannot use destructor type 寫法)
// const { name, age }: { name: string; age: number } = { name: 'Joe'; age: 26 };

/*
const userRole = { 
	Admin: "admin", 
	User: "user", 
	Guest: "guest" 
} as const;

// 物件所有「屬性名稱 (鍵) 」的聯集型別 (Union of Keys)
type UserRole = keyof typeof userRole; // 'Admin' | 'User' | 'Guest'

// 物件所有「值」的聯集型別
type UserRole = typeof userRole[keyof typeof userRole]; // 'admin' | 'user' | 'guest'
*/

function App() {
	return (
		<>
		<main>
			<Counter />
			<Todo />
		</main>
		</>
	);
}

export default App;
