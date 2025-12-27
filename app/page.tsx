"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (!input.trim()) return; // prevent empty
    setTasks([...tasks, input]);
    setInput("");
  };

  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") addTask();
  };

  // Load tasks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="flex justify-center items-center h-screen bg-blue-50">
      <div className="bg-blue-100 border-b-4 border-emerald-500 rounded-2xl w-80 h-96 shadow-lg p-5 flex flex-col">
        <h1 className="text-2xl font-bold text-emerald-700 text-center mb-4">
          To Do List
        </h1>

        <div className="flex mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Add a task..."
            className="flex-1 px-3 py-2 border-b-2 border-gray-400 rounded-l-2xl focus:outline-none focus:border-emerald-500"
          />
          <button
            onClick={addTask}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-r-2xl transition-colors"
          >
            +
          </button>
        </div>

        <ul className="overflow-y-auto flex-1 space-y-2">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-white rounded-xl shadow-sm px-3 py-2 hover:shadow-md transition-shadow"
            >
              <span className="text-gray-700">{task}</span>
              <button
                onClick={() => deleteTask(index)}
                className="text-red-500 hover:text-red-700 font-semibold transition-colors"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
