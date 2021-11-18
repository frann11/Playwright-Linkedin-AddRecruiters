# Playwright-Linkedin-AddRecruiters
In an effort to expand my network I created a playwright script to automatically add IT recruiters to my profile, althrough it can be used to add any particular profile and be of good use to anyone wanting to expand their network

## Usage
```javascript
npm install
```
- After installing dependencies
```javascript
npm start
```

- create a .env file with the following variables
```javascript
LINKEDIN_USER=YOURUSER
LINKEDIN_PASSWORD=YOURPASSWORD

```

- replace in index.js the params of the main function call to your use
```javascript
addProfiles({profileSearched: ProfileToSearch, cuantity: CuantityToAdd, myName: YourName})
```

- replace message in file with your personal message if wanted
- run index.js

### TODO:
- learn about kubernetes 
- deploy it in the cloud environment so it actually runs on a daily basis
