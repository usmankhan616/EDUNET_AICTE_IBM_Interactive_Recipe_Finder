
-----

# Interactive Recipe Finder 🍲

An intuitive web application that helps users discover new recipes based on the ingredients they already have. This project aims to reduce food waste and make cooking easier by providing smart recipe suggestions and a seamless user experience.

### Live Demo

You can view the live deployed application here: **[Your Vercel Link Here]**

-----

## 📸 Screenshots

Here's a look at the application in action.

| Home Page | Search Results | Recipe Details |
| :---: | :---: | :---: |
| **[Your Screenshot of the Home Page]** | **[Your Screenshot of the Search Results]** | **[Your Screenshot of the Recipe Modal]** |
*(After you create the file, you can drag and drop your screenshots into this section on the GitHub website to upload them.)*

-----

## ✨ Features

  * **Smart Ingredient Search:** Users can enter a list of ingredients and get relevant recipe suggestions from the Spoonacular API.
  * **Detailed Recipe View:** Click on any recipe to see a detailed modal with a full ingredient list and step-by-step cooking instructions.
  * **User Authentication:** Secure user registration and login system with password hashing.
  * **Save Your Favorites:** Logged-in users can save their favorite recipes to their personal profile.
  * **Responsive Design:** A clean, modern UI that works beautifully on desktops, tablets, and mobile devices.
  * **Dark/Light Mode:** A theme switcher for a comfortable viewing experience at any time of day.

-----

## 🛠️ Tech Stack

This project is a full-stack application built with the MERN stack and other modern technologies.

  * **Front-End:**

      * HTML5
      * CSS3 (with Flexbox & Grid)
      * JavaScript (ES6+)
      * [Bootstrap](https://getbootstrap.com/) (for the responsive grid)
      * [Spoonacular API](https://spoonacular.com/food-api) (for recipe data)

  * **Back-End:**

      * [Node.js](https://nodejs.org/)
      * [Express.js](https://expressjs.com/) (for the REST API)
      * [Mongoose](https://mongoosejs.com/) (for database object modeling)
      * [JSON Web Tokens (JWT)](https://jwt.io/) (for authentication)
      * [bcrypt.js](https://www.google.com/search?q=https://www.npmjs.com/package/bcryptjs) (for password hashing)

  * **Database:**

      * [MongoDB Atlas](https://www.mongodb.com/atlas) (Cloud-hosted NoSQL database)

  * **Deployment:**

      * [Vercel](https://vercel.com/)

-----

## 🚀 How to Run Locally

To get a local copy up and running, follow these simple steps.

### Prerequisites

  * Node.js installed (`v18` or higher)
  * A MongoDB Atlas account and a connection string

### Setup

1.  **Clone the repository:**

    ```sh
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Set up the Backend:**

      * Navigate to the backend folder:
        ```sh
        cd backend
        ```
      * Install the necessary packages:
        ```sh
        npm install
        ```
      * Create a `.env` file in the `backend` folder and add your MongoDB connection string and a JWT secret:
        ```env
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_super_secret_key
        ```
      * Start the backend server:
        ```sh
        npm run dev
        ```

    The server will be running on `http://localhost:5000`.

3.  **Set up the Frontend:**

      * Open a **new terminal**.
      * Navigate to the `frontend` folder from the root directory:
        ```sh
        cd frontend
        ```
      * The frontend is a static site. The best way to run it is with the **Live Server** extension in VS Code.
      * Right-click the `index.html` file and select "Open with Live Server".
      * Your browser will open the site, usually at `http://127.0.0.1:5500`.