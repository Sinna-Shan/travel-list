export default function Item({ item, onDeleteItem, onUpdateItem }) {
  return (
    <li className="item">
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => {
          onUpdateItem(item.id);
        }}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {`${item.quantity} ${item.description}`}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
