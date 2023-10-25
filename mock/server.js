const database = "./db.json";

const fs = require("fs");
const jwt = require("jsonwebtoken");
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("mock/db.json");
const middlewares = jsonServer.defaults();

const userdb = require("./db.json").users;

const SECRET_KEY = "123456789";
const EXPIRES_IN = "24h";
const TOKEN_REGEX = new RegExp(/^Bearer\s([^\s]+)$/);

// Create a token from a payload 
function createToken(payload) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRES_IN });
}

// Verify the token 
function verifyToken(token) {
    return jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ? decode : err);
}

// Check if the user exists in database
function isAuthenticated({ email, password }) {
    console.log("USERS", userdb, email, password);
    return userdb.findIndex(user => user.email === email && user.password === password) !== -1;
}

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)

// Register New User
server.post("/auth/register", (req, res) => {
    console.log("register endpoint called; request body:");
    console.log(req.body);
    const { email, password } = req.body;

    if (isAuthenticated({ email, password }) === true) {
        return res.status(401).json({ message: "Email and Password already exist" });
    }

    fs.readFile(database, (err, buffer) => {
        if (err) {
            return res.status(401).json({ message: err });
        };

        const content = buffer.toString();
        const data = JSON.parse(content);

        const lastId = data.users[data.users.length - 1].id;

        // create new user
        data.users.push({
            id: lastId + 1,
            email: email,
            password: password
        });

        fs.writeFile(database, JSON.stringify(data), (err, result) => {
            if (err) {
                return res.status(401).json({ message: err });
            }
        });
    });

    // Create token for new user
    const access_token = createToken({ email, password })
    return res.status(200).json({
        username,
        access_token,
        expires_in: EXPIRES_IN
    });
});

// Login to one of the users from ./users.json
server.post("/auth/login", (req, res) => {
    const { email, password } = req.body;
    if (!isAuthenticated({ email, password })) {
        return res.status(401).json({ message: "Incorrect email or password" });
    }
    const access_token = createToken({ email, password });
    return res.status(200).json({ access_token });
})

server.use(/^(?!\/auth).*$/, (req, res, next) => {
    const authorization = req.headers.authorization || "";
    const matches = TOKEN_REGEX.exec(authorization) || [];
    const token = matches.length ? matches[1] : null;
    if (!authorization) {
        return res.status(401).json({ message: "Error in authorization format" });
    }

    try {
        const { err, decode } = jwt.verify(token, SECRET_KEY, (err, decode) => ({ err, decode }));
        if (err) {
            return res.status(401).json({ message: err.message });
        }
        
        console.log("DECODED TOKEN", err, decode);
        // if (decodeToken instanceof Error) {
        //     return res.status(401).json({ message: "Access token not provided" });
        // }
        next();
    } catch (err) {
        return res.status(401).json({ message: "Error access_token is revoked" })
    }
})

server.use("/api" , router);

server.listen(8000, () => {
    console.log("Run Auth API Server")
});
