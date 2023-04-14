import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle as unfilledCircle} from "@fortawesome/free-regular-svg-icons";
import { faCircle as filledCircle} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { updateTodoItem } from "@/modules/Data";
import Link from 'next/link'
import { useAuth } from "@clerk/nextjs";

export default function TodoItem(item) {
    const [buttonStyle, setButtonStyle] = useState(unfilledCircle);
    const {getToken } = useAuth()
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
        const token = await getToken({template: "codehooks"});
        await updateTodoItem(token, data._id, update);
    }

    function hoverStyle() {
        setButtonStyle(filledCircle);
    }

    function nonHoverStyle() {
        setButtonStyle(unfilledCircle);
    }
    
    //preview the text if its too long
    let text = data.text;
    if(text === undefined)
    {
        text = "";
    }
    if(text.length >= 55)
    {
        text = data.text.slice(0, 55);
        text = text.concat('...');
    }
    return (
        <div className="todoItemContainer">
            <button onClick={changeStatus} className="statusCircleButton">
                <FontAwesomeIcon onMouseOver={hoverStyle} onMouseOut={nonHoverStyle} className="statusCircle" icon={buttonStyle} />
            </button>
            <Link className="todoText" href={`/todo?id=${data._id}`}>
                <div>                
                    <p id="todoParagraph">{text}</p>
                </div>
            </Link>
        </div>
    )   
}