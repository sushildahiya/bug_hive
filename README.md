
# Bughive - Issue Tracker System
Bughive is a simple issue tracker system designed to help teams manage their projects efficiently. This system allows users to create projects, track issues, and collaborate seamlessly.

## Installation
1. Clone the repository:
 * git clone https://github.com/your-username/bughive.git
 * cd bughive
2. Install dependencies:
 * npm install
3. Configure your MongoDB connection in the config/database.js file.
4. Run the application:
 * npm start
5. Visit http://localhost:3000 in your web browser to access Bughive.

## Features
* ***Dashboard***: View an overview of your assigned issues.

* ***Projects***: Manage and explore all your projects.

* ***Issues***: Track and update the status of individual issues.

* ***Create Issue***: Easily create a new issue, including file attachments.

* ***Update Status***: Change the status of an existing issue.

* ***Filter Issues***: Filter issues based on selected labels.

* ***Search Issues***: Search for issues using keywords.

* ***Create Project***: Add a new project with a detailed description and avatar.

* ***Delete Project***: Remove a project from the system.

* ***User Management***: Sign up, sign in, and sign out functionalities.

## Controllers and Routes
***`homeController.js`***
### Dashboard:

* / - GET request - Render the dashboard with user information and assigned issues.
### Projects:

* /projects - GET request - Render the projects view with user information, project list, and associated issues.
* /projects/:id - GET request - Render project details and associated issues.
### Issues:

* /issues - GET request - Render the issues view with projects, users, employees, detailed issue information, and issue ID.
* /issues/:id - GET request - Render detailed information about a specific issue.
  
***`issuesController.js`***
### Create Issue:
*/create-issue - POST request - Handle the creation of a new issue, including file uploads.

### Update Status:
* /update/:id - POST request - Update the status of an existing issue.
  
### Filter Issues:
* /filter - POST request - Filter issues based on selected labels.

### Search Issues:
* /search - POST request - Search for issues using provided keywords.

***`projectsController.js`***
### Create Project:

* /create-project - POST request - Handle the creation of a new project, including file uploads.
### Delete Project:

* /delete/:id - GET request - Delete a project with the provided ID.
  
***`userController.js`***

### User Authentication:
* /sign-in - GET request - Render the sign-in page.
* /create-session - POST request - Create a new session (user sign-in).
* /sign-up - POST request - Render the sign-up page and create a new user.
* /sign-out - GET request - Sign out the user.

***`routes/index.js`***
* Define routes for various functionalities using the methods from homeController.
  
***`router/issue.js`***
* Define routes for issue-related functionalities using the methods from issuesController.
  
***`router/projects.js`***
* Define routes for project-related functionalities using the methods from projectsController.
  
***`router/user.js`***
* Define routes for user-related functionalities using the methods from userController.
