import React, { useState } from "react";
import { Form, Formik } from "formik";
import {
    CrossIcon,
    Badge,
    Pane,
    Autocomplete,
    Heading,
    toaster,
    Text,
    AddIcon,
    Select,
    Button,
    Textarea,
    TextInput
} from "evergreen-ui";
import "../Styles/App.css";
import { withRouter, NavLink } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";

const forbiddenToast = { id: "forbidden-action" };
const languages = [
    "A# .NET",
    "A# (Axiom)",
    "A-0 System",
    "A+",
    "A++",
    "ABAP",
    "ABC",
    "ABC ALGOL",
    "ABLE",
    "ABSET",
    "ABSYS",
    "ACC",
    "Accent",
    "Ace DASL",
    "ACL2",
    "ACT-III",
    "Action!",
    "ActionScript",
    "Ada",
    "Adenine",
    "Agda",
    "Agilent VEE",
    "Agora",
    "AIMMS",
    "Alef",
    "ALF",
    "ALGOL 58",
    "ALGOL 60",
    "ALGOL 68",
    "ALGOL W",
    "Alice",
    "Alma-0",
    "AmbientTalk",
    "Amiga E",
    "AMOS",
    "AMPL",
    "APL",
    "App Inventor for Android's visual block language",
    "AppleScript",
    "Arc",
    "ARexx",
    "Argus",
    "AspectJ",
    "Assembly language",
    "ATS",
    "Ateji PX",
    "AutoHotkey",
    "Autocoder",
    "AutoIt",
    "AutoLISP / Visual LISP",
    "Averest",
    "AWK",
    "Axum",
    "B",
    "Babbage",
    "Bash",
    "BASIC",
    "bc",
    "BCPL",
    "BeanShell",
    "Batch (Windows/Dos)",
    "Bertrand",
    "BETA",
    "Bigwig",
    "Bistro",
    "BitC",
    "BLISS",
    "Blue",
    "Bon",
    "Boo",
    "Boomerang",
    "Bourne shell",
    "bash",
    "ksh",
    "BREW",
    "BPEL",
    "C",
    "C--",
    "C++",
    "C#",
    "C/AL",
    "Caché ObjectScript",
    "C Shell",
    "Caml",
    "Candle",
    "Cayenne",
    "CDuce",
    "Cecil",
    "Cel",
    "Cesil",
    "Ceylon",
    "CFEngine",
    "CFML",
    "Cg",
    "Ch",
    "Chapel",
    "CHAIN",
    "Charity",
    "Charm",
    "Chef",
    "CHILL",
    "CHIP-8",
    "chomski",
    "ChucK",
    "CICS",
    "Cilk",
    "CL",
    "Claire",
    "Clarion",
    "Clean",
    "Clipper",
    "CLIST",
    "Clojure",
    "CLU",
    "CMS-2",
    "COBOL",
    "Cobra",
    "CODE",
    "CoffeeScript",
    "Cola",
    "ColdC",
    "ColdFusion",
    "COMAL",
    "Combined Programming Language",
    "COMIT",
    "Common Intermediate Language",
    "Common Lisp",
    "COMPASS",
    "Component Pascal",
    "Constraint Handling Rules",
    "Converge",
    "Cool",
    "Coq",
    "Coral 66",
    "Corn",
    "CorVision",
    "COWSEL",
    "CPL",
    "csh",
    "CSP",
    "Csound",
    "CUDA",
    "Curl",
    "Curry",
    "Cyclone",
    "Cython",
    "D",
    "DASL",
    "DASL",
    "Dart",
    "DataFlex",
    "Datalog",
    "DATATRIEVE",
    "dBase",
    "dc",
    "DCL",
    "Deesel",
    "Delphi",
    "DinkC",
    "DIBOL",
    "Dog",
    "Draco",
    "DRAKON",
    "Dylan",
    "DYNAMO",
    "E",
    "E#",
    "Ease",
    "Easy PL/I",
    "Easy Programming Language",
    "EASYTRIEVE PLUS",
    "ECMAScript",
    "Edinburgh IMP",
    "EGL",
    "Eiffel",
    "ELAN",
    "Elixir",
    "Elm",
    "Emacs Lisp",
    "Emerald",
    "Epigram",
    "EPL",
    "Erlang",
    "es",
    "Escapade",
    "Escher",
    "ESPOL",
    "Esterel",
    "Etoys",
    "Euclid",
    "Euler",
    "Euphoria",
    "EusLisp Robot Programming Language",
    "CMS EXEC",
    "EXEC 2",
    "Executable UML",
    "F",
    "F#",
    "Factor",
    "Falcon",
    "Fancy",
    "Fantom",
    "FAUST",
    "Felix",
    "Ferite",
    "FFP",
    "Fjölnir",
    "FL",
    "Flavors",
    "Flex",
    "FLOW-MATIC",
    "FOCAL",
    "FOCUS",
    "FOIL",
    "FORMAC",
    "@Formula",
    "Forth",
    "Fortran",
    "Fortress",
    "FoxBase",
    "FoxPro",
    "FP",
    "FPr",
    "Franz Lisp",
    "Frege",
    "F-Script",
    "FSProg",
    "G",
    "Google Apps Script",
    "Game Maker Language",
    "GameMonkey Script",
    "GAMS",
    "GAP",
    "G-code",
    "Genie",
    "GDL",
    "Gibiane",
    "GJ",
    "GEORGE",
    "GLSL",
    "GNU E",
    "GM",
    "Go",
    "Go!",
    "GOAL",
    "Gödel",
    "Godiva",
    "GOM (Good Old Mad)",
    "Goo",
    "Gosu",
    "GOTRAN",
    "GPSS",
    "GraphTalk",
    "GRASS",
    "Groovy",
    "Hack (programming language)",
    "HAL/S",
    "Hamilton C shell",
    "Harbour",
    "Hartmann pipelines",
    "Haskell",
    "Haxe",
    "High Level Assembly",
    "HLSL",
    "Hop",
    "Hope",
    "Hugo",
    "Hume",
    "HyperTalk",
    "IBM Basic assembly language",
    "IBM HAScript",
    "IBM Informix-4GL",
    "IBM RPG",
    "ICI",
    "Icon",
    "Id",
    "IDL",
    "Idris",
    "IMP",
    "Inform",
    "Io",
    "Ioke",
    "IPL",
    "IPTSCRAE",
    "ISLISP",
    "ISPF",
    "ISWIM",
    "J",
    "J#",
    "J++",
    "JADE",
    "Jako",
    "JAL",
    "Janus",
    "JASS",
    "Java",
    "JavaScript",
    "JCL",
    "JEAN",
    "Join Java",
    "JOSS",
    "Joule",
    "JOVIAL",
    "Joy",
    "JScript",
    "JScript .NET",
    "JavaFX Script",
    "Julia",
    "Jython",
    "K",
    "Kaleidoscope",
    "Karel",
    "Karel++",
    "KEE",
    "Kixtart",
    "KIF",
    "Kojo",
    "Kotlin",
    "KRC",
    "KRL",
    "KUKA",
    "KRYPTON",
    "ksh",
    "L",
    "L# .NET",
    "LabVIEW",
    "Ladder",
    "Lagoona",
    "LANSA",
    "Lasso",
    "LaTeX",
    "Lava",
    "LC-3",
    "Leda",
    "Legoscript",
    "LIL",
    "LilyPond",
    "Limbo",
    "Limnor",
    "LINC",
    "Lingo",
    "Linoleum",
    "LIS",
    "LISA",
    "Lisaac",
    "Lisp",
    "Lite-C",
    "Lithe",
    "Little b",
    "Logo",
    "Logtalk",
    "LPC",
    "LSE",
    "LSL",
    "LiveCode",
    "LiveScript",
    "Lua",
    "Lucid",
    "Lustre",
    "LYaPAS",
    "Lynx",
    "M2001",
    "M4",
    "Machine code",
    "MAD",
    "MAD/I",
    "Magik",
    "Magma",
    "make",
    "Maple",
    "MAPPER",
    "MARK-IV",
    "Mary",
    "MASM Microsoft Assembly x86",
    "Mathematica",
    "MATLAB",
    "Maxima",
    "Macsyma",
    "Max",
    "MaxScript",
    "Maya (MEL)",
    "MDL",
    "Mercury",
    "Mesa",
    "Metacard",
    "Metafont",
    "MetaL",
    "Microcode",
    "MicroScript",
    "MIIS",
    "MillScript",
    "MIMIC",
    "Mirah",
    "Miranda",
    "MIVA Script",
    "ML",
    "Moby",
    "Model 204",
    "Modelica",
    "Modula",
    "Modula-2",
    "Modula-3",
    "Mohol",
    "MOO",
    "Mortran",
    "Mouse",
    "MPD",
    "CIL",
    "MSL",
    "MUMPS",
    "NASM",
    "NATURAL",
    "Napier88",
    "Neko",
    "Nemerle",
    "nesC",
    "NESL",
    "Net.Data",
    "NetLogo",
    "NetRexx",
    "NewLISP",
    "NEWP",
    "Newspeak",
    "NewtonScript",
    "NGL",
    "Nial",
    "Nice",
    "Nickle",
    "Nim",
    "NPL",
    "Not eXactly C",
    "Not Quite C",
    "NSIS",
    "Nu",
    "NWScript",
    "NXT-G",
    "o:XML",
    "Oak",
    "Oberon",
    "Obix",
    "OBJ2",
    "Object Lisp",
    "ObjectLOGO",
    "Object REXX",
    "Object Pascal",
    "Objective-C",
    "Objective-J",
    "Obliq",
    "Obol",
    "OCaml",
    "occam",
    "occam-π",
    "Octave",
    "OmniMark",
    "Onyx",
    "Opa",
    "Opal",
    "OpenCL",
    "OpenEdge ABL",
    "OPL",
    "OPS5",
    "OptimJ",
    "Orc",
    "ORCA/Modula-2",
    "Oriel",
    "Orwell",
    "Oxygene",
    "Oz",
    "P#",
    "ParaSail (programming language)",
    "PARI/GP",
    "Pascal",
    "Pawn",
    "PCASTL",
    "PCF",
    "PEARL",
    "PeopleCode",
    "Perl",
    "PDL",
    "PHP",
    "Phrogram",
    "Pico",
    "Picolisp",
    "Pict",
    "Pike",
    "PIKT",
    "PILOT",
    "Pipelines",
    "Pizza",
    "PL-11",
    "PL/0",
    "PL/B",
    "PL/C",
    "PL/I",
    "PL/M",
    "PL/P",
    "PL/SQL",
    "PL360",
    "PLANC",
    "Plankalkül",
    "Planner",
    "PLEX",
    "PLEXIL",
    "Plus",
    "POP-11",
    "PostScript",
    "PortablE",
    "Powerhouse",
    "PowerBuilder",
    "PowerShell",
    "PPL",
    "Processing",
    "Processing.js",
    "Prograph",
    "PROIV",
    "Prolog",
    "PROMAL",
    "Promela",
    "PROSE modeling language",
    "PROTEL",
    "ProvideX",
    "Pro*C",
    "Pure",
    "Python",
    "Q (equational programming language)",
    "Q (programming language from Kx Systems)",
    "Qalb",
    "QtScript",
    "QuakeC",
    "QPL",
    "R",
    "R++",
    "Racket",
    "RAPID",
    "Rapira",
    "Ratfiv",
    "Ratfor",
    "rc",
    "REBOL",
    "Red",
    "Redcode",
    "REFAL",
    "Reia",
    "Revolution",
    "rex",
    "REXX",
    "Rlab",
    "RobotC",
    "ROOP",
    "RPG",
    "RPL",
    "RSL",
    "RTL/2",
    "Ruby",
    "RuneScript",
    "Rust",
    "S",
    "S2",
    "S3",
    "S-Lang",
    "S-PLUS",
    "SA-C",
    "SabreTalk",
    "SAIL",
    "SALSA",
    "SAM76",
    "SAS",
    "SASL",
    "Sather",
    "Sawzall",
    "SBL",
    "Scala",
    "Scheme",
    "Scilab",
    "Scratch",
    "Script.NET",
    "Sed",
    "Seed7",
    "Self",
    "SenseTalk",
    "SequenceL",
    "SETL",
    "Shift Script",
    "SIMPOL",
    "SIGNAL",
    "SiMPLE",
    "SIMSCRIPT",
    "Simula",
    "Simulink",
    "SISAL",
    "SLIP",
    "SMALL",
    "Smalltalk",
    "Small Basic",
    "SML",
    "Snap!",
    "SNOBOL",
    "SPITBOL",
    "Snowball",
    "SOL",
    "Span",
    "SPARK",
    "Speedcode",
    "SPIN",
    "SP/k",
    "SPS",
    "Squeak",
    "Squirrel",
    "SR",
    "S/SL",
    "Stackless Python",
    "Starlogo",
    "Strand",
    "Stata",
    "Stateflow",
    "Subtext",
    "SuperCollider",
    "SuperTalk",
    "Swift (Apple programming language)",
    "Swift (parallel scripting language)",
    "SYMPL",
    "SyncCharts",
    "SystemVerilog",
    "T",
    "TACL",
    "TACPOL",
    "TADS",
    "TAL",
    "Tcl",
    "Tea",
    "TECO",
    "TELCOMP",
    "TeX",
    "TEX",
    "TIE",
    "Timber",
    "TMG",
    "Tom",
    "TOM",
    "Topspeed",
    "TPU",
    "Trac",
    "TTM",
    "T-SQL",
    "TTCN",
    "Turing",
    "TUTOR",
    "TXL",
    "TypeScript",
    "Turbo C++",
    "Ubercode",
    "UCSD Pascal",
    "Umple",
    "Unicon",
    "Uniface",
    "UNITY",
    "Unix shell",
    "UnrealScript",
    "Vala",
    "VBA",
    "VBScript",
    "Verilog",
    "VHDL",
    "Visual Basic",
    "Visual Basic .NET",
    "Visual DataFlex",
    "Visual DialogScript",
    "Visual Fortran",
    "Visual FoxPro",
    "Visual J++",
    "Visual J#",
    "Visual Objects",
    "Visual Prolog",
    "VSXu",
    "Vvvv",
    "WATFIV, WATFOR",
    "WebDNA",
    "WebQL",
    "Windows PowerShell",
    "Winbatch",
    "Wolfram",
    "Wyvern",
    "X++",
    "X#",
    "X10",
    "XBL",
    "XC",
    "XMOS architecture",
    "xHarbour",
    "XL",
    "Xojo",
    "XOTcl",
    "XPL",
    "XPL0",
    "XQuery",
    "XSB",
    "XSLT",
    "XPath",
    "Xtend",
    "Yorick",
    "YQL",
    "Z notation",
    "Zeno",
    "ZOPL",
    "ZPL"
];

