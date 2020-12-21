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

export const appHistory = createBrowserHistory();
function App() {
    return (
        <>
            <Router history={appHistory}>
                <Switch>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                    <Route path="/create" exact>
                        <Signup />
                    </Route>
                    <Route path="/user/:username" exact>
                        <>
                            <Navbar user={null} />
                            <Profile />
                        </>
                    </Route>
                    <PrivateRoute path="/home" component={UserHome} />
                    <PrivateRoute path="/messages" component={Messages} />
                    <PrivateRoute path="/account" component={Account} />
                    <PrivateRoute path="/find" component={FindUsers} />
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/cookie">
                        <Cookie />
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
