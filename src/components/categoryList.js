import Category from "@/components/categoryItem";
import { faPlus as plus, faMinus as minus} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getCategories, addTodoCategory } from "@/modules/Data";
import {useEffect, useState} from "react";
import { useAuth } from "@clerk/nextjs";

export default function CategoryList() 
{
    const [categoryList, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");
    const [categoryText, setCategoryText] = useState(false);
    const { isLoaded, userId, getToken } = useAuth();
    // const [loading, setLoading] = useState(true);


    useEffect(()=>{
        async function loadData() {
                const token = await getToken({template: "codehooks"});
                let categories = await getCategories(token, userId);
                setCategories(categories)
        }
        loadData();
    });


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
        await addTodoCategory(token, userCategory)
    }

    return (
        <div className="categoriesList">
            <div className="pure-menu pure-menu-horizontal ">
                <ul className="pure-menu-list ">
                    <li className="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
                        <a href="#" id="menuLink1" className="pure-menu-link categoryDropDown">Categories</a>
                        <ul className="pure-menu-children dropdown">
                        {categoryList.length > 0 && (<div className="pure-menu pure-menu-scrollable custom-restricted testing">
                                <ul className="pure-menu-list">
                                    {categoryList.map(category => (
                                        <Category category={category}/>
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