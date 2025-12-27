"use client";

import { useState } from "react";
import { useEffect } from "react";

export default function Home() {
const [tasks, setTasks] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim() === "") return; // Do not add empty tasks
    setTasks([...tasks, input]); // Add new task
    setInput(""); // Clear input
    console.log(tasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") addTask();
  };

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) setTasks(JSON.parse(savedTasks));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="card-container flex justify-center items-center h-screen bg-blue-50">
      <div className="card bg-blue-100 border-b-4 border-b-emerald-500 rounded-2xl w-80 h-96 shadow-lg p-5 flex flex-col">
        {/* Header */}
        <div className="head mb-4">
          <div className="name text-center">
            <h1 className="text-2xl font-bold text-emerald-700">To Do List</h1>
          </div>
        </div>

        {/* Input */}
        <div className="flex flex-col flex-1">
          <div className="input flex mb-4">
            <input
              type="text"
              value={input}
              onKeyDown={handleKeyPress}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3 py-2 border-b-2 border-gray-400 focus:outline-none focus:border-emerald-500 rounded-l-2xl"
              placeholder="Add a task..."
            />
            <button
              className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-r-2xl transition-colors"
              onClick={addTask}
            >
              +
            </button>
          </div>

          {/* Task List */}
          <div className="list overflow-y-auto flex-1">
            <ul className="space-y-2">
              {tasks.map((task, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-white rounded-xl shadow-sm px-3 py-2 hover:shadow-md transition-shadow"
                >
                  <span className="text-gray-700">{task}</span>
                  <button
                    onClick={() => deleteTask(index)}
                    className="del-btn text-red-500 hover:text-red-700 font-semibold transition-colors"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
