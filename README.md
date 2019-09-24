# Wedding Portfolio Backend

#### Backend for Wedding Portfolio build week project

# Deployed Backend

[--->Deployed Site <---](http://weddingportfolio.herokuapp.com)

# Technologies

#### production

- Express: fast, unopinonated, minimalist web framework for Node.js
- Bcrypt: Hashes passwords and adds securtity to the database and user information
- JSON Web Tokens: Generate and verify web tokens to maintain and add securtiy to database
- Postgres: is a relational database that uses tables to store data
- Knex: SQL query builder for various relational databases, like MYSQL, Postgres, etc...
- Cors: is a package for providing middleware that can be used to enable CORS

#### Developer

- Nodemon: is a tool used by developers...it helps with restarting the server when the file changes. Nodemon watches the file ex. nodemon index.js
- pg: is a non-blocking PostgresSQL client for Node.js

# Table of Contents

- [Auth Routes](#AuthRoutes)

  - Register User
  - Login User

- [Event Routes](#EventRoutes)

  - Get Events
  - Post Events By Planner ID
  - Update Events By Planner ID && Event ID
  - Delete Events By Planner ID && Event ID

# Auth Routes

## Register

---

#### Register a user

##### _Method Url_: `auth/register`

##### HTTP method: [POST]

### Headers

| Name           |  Type  | Required |       Description        |
| :------------- | :----: | :------: | :----------------------: |
| `Content-Type` | String |   Yes    | Must be application/json |

### Body

| Name         |  Type  | Required |       Description        |
| :----------- | :----: | :------: | :----------------------: |
| `first_name` | String |   Yes    | Must be application/json |
| `last_name`  | String |   Yes    |
| `email`      | String |   Yes    |      Must be unique      |
| `username`   | String |   Yes    |      Must be unique      |
| `password`   | String |   Yes    |
| `location`   | String |   Yes    |

#### _example:_

```

{
  "first_name": "First Name"
  "last_name": "Last Name",
  "email": "email@email.com",
  "username": "username",
  "password": "password123",
  "location": "NYC",
}
```

#### Response

201 (Created)

If you successfully register a user the endpoint will return an HTTP response with a status code 201 message.

```
    "newUser": {
       "first_name": "Test",
       "last_name": "Test",
       "email": "testingfgfgdsdsgg@testing.com",
       "username": "gfg",
       "location": "California"
   },


```

500 (Internal Server Error)

if any of the above data is missing the registration will not go through, it will produce a 500 error as show below

#### _example:_

```
{
    "error": "Server could not register user"
}
```

---

# Login

## Logs a user in

#### _Method Url:_ `/auth/login`

#### HTTP method [POST]

### Headers

| Name           |  Type  | Required |       Description        |
| :------------- | :----: | :------: | :----------------------: |
| `Content-Type` | String |   Yes    | Must be application/json |

### Body

| Name       |  Type  | Required |              Description              |
| :--------- | :----: | :------: | :-----------------------------------: |
| `username` | String |   Yes    | Must be the username in the database  |
| `password` | String |   Yes    | Must match a password in the database |

##### _example:_

```
{
"username":"username",
"password": "password123"
}
```

#### Response

200 (OK)

If you successfully login, the endpoint will return an HTTP response with a status code 200, message, and a token as below.

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkVLbmFwbWFuMTAwIiwiaWQiOjMsImlhdCI6MTU2OTM1ODg2MiwiZXhwIjoxNTY5NDQ1MjYyfQ.sNDjccLyuHWhgkne5Ky0hR1-Pd7QNGr6TyKlJqTDHSk"
}

```

401 (UNAUTHORIZED)

If you fail to login, the endpoint will return an HTTP response with a status code 401 which indicates the username and/or password entered is not valid.

```
{
    "error": "Invalid Credentials"
}
```

500 (Bad Request)

If there is a server or database error, the endpoint will return an HTTP response with a status code 500 and a body as below. However this error can also come from a user mistake too.

```
{
    "error": "Server could not log you in"
}
```

# Planner Routes

## Get All Events

#### _Method Url:_ `/`

##### HTTP method: [GET]

## **Get list of all planners events**

#### Headers

| Name            |  Type  | Required |       Description        |
| :-------------- | :----: | :------: | :----------------------: |
| `Content-Type`  | String |   Yes    | Must be application/json |
| `Authorization` | String |   Yes    |      JSON Web Token      |

#### Response

200 (OK)

The endpoint will return a HTTP response with a status code and a body as below

```
 [
    {
        "id": 1,
        "event_name": "Event Name",
        "event_description": "Event Description",
        "event_location": "TBD",
        "theme": "TBD",
        "planner_id": 1
    },
    {
        "id": 2,
        "event_name": "Event Name",
        "event_description": "Event Name",
        "event_location": "TBD",
        "theme": "TBD",
        "planner_id": 2
    },
    {
        "id": 4,
        "event_name": "Event Name",
        "event_description": "Event Name",
        "event_location": "TBD",
        "theme": "TBD",
        "planner_id": 3
    },

```

500(SERVER ERROR)

If there is a server or database error, the endpoint will return an HTTP response with a status code 500 and a body as below.

```
    {
        error: "Server could not get events"
    }

```

## Get Single Event By Id

#### _Method Url:_ `/:id`

##### HTTP method: [GET]

## **Get Single Event**

#### Headers

| Name            |  Type  | Required |       Description        |
| :-------------- | :----: | :------: | :----------------------: |
| `Content-Type`  | String |   Yes    | Must be application/json |
| `Authorization` | String |   Yes    |      JSON Web Token      |

#### Response

200 (OK)

The endpoint will return a HTTP response with a status code and a body as below

```

    {
        "id": 1,
        "event_name": "Event Name",
        "event_description": "Event Description",
        "event_location": "TBD",
        "theme": "TBD",
        "planner_id": 1
    }

```

400(CLIENT ERROR)

The endpoint will return a HTTP response with a status code and a body as below

```

{
    "error": "Can not find event with that id"
}
```

500(SERVER ERROR)

If there is a server or database error, the endpoint will return an HTTP response with a status code 500 and a body as below.

```
    {
        error: "Server could not get events"
    }

```

## Get Events

#### _Method Url:_ `/:id/events`

##### HTTP method: [GET]

## **Need Planner ID to get events**

#### Headers

| Name            |  Type  | Required |       Description        |
| :-------------- | :----: | :------: | :----------------------: |
| `Content-Type`  | String |   Yes    | Must be application/json |
| `Authorization` | String |   Yes    |      JSON Web Token      |

#### Response

200 (OK)

The endpoint will return a HTTP response with a status code and a body as below

```
 {

        "event_id": 2,
        "planner_id": 1,
        "event_name": "Test Event",
        "event_description": "An Awesome Event",
        "theme": "TBD",
        "event_location": "NYC"

    }

```

400(CLIENT ERROR)

The endpoint will return a HTTP response with a status code and a body as below

```

{
    "error": "That planner has no events"
}
```

500(SERVER ERROR)

If there is a server or database error, the endpoint will return an HTTP response with a status code 500 and a body as below.

```
    {
        error: "Server could not get events"
    }

```

# Post Events

#### _Method Url:_ `/:id/events`

##### HTTP method: [POSt]

## **Need Planner ID to post event**

#### Headers

| Name            |  Type  | Required |       Description        |
| :-------------- | :----: | :------: | :----------------------: |
| `Content-Type`  | String |   Yes    | Must be application/json |
| `Authorization` | String |   Yes    |      JSON Web Token      |

#### Response

200 (OK)

The endpoint will return a HTTP response with a status code and a body as below

```
 {

      {
        "id": 12,
        "event_name": "New Event",
        "event_description": "Event...",
        "event_location": "Paris",
        "theme": "Who knows",
        "planner_id": 4
    }

    }

```

500(SERVER ERROR)

If there is a server or database error, the endpoint will return an HTTP response with a status code 500 and a body as below.

```
    {
        error: "Server could not post event"
    }

```

# Update Events

#### _Method Url:_ `/:id/events/:eid`

##### HTTP method: [PUT]

## **Need Planner ID and Event ID to update event**

#### Headers

| Name            |  Type  | Required |       Description        |
| :-------------- | :----: | :------: | :----------------------: |
| `Content-Type`  | String |   Yes    | Must be application/json |
| `Authorization` | String |   Yes    |      JSON Web Token      |

#### Response

200 (OK)

The endpoint will return a HTTP response with a status code and a body as below

```
 {

      {
        "id": 11,
        "event_name": "Lambda Amazing Wedding",
        "event_description": "Lambda Lambda Lambda",
        "event_location": "Bora Bora",
        "theme": "Marooon",
        "planner_id": 4
    }

    }

```

500(SERVER ERROR)

If there is a server or database error, the endpoint will return an HTTP response with a status code 500 and a body as below.

```
    {
        error: "Failed to update event"
    }

```

# Delete Events

#### _Method Url:_ `/:id/events/:eid`

##### HTTP method: [DELETE]

## **Need Planner ID and Event ID to delete event**

#### Headers

| Name            |  Type  | Required |       Description        |
| :-------------- | :----: | :------: | :----------------------: |
| `Content-Type`  | String |   Yes    | Must be application/json |
| `Authorization` | String |   Yes    |      JSON Web Token      |

#### Response

200 (OK)

The endpoint will return a HTTP response with a status code and a body as below. Has count of number of records removed

```
 {

      {
    "removed": 1
}

    }

```

500(SERVER ERROR)

If there is a server or database error, the endpoint will return an HTTP response with a status code 500 and a body as below.

```
    {
        error: "Server could not delete event"
    }

```
