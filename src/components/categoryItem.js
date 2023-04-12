import { faDeleteLeft as deleteIcon} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from 'next/link'

export default function Category(category) 
{
    let data = category.category
    return (
        <li className="pure-menu-item">
            <Link href={`/todos/category?category=${data.name}`} className="pure-menu-link">
                <div className="categoryContainer">
                    <span className="categoryText">{data.name}</span>
                    <button className="deleteCatButton">
                        <FontAwesomeIcon title="delete category" className="categoryIcon" icon={deleteIcon}/>
                    </button>
                </div>
            </Link>
        </li>
    )
}