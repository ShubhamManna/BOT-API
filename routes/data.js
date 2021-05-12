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
    db.collection('todo').get().then((querySnapshot) => {
        const d = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            d.push(doc.data());
        });
        res.send(d);
    });
});

router.get('/:id', (req, res) => {
    res.send(req.params.id);
})



module.exports = router;