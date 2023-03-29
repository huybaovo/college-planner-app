// temporary data types to be exported, may change later depending what is needed
export type Course = {
    //requirements will be a subcollection likely
    name: String;
    days: string [];
    buidling: string;
    duration: number;
    department: string;
}
export type user = {
    username: String;
    email: String;
    university: String;
}
export type assignment = {
    name: String;
    due_date: String;
}
