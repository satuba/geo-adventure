#GEO-ADVENTURE

This is an iOS app that will allow users to create geo challenges and complete existing challenges. 


##Example for creating a new challenge with superagent: 

superagent localhost:3000/api/challenges/newchallenge post {
challengeName:'cool challenge name', 
creator: 'user', 
image: 'imagestring', 
latitude:34534, 
longitude:43536, 
altitude:83736, 
timestamp:3736, 
eat:'FMCRLPvuEKjTL1uqz+FzaWJSgINAUssPeu5dWGw3KK/p'
}

required: 
challengeName: string
creator: string (username)
image: string
eat: token (string)


###Challenge will look like this in the database:
-{ __v: 0,
-  imageURL: 'https://shrouded-plateau-6281.herokuapp.com/img/challenge6.jpg',
-  submissionsCount: 0,
-  challengeId: '32c3e0d0-ff72-11e4-b03e-1dbef7cb539a',
-  challengeName: 'cool challenge name',
-  creator: 'user',
-  _id: '555d5f8be4bc300095e8467b',
-  submitters: [],
-  rating: { allRatings: [] },
-  loc: 
-   { timestamp: 3736,
-     altitude: 83736,
-     longitude: 43536,
-     latitude: 34534 } 
-}


##Example for submitting completed challenge with superagent: 

superagent localhost:3000/api/challenges/submit/aeb71530-ff78-11e4-be6d-51b759bfdd0b patch {
-newRating: 5, 
-submissionsMsg: 'hey yah', 
-username: 'user', 
-image: 'image string', 
-eat: 'ffUbq7HG182rOAdnvYGiy4q7ZGZW0t8GEhSCqzetXOfv'
-}

All above are required!

You'll get this as a response:
{ imageURL: 'https://shrouded-plateau-6281.herokuapp.com/img/challenge6.jpg' }



###Challenge will look like this in the database after submissions:

-{
-  '_id' : ObjectId('555d6a6c9dcb17e4951277a5'),
-  'imageURL' : 'https://shrouded-plateau-6281.herokuapp.com/img/challenge6.jpg',
-  'submissionsCount' : 2,
-  'challengeId' : 'aeb71530-ff78-11e4-be6d-51b759bfdd0b',
-  'challengeName' : 'cool challenge name',
-  'creator' : 'user',
-  'submitters' : [
-    'user',
-    'user'
-  ],
-  'rating' : {
-    'allRatings' : [
-      '3',
-      '5'
-    ],
-    'averageRating' : 4,
-    'newRating' : 5
-  },
-  'loc' : {
-    'timestamp' : 3736,
-    'altitude' : 83736,
-    'longitude' : 43536,
-    'latitude' : 34534
-  },
-  '__v' : 2,
-  'submissionsMsg' : 'hey yah'
-}


###User will look like this in the database:

-{
-  '_id' : ObjectId('555d5af0616b84809405a4da'),
-  'username' : 'user',
-  'completed' : [
-    {
-      'nameOfChallenge' : 'cool challenge name',
-      'imageUrl' : 'https://shrouded-plateau-6281.herokuapp.com/img/challenge6.jpg'
-    },
-    {
-      'nameOfChallenge' : 'cool challenge name',
-      'imageUrl' : 'https://shrouded-plateau-6281.herokuapp.com/img/challenge6.jpg'
-    }
-  ],
-  'basic' : {
-    'password' : '$2a$08$9mf6OneLGZP3LCzp9HBSEOMtzQ4V2IdiaucF4co65YbIFQ8bo8ppm',
-    'email' : 'user@example.com'
-  },
-  '__v' : 2
-}


##Contributors:

###JavaScript: 
-Michael Bowen, 
-Claudia Cuevas, 
-Jay Springate, 
-Satu Bailey

###iOS: 
-Craig Chaillie