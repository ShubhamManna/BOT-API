const express = require('express');
const router = express.Router();
const {Firestore} = require('@google-cloud/firestore');
const admin = require('firebase-admin');
const serviceAccount = require('./../ServiceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

//For Timezone
// var nDate = new Date().toLocaleString('en-US', {
//     timeZone: 'Asia/Calcutta'
//   });

// gettodo().then(result => {
//     console.log(result.body)
//     const obj = JSON.parse(result.body);
//     const todoData = {
//         timestamp: obj.timestamp,
//         date: obj.date,
//         message: obj.message
//     };
//     return db.collection('todo').doc
// })

router.get('/', (req, res) => {
    res.send('Data!!');
    // console.log(`${process.env.PORT}`);
});

router.get('/todo/', (req, res) => {
    db.collection('todo').orderBy('timestamp').get().then((querySnapshot) => {
        const todoList = [];
        querySnapshot.forEach((doc) => {
            todoList.push(doc.data());
        });
        res.send(todoList);
    });
});

router.get('/todo/:date', (req, res) => {
    db.collection('todo').where('date', '==', req.params.date).orderBy('timestamp').get().then((querySnapshot) => {
        const todoList = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            todoList.push(doc.data());
        });
        res.send(todoList);
    });
});

router.post('/todo/', (req, res) => {

    //for Error -->  return res.status(400).send("Error Occured")
    if(req.body.message == '') return res.status(400).send("Error Occured!!");
    const todo = {
        timestamp: Date.now(),
        date: req.body.date,
        message: req.body.message,
        checked: false
    }
    console.log(todo.date);

    db.collection("todo").add(todo).then(() => {
        db.collection('todo').where('date', '==', req.body.date).orderBy('timestamp').get().then((querySnapshot) => {
            const todoList = [];
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                todoList.push(doc.data());
            });
            console.log('Task Added Successfully!!');
            res.send(todoList);
        });
    });

    // res.send(todo);
})

router.put('/todo/:id', (req, res) => {
    const todoList = [];
    db.collection('todo').where('date', '==', req.body.date).orderBy('timestamp').get().then((querySnapshot) => {
        let temp = {};
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            temp = doc.data();
            temp.id = doc.id;
            todoList.push(temp);
        });
        // res.send(d);
        console.log(todoList.length);
        if(req.params.id > todoList.length) return res.status(400).send("Invalid ToDo ID Entered!!");
        const docId = todoList[req.params.id-1].id;

        db.collection('todo').doc(docId).update({
            checked: true
        })
        res.send("Task Completed Successfully!!");
    })
    .catch((error) => {
        console.log("Error getting ToDo: ", error);
    });
    
});

function dd_mm_yyyy() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        var today = dd + '-' + mm + '-' + yyyy;
        return today;
}

router.get('/:id', (req, res) => {
    res.send(req.params.id);
})

module.exports = router;