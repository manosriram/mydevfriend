import "../Styles/Messages.css";
import { Heading, Paragraph } from "evergreen-ui";
import yourImage from "../Assets/about-build.png";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

function About(props) {
    return (
        <div id="container">
            <Helmet>
                <meta charSet="utf-8" />
                <title>About - mydevfriend</title>
                <meta name="description" content="About Page - mydevfriend" />
                <link
                    rel="apple-touch-icon"
                    sizes="57x57"
                    href="./favicons/apple-icon-57x57.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="60x60"
                    href="./favicons/apple-icon-60x60.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="72x72"
                    href="./favicons/apple-icon-72x72.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="76x76"
                    href="./favicons/apple-icon-76x76.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="114x114"
                    href="./favicons/apple-icon-114x114.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="120x120"
                    href="./favicons/apple-icon-120x120.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="144x144"
                    href="./favicons/apple-icon-144x144.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="152x152"
                    href="./favicons/apple-icon-152x152.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="./favicons/apple-icon-180x180.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="192x192"
                    href="./favicons/android-icon-192x192.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="./favicons/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="96x96"
                    href="./favicons/favicon-96x96.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="./favicons/favicon-16x16.png"
                />
                <link rel="manifest" href="./favicons/manifest.json" />
                <meta name="msapplication-TileColor" content="#ffffff" />
                <meta
                    name="msapplication-TileImage"
                    content="./favicons/ms-icon-144x144.png"
                />
            </Helmet>

            <img id="side-bg" src={yourImage} alt="" />
            <Heading className="head" size={100}>
                <span id="title">mydevfriend</span>
                {"  "} lets you meet and pair up with like minded developers.
            </Heading>
            <Heading size={100} id="about-description">
                Find yourself a project-buddy, a dev friend, or even a
                co-founder for your upcoming startup.
            </Heading>
            <Heading size={100}></Heading>
            <Heading size={500}>
                <Link to="/">Home</Link>
            </Heading>
        </div>
    );
}

export default About;
