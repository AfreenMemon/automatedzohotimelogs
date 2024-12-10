Zoho Time Log Automation

This project automates the process of adding time logs to Zoho via their API. It allows you to fetch and add time logs seamlessly, helping you keep track of your work hours more efficiently.

Problem It Resolves
Manually logging time on Zoho can be tedious and time-consuming. This tool automates the process of adding time logs, reducing the need for manual input and ensuring your time entries are accurate and up to date. With this automation, you can focus more on your work and less on administrative tasks.

Getting Started
Follow the steps below to get this project up and running locally.

Prerequisites
Node.js installed (v14 or later recommended)
Access to the Zoho API (with valid credentials)
Git installed on your local machine


Setting Up the Project
Clone the repository to your local machine:


Install dependencies

Set up your environment variables:

Create a .env file in the root of the project directory.

Replace the placeholder values in the .env file with your actual Zoho API credentials.
Your .env file should look like this:

bash
Copy code
CLIENT_ID='your_actual_client_id'  # Replace with your actual client ID
CLIENT_SECRET='your_actual_client_secret'  # Replace with your actual client secret
REDIRECT_URI='your_actual_redirect_uri'  # Replace with your actual redirect URI

Important: Make sure that your .env file is not pushed to GitHub. It should be added to the .gitignore file to prevent accidental exposure of sensitive credentials.

Running the Application
Start the backend server to handle OAuth and time log requests:

bash
Copy code
npm start
This will start the backend server on http://localhost:5000.

Authenticate via Zoho OAuth:

Navigate to the authentication URL:

bash
Copy code
http://localhost:5000/auth
You'll be redirected to Zoho's OAuth login page. Log in to your Zoho account and authorize the application.

After authorization, you'll be redirected to the REDIRECT_URI specified in your .env file (usually something like http://localhost:5000/oauth-callback).

The authentication process will return an access token, which will be stored for future use.

Fetching Time Logs:

To fetch the time logs from Zoho, click the "Fetch Time Logs" button in the app. This will call the API and display any existing time logs in the console.

Adding Time Logs:

After authentication, you can add time logs by clicking the "Add Time Logs" button. This will add predefined time logs for your user.

Files and Folder Structure
frontend: Contains the React app that handles the user interface.
backend: Contains the Node.js backend that handles authentication and API requests.
.env: Contains your environment variables (e.g., CLIENT_ID, CLIENT_SECRET, REDIRECT_URI).
.gitignore: Ensures sensitive files (like .env) are not tracked by Git.


Conclusion
This tool helps automate the process of adding time logs to Zoho, saving you time and effort. Ensure that your credentials are handled securely and never exposed publicly.
