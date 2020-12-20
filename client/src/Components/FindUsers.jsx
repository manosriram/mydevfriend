import { useState, useEffect } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import "../Styles/Find.css";
import { Pane, Heading, Text } from "evergreen-ui";
import {Link } from "react-router-dom";

function FindUsers(props) {
    const [currentPage, setCurrentPage] = useState(0);
    const [users, setUsers] = useState([]);

    const getFirstPage = () => {
        const headers = {
            authorization: "Bearer " + Cookie.get("jtk")
        };
        const res = axios.post("/user/all", { currentPage }, { headers });
        res.then(result => {
            setUsers(result.data.users);
        }).catch(err => {
            console.log(err);
        });
    };

    useEffect(() => {
        getFirstPage();
    }, []);

    return (
        <div id="users-container" className="usersall">
            {users.map(user => {
                const url = `/user/${user.username}`;
                return (
                    <div>
                        <Heading size={100} id="user">
                            <Link to={url}>{user.username}</Link>
                        </Heading>
                    </div>
                )
            })}
        </div>
    );
}

export default FindUsers;
