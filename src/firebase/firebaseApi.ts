import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "./firebase";

auth.onAuthStateChanged((user) => {
    if (user) {
        console.log("logged in");
    } else {
        console.log("not logged in");
    }
});

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