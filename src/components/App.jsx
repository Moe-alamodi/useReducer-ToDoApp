import React, { useState, useReducer } from "react";

// Reducer function
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
  if (action.type === "remove-todo") {
    return {
      todos: state.todos.filter((item, idx) => {
        return idx !== action.payload ? { item } : "";
      }),
    };
  }
};
function App() {
  // States
  const [newItem, setNewItem] = useState("");
  const [{ todos }, dispatch] = useReducer(reducer, { todos: [] });

  const onClickHandler = (e) => {
    e.preventDefault();
    console.log(newItem);
    if (newItem.trim().lenghth !== 0) {
      // Render the list only if the user enter sth
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
              <div key={item.item} style={{ display: "flex", gap: "0.5rem" }}>
                <li
                  // Cross the item if it is compeleted
                  style={{
                    textDecoration: item.compelted ? "line-through" : "",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    dispatch({ type: "toggle-todo", payload: index });
                  }}
                >
                  {item.item}
                </li>
                <button
                  onClick={() => {
                    dispatch({ type: "remove-todo", payload: index });
                  }}
                >
                  X
                </button>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
