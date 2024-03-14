// Import required models for MongoDB database interaction
const User = require('../models/user');
const Issue = require('../models/issue');
const Project = require('../models/project');

// Dashboard route handler
module.exports.dashboard = async (req, res) => {
    // Retrieve the user with the provided user ID from the database
    const user = await User.findById(req.user.id);

    // Retrieve issues assigned to the current user from the database
    const issues = await Issue.find({ assigned_to: req.user._id });

    // Render the 'dashboard' view and pass user information and assigned issues
    return res.render('dashboard', {
        currentPage: 'dashboard',
        user: req.user,
        issues,
    });
};

// Projects route handler
module.exports.projects = async (req, res) => {
    // Retrieve all projects from the database
    const projects = await Project.find({});
    let id = null;
    let project;
    let issue = null;
    let issues = [];

    // Check if project ID is provided in the request parameters
    if (req.params.id) {
        id = req.params.id;

        // Retrieve the project with the provided ID from the database
        project = await Project.findById(id);

        // Retrieve issues associated with the project from the database
        issue = await Issue.find({ project: id });

        // Transform each issue to a simplified format and add to the 'issues' array
        for (let i = 0; i < issue.length; i++) {
            const use = await User.findById(issue[i].assigned_to);
            const an_issue = {
                id: issue[i].id,
                summary: issue[i].summary,
                status: issue[i].status,
                assigned_to: use.username,
                priority: issue[i].priority,
            };
            issues.push(an_issue);
        }
    }

    // Render the 'projects' view and pass user information, project information, and issues
    return res.render('projects', {
        currentPage: 'projects',
        user: req.user,
        id,
        projects,
        project,
        issues,
    });
};

// Issues route handler
module.exports.issues = async (req, res) => {
    // Retrieve all projects, users, and issues from the database
    const projects = await Project.find({});
    const users = await User.find({});
    const employees = await Issue.find({author:req.user.id}).populate("project")
    let employee = {};
    // let employees = [];
    let id = null;
    let issue = null;
    let a_Issue = null;

    // Check if issue ID is provided in the request parameters
    if (req.params.id) {
        id = req.params.id;

        // Retrieve the issue with the provided ID from the database
        issue = await Issue.findById(id);

        // Retrieve additional information related to the issue from the database
        const a_project = await Project.findById(issue.project);
        const a_author_user = await User.findById(issue.author);
        const a_assigned_user = await User.findById(issue.assigned_to);

        // Create an object representing the detailed issue information
        a_Issue = {
            id: issue.id,
            summary: issue.summary,
            description: issue.description,
            status: issue.status,
            priority: issue.priority,
            project: a_project.name,
            labels: issue.labels,
            author: a_author_user.username,
            screenshot: issue.screenshot,
            assigned_to: a_assigned_user.username,
        };
    }

    // Iterate over all issues and transform them to a simplified format, adding to 'employees' array
    for (let i = 0; i < employees.length; i++) {
        // const employees = 

        // const project = await Project.findById(issues[i].project);
        // employee.project = project.name;
        const assigned = await User.findById(employees[i].assigned_to);
        employees[i].assigned_to = assigned.username;
        // employee.summary = issues[i].summary;
        // employee.id = issues[i].id;
        // employee.priority = issues[i].priority;
        // employee.status = issues[i].status;
        // employees.push(employee);
    }

    // Render the 'issues' view and pass projects, users, employees, detailed issue information, and issue ID
    return res.render('issues', {
        currentPage: 'issues',
        projects,
        users: users,
        employees,
        a_Issue,
        id,
    });
};
