# Full-stack webshop

## Github Project

https://github.com/users/laszloekovacs/projects/4

-   [Remix Docs](https://remix.run/docs)

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

-   `build/`
-   `public/build/`

[![MongoDB](https://img.shields.io/badge/MongoDB-4DB33D?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-4DB33D?style=for-the-badge&logo=mongoose)](https://mongoosejs.com/)
[![React](https://img.shields.io/badge/React-61DBFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Remix](https://img.shields.io/badge/Remix-cyan?style=for-the-badge&logo=remix&logoColor=black)](https://remix.run/)

[![forthebadge](https://forthebadge.com/images/badges/0-percent-optimized.svg)](https://forthebadge.com)

### NOTES

#### Azure default credentials set-up

-   register app
-   create credentials
-   set secrets
-   set env variables
-   get credentials (async function)

#### Rough plan

1. homepage

-   display list of products or categories
-   filter and search
-   product carousel, slideshow

2. product page

-   display detailed info about product
-   product images
-   product reviews ratings
-   similar products

3. shopping cart

-   track selected, ammount
-   total ammount, subtotal
-   add, remove, update quantity

4. checkout process

-   collect shipping info
-   payment
-   process order, send confirm email

5. auth

-   login and registration, delete account

6. wishlist

-   allow saving product for later
-   social media integration, sharing products

#### azure keyvault admininstrative tasks

-   in azure, go to active directory (Entra) and register app
-   configure certificates and secrets and create a new one
-   configure app permissions, Add keyvault, storage, cosmosdb
-   grant consent
-   get the keyvault url from the keyvaults
-   use client id , secret to set env variables to use default credentials
-   set proper access policies in keyvault tab for the shopper principal
