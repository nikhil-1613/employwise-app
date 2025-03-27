# EmployWise Assignment

## Project Overview  
This React application integrates with the Reqres API to perform user management functions, including authentication, listing users, and editing/deleting users.

## Features  
### **Level 1: Authentication**  
- Users can log in using the provided credentials.  
- Token is stored on successful login.  

### **Level 2: User Management**  
- Displays a paginated list of users.  
- Uses API to fetch user data.  

### **Level 3: Edit & Delete Users**  
- Users can edit their details (first name, last name, and email).  
- Users can be deleted from the list.  
- Displays success/error messages.  

## Tech Stack  
- **Frontend:** React, Axios  
- **State Management:** Redux  
- **Styling:** Material-UI  

## API Endpoints Used  
- **Login:** `POST /api/login`  
- **Get Users:** `GET /api/users?page=1`  
- **Edit User:** `PUT /api/users/{id}`  
- **Delete User:** `DELETE /api/users/{id}`  

## Installation  

1. Clone the repository:  
   git clone <repository-url>
   cd employwise-app

2. Install dependencies:  
   npm install
   
3. Run the application:  
   npm start
   
5. Open [http://localhost:3000]in your browser.

## Deployed Version  
The application is live at: https://employwise-app-livid.vercel.app/





Credintials :
email : eve.holt@reqres.in
password: cityslicka
