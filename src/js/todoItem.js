export default function TodoItem(todoItems) {
    let items = todoItems.todoItems;
    return (
        <div>
            {items.map(todos => (
                <div className="todoItem">
                    <p>{todos.text}</p>
                </div>
            ))}
        </div>
    )   
}