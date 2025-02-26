/*
//PICK-Pick allows you to create a new type by selecting
// a set of properties (Keys) from an existing type (Type).
interface User {
    id?: string;
    name: string;
    age: number;
    email?: string;
    password?: string;
}

function sumOfAge(user1: User, user2: User) {
    return user1.age + user2.age;
}

const age = sumOfAge({name: 'Ram', age: 20}, {name: 'Arjun', age: 30});

console.log(age);


type updateProps = Pick<User, 'name' | 'age' | 'email'>

function updateUser(updatedProps: updateProps) {
    //db hit
}

//Partial-Partial makes all properties of a type optional,
// creating a type with the same properties, but each marked as optional.
type UpdatedPropsOptional = Partial<updateProps>

function updateUser2(updatedProps: UpdatedPropsOptional) {
    //hit the db
}

//READONLY-Readonly
// When you have a configuration object that should not be altered after initialization,
// making it Readonly ensures its properties cannot be changed.
interface Config {
    readonly endpoint: string;
    readonly apikey: string;
}
const config:Readonly<Config>={
    endpoint:"https://api.google.com",
    apikey:"qwertyuiop0987654321"
};
// config.apiKey = 'newkey';
// Error: Cannot assign to 'apiKey' because it is a read-only property.

//RECORD-Record let’s you give a cleaner type to objects
interface User2 {
    id: string;
    name: string;
}

type Users = Record<string, User2>;

const users: Users = {
    'abc123': { id: 'abc123', name: 'John Doe' },
    'xyz789': { id: 'xyz789', name: 'Jane Doe' },
};

console.log(users['abc123']); // Output: { id: 'abc123', name: 'John Doe' }

//EXCLUDE-In a function that can accept several types of inputs but you
// want to exclude specific types from being passed to it.
type Event1 = 'click' | 'scroll' | 'mousemove';
type ExcludeEvent = Exclude<Event1, 'scroll'>; // 'click' | 'mousemove'

const handleEvent = (event: ExcludeEvent) => {
    console.log(`Handling event: ${event}`);
};

handleEvent('click'); // OK*/

//TYPE INFERENCE IN ZOD

import { z } from 'zod';
import express from "express";

const app = express();

// Define the schema for profile update
const userProfileSchema = z.object({
    name: z.string().min(1, { message: "Name cannot be empty" }),
    email: z.string().email({ message: "Invalid email format" }),
    age: z.number().min(18, { message: "You must be at least 18 years old" }).optional(),
});

type FinalUserSchema = z.infer<typeof userProfileSchema>;

app.put("/user", (req, res) => {
    const { success } = userProfileSchema.safeParse(req.body);
    const updateBody:FinalUserSchema = req.body; // how to assign a type to updateBody?

    if (!success) {
        res.status(411).json({});
        return
    }
    // update database here
    res.json({
        message: "User updated"
    })
});

app.listen(3000);