import "./App.css";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { useState, useContext } from "react";
import { RegistrationForm } from "./components/Register/RegistrationForm";
import { LoginForm } from "./components/Login/LoginForm";
import AuthProvider, { useUserAuth } from "./store/AuthProvider";
import AuthContext from "./store/auth-context";
import { Logout } from "./components/Logout/Logout";
import { Edit } from "./components/Edit/Edit";
import { EditForm } from "./components/Edit/EditForm";
import { auth } from "./firebase/firebase2";

function App() {
  const {logOut} = useUserAuth();
  const [registerOpen, setRegisterOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const authCtx = useContext(AuthContext);
  const onRegisterButtonClickHandler = () => {
    setLoginOpen(false);
    setRegisterOpen(true);
  };
  const onLoginButtonClickHandler = () => {
    setRegisterOpen(false);
    setLoginOpen(true);
  };
  const onLoginHandler = () => {
    setLoginOpen(false);
    setRegisterOpen(false);
    authCtx.isLoggedIn = true;
    console.log("IDHAR=",auth.currentUser);
  };
  const onRegHandler = () => {
    setLoginOpen(true);
    setRegisterOpen(false);
    authCtx.isLoggedIn = false;
  };
  const onEditHandler = () => {
    setEditOpen(false);  
    document.getElementById("home-section").style.display = "block";
  };
  const onLogoutButtonClickHandler = async () => {
    setLoginOpen(false);
    setRegisterOpen(false);
    setEditOpen(false);
    try{
      await logOut();
    } catch(err){
      console.log(err.message);
    };

    authCtx.isLoggedIn = false;
    window.location.reload();
  };
  const onEditButtonClickHandler = () => {
    document.getElementById("home-section").style.display = "none";
    setEditOpen(true);
  };
  return (
    <div className="App">
      <AuthProvider>
        {!authCtx.isLoggedIn && (
          <header className="App-header">
            <Login onLoginButtonClick={onLoginButtonClickHandler}></Login>
            <Register
              onRegisterButtonClick={onRegisterButtonClickHandler}
            ></Register>
          </header>
        )}
        {authCtx.isLoggedIn && (
          <header className="App-header">
            <Edit onEditButtonClick={onEditButtonClickHandler}></Edit>
            <Logout onLogoutButtonClick={onLogoutButtonClickHandler}></Logout>
          </header>
        )}
        <section className="form-section">
          {loginOpen && <LoginForm onLogin={onLoginHandler} />}
          {registerOpen && <RegistrationForm onReg={onRegHandler} />}
          {editOpen && <EditForm onEdit={onEditHandler} />}
        </section>
        {authCtx.isLoggedIn && (
          <section className="home-section" id="home-section" >
            {auth.currentUser.photoURL && <><img class="profile-photo" src={auth.currentUser.photoURL} alt=""></img><br></br></>}
            {!auth.currentUser.photoURL && <><img class="profile-photo" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt=""></img><br></br></>}
            <iframe
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FIITKgp&tabs=timeline&width=3000&height=1000&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
              style={{ border: "none", overflow: "hidden", height: "500" }}
              width="500"
              height="500"
              scrolling="no"
              frameborder="0"
              allowfullscreen="true"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              title="iframe"
            ></iframe>
          </section>
        )}
      </AuthProvider>
    </div>
  );
}

export default App;
