# Data feed

A company is building a system for managing data feeds input from external sources.
Data feed is a collection of data that has keys and values ordered according to specific
structure.
Each source has a different way to login and extract the relevant data feed.
User can filter data using display options sidebar or update field value with new value.

## Design

User should be logged in in order to see feed data

![Image](https://res.cloudinary.com/dtwqtpteb/image/upload/v1665940886/wg7sdygutef3ivwoixwo.png
)

That's mean that user is able to see one feed at time.

user's table contains the following fields:
user_id (Primary key) 
username 
pwd - password (in order to enable login functionality)
email
created_on - creation time of the user
last_login (might be helpful in future feature, for example - token refresh)

feed's table contains the following fields:
feed_id (Primary key)
user_id (foriegn key, references user table)
updated_on - timestamp to represent feed creation
feed_data - json that represnts the data of the feed


![Image](https://res.cloudinary.com/dtwqtpteb/image/upload/v1665940985/asyjte1jsybiicre2g3l.png
)

## Workflow

Login (future feature)

![Image](https://res.cloudinary.com/dtwqtpteb/image/upload/v1665942815/gxlq5wjbok7nf67lkjfq.jpg
)

After implementing login endpoint on server side, all the requests will be passed with Bearer token, that will make sure the system is secured.

Get data feed
Now that user is logged in, he is able to display feed

![Image](https://res.cloudinary.com/dtwqtpteb/image/upload/v1665943505/g4pxxfwa7bkntqqvcpmn.jpg
)

## Installation

Before running this project install node modules in both folders with this command:

```
npm install
```

create .env file with this variable in backend folder:

```
API_KEY=
```

Get a key from this site (or used the one I supplied)
```
https://aviationstack.com/
```

## Run project:
Run backend:
```
nodemon server.ts
```

or:
```
nodemon server.ts
```