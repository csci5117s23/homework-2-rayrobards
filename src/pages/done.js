import {useEffect, useState} from "react";
import TodoItem from "@/components/todoItem";
import Head from 'next/head'
import { getDoneTodoItems } from "@/modules/Data";
import { useAuth } from "@clerk/nextjs";

export default function DonePage() {
    const [todoList, setTodoList] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isLoaded, userId, sessionId, getToken } = useAuth()

    useEffect(()=>{
       async function loadData() {
            if(userId) {
                const token = await getToken({template: "codehooks"});
                let data = await getDoneTodoItems(token, userId);
                setTodoList(data)
                setLoading(false);
            }
       }
       loadData(); 
    });
    
    if(loading)
    {
        return (
            <span>loading....</span>
        )
    }
    return (
        <>
            <Head>
                <title>Done</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="donePageContainer">
            <div className="pageHeader">
                        <span>DONE</span>
                </div>
                <div className="todoItems">
                    <div>
                        {todoList.map(todos => (
                            <TodoItem item={todos}></TodoItem>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}