import "../Styles/Nav.css";
import { Avatar, SearchInput, Pane, Text } from "evergreen-ui";

const customDefaultStyles = {
    padding: "5px",
    margin: "5px"
};

function Navbar() {
    return (
        <div style={customDefaultStyles}>
            <Pane height="5vh" width="100%" border="none">
                <Text id="navtext" size={500} padding="10px">
                    Logo Here
                </Text>
                <Text id="navtext" size={500} padding="10px">
                    Logo Here
                </Text>
                <Avatar id="avatar" float="right" name="Mano Sriram" size={40} />
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
