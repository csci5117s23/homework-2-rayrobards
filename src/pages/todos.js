import {useEffect, useState} from "react";
import TodoItem from "@/components/todoItem";
import styles from '@/styles/TodoApp.module.css'
import Head from 'next/head'
import { getTodoItems, addTodoItem } from "@/modules/Data";
import { useAuth } from "@clerk/nextjs";

export default function TodoPage() {
    const [todoList, setTodoList] = useState([]);
    const [newItem, setNewItem] = useState("");
    const [loading, setLoading] = useState(true);
    const { isLoaded, userId, sessionId, getToken } = useAuth()
    useEffect(()=>{
        async function loadData() {
            if(userId) {
                const token = await getToken({template: "codehooks"});
                let data = await getTodoItems(token, userId);
                setTodoList(data)
                setLoading(false);
            }
        }
        loadData();
    });
    //TODO; if i mount this, wont reset state when components state changes, bad practice?

    async function addItem()
    {
        const todoItem = {
            "userId": userId, 
            "text": newItem, 
            "category": "testing"
        }
        const updatedTodoList = [todoItem, ...todoList];
        setTodoList(updatedTodoList);
        setNewItem("");
        const token = await getToken({template: "codehooks"});
        await addTodoItem(token, todoItem);
    }

   if(loading)
   {
        return (
            <span>loading....</span>
        )
   }
    return (
        <>
            <Head>
                <title>Todos</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='todoPageContainer'>
                <div className="pageHeader">
                        <span>TODO</span>
                </div>
                <div className="todoItems">
                    <div>
                        {todoList.map(todos => (
                            <TodoItem key={todos.id} item={todos}></TodoItem>
                        ))}
                    </div>
                </div>
                <div className="addTodoItem">
                    <textarea className="textBox" placeholder="Enter new todo item description here." onChange={(e) => setNewItem(e.target.value)}/>
                    <button className="addItemButton" onClick={addItem}>Add new Todo item</button>
                </div>
            </div>
        </>
    )
}

