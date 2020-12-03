import "./Styles/App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home, Navbar } from "./Components";

function App() {
    return (
        <>
            <Router>
                <Switch>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                </Switch>
            </Router>
        </>
    );
}

export default App;
