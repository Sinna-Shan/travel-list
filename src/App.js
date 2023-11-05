import { useState } from "react";
import "./App.css";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "charger", quantity: 1, packed: true },
];

export default function App() {
  const [items, setItems] = useState([]);
  function handelAddItems(item){
    setItems(items => [...items, item])
  }
  function handelDeleteItem(id){
    console.log(id);
    setItems(items => items.filter(item=>item.id !== id))
  }
  function handelToggleItem(id){
    setItems(items=>items.map(item => item.id === id ? { ...item, packed: !item.packed} : item))
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handelAddItems}  />
      <PackingList items={items} onDeleteItem = {handelDeleteItem} onUpdateItem = {handelToggleItem}/>
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🏝️ Far away 💼</h1>;
}
function Form({onAddItems}) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handelSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem= {id: Date.now(), description, quantity, packed : false}
    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handelSubmit}>
      <h3>What do you need for your 😍 trip? </h3>
      <select value={quantity} onChange={e => setQuantity(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num} >
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Items..."
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
function PackingList({items, onDeleteItem, onUpdateItem}) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} onDeleteItem={onDeleteItem} onUpdateItem={onUpdateItem}/>
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem, onUpdateItem }) {
  return (
    <li className="item">
    <input type="checkbox" value={item.packed} onChange={() =>{onUpdateItem(item.id)}}/>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {`${item.quantity} ${item.description}`}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>🎒 You have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
}


