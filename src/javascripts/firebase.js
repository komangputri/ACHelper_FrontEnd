import * as firebase from 'firebase'
let database;

export const init = () => {
    let config = {
        apiKey: "AIzaSyBh-7Rj5bVPWyM7ZDP3AlxkXAgPXF4u7rI",
        authDomain: "achelper-f04aa.firebaseapp.com",
        databaseURL: "https://achelper-f04aa.firebaseio.com",
        projectId: "achelper-f04aa",
        storageBucket: "achelper-f04aa.appspot.com",
        messagingSenderId: "1035926347548"
    };
    firebase.initializeApp(config);
    database = firebase.database()
};
export const getUser = (token) => {
    return database.ref(`users`).orderByChild('verifyToken').equalTo(token).once('value');
};