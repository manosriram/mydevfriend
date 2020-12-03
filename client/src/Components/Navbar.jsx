import "../Styles/Nav.css";
import { Pane, Text } from "evergreen-ui";

function Navbar() {
    return (
        <>
            <Pane
                height="5vh"
                width="100%"
                display="flex"
                alignItems="left"
                border="none"
            >
                <Text id="navtext" size={500} padding="10px">
                    Logo Here
                </Text>
            </Pane>
        </>
    );
}

export default Navbar;
