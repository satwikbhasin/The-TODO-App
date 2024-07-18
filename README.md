# roulettech-assignment

Since the assignment allowed me to build anything, I decided to create this todo list management app.

# TODO Application

Welcome to TODO Application. This project is a full-stack application, featuring a React-based frontend and a Django backend, providing a seamless and interactive user experience for managing todos.

Check it out [here](http://d12eo7gxjc1eku.cloudfront.net)

## Features

- **User Authentication**: Secure login and registration functionality to keep your todos private.
- **Create, Read, Update, Delete (CRUD) Todos**: Full management of your todo tasks.
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

## Detailed Key Features

- `Dashboard Synchronization / Real-time Updates`

  The Dashboard component ensures seamless synchronization every time a todo item is created, updated, or deleted. The `NewTodo` and `UpdateTodo` components handle these changes and invoke callback functions like `refreshAllTodos` and `refreshStats`. These functions use refs to trigger a rerender in the `AllTodos` and `TodoStats` components, ensuring the Dashboard always displays the most current data for a dynamic and responsive user experience.

- `User Authentication`

  Secure login and registration functionality to keep your todos private. The application uses token-based authentication to ensure that only authorized users can access their todos. 

- `Create, Read, Update, Delete (CRUD) Todos`

  Full management of your todo tasks. Users can create new todos, view all their existing todos, update the details of their todos, and delete todos they no longer need. The CRUD operations are implemented with RESTful API endpoints, ensuring a smooth and efficient user experience.

- `Searching`

  Easily find tasks by searching any keyword from the todo task. The search functionality allows users to quickly locate specific todos by entering relevant keywords, improving the usability and efficiency of the application.

- `Responsive Design`

  A user-friendly interface that adapts to different screen sizes, ensuring a great experience on both desktop and mobile devices. The responsive design ensures that users can manage their todos comfortably, regardless of the device they are using.

- `Statistics and Analytics`

  The application includes features for displaying statistics related to the user's todos. This helps users track their productivity and manage their tasks more effectively.

- `Error Handling and Validation`

  Robust error handling and validation mechanisms ensure that the application operates smoothly. Users receive clear feedback in case of errors or invalid input, enhancing the overall user experience.
