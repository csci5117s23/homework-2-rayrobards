import {useEffect, useState} from "react";
import TodoItem from "@/js/todoItem";
import Head from 'next/head'

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