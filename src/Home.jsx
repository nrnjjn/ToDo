import React, { useState } from 'react';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const addTodo = () => {
    if (title.trim() && description.trim()) {
      setTodos([...todos, { title: title.trim(), description: description.trim(), status: 'Not Completed' }]);
      setTitle('');
      setDescription('');
    }
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setTitle(todos[index].title);
    setDescription(todos[index].description);
  };

  const saveTodo = () => {
    if (title.trim() && description.trim()) {
      const updatedTodos = todos.map((todo, i) =>
        i === editingIndex ? { ...todo, title: title.trim(), description: description.trim() } : todo
      );
      setTodos(updatedTodos);
      setEditingIndex(null);
      setTitle('');
      setDescription('');
    }
  };

  const updateTodoStatus = (index, newStatus) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, status: newStatus } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div className="w-full bg-black min-h-screen flex items-center justify-center">
      <div className="max-w-lg w-full mx-auto p-4 bg-gray-700 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-white">Todo List</h1>
        <input
          className="w-full p-2 mb-2 border rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full p-2 mb-2 border rounded"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          className="w-full p-2 mb-4 bg-yellow-600 text-white rounded hover:bg-orange-700"
          onClick={editingIndex === null ? addTodo : saveTodo}
        >
          {editingIndex === null ? 'Add' : 'Save'}
        </button>
        <ul>
          {todos.map((todo, index) => (
            <li key={index} className="mb-4 p-4 border rounded shadow bg-white">
              {editingIndex === index ? (
                <>
                  <input
                    className="w-full p-2 mb-2 border rounded"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <textarea
                    className="w-full p-2 mb-2 border rounded"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <select
                    className="w-full p-2 mb-2 border rounded"
                    value={todo.status}
                    onChange={(e) => updateTodoStatus(index, e.target.value)}
                  >
                    <option value="Not Completed">Not Completed</option>
                    <option value="Completed">Completed</option>
                  </select>
                  <button
                    className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={saveTodo}
                  >
                    Done
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-bold">{todo.title}</h2>
                  <p>{todo.description}</p>
                  <p className="italic">Status: {todo.status}</p>
                  <button
                    className="mt-2 p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    onClick={() => startEditing(index)}
                  >
                    Edit
                  </button>
                  <select
                    className="mt-2 p-2 border rounded"
                    value={todo.status}
                    onChange={(e) => updateTodoStatus(index, e.target.value)}
                  >
                    <option value="Not Completed">Not Completed</option>
                    <option value="Completed">Completed</option>
                  </select>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
