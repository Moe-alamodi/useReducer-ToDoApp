import React, { useState, useReducer } from "react";
const reducer = (state, action) => {
  if (action.type === "add-todo") {
    return {
      todos: [{ item: action.payload, compelted: false }, ...state.todos],
    };
  }
  if (action.type === "toggle-todo") {
    return {
      todos: state.todos.map((item, idx) => {
        return idx === action.payload
          ? { ...item, compelted: !item.compelted }
          : item;
      }),
    };
  }
};
function App() {
  const [newItem, setNewItem] = useState("");
  const [{ todos }, dispatch] = useReducer(reducer, { todos: [] });

  const onClickHandler = (e) => {
    e.preventDefault();
    if (newItem.trim().lenghth !== 0) {
      dispatch({ type: "add-todo", payload: newItem });
    }
    setNewItem("");
  };
  const inputHandler = (event) => {
    setNewItem(event.target.value);
  };
  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input type="text" onChange={inputHandler} value={newItem} />
        <button onClick={onClickHandler}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {todos.map((item, index) => {
            return (
              <li
                style={{ textDecoration: item.compelted ? "line-through" : "" }}
                onClick={() => {
                  dispatch({ type: "toggle-todo", payload: index });
                }}
              >
                {item.item}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