function Signup(props) {
    const [resend, setResend] = useState(false);
    const [email, setEmail] = useState("");
    const [selectedLanguages, setSelectedLanguages] = useState([]);

    const updateLanguages = lang => {
        setSelectedLanguages([...selectedLanguages, lang]);
    };

    const resendMail = () => {
        const res = axios.post("/api/auth/resendMail", { email });
        res.then(result => {
            toaster.success(result.data.message, forbiddenToast);
        }).catch(err => {
            if (err.response && err.response.data)
                toaster.danger(err.response.data.message, forbiddenToast);
        });
    };

    const submitForm = async data => {
        const res = axios.post("/api/auth/signup", {
            data,
            languages: selectedLanguages
        });
        setEmail(data.email);
        res.then(result => {
            toaster.success(result.data.message, forbiddenToast);
            setResend(true);
            // props.history.push("/");
        }).catch(err => {
            if (err.response && err.response.data)
                toaster.danger(err.response.data.message, forbiddenToast);
        });
    };
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Create a free account - mydevfriend</title>
                <meta
                    name="description"
                    content="Create a free account - mydevfriend"
                />
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
            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    dob: "",
                    location: "",
                    gender: "",
                    username: "",
                    password: "",
                    bio: ""
                }}
                onSubmit={async (data, { setSubmitting, resetForm }) => {
                    setSubmitting(true);
                    // async submission here.
                    await submitForm(data);
                    setSubmitting(false);
                    // resetForm();
                }}
            >
                {({ values, handleChange, handleSubmit, handleBlur }) => (
                    <Form id="form-container">
                        <Heading id="welcome" size={100}>
                            Create a free account
                        </Heading>
                        <TextInput
                            id="fn"
                            value={values.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="firstName"
                            placeholder="First Name"
                        />
                        {"  "}
                        <TextInput
                            value={values.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="lastName"
                            placeholder="Last Name"
                        />
                        <br />
                        <br />
                        <TextInput
                            style={{ width: "100%" }}
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="email"
                            placeholder="Email Address"
                        />
                        <br />
                        <br />
                        <TextInput
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="username"
                            placeholder="Username"
                        />
                        {"  "}
                        <TextInput
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="password"
                            type="password"
                            placeholder="Password"
                        />
                        <br />
                        <br />

                        <Autocomplete
                            id="lang"
                            title="Languages"
                            items={languages}
                        >
                            {props => {
                                let {
                                    getInputProps,
                                    getRef,
                                    inputValue
                                } = props;
                                return (
                                    <>
                                        <TextInput
                                            id="inp-lang"
                                            placeholder="Languages (enter to add)"
                                            value={inputValue}
                                            ref={getRef}
                                            {...getInputProps()}
                                        />
                                        {"  "}
                                        <Button
                                            type="button"
                                            onClick={() => {
                                                if (
                                                    !selectedLanguages.includes(
                                                        inputValue
                                                    ) &&
                                                    inputValue.length > 0
                                                ) {
                                                    updateLanguages(inputValue);
                                                }
                                            }}
                                        >
                                            Add
                                        </Button>
                                    </>
                                );
                            }}
                        </Autocomplete>
                        <br />
                        <br />
                        <div id="lang">
                            {selectedLanguages.map(lang => {
                                return (
                                    <>
                                        <Badge
                                            id="badge"
                                            color="neutral"
                                            isSolid
                                            marginRight={10}
                                        >
                                            {lang}
                                            <svg
                                                id="close"
                                                width="15"
                                                height="15"
                                                viewBox="0 0 15 15"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                onClick={e => {
                                                    let newLanguageList = selectedLanguages;
                                                    newLanguageList = newLanguageList.filter(
                                                        langg => langg !== lang
                                                    );
                                                    setSelectedLanguages(
                                                        newLanguageList
                                                    );
                                                }}
                                            >
                                                <path
                                                    d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                                                    fill="currentColor"
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                ></path>
                                            </svg>
                                        </Badge>
                                    </>
                                );
                            })}
                        </div>
                        <br />
                        <br />

                        <Textarea
                            name="bio"
                            placeholder="bio"
                            value={values.bio}
                            onChange={handleChange}
                        />

                        <br />
                        <br />
                        <TextInput
                            width="auto"
                            value={values.location}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="location"
                            placeholder="Location"
                        />
                        {"  "}
                        <Select name="gender" onChange={handleChange}>
                            <option selected disabled value="Gender">
                                Gender
                            </option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </Select>
                        <br />
                        <br />
                        <Text>Date of Birth</Text>
                        {"  "}
                        <br />
                        <input
                            type="date"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="dob"
                        />
                        <br />
                        <br />
                        <Button
                            type="button"
                            onClick={handleSubmit}
                            value="Create"
                            intent="success"
                            appearance="primary"
                            iconBefore={AddIcon}
                        >
                            Create free account
                        </Button>
                        <br />
                        <br />
                        <NavLink to="/" style={{ color: "blue" }}>
                            Back to Login
                        </NavLink>
                        {"  "}
                        {resend && (
                            <NavLink
                                onClick={resendMail}
                                to="#"
                                style={{ color: "blue" }}
                            >
                                Resend activation email
                            </NavLink>
                        )}
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default withRouter(Signup);
