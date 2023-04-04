
/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import {app, Datastore} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'

app.post('/addUser', async (req, res) => {
    console.log("add")
    const db = await Datastore.open();

    const user = {
        items:[
            {
                text:"user2",
                done: false
            }
        ]
    }

    await db.set(req.query.user, JSON.stringify(user));
    res.status(201);

})

app.get('/getUser', async (req, res) => {
    const db = await Datastore.open();

    const userData = await db.get(req.query.user);
    res.json(userData)
})

app.post('/addTodoItem', async (req, res) => {
    const db = await Datastore.open();
    const bodyString = JSON.stringify(req.body)
    const bodyJSON = JSON.parse(bodyString);

    const userData = await db.get(bodyJSON.user)
    // let test2 = userData.items
    // let userDataString = JSON.stringify(test2);
    // let test = JSON.parse(userDataString);
    
    let userDataString = JSON.parse(userData);
    let test = userDataString.items
    test.push(({"test": "test2", "done": false}));

    await db.set('1', bodyJSON.item);

    //itemsArr.push({"test": "test2", "done": false})
    res.json(test);
})

// Use Crudlify to create a REST API for any collection
crudlify(app)

// bind to serverless runtime
export default app.init();
