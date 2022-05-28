import React from 'react';

const AuthContext = React.createContext({
    isLoggedIn: false,
    // currentUser: {},
    signUp: () => {},
    logIn: () => {},
    onLogin: () => {},
    onLogout: () => {},
});

export default AuthContext;