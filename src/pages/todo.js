import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faFloppyDisk, faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link'
import Head from 'next/head'

const APIKEY = "187e3e0d-9a0b-41bb-823c-8295b0d43779"
const BASEURL = "https://homework2-otqq.api.codehooks.io/dev"

export default function TodoItem() {
    const [editing, setEditing] = useState(false);
    const [todoItem, setTodoItem] = useState({});
    const [loading, setLoading] = useState(true);
    const [updatedText, setUpdatedText] = useState("");
    const router = useRouter();

    //get the id from the route


    useEffect(() => {
        //router.isReady prevents query from being undefined on page reload
        //along with adding dependency to the useEffect dependency list
        if(router.isReady){
            const { id } = router.query;
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
        }
    }, [router.isReady])

    function toggleEditing() {
        setEditing(!editing)
    }

    async function saveEdit() {
        const update = {
            "status": todoItem.status,
            "createdOn": todoItem.createdOn,
            "category": todoItem.category,
            "text": updatedText,
            "userId": todoItem.userId,
            "_id": todoItem._id
        }
        const response = await fetch(`${BASEURL}/changeTodoStatus?_id=${todoItem._id}`, {
            method: "PUT",
            headers: { "x-apikey": APIKEY, "Content-Type": "application/json"},
            body: JSON.stringify(update)
        });
        let res = await response.json();
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
                <title>Todo Item</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
        <div className="todoItemPageContainer">
            {!editing && (
                <div className="nonEditText">
                    <p>{todoItem.text}</p>
                </div>
            )}
            {editing && (
                <div className="editText">
                    <textarea className="todoItemTextInput" placeholder="todo item description" onChange={(e) => setUpdatedText(e.target.value)}>{todoItem.text}</textarea>
                </div>
            )}
            <div className="todoItemButtonsContainer">
                <Link href="/todos">
                    <button className="todoItemButton" title="Back to todos">
                        <FontAwesomeIcon icon={faArrowLeft} className="buttonIcon"/>
                    </button>
                </Link>
                <button className="todoItemButton" onClick={toggleEditing} title="Toggle Editing">
                    <FontAwesomeIcon icon={faPen} className="buttonIcon"/>
                </button>
                {editing && (<button className="todoItemButton" onClick={saveEdit} title="Save Edit">
                    <FontAwesomeIcon icon={faFloppyDisk} className="buttonIcon"/>
                </button>)}
            </div>
        </div>
        </>
    )
}

