const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require("cors");
const winston = require("winston");
const fs = require("fs");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

let accessToken = null;
let refreshToken = null;

const timeLogs = [
    {
        workDate: "2024-12-10",
        userId: "USER_ID_PLACEHOLDER",     // Unique identifier for the user (replaced with placeholder for privacy)
        jobId: "JOB_ID_PLACEHOLDER",  // Unique identifier for the job (replaced with placeholder for privacy)
        hours: "5.0",            // Number of hours worked on this task
        description: "Documentation for Email as Optional Requirement",
    },
    {
        workDate: "2024-12-10",
        userId: "USER_ID_PLACEHOLDER",     // Unique identifier for the user (replaced with placeholder for privacy)
        jobId: "JOB_ID_PLACEHOLDER",  // Unique identifier for the job (replaced with placeholder for privacy)
        hours: "5.0",            // Number of hours worked on this task
        description: "Documentation for Google Analytics",
    },
];

// Winston Logger Setup
const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({ format: winston.format.simple() }),
        new winston.transports.File({ filename: "logs/error.log", level: "error" }),
        new winston.transports.File({ filename: "logs/combined.log" }),
    ],
});

// Save tokens to a file
const saveTokensToFile = (tokens) => {
    fs.writeFileSync("./tokens.json", JSON.stringify(tokens, null, 2));
};

// Load tokens from a file
const loadTokensFromFile = () => {
    try {
        const tokens = JSON.parse(fs.readFileSync("./tokens.json", "utf-8"));
        return tokens;
    } catch (error) {
        logger.error("Error reading tokens from file:", error);
        return null;
    }
};

// Load tokens on server start
const tokens = loadTokensFromFile();
if (tokens) {
    accessToken = tokens.accessToken;
    refreshToken = tokens.refreshToken;
}

/**
 * Endpoint: Generate Authorization URL
 */
app.get("/auth-url", (req, res) => {
    const authUrl = `https://accounts.zoho.com/oauth/v2/auth?scope=ZohoProjects.timesheets.CREATE,ZohoProjects.projects.READ,ZOHOPEOPLE.timetracker.CREATE&client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&access_type=offline`;
    logger.info("Authorization URL generated");
    res.json({ url: authUrl });
});

/**
 * Endpoint: Handle OAuth Callback
 */
app.get("/oauth-callback", async (req, res) => {
    const authCode = req.query.code;
    logger.info("Received OAuth callback", { authCode });

    if (!authCode) {
        logger.error("No authorization code provided");
        return res.status(400).send("Authorization code not provided");
    }

    try {
        const response = await axios.post(
            "https://accounts.zoho.com/oauth/v2/token",
            null,
            {
                params: {
                    code: authCode,
                    client_id: CLIENT_ID,
                    client_secret: CLIENT_SECRET,
                    redirect_uri: REDIRECT_URI,
                    grant_type: "authorization_code",
                },
            }
        );

        // Store tokens
        accessToken = response.data.access_token;
        refreshToken = response.data.refresh_token;
        saveTokensToFile({ accessToken, refreshToken });

        logger.info("Tokens fetched successfully");
        res.send("OAuth process complete. Tokens fetched successfully.");
    } catch (error) {
        logger.error("Error in OAuth callback:", error.response?.data || error.message);
        res.status(500).send("Failed to fetch tokens");
    }
});

/**
 * Endpoint: Refresh Access Token
 */
const refreshAccessToken = async () => {
    try {
        const response = await axios.post(
            "https://accounts.zoho.com/oauth/v2/token",
            null,
            {
                params: {
                    refresh_token: refreshToken,
                    client_id: CLIENT_ID,
                    client_secret: CLIENT_SECRET,
                    grant_type: "refresh_token",
                },
            }
        );

        accessToken = response.data.access_token;
        saveTokensToFile({ accessToken, refreshToken });
        logger.info("Access token refreshed successfully");
    } catch (error) {
        logger.error("Error refreshing access token:", error.response?.data || error.message);
    }
};

/**
 * Endpoint: Fetch Time Logs
 */
app.get("/time-logs", (req, res) => {
    res.json(timeLogs);
});

/**
 * Endpoint: Check Token Availability
 */
app.get("/check-token", (req, res) => {
    if (!accessToken) {
        return res.status(400).json({ error: "No access token available. Please authenticate first." });
    }
    res.json({ message: "Access token available." });
});

/**
 * Function: Add Time Log
 */
const addTimeLog = async (timeLog) => {
    if (!accessToken) {
        logger.error("No access token available. Please authenticate first.");
        return { error: "No access token available. Please authenticate first." };
    }

    const { userId, jobId, workDate, hours, description } = timeLog;

    try {
        const apiUrl = "https://people.zoho.com/people/api/timetracker/addtimelog";
        const headers = { Authorization: `Zoho-oauthtoken ${accessToken}` };
        const params = { user: userId, workDate, jobId, hours, billingStatus: "billable", description };

        const response = await axios.post(apiUrl, null, { headers, params });
        return { message: "Time log added successfully", data: response.data };
    } catch (error) {
        logger.error("Error adding time log:", error.response?.data || error.message);

        if (error.response?.status === 401) {
            await refreshAccessToken();
            return await addTimeLog(timeLog);
        } else {
            return {
                error: "Failed to add time log",
                details: error.response?.data || error.message,
            };
        }
    }
};

/**
 * Endpoint: Add Time Logs
 */
app.post("/add-time-logs", async (req, res) => {
    for (const log of timeLogs) {
        const result = await addTimeLog(log);
        if (result.error) {
            logger.error(`Error adding time log for jobId ${log.jobId}:`, result.error);
            return res.status(500).json(result);
        }
    }
    res.json({ message: "All time logs added successfully." });
});

// Start Server
app.listen(PORT, () => {
    logger.info(`Server running on http://localhost:${PORT}`);
});
