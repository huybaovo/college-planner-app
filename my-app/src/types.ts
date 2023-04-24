
export type user = {
    username: String;
    email: String;
    university: String;
}

export type toDo = {
    date: String;
    task: String;
}


export type Assignment = {
    name: string,
    dueDate: string
  }
  
export type Course = {
    name: string,
    assignments: Assignment[],
    newAssignment: {
      name: string,
      dueDate: string
    }
  }

export type Event = {
    id: string,
    title: string,
    start: Date,
    end: Date,
    allDays: boolean
}