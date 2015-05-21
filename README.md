#GeoAdventure

This is a RESTful API that accepts requests and generates responses in JSON data to create geo challenges and complete existing challenges. It utilizes [Encrypted Authentication Tokens](https://github.com/toastynerd/eat).

###Example for creating a new user with superagent:

```
superagent localhost:3000/api/create_user post {
username: 'bills22', 
email: 'test@test.com', 
password: '123456'
}
```

Response is an authentication token. Username, email, and password are required paramaters, and username and email must be unique.

###Example for signing in a user with superagent:

```
superagent localhost:3000/api/sign_in -u 'test@test.com:123456'
```

Response is an authentication token. Note that only email and password are required to sign in, not username.

###Example for creating a new challenge with superagent: 

```
superagent localhost:3000/api/challenges/newchallenge post {
challengeName:'cool challenge name', 
creator: 'user', 
image: 'imagestring',
loc: {
  latitude: 47.6097, 
  longitude: 122.331, 
  altitude: 83736, 
  timestamp: 3736, 
},
eat: (authentication token goes here)
}
```

Required parameters are:

```
challengeName: string
creator: string (username)
image: string
eat: token (string)
```


####Challenge will look like this in the database:

```
{ __v: 0,
  imageURL: 'https://exampleurl.com/img/challenge2.jpg',
  submissionsCount: 0,
  challengeId: '32c3e0d0-ff72-11e4-b03e-1dbef7cb539a',
  challengeName: 'cool challenge name',
  creator: 'user',
  _id: '555d5f8be4bc300095e8467b',
  submitters: [],
  rating: { allRatings: [] },
  loc: 
   { timestamp: 3736,
     altitude: 83736,
     longitude: 122.331,
     latitude: 47.6097 } 
}
```

###Example for fetching all challenges with superagent:

```
superagent localhost:3000/api/challenges get 
{eat: authentication token goes here}
```

Response will be an array of all existing challenges.

###Example for fetching a specific challenge with superagent:

```
superagent localhost:3000/api/challenges/32c3e0d0-ff72-11e4-b03e-1dbef7cb539a get
{eat: authentication token goes here}
```

Response will be the requested challenge from the database. Note that the long string at the end of the URL is the challengeId.

###Example for submitting completed challenge with superagent: 

```
superagent localhost:3000/api/challenges/submit/aeb71530-ff78-11e4-be6d-51b759bfdd0b patch {
newRating: 5, 
submissionsMsg: 'hey yah', 
username: 'user', 
image: 'image string', 
eat: (authentication token goes here) 
}
```

All of the above are required parameters!

You'll get the image URL as a response:

```
{ imageURL: 'https://exampleurl.com/img/challenge2.jpg' }
```


####Challenge will look like this in the database after submissions:

```
{
  '_id' : ObjectId('555d6a6c9dcb17e4951277a5'),
  'imageURL' : 'https://shrouded-plateau-6281.herokuapp.com/img/challenge6.jpg',
  'submissionsCount' : 2,
  'challengeId' : 'aeb71530-ff78-11e4-be6d-51b759bfdd0b',
  'challengeName' : 'cool challenge name',
  'creator' : 'user',
  'submitters' : [
    'user',
    'user'
  ],
  'rating' : {
    'allRatings' : [
      '3',
      '5'
    ],
    'averageRating' : 4,
    'newRating' : 5
  },
  'loc' : {
    'timestamp' : 3736,
    'altitude' : 83736,
    'longitude' : 122.331,
    'latitude' : 47.6097
  },
  '__v' : 2,
  'submissionsMsg' : 'hey yah'
}
```

####User will look like this in the database:

```
{
  '_id' : ObjectId('555d5af0616b84809405a4da'),
  'username' : 'user',
  'completed' : [
    {
      'nameOfChallenge' : 'cool challenge name',
      'imageUrl' : 'https://exampleurl.com/img/challenge2.jpg'
    },
    {
      'nameOfChallenge' : 'cool challenge name',
      'imageUrl' : 'https://exampleurl.com/img/challenge2.jpg'
    }
  ],
  'basic' : {
    'password' : '$2a$08$9mf6OneLGZP3LCzp9HBSEOMtzQ4V2IdiaucF4co65YbIFQ8bo8ppm',
    'email' : 'user@example.com'
  },
  '__v' : 2
}
```

###Contributors:

####JavaScript: 
Michael Bowen, 
Claudia Cuevas, 
Jay Springate, 
Satu Bailey

####iOS: 
Craig Chaillie
