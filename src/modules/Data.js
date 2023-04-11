const BASEURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

//gets todoItems from db by username
export async function getTodoItems(authToken, userId) {
    const response = await fetch(`${BASEURL}/todos?userId=${userId}&status=${false}&sort=-createdOn`, {
        method: "GET",
        'headers': {'Authorization': 'Bearer ' + authToken}
    });
    return await response.json();
}

//gets done items from db by username
export async function getDoneTodoItems(authToken, userId) {
    const response = await fetch(`${BASEURL}/todos?userId=${userId}&status=${true}&sort=-createdOn`, {
        method: "GET",
        'headers': {'Authorization': 'Bearer ' + authToken}
    });
    return await response.json();
}

//add todoitem to db
export async function addTodoItem(authToken, todoItem) {
    const response = await fetch(`${BASEURL}/todos`, {
        method: "POST",
        headers: { 'Authorization': 'Bearer ' + authToken, "Content-Type": "application/json"},
        body: JSON.stringify(todoItem)
    });
    return await response;
}

//update a todo item, change it status, or modify its text
export async function updateTodoItem(authToken, todoId, updatedJson) {
    const response = await fetch(`${BASEURL}/updateTodoItem?_id=${todoId}`, {
        method: "PUT",
        headers: { 'Authorization': 'Bearer ' + authToken, "Content-Type": "application/json"},
        body: JSON.stringify(updatedJson)
    });
    return await response
}

//add username to db
export async function addUser(authToken, user) {
    const response = await fetch(`${BASEURL}/users`, {
        method: "POST",
        headers: { 'Authorization': 'Bearer ' + authToken, "Content-Type": "application/json"},
        body: JSON.stringify(user)
    });
    return await response;
}

//get single todo item by id
export async function getTodoItem(authToken, todoId) {
    const response = await fetch(`${BASEURL}/todos?_id=${todoId}`, {
        method: "GET",
        'headers': {'Authorization': 'Bearer ' + authToken}
    });
    return await response.json();
}