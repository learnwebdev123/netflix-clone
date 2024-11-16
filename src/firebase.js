import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyBFOjemPSj1bWKk9h-bx-CzutqUGLzICVA",
  authDomain: "netflix-clone-abc04.firebaseapp.com",
  projectId: "netflix-clone-abc04",
  storageBucket: "netflix-clone-abc04.firebasestorage.app",
  messagingSenderId: "205885949797",
  appId: "1:205885949797:web:bb50ec9ff04e84487fc38c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid : user.uid,
            name,
            authProvider: "local",
            email
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/'), [1].split('-').join(" "));
    }
};

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/'), [1].split('-').join(" "));
    }
};

const logout = () => {
    signOut(auth);
};

export {auth, db, login, signup, logout};