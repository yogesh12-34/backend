## Live Application Demo

https://backend-jet-delta.vercel.app
## Technologies Used

- React and TailwindCSS for the frontend
- Redux for global state managment
- Node/Express for authentication and creating API endpoints
- MongoDB for storing the data of application

## Basic Features

- Users can register/login via email and password.
- Products page where user can see different type of products and apply filters based on brand and categories
- Users can add products to cart and then proceed to checkout 
- Payment functionality using stripe.js
- Users can track their orders history in Orders page.

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository.
2. Install the dependencies:
   - Navigate to the `e-commerce-backend` directory and run `npm install` or `yarn` if you are using yarn.
4. Set up Environment Variables:
   - In the `e-commerce-backend` directory, create a new file named `.env` based on the `.env.example` file.
   - Update the values of the environment variables in the `.env` file according to your preferences. For example, set the `PORT` variable to specify the desired port for the server and set `MONGO_URI` to your MongoDB connection URI.
5. Run the server:
Run this command
 ````bash
npm run dev
````
6. The application will be accessible at the port which you set in `.env` file.
