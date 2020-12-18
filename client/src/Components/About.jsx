import "../Styles/Messages.css";
import { Heading, Paragraph } from "evergreen-ui";
import yourImage from "../Assets/about-build.png";
import { Link } from "react-router-dom";

function About(props) {
    return (
        <div id="container">
            <img id="side-bg" src={yourImage} alt="" />
            <Heading className="head" size={100}>
                Codealone lets you meet and pair up with like minded developers.
            </Heading>
            <Heading size={100}>
                Find yourself a project-buddy, a dev friend, or even a
                co-founder for your upcoming startup.
            </Heading>
            <Heading size={100}></Heading>
            <Heading size={100}>
                <Link to="/">Home</Link>
            </Heading>
        </div>
    );
}

export default About;
