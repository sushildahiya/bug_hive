
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


# Screenshots:

## Login

![Screenshot (85)](https://github.com/sushildahiya/bug_hive/assets/97718833/2f2c7db9-ed0a-4827-a822-489990566f17)

## Sign Up

![Screenshot (86)](https://github.com/sushildahiya/bug_hive/assets/97718833/1c6fb717-f8ab-4e7e-99ed-a0c69a7601e4)

## Dashboard

![Screenshot (78)](https://github.com/sushildahiya/bug_hive/assets/97718833/186823f2-2484-45c3-8fe2-2d094b493ecf)

## Dashboard (User bug tickets)

![Screenshot (79)](https://github.com/sushildahiya/bug_hive/assets/97718833/82e7a4d2-7f0a-4408-a40a-b5c8211e431c)

## Projects Page

![Screenshot (80)](https://github.com/sushildahiya/bug_hive/assets/97718833/b1de3c72-7093-4b61-b905-dd781b867a07)

## Project details

![Screenshot (81)](https://github.com/sushildahiya/bug_hive/assets/97718833/6cbe2a0d-0a65-4435-a7cb-91c6765477fe)

## Issues

![Screenshot (82)](https://github.com/sushildahiya/bug_hive/assets/97718833/001d04a7-b5e5-49b4-843a-fb5b254492ed)

## Create a bug/issue

![Screenshot (83)](https://github.com/sushildahiya/bug_hive/assets/97718833/84dc5fee-336f-4a89-86a6-05a40b404471)

## Filter popup

![Screenshot (84)](https://github.com/sushildahiya/bug_hive/assets/97718833/d776b910-ac7f-477d-b33b-f7857912a16c)


