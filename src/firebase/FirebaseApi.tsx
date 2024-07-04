import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "./firebase";
import { createUser, doesUserExist, getUser } from "../functions/zenCafeUsersApi";
import User from "../objects/User";
import { createContext, ReactNode, useEffect, useState } from "react";

interface Props {
    children?: ReactNode, // this allows us to pass in child elements
}

const singletonUser = new User("", "", "");

interface SingletonUserStateType {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
}

var singletonUserState: SingletonUserStateType = {
    user: singletonUser,
    setUser: () => { }, // Placeholder
};

export const SingletonUserContext = createContext(singletonUserState);

const FirebaseApi = ({ children }: Props) => { // We will wrap all components in the FirebaseApi component to ensure that the FirebaseAPI initalizes first! (This means that the onAuthStateChanged will run first I beleive)

    const [user, setUser] = useState<User>(singletonUser);

    singletonUserState = {
        user,
        setUser
    }

    useEffect(() => {

        auth.onAuthStateChanged(async (user) => {
            if (user) {

                const isUserInDataBase = await doesUserExist(user.uid);

                if (isUserInDataBase == null) {
                    throw new Error("isUserInDataBase must be a boolean value");
                }

                if (isUserInDataBase) {
                    // then create the local user object
                    const userFromDB = await getUser(user.uid);

                    if (userFromDB == null) {
                        throw new Error("userFromDB must not be null");
                    }

                    const { _id, legalName, username } = userFromDB;

                    setUser(new User(_id, legalName, username));

                } else {
                    // then add the user to the database

                    if (user.displayName == null) {
                        throw new Error("user.displayName must not be null");
                    }

                    const createdUserFromDB = await createUser(user.uid, user.displayName, user.displayName); // username will be the same as their legal name for now

                    if (createdUserFromDB == null) {
                        throw new Error("createdUserFromDB must not be null");
                    }

                    const { _id, legalName, username } = createdUserFromDB;

                    setUser(new User(_id, legalName, username));

                }

                console.log("logged in");
            } else {
                // reset the local user object
                console.log("not logged in/possible logged out");
                setUser(null as unknown as User);
            }
        });
    }, [])

    return (
        <>
            <SingletonUserContext.Provider value={singletonUserState}>
                {children}
            </SingletonUserContext.Provider>
        </>
    )
}

export async function signInWithGoogle() {
    try {
        await signInWithPopup(auth, googleProvider);
    } catch (error) {
        console.error(error);
    }
}

export async function logout() {
    try {
        await signOut(auth);
    } catch (error) {
        console.error(error);
    }
}

export default FirebaseApi