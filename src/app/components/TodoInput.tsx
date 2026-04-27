// components/TodoInput.tsx
import { useState } from "react";
import { addTodo } from "../todoSlice";
import { selectLogin } from "../userSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hook";

function TodoInput() {
  const [title, setTitle] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [errMessage, setErrMessage] = useState<string>("");
  
  const dispatch = useAppDispatch();
  const loginInfo = useAppSelector(selectLogin);
  const userId = loginInfo.userInfo.userId;

  const handleSubmit = (): void => {
    // Clear error message
    setErrMessage("");

    if (!title.trim()) {
      setErrMessage("Please enter a title");
      return;
    }

    // Build the todo payload
    const todoPayload: {
      title: string;
      subContent: string;
      user: string;
      deadline?: string;
    } = {
      title: title.trim(),
      subContent: content.trim() || " ",
      user: userId,
    };
    // Only add deadline if it's set
    if (deadline) {
      todoPayload.deadline = deadline;
    }

    dispatch(addTodo(todoPayload));

    // Reset form fields
    setTitle("");
    setContent("");
    setDeadline("");
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6 transform transition hover:scale-[1.01]">
      <h2 className="text-xl font-semibold text-dark mb-4 flex items-center">
        Add New Task
      </h2>
      <div className="flex flex-col">
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
          type="text"
          placeholder="Title"
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
        />
        {errMessage && (
          <span className="text-red-800 mt-2 text-sm">{errMessage}</span>
        )}
        <input
          onChange={(e) => setContent(e.target.value)}
          value={content}
          type="text"
          placeholder="Sub-content"
          className="flex-1 my-4 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
        />
        <div className="flex flex-row items-center justify-between">
          <label htmlFor="date" className="text-dark/80">Until:</label>
          <input
            id="date"
            onChange={(e) => setDeadline(e.target.value)}
            type="datetime-local"
            className="flex-1 ms-4 my-4 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary/90 transition"
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default TodoInput;