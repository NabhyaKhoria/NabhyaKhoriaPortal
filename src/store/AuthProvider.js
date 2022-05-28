import AuthContext from "./auth-context";
import { useState, useEffect, useContext } from "react";
import { auth } from "../firebase/firebase2";
import {
    updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const AuthProvider = (props) => {
  const [curUser, setCurUser] = useState({});
  const [userLoginState, setUserLoginState] = useState(false);
  const onLoginHandler = () => {
    setUserLoginState(true);
  };
  const onLogoutHandler = () => {};

  const authContext = {
    isLoggedIn: userLoginState,
    currentUser: curUser,
    onLogin: onLoginHandler,
    onLogout: onLogoutHandler,
    signUp: signUp,
    logIn: logIn,
    logOut: logOut,
    editProfile: editProfile,
  };
  function editProfile(photoURL, username) {
      console.log("Maybe works");

        updateProfile(auth.currentUser, {
            displayName: username, photoURL: photoURL
        });
  }
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function logIn(email, password) {
    console.log("AuthProvider.js login=",auth.currentUser);
    return signInWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
      return signOut(auth);
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
        console.log("1",currentuser);
        setCurUser(currentuser);
    });
    return () => {
        console.log("2");
        unsubscribe();
    }
}, []);

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};
export function useUserAuth() {
  return useContext(AuthContext);
}
export default AuthProvider;
