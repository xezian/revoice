# revoice
A game that involves reversing vocal audio clips.

I am building this in my free time. It uses the Web Audio API to reverse audio clips, and gives users the opportunity to attempt to reproduce a normal sounding word or phrase by recording it backwards.

## How to run locally:

- clone the repo. type: `git clone git@github.com:xezian/revoice.git` on the command line
- install packages. type `yarn` (if yarn needs to be installed, first type `npm install -g yarn`)
- you will need mongoDB installed. help for that is [here](https://docs.mongodb.com/manual/installation/)
- you will need to have aws credentials in a `.env` file in the root directory. sign up [here](https://aws.amazon.com/), and make your file like this:
```
AWS_SECRET_ACCESS_KEY=YOUR_SECRET_KEY_GOES_HERE
AWS_ACCESS_KEY_ID=YOUR_ACCESS_KEY_GOES_HERE
S3_BUCKET=NAME_OF_YOUR_S3_BUCKET
```
- once all of the above has been done, you should be able to type `yarn dev` and run the dev version of revoice

## Deployed version

- I will link a deployed version here soon, once it is deployed

There is another repo with an earlier version of just the front end of this app which can be found [here](https://github.com/xezian/react-revoice), and a deployed version of that repo which can be found [here](https://react-revoice.herokuapp.com/)

© Copyright 2018 Jason A. Leo