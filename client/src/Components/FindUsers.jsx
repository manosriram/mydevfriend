import { useState, useEffect } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import "../Styles/Find.css";
import { Spinner, SearchInput, Pane, Heading, Text } from "evergreen-ui";
import { Link } from "react-router-dom";
import moment from "moment";
require("dotenv").config();

function FindUsers(props) {
    const [currentPage, setCurrentPage] = useState(0);
    const [users, setUsers] = useState([]);
    const [matched, setMatched] = useState([]);
    const [spin, setSpin] = useState(false);
    const ADDR = process.env.ADDR;
    console.log(ADDR);

    const getFirstPage = () => {
        try {
            setSpin(true);
            const headers = {
                authorization: "Bearer " + Cookie.get("jtk")
            };
            const res = axios.post(
                `${process.env.REACT_APP_ADDR}/user/all`,
                { currentPage },
                { headers }
            );
            res.then(result => {
                setUsers(result.data.users);
                setMatched(result.data.users);
                setSpin(false);
            }).catch(err => {
                console.log(err);
            });
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getFirstPage();
    }, []);

    if (spin) {
        return (
            <Pane
                display="flex"
                alignItems="center"
                justifyContent="center"
                height={400}
            >
                <Spinner />
            </Pane>
        );
    }

    return (
        <div id="users-container" className="usersall">
            <SearchInput
                autocomplete="off"
                name="search"
                placeholder="Search User"
                height={40}
                onChange={e => {
                    setMatched(
                        users.filter(user =>
                            user.username
                                .toLowerCase()
                                .includes(e.target.value.toLowerCase())
                        )
                    );
                }}
            />
            {matched.map(user => {
                const url = `/user/${user.username}`;
                return (
                    <div>
                        <Heading size={100} id="user">
                            <Link to={url}>{user.username}</Link>
                            {"  "}
                        </Heading>
                        <Text>
                            joined{" "}
                            {moment(user.created).format("MMMM Do, YYYY")}
                        </Text>
                    </div>
                );
            })}
        </div>
    );
}

export default FindUsers;
