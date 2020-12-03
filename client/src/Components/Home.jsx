import "../Styles/App.css";
import {
    LogInIcon,
    Button,
    TextInput,
    Heading,
    Pane,
    Text
} from "evergreen-ui";

function Home() {
    return (
        <div id="container">
            <Pane clearfix>
                <Pane
                    elevation={0}
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
                    <Heading size={900}>foundbug</Heading>
                    <Heading size={800}>
                        Find a Pair-Programming partner anywhere in this world!
                    </Heading>
                </Pane>
                <Pane
                    elevation={0}
                    float="left"
                    width="40vw"
                    height="40vh"
                    margin={24}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                >
                    <form action="" method="POST">
                        <TextInput
                            name="text-input-name"
                            placeholder="username"
                        />
                        <br />
                        <br />
                        <TextInput
                            name="text-input-name"
                            type="password"
                            placeholder="password"
                        />
                        <br />
                        <br />
                        <Button
                            name="login"
                            iconBefore={LogInIcon}
                            appearance="primary"
                            type="submit"
                        >
                            Login
                        </Button>
                        <hr />
                        <Button name="signup" intent="success">
                            Create an account
                        </Button>
                    </form>
                </Pane>
            </Pane>
        </div>
    );
}

export default Home;
