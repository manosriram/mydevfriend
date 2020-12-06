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

const customDefaultStyles = {
    padding: "5px",
    margin: "5px"
};

function Navbar(props) {
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
                            <Pane
                                width={100}
                                height="auto"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                flexDirection="column"
                            >
                                <Menu>
                                    <Menu.Group>
                                        <Menu.Item>Profile</Menu.Item>
                                        <Menu.Item>Settings</Menu.Item>
                                    </Menu.Group>
                                    <Menu.Divider />
                                    <Menu.Group>
                                        <Menu.Item intent="danger">
                                            Logout
                                        </Menu.Item>
                                    </Menu.Group>
                                </Menu>
                            </Pane>
                        }
                    >
                        <Avatar
                            id="avatar"
                            float="right"
                            name={
                                props.user.firstName + " " + props.user.lastName
                            }
                            size={40}
                        />
                    </Popover>
                    <SearchInput
                        id="search"
                        float="right"
                        placeholder="Filter traits..."
                    />
                </TabNavigation>
            </Pane>
            {username}
        </div>
    );
}

export default Navbar;
