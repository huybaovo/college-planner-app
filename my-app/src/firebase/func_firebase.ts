// Contain functions to be used in other components.
// may later splite into separate files for each
// CRUD method
import {
    addDoc,
    collection,
    CollectionReference,
    deleteDoc,
    doc,
    DocumentReference,
    DocumentSnapshot,
    Firestore,
    getDoc,
    getDocs,
    QueryDocumentSnapshot,
    QuerySnapshot,
    setDoc,
    query,
    where
} from 'firebase/firestore';
import { Assignment, Course, toDo } from '../types';

/**
 * Function to create an account document in "accounts" collection for users
 */
export function createAccount(db: Firestore, user: string) {
    // collection handling account documents
    const accounts: CollectionReference = collection(db, 'accounts');
    // document handling signing up user
    const existingUser: DocumentReference = doc(accounts, user);
    // if user exists nothing will happen else create a new document for the account
    getDoc(existingUser)
        .then((accountDoc: DocumentSnapshot) => {
            //handling duplicate
            if (accountDoc.exists()) {
                //none
            }
            // if new user, create new account document in firestore
            else {
                //initalize a document with unique uID
                setDoc(doc(db, "accounts", user), {}).then(() => {
                })
                    .catch((e) => {
                    });

            }
        })
        .catch((e) => {
            console.log(e);
        })
};

/**
 * Function to add new todo to Firestore
 */
export function addToDo(db: Firestore, user: string, task: toDo) {
    // references to "todos" collection
    const todoRef: CollectionReference = collection(db, "accounts", user, "todos")
    //adding new todo and returning the id
    return addDoc(todoRef, task).then((docRef) => {
        return docRef.id
    })
}
/**
 * Function to get todos from firestore
 */
export function getTodos(db: Firestore, user: string) {
    // will holds all the todos
    const list: { id: string; task: any; date: any; }[] = []
    // references to todos collection
    const todoRef: CollectionReference = collection(db, "accounts", user, "todos")
    // getting all todos and adding it to list
    return getDocs(todoRef).then((qs: QuerySnapshot) => {
        qs.forEach((qd: QueryDocumentSnapshot) => {
            list.push({ id: qd.id, task: qd.data().task, date: qd.data().date })
        })
        return list
    })
}
/**
 * Function to remove ToDO
 */
export function removeToDo(db: Firestore, user: string, todo_id: string) {
    //document reference using the id
    const docRef: DocumentReference = doc(db, "accounts", user, "todos", todo_id)
    //deletion
    deleteDoc(docRef)
}

/** Deadlines */

/**
 * Function to add course 
 */
