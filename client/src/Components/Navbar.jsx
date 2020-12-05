import { useState } from "react";
import "../Styles/Nav.css";
import {
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
    const [selected, setSelected] = useState("");
    return (
        <div style={customDefaultStyles}>
            <Pane height="5vh" width="100%" border="none">
                <Text id="navtext" size={500} padding="10px">
                    Logo Here
                </Text>
                <Text id="navtext" size={500} padding="10px">
                    Logo Here
                </Text>
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
                                    <Menu.Item>Share...</Menu.Item>
                                    <Menu.Item>Move...</Menu.Item>
                                    <Menu.Item>Settings</Menu.Item>
                                </Menu.Group>
                                <Menu.Divider />
                                <Menu.Group>
                                    <Menu.Item intent="danger">
                                        Delete...
                                    </Menu.Item>
                                </Menu.Group>
                            </Menu>
                        </Pane>
                    }
                >
                    <Avatar
                        id="avatar"
                        float="right"
                        name={props.user.username}
                        size={40}
                    />
                </Popover>

                <SearchInput
                    float="right"
                    margin="5px"
                    placeholder="Search User"
                />
            </Pane>
        </div>
    );
}

export default Navbar;
