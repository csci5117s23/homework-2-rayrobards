import {useEffect, useState} from "react";
import TodoItem from "@/js/todoItem";
import styles from '@/styles/TodoApp.module.css'
import { flushSync } from "react-dom";

const APIKEY = "187e3e0d-9a0b-41bb-823c-8295b0d43779"
const BASEURL = "https://homework2-otqq.api.codehooks.io/dev"

const userId = '642dd9fbf1bc7c364d687b6a';

export default function TodoPage() {
    const [todoList, setTodoList] = useState([]);
    const [newItem, setNewItem] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const getTodoItems = async () => {
            const response = await fetch(`${BASEURL}/todos?userId=${userId}&status=${false}&sort=-createdOn`, {
                method: "GET",
                headers: { "x-apikey": APIKEY}
            });
            const data = await response.json();
            setTodoList(data);
            setLoading(false);
        }
        getTodoItems();
    })

    async function addItem()
    {
        setTodoList(todoList.concat(newItem))
        const todoItem = {
            "userId": userId, 
            "text": newItem, 
            "category": "testing"
        }
        const response = await fetch(`${BASEURL}/todos`, {
            method: "POST",
            headers: { "x-apikey": APIKEY, "Content-Type": "application/json"},
            body: JSON.stringify(todoItem)
        });
        let data = await response.json();
    }

   if(loading)
   {
        return (
            <span>loading....</span>
        )
   }
    return (
        <div className='todoPageContainer'>
            <div className="todoHeader">
                    <span>TODO</span>
            </div>
            <div className="todoItems">
                <div>
                    {todoList.map(todos => (
                        <TodoItem item={todos}></TodoItem>
                    ))}
                </div>
            </div>
            <div className="addTodoItem">
                <textarea className="textBox" placeholder="Enter new todo item description here." onChange={(e) => setNewItem(e.target.value)}/>
                <button className="addItemButton" onClick={addItem}>Add new Todo item</button>
            </div>
        </div>
    )
}

