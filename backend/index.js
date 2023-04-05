
/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import {app, Datastore} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'

app.post('/user', addUser);

async function addUser(req, res) {
    const db = await Datastore.open()
    await db.insertOne('user', req.body);  
    res.status(201)
}
app.get('/user', getUser);

async function getUser(req, res) {
    const db = await Datastore.open()
    const id = req.query.id;
    const data = await db.getOne('user', String(id));  
    res.json(data);
}

app.post('/todo', addTodoItem);

async function addTodoItem(req, res) {
    const db = await Datastore.open()
    await db.insertOne('todo', req.body);
    let test = JSON.stringify(req.body); 
    res.json(test);
}

app.get('/todoCount,', countTodoItems);

async function countTodoItems(req, res) {
    const db = await Datastore.open();
    let count = await db.getMany('todo')
    res.json(count);
}

app.get('/todo', getTodoItems);

async function getTodoItems(req, res) {
    const db = await Datastore.open();
    const query = {'userId': req.query.id}
    let todoItems = await db.getArray('todo', {filter: query});
    if(todoItems.length === 0)
    {
        res.json({"empty": true}); 
    }
    else {
        res.json(todoItems)
    }
}

app.delete('/clearTodo', clearTodoList) 

async function clearTodoList(req, res){
    {
        const db = await Datastore.open();
        await db.removeMany('todo');
        res.json(201);
    }
}

app.get('/test', (req, res) => {
    res.json({"test": "test"})
})

import { date, object, string } from 'yup';
// const flashCardYup = object({
//     front: string().required(),
//     back: string().required(),
//     category: string().required(),
//     createdOn: date().default(() => new Date()),
// })
// crudlify(app, {flashCard: flashCardYup})

const todoItemYup = object({
    userId: string().required(),
    text: string().required(),
    category: string().required(),
    createdOn: date().default(() => new Date()),
})

const userYup = object({
    username: string().required()
})

// crudlify(app, {todos: todoItemYup, users: userYup})
crudlify(app, {users: userYup})

// Use Crudlify to create a REST API for any collection
//crudlify(app)

// bind to serverless runtime
export default app.init();
