import "./Styles/App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Messages, UserHome, NotFound, Signup, Home } from "./Components";
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
                    <Route path="/messages" exact>
                        <Messages />
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
