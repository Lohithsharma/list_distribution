MERN Agent Management App
Project Overview

This is a MERN stack application designed for managing agents and distributing tasks via CSV uploads. The app allows an admin to securely log in, create/manage agents, and upload CSV files to distribute tasks efficiently among agents.

Features Implemented
1. Admin User Login

Secure login with email and password.

Authentication handled using JWT (JSON Web Tokens).

Successful login redirects to the dashboard.

Displays proper error messages for failed login attempts.

2. Agent Management

Add agents with details:

Name

Email

Mobile number (with country code)

Password

Agents are stored securely in MongoDB.

3. Upload CSV and Distribute Lists

Upload CSV files containing:

First Name (Text)

Phone Number

Notes (Text)

Supports file types: .csv, .xlsx, .xls

Validates the CSV format before processing.

Distributes items equally among 5 agents.

Example: 25 items → 5 items per agent

Uneven items are distributed sequentially.

Stores distributed lists in MongoDB.

Displays distributed lists for each agent on the frontend.

Tech Stack

Frontend: React.js (or Next.js)

Backend: Node.js, Express.js

Database: MongoDB

Authentication: JWT (JSON Web Token)

File Handling: Multer (CSV Upload)

Setup Instructions
1. Clone the repository
git clone <your-repo-link>
cd <project-folder>

2. Backend Setup
cd backend
npm install
create .env file in backend folder  # Update with your MongoDB URI and JWT secret
npm start              # Start the backend server

4. Frontend Setup

make a small change: In frontend -> src -> api -> api.js :
change baseURL:http:localhost:5000/api if you are working locally,otherwise incase of hosting dont change it.

cd frontend
npm install
npm run build
npm start              # Start the frontend server

you'll be redirected to frontend page at port:5000

Demo Video

A working demo of the application is available here
 https://drive.google.com/file/d/1ueMmQlq9VJx77WfmlunmQy2UE58AESok/view?usp=sharing

Execution: Easy to setup with provided instructions
