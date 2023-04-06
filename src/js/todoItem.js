import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle as unfilledCircle} from "@fortawesome/free-regular-svg-icons";
import { faCircle as filledCircle} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Link from 'next/link'

const APIKEY = "187e3e0d-9a0b-41bb-823c-8295b0d43779"
const BASEURL = "https://homework2-otqq.api.codehooks.io/dev"

export default function TodoItem(item) {
    let data = item.item;
    async function changeStatus()
    {
        const update = {
            "status": !data.status,
            "createdOn": data.createdOn,
            "category": data.category,
            "text": data.text,
            "userId": data.userId,
            "_id": data._id
        }
        const response = await fetch(`${BASEURL}/changeTodoStatus?_id=${data._id}`, {
            method: "PUT",
            headers: { "x-apikey": APIKEY, "Content-Type": "application/json"},
            body: JSON.stringify(update)
        });
        let res = await response.json();
    }
    let text = data.text;
    if(data.text.length >= 55)
    {
        text = data.text.slice(0, 55);
        text = text.concat('...');
    }

    return (
        <div className="todoItemContainer">
            <button onClick={changeStatus} className="statusCircleButton">
                {!data.status && (<FontAwesomeIcon className="statusCircle" icon={unfilledCircle} />)}
                {data.status && (<FontAwesomeIcon className="statusCircle" icon={filledCircle} />)}
            </button>
            <Link className="todoText" href={`/todo?id=${data._id}`}>
                <div>                
                    <p id="todoParagraph">{text}</p>
                </div>
            </Link>
        </div>
    )   
}