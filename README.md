# About Blog App

An application to display, create, edit, update and delete the posts by a user. Posts are visible to all the users.   

# login

Upon clicking on the Login button, login pop-up is displyed and User can either login by entering the Username & Password or login via Google. Only loggedIn users are able to create new posts, edit posts, delete posts. The db generates a random user-id upon loggin in. Posts matching the user id are open for edit/delete. For creating a post, user can click on the '+' icon on the top and add Title, Description and click on create. A randomly generated photo will be attached to the Title and Description.

# signup

A new user can sign up by clicking on the Sign up button. User will have to enter Name, e-mail address and Password and then it will be redirected to the application as a logged in user.

# logout

Upon clicking on the Logout button the user will be logged out and theb Edit/Delete capabilities will be gone. 

# Technologies Used
To make the app responsive, material CSS is used.
Used Google Oauth for signIn signOut functionality, firebase for storing user information. 

# How to run the project

To download the source code to your system :
git clone https://github.com/Tanya0328/CRUD-App.git

You will get a directory named CRUD-App created filled with the source code.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.