export function addCourseFS(db: Firestore, user: string, courseName: string) {
    // collection reference to "courses" under a private user
    const coursesRef: CollectionReference = collection(db, 'accounts', user, "courses");
    // used to check if course exists already
    const existingCourse: DocumentReference = doc(coursesRef, courseName);
    // if course exists nothing will happen else create a new document for the course
    getDoc(existingCourse)
        .then((courseDoc: DocumentSnapshot) => {
            //handling duplicate
            if (courseDoc.exists()) {
                console.log("exists")
            }
            // create new document
            else {
                //initalize a document with unique uID
                setDoc(doc(db, "accounts", user, "courses", courseName), {}).then(() => {
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
/**
 * Function to add assignment to a course
 */
export function addAssignmentFS(db: Firestore, user: string, courseName: string, assignment: Assignment) {
    // doc reference to a particular course
    const courseRef = doc(db, "accounts", user, "courses", courseName);
    // collection ref to "assignments" in course
    const assignmentsRef = collection(courseRef, "assignments");
    // storing assignment to a course
    return addDoc(assignmentsRef, assignment).then((docRef) => {
        return docRef.id;
    });
}
/**
 * Function to get a course and the assignments
 */
export async function getCourses(db: Firestore, user: string) {
    // will holds Courses
    const courses: Course[] = [];
    // courses collection ref
    const courseRef: CollectionReference = collection(db, 'accounts', user, 'courses');
    // gettings all documents in the courses collection
    const qs: QuerySnapshot = await getDocs(courseRef);
    // mapping each document
    const promises = qs.docs.map(async (qd: QueryDocumentSnapshot) => {
        const course: Course = {
            name: qd.id,
            assignments: [],
            newAssignment: {
                name: '',
                dueDate: '',
            },
        };
        //add a course with the name to courses array
        courses.push(course);
        const courseRef = collection(db, 'accounts', user, 'courses', qd.id, 'assignments');
        const assignmentsSnapshot = await getDocs(courseRef);
        assignmentsSnapshot.forEach((assign) => {
            // add every assignment in a particular course in firestore to corresponding course in the array
            course.assignments.push(assign.data() as Assignment);
        });
    });
    //wait for all promises to end
    await Promise.all(promises);
    return courses;
}

/**
 * Function to delete courses and all its assignement
 */
export async function deleteCourseFS(db: Firestore, user: string, courseName: string) {
    // reference to assignment collection for a particular course
    const assignmentsRef: CollectionReference = collection(db, "accounts", user, "courses", courseName, "assignments");
    // getting all documents from course
    const assignmentsQuerySnapshot = await getDocs(assignmentsRef);
    // Delete all assignment doc
    await Promise.all(assignmentsQuerySnapshot.docs.map((doc: QueryDocumentSnapshot) => deleteDoc(doc.ref)));
    // doc reference to course
    const coursesRef: DocumentReference = doc(db, "accounts", user, "courses", courseName);
    // course deletion
    deleteDoc(coursesRef)
}
/**
 * function to delete assignment in a course
 */
export function deleteAssignmentFS(db: Firestore, user: string, courseName: string, assignmentName: string) {
    // reference to assignments collection
    const docRef: CollectionReference = collection(db, "accounts", user, "courses", courseName, "assignments")
    // matching assignments by name
    const assignmentQ = query(docRef, where("name", "==", assignmentName))
    // getting the assignment
    getDocs(assignmentQ).then((qs: QuerySnapshot) => {
        //deleting the assignment, will delete other assignments with same name
        qs.docs.forEach(async (qd: QueryDocumentSnapshot) => {
            const docToRemove = doc(docRef, qd.id);
            await deleteDoc(docToRemove)
        })
    })
}
/* Calendar Functions */

// function to handle adding new events to calendar collection
export function addToCalendar(db: Firestore, user: string, event: any) {
    const calendarRef: CollectionReference = collection(db, "accounts", user, "calendar");

    // Convert the start and end properties to Firestore timestamp fields
    const firestoreEvent = {
        ...event,
        start: event.start.toISOString(),
        end: event.end?.toISOString()
    };
    // add doc to database containing event object parameters
    return addDoc(calendarRef, firestoreEvent).then((docRef) => {
        return docRef.id;
    });
}

// function to fetch data from calendar collection containing various events
export function fetchCalendarEvents(db: Firestore, user: string) {
    // initialize event object list to be returned
    const events: {
        title: string,
        start: Date, end: Date | undefined, allDay: boolean
    }[] = []
    // reference to calendar collection for user
    const calendarRef: CollectionReference = collection(db, "accounts", user, "calendar")
    // return back a promise containing event objects
    return getDocs(calendarRef).then((qs: QuerySnapshot) => {
        qs.forEach((qd: QueryDocumentSnapshot) => {
            // parse each documents into correct format for event object before adding to array
            const eventData = qd.data()
            const start = new Date(eventData.start)
            const end = eventData.end ? new Date(eventData.end) : undefined
            events.push({
                title: eventData.title,
                start: start,
                end: end,
                allDay: eventData.allDay
            })
        })
        return events
    })
}

// function to delete event data from calendar collection from the calendar view
export function deleteCalendarEvent(db: Firestore, user: string, event_id: string, start: any) {
    // get reference of calendar and query for the event to be deleted
    const calendarRef: CollectionReference = collection(db, "accounts", user, "calendar")
    const eventQ = query(calendarRef,
        where("title", "==", event_id),
        where("start", "==", start.toISOString()))
    // fetch the specific doc with the associated event to be deleted and delete the doc
    getDocs(eventQ).then((qs: QuerySnapshot) => {
        qs.docs.forEach(async (qd: QueryDocumentSnapshot) => {
            const docToRemove = doc(calendarRef, qd.id)
            await deleteDoc(docToRemove)
        })
    })
}