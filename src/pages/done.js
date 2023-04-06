import {useEffect, useState} from "react";
import TodoItem from "@/js/todoItem";

const APIKEY = "187e3e0d-9a0b-41bb-823c-8295b0d43779"
const BASEURL = "https://homework2-otqq.api.codehooks.io/dev"

const userId = '642dd9fbf1bc7c364d687b6a';

export default function DonePage() {
    const [todoList, setTodoList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const getTodoItems = async () => {
            const response = await fetch(`${BASEURL}/todos?userId=${userId}&status=${true}&sort=-createdOn`, {
                method: "GET",
                headers: { "x-apikey": APIKEY}
            });
            const data = await response.json();
            setTodoList(data);
            setLoading(false);
        }
        getTodoItems();
    })
    
    if(loading)
    {
        return (
            <span>loading....</span>
        )
    }
    return (
        <div className="donePageContainer">
            <div className="todoItems">
                <h1>Done: </h1>
                <div>
                    {todoList.map(todos => (
                        <TodoItem item={todos}></TodoItem>
                    ))}
                </div>
            </div>
        </div>
    )
}