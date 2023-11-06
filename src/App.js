import { useState } from "react";
import "./App.css";
import Logo from "./components/logo";
import Form from "./components/form";
import PackingList from "./components/packingList";
import Stats from "./components/stats";

export default function App() {
  const [items, setItems] = useState([]);

  function handelDeleteAll() {
    const confirmed = window.confirm("Are you sure of deleting all items ?");
    confirmed && setItems([]);
  }

  function handelAddItems(item) {
    setItems((items) => [...items, item]);
  }
  function handelDeleteItem(id) {
    console.log(id);
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handelToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handelAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handelDeleteItem}
        onUpdateItem={handelToggleItem}
        onDeleteAll={handelDeleteAll}
      />
      <Stats items={items} />
    </div>
  );
}
