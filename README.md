# Automated Zoho Time Logs

This project automates the process of adding time logs to Zoho. It includes a simple React frontend and a backend that connects to Zoho’s API to manage time logs. It provides functionalities such as fetching existing time logs and adding new ones.

## Problem It Solves

Manual entry of time logs into Zoho can be time-consuming and prone to errors. This project automates that process, making it easier and faster to track time spent on various tasks.

## Prerequisites

Before running the application, you need to have the following:

- A **Zoho OAuth2** account for authentication.
- Node.js installed on your machine.
- A valid **CLIENT_ID**, **CLIENT_SECRET**, and **REDIRECT_URI** from Zoho to authenticate via OAuth2.

### Environment Variables

Create a `.env` file in your root directory with the following placeholders (replace with actual values):

```env
CLIENT_ID='YOUR_CLIENT_ID_PLACEHOLDER'  # Replace with your actual Zoho client ID
CLIENT_SECRET='YOUR_CLIENT_SECRET_PLACEHOLDER'  # Replace with your actual Zoho client secret
REDIRECT_URI='YOUR_REDIRECT_URI_PLACEHOLDER'  # Replace with your actual redirect URI
