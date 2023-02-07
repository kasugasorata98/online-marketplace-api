# Online Marketplace API

To develop an online marketplace APIs for an ecommerce
application

- NodeJS
- MongoDB
- Express

## Features

- Create user
- Create and get products
- create and get stores
- Add cart entries, edit quantity/shipping methods and deleting.
- Product search with pagination.

Entity Relationship Diagram in the repo called ERD.png
Infrastucture Diagram in repo called Infrastructure Diagram.png

## Installation

Dillinger requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd online-marketplace-api
npm i
npm run start
```

## API Requirements

- .env file included
- Access the API documentation in [Swagger UI](http://localhost:3000/.docs/)
- Some api requires an Authentication header example, 'Bearer {token}'
- Insert the Bearer token into an Authorize button at the top right of the Swagger UI.

## Steps Required to Enable all API

1. Create a user
2. Create a store (for this example, the user is also an admin)
3. Create a product
4. The rest of the api can then be accessible
