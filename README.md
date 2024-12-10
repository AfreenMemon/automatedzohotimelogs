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

```
### How to Run the Project

### 1. Clone the Repository
bash
Copy code
git clone https://github.com/AfreenMemon/automatedzohotimelogs.git
cd automatedzohotimelogs

### 2. Install Dependencies
For the backend, navigate to the backend folder and install the dependencies.

bash
Copy code
cd backend
npm install
For the frontend, navigate to the frontend folder and install the dependencies.

bash
Copy code
cd frontend
npm install

### 3. Set up Environment Variables
Ensure that the .env file in the root directory contains the correct Zoho API credentials:

```env
env
Copy code
CLIENT_ID='YOUR_CLIENT_ID'
CLIENT_SECRET='YOUR_CLIENT_SECRET'
REDIRECT_URI='YOUR_REDIRECT_URI'
```

### 4. Run the Backend
In the backend folder, run:

bash
Copy code
cd backend
npm start
This will start the backend server at http://localhost:5000.

### 5. Run the Frontend
In the frontend folder, run:

bash
Copy code
cd frontend
npm start
This will start the frontend at http://localhost:3000.

### 6. Authenticate via OAuth2
Visit the URL provided by the backend to authenticate with Zoho. This will allow the application to access Zoho and manage time logs. The authentication process will prompt you to log in to your Zoho account.

### 7. Adding Time Logs
Once authenticated, you can add time logs via the frontend interface. The backend will send a request to Zoho to add time logs with the details provided in the frontend.

## Project Structure
The project contains the following folders:

frontend/: React-based frontend for interacting with Zoho.
backend/: Node.js-based backend that handles Zoho API interactions.
Time Logs Format
When adding time logs, the following data is sent:

### json

```env
Copy code
{
  "workDate": "2024-12-10",  // The date the work was done
  "userId": "YOUR_USER_ID",  // The user ID (from Zoho)
  "jobId": "YOUR_JOB_ID",    // The job ID (from Zoho)
  "hours": "5.0",            // Time spent on the task in hours
  "description": "Task description"  // Description of the work done
}
```
Make sure to replace "YOUR_USER_ID" and "YOUR_JOB_ID" with the relevant Zoho details. These values are necessary for associating the time logs with specific users and tasks in Zoho.

### Troubleshooting
Ensure that all environment variables are set correctly before running the project.
If you encounter issues with OAuth authentication, verify that your Zoho API credentials are correct.
For frontend styling issues, ensure that Tailwind CSS is properly configured.

### Contributing
Feel free to fork this repository and submit pull requests. All contributions are welcome!
