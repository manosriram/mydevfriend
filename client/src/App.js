import "./Styles/App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
    Navbar,
    About,
    Profile,
    Messages,
    UserHome,
    NotFound,
    Signup,
    Home
} from "./Components";
import { PrivateRoute } from "./PrivateRoute";

function App() {
    return (
        <>
            <Router>
                <Switch>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                    <Route path="/create" exact>
                        <Signup />
                    </Route>
                    <PrivateRoute path="/home" component={UserHome} />
                    <PrivateRoute path="/messages" component={Messages} />
                    <PrivateRoute path="/profile" component={Profile} />
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/">
                        <NotFound />
                    </Route>
                </Switch>
            </Router>
        </>
    );
}

export default App;
