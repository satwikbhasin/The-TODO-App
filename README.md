# roulettech-assignment

Since the assignment allowed me to build anything, I decided to create this todo list management app.

# TODO Application

Welcome to TODO Application. This project is a full-stack application, featuring a React-based frontend and a Django backend, providing a seamless and interactive user experience for managing todos.

Check it out [here](http://d12eo7gxjc1eku.cloudfront.net)

## Features

- **User Authentication**: Secure login and registration functionality to keep your todos private.
- **Create, Read, Update, Delete (CRUD) Todos**: Full management of your todo tasks.
- **Light and Dark Mode**: Switch between light and dark themes to suit your preference.
- **Searching**: Easily find tasks by searching any keyword from the todo task.
- **Responsive Design**: A user-friendly interface that adapts to different screen sizes, ensuring a great experience on both desktop and mobile devices.
- **Progressive Web App (PWA)**: The frontend is designed as a PWA, allowing for an app-like experience on supported devices.

## Technology Stack

- **Frontend**

  The frontend is built with React, utilizing Create React App for scaffolding. Styling is achieved with Emotion Styled Components and Material-UI for a modern look and feel.
  
- **Backend**

  The backend is powered by Django, a high-level Python web framework that encourages rapid development and clean, pragmatic design. It handles user authentication, data persistence in SQLite, and serves the RESTful API endpoints for the frontend.
  
- **Deployment**
  - The frontend of the application is hosted on AWS S3 with CloudFront as the CDN. This setup ensures fast and reliable access to the application worldwide.
  - The backend is deployed on an AWS EC2 instance. This provides a scalable and reliable server environment for handling the application's backend services, including user authentication, data persistence, and serving RESTful API endpoints.
  - The backend URL is securely stored in the environment variables (env file) for easier management and deployment.

## Detailed Key Features
Below are some features that make this app robust and appealing.

`Dashboard Synchronization / Real-time Updates`

The Dashboard component ensures seamless synchronization every time a todo item is created, updated, or deleted. The `NewTodo` and `UpdateTodo` components handle these changes and invoke callback functions like `refreshAllTodos` and `refreshStats`. These functions use refs to trigger a rerender in the `AllTodos` and `TodoStats` components, ensuring the Dashboard always displays the most current data for a dynamic and responsive user experience.

`Light & Dark Mode`

Users can switch between light and dark themes to suit their preference, enhancing the usability and visual appeal of the application. The design is scalable, allowing for the addition of numerous themes in the future.

`User Authentication`

Secure login and registration functionality to keep your todos private. The application uses token-based authentication to ensure that only authorized users can access their todos. 

`Create, Read, Update, Delete (CRUD) Todos`

Full management of your todo tasks. Users can create new todos, view all their existing todos, update the details of their todos, and delete todos they no longer need. The CRUD operations are implemented with RESTful API endpoints, ensuring a smooth and efficient user experience.

`Searching`

Easily find tasks by searching any keyword from the todo task. The search functionality allows users to quickly locate specific todos by entering relevant keywords, improving the usability and efficiency of the application.

`Responsive Design`

A user-friendly interface that adapts to different screen sizes, ensuring a great experience on both desktop and mobile devices. The responsive design ensures that users can manage their todos comfortably, regardless of the device they are using.

`Statistics`

The application includes features for displaying statistics related to the user's todos. This helps users track their productivity and manage their tasks more effectively.
  
`Error Handling and Validation`

Robust error handling and validation mechanisms ensure that the application operates smoothly. Users receive clear feedback in case of errors or invalid input, enhancing the overall user experience.

## Future Enhancements
When I start a project, I always develop keeping its future in mind. For this one, Below are some ideas I have in mind.

`Customizable Themes`

Expand the theme options beyond light and dark mode to include customizable color schemes. Allow users to personalize their interface according to their preferences.

`Collaborative Features` 

Introduce collaboration capabilities where users can share and work on todos together with team members or collaborators. This could include real-time updates and shared task lists.

`Notification System` 

Implement a notification system to alert users about upcoming deadlines, completed tasks, or changes made by collaborators. Integration with push notifications can enhance user engagement and productivity.

`Integration with Calendar Services` 

Enable synchronization with popular calendar services (e.g., Google Calendar, Outlook) to automatically populate tasks and deadlines into users' calendars. This integration simplifies planning and time management.

`Advanced Analytics` 

Enhance the statistics and analytics section with predictive analytics and data visualization. Provide insights into task completion rates, productivity trends, and suggestions for optimizing task management.

`Offline Access` 

Further enhance the PWA capabilities by enabling offline access to todos. Implement offline storage and synchronization so users can continue managing tasks even without an internet connection.

`Task Dependencies and Reminders` 

Introduce features for setting task dependencies and reminders. Allow users to create sequential tasks that automatically update based on completion status and send reminders for upcoming deadlines.

`Voice Command Integration`

Incorporate voice command capabilities for hands-free task management. Users can add, update, or delete todos using voice commands, enhancing accessibility and convenience.
