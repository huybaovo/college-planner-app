// Contain functions to be used in other components.
// may later splite into separate files for each
// CRUD method
import { db, auth } from './firebase';
import { Auth } from 'firebase/auth';
import {
    addDoc,
    collection,
    CollectionReference,
    doc,
    DocumentData,
    DocumentReference,
    DocumentSnapshot,
    Firestore,
    getDoc,
    setDoc,
} from 'firebase/firestore';
import { toDo } from '../types';

// initialize user with account, add ToDO collection, and other collection
// function exported to home.vue to handle adding the user's unique id to a
// document when signing up to help with tracking the accounts game history.
export function createAccount( db: Firestore, user: string ) {
    // collection handling account documents
    const accounts: CollectionReference = collection(db, 'accounts');
    // document handling signing up user
    const existingUser: DocumentReference = doc(accounts, user);
    // if user exists nothing will happen else create a new document for the account
    getDoc(existingUser)
        .then((accountDoc: DocumentSnapshot) => {
        // if not a duplicate
        if(!accountDoc.exists()) {
            //initalize a document with unique uID
            setDoc(doc(db, "accounts", user), {}).then(() => {
                console.log('doc created')
            });
        }
    });
};

export function addCourse(db: Firestore, uid: string, user: Auth) {
    const coll: CollectionReference = collection(db, "accounts");
    const account: DocumentReference = doc(coll, uid);
    setDoc(account, {id: user});
}

// export function addToDoList(db: Firestore, uid: string, user: Auth) {
//     const coll: CollectionReference = collection(db, "accounts");
//     const account: DocumentReference = doc(coll, uid);
//     setDoc(account, {id: user});
// }

export function addToDo(db: Firestore, user: string,  task: toDo)
{
    const colRef: CollectionReference = collection(db, "account", user, "todos")
    addDoc(colRef, {todo : task})
}

// export function addMentor(db: Firestore, uid: string, user: Auth) {
//     const coll: CollectionReference = collection(db, "accounts");
//     const account: DocumentReference = doc(coll, uid);
//     setDoc(account, {id: user});
// }