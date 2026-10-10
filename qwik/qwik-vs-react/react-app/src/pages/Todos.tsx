import { useState } from 'react';

type Todo = { id: number; text: string; done: boolean };

let nextId = 1;

export default function Todos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [draft, setDraft] = useState('');

  function addTodo() {
    if (!draft.trim()) return;
    setTodos((prev) => [...prev, { id: nextId++, text: draft.trim(), done: false }]);
    setDraft('');
  }

  function toggle(id: number) {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function remove(id: number) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <section>
      <h1>Todos</h1>
      <p>Client-side list state managed with useState on the component that owns it.</p>

      <div className="row">
        <input
          value={draft}
          placeholder="What needs to be done?"
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul className="todos">
        {todos.map((todo) => (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.done} onChange={() => toggle(todo.id)} />
            <span className={todo.done ? 'done' : ''}>{todo.text}</span>
            <button onClick={() => remove(todo.id)}>Remove</button>
          </li>
        ))}
        {todos.length === 0 && <li className="empty">No todos yet.</li>}
      </ul>
    </section>
  );
}