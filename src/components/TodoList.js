import React from "react";

const priorityColors = {
  High: "red",
  Medium: "orange",
  Low: "green",
};

function TodoList({ todos, toggleTodo, deleteTodo }) {
  if (todos.length === 0) {
    return React.createElement("p", null, "No todos found.");
  }

  return React.createElement(
    "ul",
    { className: "todo-list" },
    todos.map((todo) =>
      React.createElement(
        "li",
        { key: todo.id, className: "todo-item" },
        React.createElement("input", {
          type: "checkbox",
          checked: todo.completed,
          onChange: () => toggleTodo(todo.id),
        }),
        React.createElement(
          "span",
          {
            style: {
              textDecoration: todo.completed ? "line-through" : "none",
              flexGrow: 1,
              marginLeft: "0.5rem",
            },
          },
          todo.title
        ),
        React.createElement(
          "span",
          {
            style: {
              color: priorityColors[todo.priority],
              fontWeight: "bold",
              marginRight: "1rem",
            },
          },
          todo.priority
        ),
        React.createElement(
          "button",
          {
            onClick: () => deleteTodo(todo.id),
            className: "delete-button",
          },
          "❌"
        )
      )
    )
  );
}

export default TodoList;
