"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "../lib/supabaseClient";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

interface TodoItem {
  id: string;
  task: string;
  completed: boolean;
  user_email: string | null;
}

export default function Home() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState<string>("");
  const [items, setItems] = useState<TodoItem[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  // Load tasks from Supabase
  const loadTodos = useCallback(async () => {
    if (!email) return;
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .eq("user_email", email);

    if (error) {
      console.error("Error fetching todos:", error);
    } else {
      setItems(data || []);
    }
  }, [email]);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  // Add a new task
  const handleAddTask = async () => {
    if (!inputValue.trim() || !email) return;

    const { data, error } = await supabase
      .from("todos")
      .insert([{ task: inputValue, user_email: email }])
      .select();

    if (error) {
      console.error("Error adding task:", error);
    } else {
      setItems((prev) => [...prev, data[0]]);
      setInputValue("");
    }
  };

  // Delete a task
  const handleDeleteTask = async (id: string) => {
    const { error } = await supabase.from("todos").delete().eq("id", id);
    if (error) {
      console.error("Error deleting task:", error);
    } else {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // Start editing a task
  const handleEditTask = (item: TodoItem) => {
    setEditingId(item.id);
    setEditingText(item.task);
  };

  // Save edited task
  const saveEditedTask = async () => {
    if (!editingId || !editingText.trim()) return;

    const { error } = await supabase
      .from("todos")
      .update({ task: editingText })
      .eq("id", editingId);

    if (error) {
      console.error("Error editing task:", error);
    } else {
      setItems((prev) =>
        prev.map((t) =>
          t.id === editingId ? { ...t, task: editingText } : t
        )
      );
      setEditingId(null);
      setEditingText("");
    }
  };

  // Toggle task completion
  const toggleComplete = async (item: TodoItem) => {
    const { error } = await supabase
      .from("todos")
      .update({ completed: !item.completed })
      .eq("id", item.id);

    if (error) {
      console.error("Error updating task:", error);
    } else {
      setItems((prev) =>
        prev.map((t) =>
          t.id === item.id ? { ...t, completed: !t.completed } : t
        )
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-2xl shadow-xl">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">TODO LIST</h1>
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 mb-6">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={handleAddTask}
            className="px-4 py-2 bg-blue-500 text-white rounded-xl shadow hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        {/* Todo list */}
        <ul className="space-y-3">
          {items.map((item) => (
            <li
              key={item.id}
              className={`flex items-center justify-between bg-gray-700 border border-gray-600 rounded-xl p-4 shadow-sm hover:shadow-md transition duration-200 ${
                item.completed ? "opacity-50" : ""
              }`}
            >
              <div className="flex-1 min-w-0 flex items-center gap-3">
                <input
                  type="checkbox"
                  title="completed task"
                  className="w-5 h-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-400"
                  checked={item.completed}
                  onChange={() => toggleComplete(item)}
                />

                {editingId === item.id ? (
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" ? saveEditedTask() : null
                    }
                    className="flex-1 px-2 py-1 bg-gray-600 text-white border border-gray-500 rounded"
                  />
                ) : (
                  <span
                    className={`text-white break-words min-w-0 font-medium ${
                      item.completed ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {item.task}
                  </span>
                )}
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-2 ml-4">
                <button
                  className="text-blue-400 hover:text-blue-600 transition"
                  title={editingId === item.id ? "Save task" : "Edit task"}
                  onClick={() =>
                    editingId === item.id
                      ? saveEditedTask()
                      : handleEditTask(item)
                  }
                >
                  <FaRegEdit />
                </button>
                <button
                  className="text-red-400 hover:text-red-600 transition"
                  title="Delete task"
                  onClick={() => handleDeleteTask(item.id)}
                >
                  <MdDeleteOutline />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
