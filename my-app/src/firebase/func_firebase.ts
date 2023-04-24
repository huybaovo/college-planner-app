// Contain functions to be used in other components.
// may later splite into separate files for each
// CRUD method
import firebase from 'firebase/app'
import { db, auth, app } from './firebase';
import { Auth } from 'firebase/auth';
import {
    addDoc,
    collection,
    CollectionReference,
    deleteDoc,
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
    updateDoc,
    Timestamp,
    query,
    where
} from 'firebase/firestore';
import { Assignment, Course, toDo } from '../types';
import { er } from '@fullcalendar/core/internal-common';
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

/** TO DO functions */
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

export function removeToDo(db: Firestore, user: string, todo_id: string)
{
    const docRef: DocumentReference = doc(db, "accounts", user, "todos", todo_id)
    deleteDoc(docRef)
}
/** Deadlines */

export function addCourseFS(db: Firestore, user: string, courseName: string)
{
     // collection handling account documents
  const coursesRef: CollectionReference = collection(db, 'accounts', user, "courses");
  // document handling signing up user
  const existingCourse: DocumentReference = doc(coursesRef, courseName);
  // if user exists nothing will happen else create a new document for the account
  getDoc(existingCourse)
      .then((courseDoc: DocumentSnapshot) => {
      //handling duplicate
      if(courseDoc.exists()) {
          console.log("exists")

      }
      // create new account
      else
      {
          //initalize a document with unique uID
          setDoc(doc(db, "accounts", user, "courses", courseName), {}).then(() => {
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
}

export function addAssignmentFS(db: Firestore, user: string, courseName: String, assignment: Assignment)
{
    const courseRef = doc(db, "accounts", user, "courses", courseName);
    const assignmentsRef = collection(courseRef, "assignments");
    return addDoc(assignmentsRef, assignment).then((docRef) => {
        return docRef.id;
  });
}

export function getCourses(db: Firestore, user: string) {
    const courses: Course [] = []
    // const list: { id: string; task: any; date: any; }[] = []
    const todoRef: CollectionReference = collection(db, "accounts", user, "courses")
    return getDocs(todoRef).then((qs: QuerySnapshot) => {
        qs.forEach((qd: QueryDocumentSnapshot) => {
            courses.push({
                name: qd.id,
                assignments: [],
                newAssignment: {
                  name: '',
                  dueDate: ''
                }
              });
            console.log(qd.id)
            const courseRef = collection(db, "accounts", user, "courses", qd.id, "assignments") 
            getDocs(courseRef).then((assignment) => {
                assignment.forEach((ass) => {
                    const course = courses.find((c) => c.name === qd.id);
                    course?.assignments.push(ass.data() as Assignment)

                })
            })
        })
        return courses
    })
}

/**
 * Function to delete courses and all its assignement
 */
export async function deleteCourseFS(db: Firestore, user: string, courseName: string)
{
    const assignmentsRef: CollectionReference = collection(db, "accounts", user, "courses", courseName, "assignments");
    const assignmentsQuerySnapshot = await getDocs(assignmentsRef);

    // Delete all assignments
    await Promise.all(assignmentsQuerySnapshot.docs.map((doc: QueryDocumentSnapshot) => deleteDoc(doc.ref)));

    // Delete course document
    const coursesRef: DocumentReference = doc(db, "accounts", user, "courses", courseName);
    deleteDoc(coursesRef)    
}
/**
 * function to delete assignment in a course
 * @param db firebase auth
 * @param user userID
 * @param courseName course name
 * @param assignmentName assignment name
 */
export function deleteAssignmentFS(db: Firestore, user: string, courseName: string, assignmentName: string )
{
    const docRef: CollectionReference = collection(db, "accounts", user, "courses", courseName, "assignments")
    const assignmentQ = query(docRef, where("name", "==", assignmentName))
    getDocs(assignmentQ).then((qs: QuerySnapshot) => {
        qs.docs.forEach(async (qd: QueryDocumentSnapshot) => {
            const docToRemove = doc(docRef, qd.id);
            await deleteDoc(docToRemove)
        })
    })
}


/* Calendar Functions */
export function addToCalendar(db: Firestore, user: string, event: any) {
  const calendarRef: CollectionReference = collection(db, "accounts", user, "calendar");

  // Convert the start and end properties to Firestore timestamp fields
  const firestoreEvent = {
    ...event
  };
  
  return addDoc(calendarRef, firestoreEvent).then((docRef) => {
    return docRef.id;
  });
}

export function fetchCalendarEvents(db: Firestore, user: string) {
    const events: { title: string, start: Date, end: Date | undefined, allDay: boolean }[] = []
    const calendarRef: CollectionReference = collection(db, "accounts", user, "calendar")
  
    return getDocs(calendarRef).then((qs: QuerySnapshot) => {
      qs.forEach((qd: QueryDocumentSnapshot) => {
        const eventData = qd.data()
        console.log(eventData) // Debugging statement
        const start = new Date(eventData.start)
        console.log(start) // Debugging statement
        const end = eventData.end ? new Date(eventData.end) : undefined
        console.log(end) // Debugging statement
        events.push({
          title: eventData.title,
          start: start,
          end: end,
          allDay: eventData.allDay
        })
      })
  
      console.log(events) // Debugging statement
      return events
    })
  }
  