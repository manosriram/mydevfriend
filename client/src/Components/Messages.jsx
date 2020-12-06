import { withRouter } from "react-router-dom";
import { Navbar } from "./";
import { useState, useEffect } from "react";
import getUser from "../getUser";

function Messages(props) {
    const [user, setUser] = useState({});

    useEffect(() => {
        getUser().then(res => setUser(res));
    }, []);

    return (
        <>
            <Navbar user={user} />
            <h3>Messages for {user.username}</h3>
        </>
    );
}

export default withRouter(Messages);
