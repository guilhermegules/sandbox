import { component$, useSignal } from '@builder.io/qwik';

type Todo = { id: number; text: string; done: boolean };

export default component$(() => {
  const todos = useSignal<Todo[]>([]);
  const draft = useSignal('');
  const nextId = useSignal(1);

  return (
    <section>
      <h1>Todos</h1>
      <p>Client-side list state managed with useSignal on the component that owns it.</p>

      <div class="row">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={draft.value}
          onInput$={(_, el) => (draft.value = el.value)}
          onKeyDown$={(e) => {
            if (e.key === 'Enter') {
              const text = draft.value.trim();
              if (!text) return;
              todos.value = [...todos.value, { id: nextId.value++, text, done: false }];
              draft.value = '';
            }
          }}
        />
        <button
          onClick$={() => {
            const text = draft.value.trim();
            if (!text) return;
            todos.value = [...todos.value, { id: nextId.value++, text, done: false }];
            draft.value = '';
          }}
        >
          Add
        </button>
      </div>

      <ul class="todos">
        {todos.value.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.done}
              onClick$={() =>
                (todos.value = todos.value.map((t) =>
                  t.id === todo.id ? { ...t, done: !t.done } : t,
                ))
              }
            />
            <span class={todo.done ? 'done' : ''}>{todo.text}</span>
            <button
              onClick$={() =>
                (todos.value = todos.value.filter((t) => t.id !== todo.id))
              }
            >
              Remove
            </button>
          </li>
        ))}
        {todos.value.length === 0 && <li class="empty">No todos yet.</li>}
      </ul>
    </section>
  );
});