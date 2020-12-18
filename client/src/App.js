import React, { createContext, useEffect, useReducer, useContext } from "react";
import "./App.css";
import Navbar from "./components/headers/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import HomeScreen from "./components/screen/HomeScreen";
import ProfileScreen from "./components/screen/ProfileScreen";
import CreatePostScreen from "./components/screen/CreatePostScreen";
import SignupScreen from "./components/screen/SignupScreen";
import SinginScreen from "./components/screen/SinginScreen";
import { reducer, initial } from "./components/reducer/userReducer";
import EditProfileScreen from "./components/screen/EditProfileScreen";

export const UserContext = createContext();

function Routing(props) {
  const history = useHistory();
  const { dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    // console.log(typeof(user),user)
    if (user) {
      dispatch({ type: "USER", payload: user });
    } else {
      history.push("/signin");
    }
  }, [dispatch,history]);
  return (
    <Switch>
      <Route exact path="/" component={HomeScreen} />
      <Route exact path="/signin" component={SinginScreen} />
      <Route exact path="/signup" component={SignupScreen} />
      <Route exact path="/create" component={CreatePostScreen} />
      <Route exact path="/profile" component={ProfileScreen} />
      <Route exact path="/edit" component={EditProfileScreen} />

    </Switch>
  );
}

function App(props) {
  const [state, dispatch] = useReducer(reducer, initial);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Router>
        <Navbar />
        <Routing />
      </Router>
    </UserContext.Provider>
  );
}

export default App;
