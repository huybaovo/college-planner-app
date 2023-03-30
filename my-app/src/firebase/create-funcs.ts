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
    Firestore,
    setDoc,
} from 'firebase/firestore';


export function addAccount(db: Firestore, uid: string, user: Auth) {
    const coll: CollectionReference = collection(db, "accounts");
    const account: DocumentReference = doc(coll, uid);
    setDoc(account, {id: user});
}

export function addCourse(db: Firestore, uid: string, user: Auth) {
    const coll: CollectionReference = collection(db, "accounts");
    const account: DocumentReference = doc(coll, uid);
    setDoc(account, {id: user});
}

export function addToDoList(db: Firestore, uid: string, user: Auth) {
    const coll: CollectionReference = collection(db, "accounts");
    const account: DocumentReference = doc(coll, uid);
    setDoc(account, {id: user});
}

// export function addMentor(db: Firestore, uid: string, user: Auth) {
//     const coll: CollectionReference = collection(db, "accounts");
//     const account: DocumentReference = doc(coll, uid);
//     setDoc(account, {id: user});
// }