import React from "react";

function TodoStats({ todos }) {
  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;
  const active = total - completed;

  const highestPriorityTodo = todos
    .filter((todo) => !todo.completed)
    .sort((a, b) => {
      const priorityMap = { High: 3, Medium: 2, Low: 1 };
      return priorityMap[b.priority] - priorityMap[a.priority];
    })[0];

  return React.createElement(
    "div",
    { className: "todo-stats" },
    React.createElement("p", null, `Total: ${total}`),
    React.createElement("p", null, `Active: ${active}`),
    React.createElement("p", null, `Completed: ${completed}`),
    React.createElement(
      "p",
      null,
      `Highest Priority: ${
        highestPriorityTodo
          ? `${highestPriorityTodo.title} (${highestPriorityTodo.priority})`
          : "None"
      }`
    )
  );
}

export default TodoStats;
