// Tasks.jsx
import React from "react";
import NewTask from "../New Task/NewTask";

export default function Tasks({ tasks, onAdd, onDelete }) {
  if (!tasks) {
    return null; // or handle the case where tasks is undefined
  }

  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">New Tasks</h2>
      <NewTask onAdd={onAdd} />
      {tasks.length === 0 && (
        <p className="text-stone-800 my-4">
          This project does not have any tasks yet.
        </p>
      )}
      {tasks.length > 0 && (
        <ul className="p-4 mt-8 rounded-md bg-slate-100">
          {tasks.map((task) => (
            <li key={task.id} className="flex justify-between my-4">
              <span>{task.text}</span>
              <button
                className="text-stone-700 hover:text-red-500"
                onClick={() => onDelete(task.id)}
              >
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
