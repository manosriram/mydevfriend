import { Helmet } from "react-helmet";
import "./Styles/App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import {
    Reset,
    Forgot,
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
            <Helmet>
                <meta charSet="utf-8" />
                <title>mydevfriend</title>
                <meta
                    name="description"
                    content="Find a pair-programming partner"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="57x57"
                    href="./favicons/apple-icon-57x57.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="60x60"
                    href="./favicons/apple-icon-60x60.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="72x72"
                    href="./favicons/apple-icon-72x72.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="76x76"
                    href="./favicons/apple-icon-76x76.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="114x114"
                    href="./favicons/apple-icon-114x114.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="120x120"
                    href="./favicons/apple-icon-120x120.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="144x144"
                    href="./favicons/apple-icon-144x144.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="152x152"
                    href="./favicons/apple-icon-152x152.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="./favicons/apple-icon-180x180.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="192x192"
                    href="./favicons/android-icon-192x192.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="./favicons/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="96x96"
                    href="./favicons/favicon-96x96.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="./favicons/favicon-16x16.png"
                />
                <link rel="manifest" href="./favicons/manifest.json" />
                <meta name="msapplication-TileColor" content="#ffffff" />
                <meta
                    name="msapplication-TileImage"
                    content="./favicons/ms-icon-144x144.png"
                />
            </Helmet>
            <Router history={appHistory}>
                <Switch>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                    <Route path="/create" exact>
                        <Signup />
                    </Route>
                    <Route path="/forgot/:token" exact>
                        <>
                            <Navbar user={null} />
                            <Reset />
                        </>
                    </Route>
                    <Route path="/forgot" exact>
                        <>
                            <Navbar user={null} />
                            <Forgot />
                        </>
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
                        <>
                            <Navbar user={null} />
                            <About />
                        </>
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
