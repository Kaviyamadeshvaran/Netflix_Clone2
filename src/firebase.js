import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword,
    getAuth, 
    signInWithEmailAndPassword, 
    signOut} from "firebase/auth";
import { 
    addDoc, 
    collection,
    getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCm17p5S894sJZhol3nS-Uf3axtmG2qQtM",
  authDomain: "netflix-clone-b4f05.firebaseapp.com",
  projectId: "netflix-clone-b4f05",
  storageBucket: "netflix-clone-b4f05.appspot.com",
  messagingSenderId: "170406823395",
  appId: "1:170406823395:web:d86b1d1da8d2718f564cd6"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try{
         const res = await createUserWithEmailAndPassword(auth, email, password);
         const user = res.user;
         await addDoc(collection(db,"user"),{
            uid: user.uid,
            name,
            authProvider: "local",
            email,
         });   

    } catch (error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));

    }

}

const login = async (email, password)=>{
    try{

       await signInWithEmailAndPassword(auth,email,password);
    }catch (error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));

    }

}
const logout = ()=>{
    signOut(auth);
}
export {auth, db, login, signup, logout};