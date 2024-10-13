Loan Application Microservice
This project implements a simple microservice for loan applications using Node.js, Express, MongoDB, and React.
Prerequisites

Node.js (v14 or later)
Docker and Docker Compose

Setup

Clone the repository:
Copygit clone  https://github.com/Muhangi2/loan-application-microservice.git
cd loan-application-microservice

Set up environment variables:

Create a .env file in the backend directory
Add your MongoDB Atlas connection string:
CopyMONGODB_URI=your_mongodb_atlas_connection_string
PORT=5000



Install dependencies:
Copycd backend && npm install
cd ../frontend && npm install


Running the Application
Using Docker

Build and run the containers:
Copydocker-compose up --build

Access the application:

Frontend: http://localhost:5317
Backend API: http://localhost:5000



Running Locally

Start the backend:
Copycd backend
npm start

Start the frontend:
Copycd frontend
npm start

Access the application:

Frontend: http://localhost:5317
Backend API: http://localhost:5000



API Endpoints

POST /api/loans/apply - Create a new loan application
GET /api/loans/{loanId} - View loan application status
PUT /api/loans/{loanId} - Update loan application details
GET/api/loans/ - Get all the loans

Testing
To run the backend tests:
Copycd backend
npm test
Contributing
Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests.
License
This project is licensed under the MIT License - see the LICENSE.md file for details.
