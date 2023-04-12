
/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import {app, Datastore} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'
import { date, object, string, boolean } from 'yup';

const todoItemYup = object({
    userId: string().required(),
    text: string().required(),
    category: string().required(),
    createdOn: date().default(() => new Date()),
    status: boolean().default(false)
})

const userYup = object({
    username: string().required()
})

app.put('/updateTodoItem', changeStatus)

const categoryYup = object({
    userId: string().required(),
    name: string().required(),
})

async function changeStatus(req, res) {
    const db = await Datastore.open();
    const data = await db.updateOne('todos', req.query._id, req.body);
    res.json(data);
}

// Use Crudlify to create a REST API for any collection
crudlify(app, {users: userYup, todos: todoItemYup, categories: categoryYup})

// bind to serverless runtime
export default app.init();
