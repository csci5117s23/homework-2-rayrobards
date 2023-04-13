import Category from "@/components/categoryItem";
import { faPlus as plus, faMinus as minus} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getCategories, addTodoCategory } from "@/modules/Data";
import {useEffect, useState} from "react";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";

export default function CategoryList(status) 
{
    const [categoryList, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");
    const [categoryText, setCategoryText] = useState(false);
    const { isLoaded, userId, getToken } = useAuth();
    const [loading, setLoading] = useState(true);


    useEffect(()=>{
        async function loadData() {
            const token = await getToken({template: "codehooks"});
            let categories = await getCategories(token, userId);
            setCategories(categories);
            setLoading(false);
        }
        loadData();
    }, [categoryList]);


    function toggleCategoryInput() {
        setCategoryText(!categoryText)
    }

    async function addCategory() {
        const newCategoryList = [newCategory, ...categoryList];
        setCategories(newCategoryList);
        let userCategory = {
            "userId": userId,
            "name": newCategory,
        }
        const token = await getToken({template: "codehooks"});
        if(!categoryList.includes(newCategory))
        {
            await addTodoCategory(token, userCategory);
        }
    }

    if(loading)
    {
        return (
            <span>loading....</span>
        )
    }

    return (
        <div className="categoriesList">
            <div className="pure-menu pure-menu-horizontal ">
                <ul className="pure-menu-list ">
                    <li className="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
                        <a href="#" id="menuLink1" className="pure-menu-link categoryDropDown">Categories</a>
                        <ul className="pure-menu-children dropdown">
                        {categoryList.length > 0 && (
                            <div className="pure-menu pure-menu-scrollable custom-restricted">
                                <ul className="pure-menu-list">
                                    {status.status === 'todos' && (
                                        <>
                                            <li className="pure-menu-item">
                                                <Link href="/todos" className="pure-menu-link">
                                                    <span className="categoryText">All</span>
                                                </Link>
                                            </li>
                                            <li className="pure-menu-item">
                                                <Link href="/todos/category?category=none" className="pure-menu-link">
                                                    <span className="categoryText">Not in Category</span>
                                                </Link>
                                            </li>
                                        </>
                                    )}
                                    {status.status === 'done' && (
                                        <>
                                            <li className="pure-menu-item">
                                                <Link href="/done" className="pure-menu-link">
                                                    <span className="categoryText">All</span>
                                                </Link>
                                            </li>
                                            <li className="pure-menu-item">
                                                <Link href="/done/category?category=none" className="pure-menu-link">
                                                    <span className="categoryText">Not in Category</span>
                                                </Link>
                                            </li>
                                        </>
                                    )}
                                    {categoryList.map(category => (
                                        <li className="pure-menu-item">
                                            <Category category={category} status={status.status}/>
                                        </li>
                                    ))}
                                </ul>
                            </div>)}
                            <li className="pure-menu-item categoryContainerLast">
                                <div className="addNewCategoryContainer">
                                    <div>
                                        <span className="categoryText">Add New Category</span>
                                        <button className="catToggleButton" onClick={toggleCategoryInput}>
                                            {categoryText && <FontAwesomeIcon icon={minus}/>}
                                            {!categoryText && <FontAwesomeIcon icon={plus}/>}
                                        </button>
                                    </div>
                                    {categoryText && (
                                        <div className="categoryTextInput">
                                            <input type="text" onChange={(e) => setNewCategory(e.target.value)}></input>
                                            <button onClick={addCategory}>Add Category</button>
                                        </div>
                                    )}
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    )
}