# Frontend for Coral vs Kingsnake Image Classifier

Provides a friendlier frontend to the [Coral vs Kingsnake Image Classifier](https://github.com/mpoisot/snakes) project.

The frontend server uses the [Next.js](https://nextjs.org/) framework to serve React-powered web pages. The two-server frontend/backend architecture is arguably overkill for this demo, but is a realistic set up for how a production website might integrate a python-powered model into an existing complex javascript-based platform.

_Note: I intended to make a much nicer frontend UX, but I spent too much time on the backend and it's time to move on. Hopefully it's still a useful demonstration for future projects._

## Run Locally

```
npm install
npm run dev
```

Or

```
yarn install
yarn dev
```

## Deploy to Vercel

The inspiration for this project, [Cougar or Not](https://github.com/simonw/cougar-or-not), originally ran on Zeit/Now.sh (now renamed to Vercel). Vercel makes Next.js so they have a strong interest in making it easy to deploy Next.js apps. The free tier is fast and more generous than Heroku (automatic https on custom domains, no sleep).

Prerequisites:

- Create a [Vercel account](https://vercel.com/onboarding)
- Install the [Vercel CLI](https://vercel.com/download)

Register the app with Vercel. The CLI will step you through creating the project. Replace `BACKEND_URL` with the url of your own Snakes API server (don't include a final '/').

`vercel --build-env BACKEND_URL=https://snakes-api.herokuapp.com`

For subsequent deploys just run `vercel` or `vercel --prod`

## Deploy to Heroku

Prerequisites:

- Create a [Heroku account](https://signup.heroku.com/)
- Install the [heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

Create and register a new heroku app. Tell the frontend where the backend is. Replace the url with your own Snakes API server (don't include a final '/').

```
heroku create
heroku config:add BACKEND_URL=https://snakes-api.herokuapp.com
```

Deploy

`git push heroku`
