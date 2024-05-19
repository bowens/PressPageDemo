# Benjamin Owens' PressPage Demo

## What it is

This is a simple Symfony application that hosts a React / TypeScript frontend application on the /users page.

## What does the backend do

The backend is almost entirely just a pair of simple Twig templates, one of which includes a frontend React application.
The Symfony part of this application is easily replaceable, and was chosen soley because it is what I am most familiar
with.

## What does the frontend do

The frontend is a React application built with TypeScript using Zustand for state management. Upon loading, it will
connect to api.github.com (which delivers data on 30 users) and display 10 of those users. Clicking "Load More" will
cause another 10 (of the initial 30) users to be displayed. When no more hidden users remain in the queue another
request will be made to GitHub for another 30 users. Each user card contains a "delete user" button that will appear 
when hovered over.

## Requirements for running this application
* [Symfony CLI](https://symfony.com/download) is recommended for its built in HTTP server.
* [Composer](https://getcomposer.org/download/) is required to install Symfony components.
* [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) is required to install React, TypeScript, and
  other supporting libraries.
* PHP 8.2 or higher is required to run the Symfony server along with the following extensions: ctype, iconv, PCRE,
  Session, SimpleXML, and Tokenizer. If you are unsure but have the Symfony CLI program installed you can verify by
  running `symfony check:requriments` in a terminal.

## How to build this application
* Install PHP dependencies: `composer install`
* Install JS dependencies: `npm install`
* Build the JS source: `npm run dev`

## How to run this application's tests
* ESLint tests are run via `npm run eslint`
* Jest unit tests are run via `npm run jest`
* Cypress end-to-end tests are run via `npm run cypress`
    * Cypress defaults to 'http://localhost:8000' for its tests. This can be overriden with the CYPRESS_HOST_URL
      environment variable like so (do not include any trailling
      slashes): `CYPRESS_HOST_URL='https://example.org' npm run cypress`

## How to start this application

For testing and development I recommend using Symfony's CLI application for its built in web server. It can be started
with the command `symfony server:start`. For production use this can be configured like any other Symfony application
using your choice of Apache, nginx, Caddy, etc.

## How to use this application

Begin by navigating your browser to your configured webserver. If you are using the Symfony CLI this will be
at [http:/localhost:8000](http://localhost:8000).

The homepage is a simple corporate logo with a greeting header, followed by a button linking to
the [/users](http://localhost:8000/users) page.

After navigating to the users page the browser will automatically fetch the data of 30 GitHub users and then display 10
of those users. At the bottom of the users listing is a button labeled "Load More" that will display an additional 10
users. Pressing the button after all 30 initial users are displayed will restart the process of fetching data on 30 users
from GitHub and displaying them in batches of 10.

Users may be removed from the page simply by moving the mouse cursor over their user profile card and clicking 'Delete
User'.

Users data is stored in the browser localStorage. This application does not yet have the ability to flush its own
storage cache; this must be done manually in the browser developer tools by running `localStorage.clear()`

## Todo / unimplemented features
* This application is not yet translatable.
* Users cached data does not have a user-friendly method of being cleared.
* While the frontend uses a simple responsive design it has not yet been verified to work on mobile browsers such as
  iOS/Safari.
* There is presently no WAI-ARIA support, and it has not yet been tested with JAWS, NVDA, or any other screen readers.
* Making too many requests to api.github.com may result in your IP being temporarily 'soft banned' by api.github.com (it
  will cease to deliver usable results, only a message that your IP is not allowed to make additional requests for a
  cooldown period). It is not yet possible to make an authenticated request to increase the number of requests that may
  be made before GitHub's rate limiter takes effect.
* Once a user has been removed via the "delete user" button there is no ability to undo their removal and reinsert them
  into the page.