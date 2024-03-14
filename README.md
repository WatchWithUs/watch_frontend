# Project WatchWhitUs
![WatchWhitUslogo](https://github.com/WatchWithUs/watch_frontend/assets/152170826/2b8385e8-20e3-408a-9d13-0d3a3e348681)



## About

WatchWhitUs is a project app that allows users to create a list of movies and a personalized collection for each user. <br>Users can authenticate to access additional features such as deleting and updating their collections.

- This repo implements the backend REST API (built in Express + MongoDB).
- A repository for with the frontend (React App) can be found here:[ (https://github.com/WatchWithUs/watch_frontend) ](https://github.com/WatchWithUs/watch_frontend)



## Instructions

To run in your computer, follow these steps:
- clone 
- install dependencies: `npm install`
- create a `.env` file with the following environment variables
  - ORIGIN, with the location of your frontend app (example, `ORIGIN=https://mycoolapp.netlify.com`)
  - TOKEN_SECRET: used to sign auth tokens (example, `TOKEN_SECRET=ilovepizza`)
- run the application: `npm run dev` or `npm start`





## Demo

A demo of the REST API can be found here: https://watch-with-us-app.netlify.app/

