import { useState } from "react";
import "../Styles/Nav.css";
import {
    TextInput,
    TabNavigation,
    Tab,
    Icon,
    SearchIcon,
    Menu,
    Button,
    SelectMenu,
    Heading,
    Popover,
    Avatar,
    SearchInput,
    Pane,
    Text
} from "evergreen-ui";
import { useEffect } from "react";
import Cookie from "js-cookie";
import { withRouter } from "react-router-dom";

const customDefaultStyles = {
    padding: "5px",
    margin: "5px"
};

function Navbar(props) {
    useEffect(() => {
        console.log(props);
    }, []);

    const handleLogout = () => {
        Cookie.remove("jtk");
        props.history.push("/");
    };

    const [username, setUsername] = useState("");
    return (
        <div style={customDefaultStyles}>
            <Pane height="5vh" width="100%" border="none">
                <TabNavigation>
                    <Tab key="foundbug" is="a" href="/" id="foundbug">
                        <h2>foundbug</h2>
                    </Tab>

                    <Tab key="messages" is="a" href="/messages" id="/messages">
                        <h2>messages</h2>
                    </Tab>

                    <Popover
                        content={
                            <Menu>
                                <Menu.Group>
                                    <Menu.Item
                                        onClick={() =>
                                            props.history.push("/profile")
                                        }
                                    >
                                        Profile
                                    </Menu.Item>
                                    <Menu.Item>Settings</Menu.Item>
                                </Menu.Group>
                                <Menu.Divider />
                                <Menu.Group>
                                    <Menu.Item
                                        intent="danger"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </Menu.Item>
                                </Menu.Group>
                            </Menu>
                        }
                    >
                        <Avatar
                            id="avatar"
                            float="right"
                            name={props.user.username}
                            size={40}
                        />
                    </Popover>
                </TabNavigation>
            </Pane>
            {username}
        </div>
    );
}

export default withRouter(Navbar);
