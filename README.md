# GuitarApp

GuitarApp is a web app for guitar players. It includes a Tuner and a practice app, NotePractice, that randomly shows notes and counts the time that the user takes do to play them.

## Development

The app is written in React and Javascript, bootstraped with `create-react-app`. The pitch detection algorithm uses autocorrelation to find the frequency of the signal, which is broken down into small chunks during processing.

To start the development server, run `yarn start`. Run `yarn` the first time before that to install the dependencies.

## Build

To build the app, just run `yarn build` in the root directory. The `build` folder contains the bundled website, and can be served with a simple http server.

## Permissions

The app requires microphone permissions, and must be served over HTTPS when hosted on a server or microphone access will not be allowed. This isn't necessary for local development - you can grant access from your browser settings.

## Deploying

The app can be hosted using AWS. To do so, create an s3 bucket and configure it to host a static website. The bucket serves the website as HTTP, so to get HTTPS we can use CloudFront, Amazon's CDN. Create a distribution and set it to point to your bucket. You can check the AWS docs for examples on both s3 and CloudFront.

After creating the bucket and the distribution, you can use the `deploy.sh` script which builds the app, uploads it to the s3 container then runs a cache invalidation on the Cloudfront distribution.
