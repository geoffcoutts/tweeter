# Tweeter Project

Tweeter is a simple, single-page Twitter clone.

The app uses AJAX for database calls to MongoDB and jquery for scripting purposes. It also runs on an express server.

The app has all of the basic functionalities outlined in the project description, but also allows for pressing enter to submit a tweet and is slightly optimized for mobile viewing by removing the margins on mobile devices.

## WIP

Currently working on user registration and login in a separate branch.

## Screenshots

!["Sreenshot of Tweeter layout"](https://github.com/geoffcoutts/tweeter/blob/master/docs/Tweeter%20Layout.png?raw=true)
!["Sreenshot of Tweeter alert messages"](https://github.com/geoffcoutts/tweeter/blob/master/docs/Tweeter%20Layout.png?raw=true)
!["Sreenshot of Tweeter in mobile profile"](https://github.com/geoffcoutts/tweeter/blob/master/docs/Tweeter%20Mobile.png?raw=true)

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
4. Go to <http://localhost:8080/> in your browser.

## Dependencies

- Express
- Node 5.10.x or above
- Body Parser
- Chance
- md5
- MongoDB
