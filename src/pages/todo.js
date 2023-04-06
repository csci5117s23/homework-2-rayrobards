import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const APIKEY = "187e3e0d-9a0b-41bb-823c-8295b0d43779"
const BASEURL = "https://homework2-otqq.api.codehooks.io/dev"

export default function TodoItem() {
    const [editing, setEditing] = useState(false);
    const [todoItem, setTodoItem] = useState({});
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    //get the id from the route
    const { id } = router.query;

    useEffect(() => {
        const getTodoItem = async () => {
            const response = await fetch(`${BASEURL}/todos?_id=${id}`, {
                method: "GET",
                headers: { "x-apikey": APIKEY}
            });
            const data = await response.json();
            setTodoItem(data[0]);
            setLoading(false);
        }
        getTodoItem();
    })

    function toggleEditing() {
        setEditing(!editing)
    }
    if(loading)
    {
         return (
             <span>loading....</span>
         )
    }
    return (
        <div className="todoItemPageContainer">
            {!editing && (
                <div>
                    <p>{todoItem.text}</p>
                    <button onClick={toggleEditing}>Edit Item description</button>
                </div>
            )}
            {editing && (
                <div>
                <textarea placeholder="todo item description" value={todoItem.text}></textarea>
                <button onClick={toggleEditing}>Edit Item description</button>
            </div>
            )}
        </div>
    )
}

