//page of todo items
//text box and submit button to create new todo item
//list of todo items not marked done
import {useEffect, useState} from "react";
import TodoItem from "@/js/todoItem";
import styles from '@/styles/TodoApp.module.css'

const APIKEY = "187e3e0d-9a0b-41bb-823c-8295b0d43779"

const userId = '1';

export default function TodoPage() {
    const [todoList, setTodoList] = useState([]);
    const [newItem, setNewItem] = useState("");

   async function addUser(name, id)
   {
    const USER_ENDPOINT = "https://homework2-otqq.api.codehooks.io/dev/user"

    const user = {
        name: name,
        _id: id
    }
    const response = await fetch(USER_ENDPOINT, {
        method: "POST",
        headers: { "x-apikey": APIKEY, "Content-Type": "application/json"},
        body: JSON.stringify(user)
    });
    await response.status;

   }
   //addUser("test2", 2);

   async function getUser(id)
   {
    const USER_ENDPOINT = `https://homework2-otqq.api.codehooks.io/dev/user?id=${id}`

    const response = await fetch(USER_ENDPOINT, {
        method: "GET",
        headers: { "x-apikey": APIKEY},
    });
    let data = await response.json()
    return data
   }

   async function countTodoItems()
   {
    const USER_ENDPOINT = "https://homework2-otqq.api.codehooks.io/dev/todoCount"

    const response = await fetch(USER_ENDPOINT, {
        method: "GET",
        headers: { "x-apikey": APIKEY},
    });
    let data = await response.json()
    return data
   }

   let count = countTodoItems()
   count = count.length;

   async function addItem() 
   {
        setTodoList(todoList.concat(newItem))
        const USER_ENDPOINT = "https://homework2-otqq.api.codehooks.io/dev/todo"

        const todoItem = {
            userId: '1',
            text: newItem,
            status: false
        }
        console.log("todoItem: " + JSON.stringify(todoItem));
        const response = await fetch(USER_ENDPOINT, {
            method: "POST",
            headers: { "x-apikey": APIKEY, "Content-Type": "application/json"},
            body: JSON.stringify(todoItem)
        });
        let data = await response.json();
   }

   async function getTodoItems(id)
   {
    const USER_ENDPOINT = `https://homework2-otqq.api.codehooks.io/dev/todo?id=${id}`

    const response = await fetch(USER_ENDPOINT, {
        method: "GET",
        headers: { "x-apikey": APIKEY},
    });
    let data = await response.json()
    setTodoList(data)
   }
   getTodoItems('1')

   async function deleteTodoList()
   {
    const USER_ENDPOINT = "https://homework2-otqq.api.codehooks.io/dev/clearTodo"
    const response = await fetch(USER_ENDPOINT, {
        method: "DELETE",
        headers: { "x-apikey": APIKEY},
    });
    await response
   }

    return (
        <div className='todoPageContainer'>
            <div className="addTodoItem">
                <input placeholder="Todo Description" onChange={(e) => setNewItem(e.target.value)}></input>
                <button onClick={addItem}>Add new Todo item</button>
            </div>
            <div className="todoItems">
                <h1>Todo: </h1>
                <TodoItem todoItems={todoList}></TodoItem>
            </div>
        </div>
    )
}

