
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
   - Update the values of the environment variables in the `.env` file with your Firebase configuration details.
   - In the root directory, create a new file named `.env` based on the `.env.example` file.
   - Update the values of the environment variables in the `.env` file according to your preferences. For example, set the `PORT` variable to specify the desired port for the server and set `MONGO_URI` to your MongoDB connection URI.
5. Run the server:
   - Navigate to the `server` directory and run `npm run start`.
6. Run the client:
   - Navigate to the `frontend` directory and run `npm start`.
7. The application will be accessible at `http://localhost:3000`.

Please make sure to keep the `serviceAccountKey.json` file and sensitive information secure and not commit them to version control.

## GIFs

![chrome-capture-2022-8-7](https://user-images.githubusercontent.com/66206865/188901119-65a05b65-3c76-4c3f-92c5-042d061df8e1.gif)

![chrome-capture-2022-8-7 (1)](https://user-images.githubusercontent.com/66206865/188900841-2dfe91c2-eb78-4f70-a013-babe0124ee68.gif)

![chrome-capture-2022-8-7 (2)](https://user-images.githubusercontent.com/66206865/188900662-a120aef4-ced1-442b-98dd-ab90b4cea7b5.gif)
