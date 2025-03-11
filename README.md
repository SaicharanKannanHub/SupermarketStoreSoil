# Soil Supermarket Store

## Full Stack Application in React

This repository contains both the backend (middle-layer) and frontend parts of the project. Below are the instructions for setting up and running both parts.

## Project Overview:

Full-stack web application using React for the front-end, Node.js & Express.js for the back-end.

Database: Cloud MySQL (hosted at rmit.australiaeast.cloudapp.azure.com).

Implements a multi-user platform with authentication, user profiles, and various product features.

### Frontend:

Built using ReactJS (or ReactTS) with Axios for API communication.

User sign-up, sign-in, and profile management functionalities.

Product catalog with standard and special products.

Shopping cart functionality to buy products.

### Backend:

Node.js used for the server and API layer.

Sequelize ORM to interact with the MySQL database.

User authentication with password hashing (avoiding MD5).

### Database:

MySQL database schema with multiple tables representing users, products, reviews, etc.

Relationships between tables defined using foreign keys and constraints.

Data operations (CRUD) performed through the backend API.

# Installation & Setup:

## Backend Setup (Middle Layer)

The backend is responsible for handling API requests, connecting to the database, and providing services to the frontend.

### Steps to Set Up the Backend:

1. **Navigate to the `middle-layer` directory:**

   Open your terminal and run the following command:
   ```bash
   cd path/to/SupermarketStoreSoil/middle-layer

   npm install

   node server.js

The backend server should now be running and accessible at:
http://localhost:4006

## Frontend Setup

The frontend is a React application that communicates with the backend via API requests.

1. **Navigate to the `soil` directory:**

   Open your terminal and run the following command:
   ```bash
   cd path/to/SupermarketStoreSoil/soil

   npm install axios

   npm start

The frontend should now be running and accessible at:
http://localhost:3000


Author: Saicharan Kannan

Author: Mahek Joshi
