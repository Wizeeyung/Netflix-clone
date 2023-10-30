import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../Firebase";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth'
import {setDoc, doc, getDoc, collection, addDoc} from 'firebase/firestore'

const AuthContext = createContext()

//create a function that returns context provider with values 
export function AuthContextProvider({children}){

  //set the user state
  const [user, setUser] = useState({});

  //create a function to signup by returning createEmail and password
  function signUp(email, password){
    createUserWithEmailAndPassword(auth, email, password);
    setDoc(doc(db, 'users', email),{
      savedMovies: []
    })
  }

  function login(email, password){
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout(){
    return signOut(auth)
  }

  // used to check if the user is logged in or not
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
      setUser(currentUser)
    });

    return () =>{
      unsubscribe()
    }
  })


  return (
    <AuthContext.Provider value={{signUp, user, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export function UserAuth(){
  return useContext(AuthContext)
}