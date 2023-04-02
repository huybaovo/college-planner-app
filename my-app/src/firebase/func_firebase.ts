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
    getDocs,
    QueryDocumentSnapshot,
    QuerySnapshot,
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
      //handling duplicate
      if(accountDoc.exists()) {
          console.log("exists")

      }
      // create new account
      else
      {
          //initalize a document with unique uID
          setDoc(doc(db, "accounts", user), {}).then(() => {
              console.log('doc created')
          })
              .catch((e) => {
                  console.log(e)
              });
          
      }
      })
      .catch((e) => {
          console.log(e);
    })
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
    const todoRef: CollectionReference = collection(db, "accounts", user, "todos")
    return addDoc(todoRef, task ).then((docRef) => {
        return docRef.id
    })
}

export function getTodos(db: Firestore, user: string)
{
    const list: { id: string; task: any; date: any; }[] = []
    const todoRef: CollectionReference = collection(db, "accounts", user, "todos")
    return getDocs(todoRef).then((qs: QuerySnapshot) => {
        qs.forEach((qd: QueryDocumentSnapshot) => {
            list.push({id: qd.id, task: qd.data().task, date: qd.data().date})
        })
        return list
    })
}

// export function addMentor(db: Firestore, uid: string, user: Auth) {
//     const coll: CollectionReference = collection(db, "accounts");
//     const account: DocumentReference = doc(coll, uid);
//     setDoc(account, {id: user});
// }