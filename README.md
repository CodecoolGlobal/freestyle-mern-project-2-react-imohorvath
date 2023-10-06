# Travel Bucketlist

🧭🗺🌟 **Dream. Plan. Explore.** 🌟🗺🧭

## About

*Discover new places with Travel Bucketlist, the perfect app for everyone who loves to travel! You can create and manage your travel bucketlists, rate their desire to visit selected destinations, and leave comments about each city. Unleash your inner explorer and make a list of cities you'd love to visit.* 🌃🏖️

## Features

- **View Cities**: Browse a list of cities, including their names, countries, and visitor reviews.
- **City Search**: Filter cities by name using the search bar.
- **Country Filter**: Filter cities by country using the country dropdown.
- **City Sorting**: Sort cities by name, country, or reviews in ascending or descending order.
- **City Details**: View detailed information about a city, including its image, country, timezone, population, language, and currency.
- **Bucketlist**: View and manage a list of cities added to the user's bucketlist.
- **Add city to Bucketlist**: Add cities to the bucketlist with comments and ratings.
- **Modify Bucketlist Items**: Modify existing bucketlist items' comments and ratings.
- **Delete from Bucketlist**: Remove cities from the bucketlist.
- **Rating System**: Rate cities using heart icons.

*Your dreams aren't static, and neither should be your bucketlist. Cultivate your desires, chart out your travel path, and let WanderWishlist be your compass to the world's wonders. Start plotting your next adventure now!* 🌏🛫📝

## Technologies

[![MongoDB][MongoDB]][MongoDB-url]
[![Express.js][Express.js]][Express.js-url]
[![React][React]][React-url]
[![NodeJS][NodeJS]][NodeJS-url]
[![Javascript][Javascript]][Javascript-url]
[![React Router][React Router]][React Router-url]
![CSS]

## Installation Guide

### Prerequisites:

✅ Docker Desktop installed on your system. [![Docker][Docker]][Docker-url]

✅ Git installed on your system. [![Git][Git]][Git-url]

### Steps:

#### 1.  Clone the Repository:

Open bash terminal and navigate to the directory where you want to download the application.

```bash
git clone git@github.com:CodecoolGlobal/freestyle-mern-project-2-react-imohorvath.git
```

#### 2. Set .env file

Copy .env.sample and insert this line as a value for MONGO_URL

"mongodb://admin:12345@travelbucketlist-mongodb:27017/?authSource=admin"

Save the changes and delete .sample extension

#### 3.  Navigate to the Application Directory:

In bash terminal navigate to the application directory

```bash
cd freestyle-mern-project-2-react-imohorvath
```

#### 4. Run the Application with Docker:

Launch the Docker Desktop application.
In Bash simply use the following command to start the application:

```bash
docker compose up -d
```

#### 5. Access the Application:

Open your browser and type the following url: http://localhost:3000/

#### 6. Stopping the Application:

In order to stop the application, you should use this command in Bash:

```bash
docker compose down --volumes
```

## Authors

🧙‍♀️ [imohorvath](https://github.com/imohorvath) 

🧚 [noemi-varga](https://github.com/noemi-varga)

## Road Map

- [X] Seed database with cities and details
- [X] User can check city details
- [X] User can add city to bucketlist with comment and rating point
- [X] User can edit and delete bucketlist items
- [X] User can search, filter and sort destinations
- [X] User can mark bucketlist item as visited
- [ ] User can set date for a bucketlist item
- [ ] Create admin page for adding new items for citylist 


<!-- Badge links -->
[JavaScript]: https://img.shields.io/badge/javascript-black?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E
[React]: https://img.shields.io/badge/React-black?style=for-the-badge&logo=react&logoColor=61DAFB
[React Router]: https://img.shields.io/badge/React_Router-black?style=for-the-badge&logo=react-router&logoColor=CA4245
[NodeJS]: https://img.shields.io/badge/node.js-black?style=for-the-badge&logo=node.js&logoColor=6DA55F
[MongoDB]:https://img.shields.io/badge/MongoDB-black?style=for-the-badge&logo=mongodb&logoColor=%234ea94b
[Express.js]:https://img.shields.io/badge/express.js-black?style=for-the-badge&logo=express&logoColor=%2361DAFB
[CSS]: https://img.shields.io/badge/CSS3-black?style=for-the-badge&logo=css3&logoColor=1572B6
[Docker]: https://img.shields.io/badge/docker-black?style=plastic&logo=docker&logoColor=%230db7ed
[Git]: https://img.shields.io/badge/git-black?style=plastic&logo=git&logoColor=%23F05033

<!-- Project url -->
[JavaScript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[React-url]: https://reactjs.org/
[React Router-url]: https://reactrouter.com/en/main
[NodeJS-url]: https://nodejs.org/en
[MongoDB-url]: https://www.mongodb.com/
[Express.js-url]: https://expressjs.com/
[Docker-url]: https://docs.docker.com/get-docker/
[Git-url]: https://git-scm.com/downloads