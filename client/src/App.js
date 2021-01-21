import "./Styles/App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import {
    Profile,
    FindUsers,
    Cookie,
    Navbar,
    About,
    Account,
    Messages,
    UserHome,
    NotFound,
    Signup,
    Home
} from "./Components";
import { PrivateRoute } from "./PrivateRoute";
const dotenv = require("dotenv");
dotenv.config();

export const appHistory = createBrowserHistory();
function App() {
    return (
        <>
            <Router history={appHistory}>
                <Switch>
                    <Route exact path="/" exact>
                        <Home />
                    </Route>
                    <Route exact path="/create" exact>
                        <Signup />
                    </Route>
                    <Route exact path="/user/:username" exact>
                        <>
                            <Navbar user={null} />
                            <Profile />
                        </>
                    </Route>
                    <PrivateRoute exact path="/home" component={UserHome} />
                    <PrivateRoute exact path="/messages" component={Messages} />
                    <PrivateRoute exact path="/account" component={Account} />
                    <PrivateRoute exact path="/find" component={FindUsers} />
                    <Route exact path="/about">
                        <About />
                    </Route>
                    <Route exact path="/cookie">
                        <Cookie />
                    </Route>
                    <Route exact path="/">
                        <NotFound />
                    </Route>
                </Switch>
            </Router>
        </>
    );
}

export default App;
