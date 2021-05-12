const express = require('express');
const router = express.Router();

const {Firestore} = require('@google-cloud/firestore');

// Create a new client
// const firestore = new Firestore();
// import "firebase/firestore";
// var firebase = require('firebase/app');
// const db = require('firebase/firestore');
// const firebaseConfig = {
//     apiKey: process.env.FIREBASE_API_KEY,
//     authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.FIREBASE_APP_ID
// };
  
//   // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();

// var admin = require("firebase-admin");

// var serviceAccount = require("path/to/serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });


const admin = require('firebase-admin');
const serviceAccount = require('./../ServiceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

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
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
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

/*
To test this GoTo Postman -> New Request -> enter localhost:3000/api/courses and select POST
Now Goto Body -> raw -> select JSON -> type {"name" : **** } and hit SEND
*/
// app.post('/api/courses', (req, res) => {

//     const { error } = validateCourse(req.body); //result.error
//     if(error) return res.status(400).send(error.details[0].message);

//     // if(req.body.name || req.body.name.length < 3) {
//     //     //400 Bad Request
//     //     res.status(400).send('Name is required and should be minimum 3 characters long!!');
//     //     return ;
//     // }
//     const course = {
//         id: courses.length + 1,
//         name: req.body.name //Enable Parsing of JSON objects
//     };
//     courses.push(course);
//     res.send(courses);
// })

router.post('/todo/', (req, res) => {
    //for Error -->  return res.status(400).send("Error Occured")
    if(req.body.message == '') return res.status(400).send("Error Occured!!");
    const todo = {
        timestamp: Date.now(),
        date: dd_mm_yyyy(),
        message: req.body.message,
        checked: false
    }

    db.collection("todo").add(todo);
    console.log('Task Added Successfully!!');
    res.send(todo);
})

router.put('/todo/:id', (req, res) => {
    const todoList = [];
    db.collection('todo').where('date', '==', '13-05-2021').orderBy('timestamp').get().then((querySnapshot) => {
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