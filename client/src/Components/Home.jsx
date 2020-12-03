import "../Styles/App.css";
import { Heading, Pane, Text } from "evergreen-ui";

function Home() {
    return (
        <div id="container">
            <Pane clearfix>
              <Pane
                elevation={4}
                float="left"
                backgroundColor="white"
                width="40vw"
                height="40vh"
                margin={24}
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              >
                <Text>Elevation 0</Text>
                <Text size={300}>Flat Panes</Text>
              </Pane>
              <Pane
                elevation={4}
                float="left"
                width="40vw"
                height="40vh"
                margin={24}
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              >
                <Text>Elevation 1</Text>
                <Text size={300}>Floating Panes</Text>
              </Pane>
            </Pane>
        </div>
    );
}

export default Home;
