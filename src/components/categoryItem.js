import { faDeleteLeft as deleteIcon} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from 'next/link'
import { useAuth } from "@clerk/nextjs";
import { deleteTodoCategory } from "@/modules/Data";

export default function Category(props) 
{
    const {getToken, userId} = useAuth()
    const { category, status } = props;
    async function deleteCategory()
    {
        const token = await getToken({template: "codehooks"});
        await deleteTodoCategory(token, category._id)
    }
    return (
        <div className="categoryContainer">
            <Link href={`/${status}/category?category=${category.name}`} className="pure-menu-link">
                <div >
                    <span className="categoryText">{category.name}</span>
                </div>
            </Link>
            <button className="deleteCatButton" onClick={deleteCategory}>
                <FontAwesomeIcon title="delete category" className="categoryIcon" icon={deleteIcon}/>
            </button>
        </div>
    )
}