import React, { useState } from "react";

function TodoForm({ addTodo }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTodo({
      title: title.trim(),
      priority,
    });

    setTitle("");
    setPriority("Medium");
  };

  return React.createElement(
  "form",
  { onSubmit: handleSubmit, className: "todo-form" },
  React.createElement("input", {
    type: "text",
    value: title,
    onChange: (e) => setTitle(e.target.value),
    placeholder: "Enter todo title...",
    className: "todo-input",
  }),
  React.createElement(
    "label",
    { htmlFor: "todo-priority-select" },
    "Todo Priority"
  ),
  React.createElement(
    "select",
    {
      id: "todo-priority-select",
      value: priority,
      onChange: (e) => setPriority(e.target.value),
      className: "todo-select",
    },
    ["Low", "Medium", "High"].map((level) =>
      React.createElement("option", { key: level, value: level }, level)
    )
  ),
  React.createElement(
    "button",
    { type: "submit", className: "todo-button" },
    "Add Todo"
  )
);

}

export default TodoForm;
