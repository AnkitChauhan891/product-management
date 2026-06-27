# product_management
Building a Product Module with Node.js

# API Routes
# User Routes

1. POST /api/auth/register (User registration)
2. POST /api/auth/login (User login)

# Product Routes

1. GET /api/products (Get all products including pagination and search)
2. GET /api/products/:id (Get Specific Product Details)
3. POST /api/products (Create a product)
4. PUT /api/products/:id (Updated a Product)
5. DELETE /api/products/:id (Deleted Specific Product)

# Import Postman Collection in postman

1. Import the collection in postman which is located inside `postman/user_product_collection` directory.

# Installation

1. Clone this repository.
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.
4. Create a MySQL database and rename `env_example` to `.env` file with database connection details.
5. Also update the DB credentials in file `congig/config.json` along with `.env` which is being used at time of migration.

# Database Setup

1. Run migration files to create database tables:

    `npx sequelize-cli db:migrate`

2. Run seeders files to insert an dummy data for one user and five products

    `npx sequelize-cli db:seed:all`

# Start Node Server

    `npm run start`

