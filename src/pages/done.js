import {useEffect, useState} from "react";
import TodoItem from "@/components/todoItem";
import PageHeader from "@/components/header";
import Head from 'next/head'
import { getDoneTodoItems } from "@/modules/Data";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";
import CategoryList from "@/components/categoryList";
import NoData from "@/components/noData";

export default function DonePage() {
    const [todoList, setTodoList] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if(isLoaded) {
            if (!userId) {
                router.push("/");
            }
        }
    }, [isLoaded])

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
            <>
                <div>
                    <PageHeader pageTitle={`DONE`} />
                </div>
                <span>loading....</span>
            </>
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
                <div>
                    <PageHeader pageTitle="DONE" />
                </div>  
                <div>
                    <CategoryList status={"done"}/>
                </div>  
                {todoList.length === 0 && (
                        <NoData />
                )}     
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