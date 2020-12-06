import "./Styles/App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Messages, UserHome, NotFound, Signup, Home } from "./Components";

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
                    <Route path="/home" exact>
                        <UserHome />
                    </Route>
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
