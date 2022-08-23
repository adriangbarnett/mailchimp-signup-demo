# Functional mail chimp demo
Register a user with mailchimp using "exresss" and "request"

# npm
npm i express dotenv request

# setup
Requires a functional mailchimp account

## .env
Add the following into a .env file

MAILCHIMP_AUTH=xxxxxxxx-xxx
MAILCHIMP_MAIL_URL=https://us7.api.mailchimp.com/3.0/lists/xxxxxx

# run
npm run dev

# usage
Send the POST request saved in file "demo.rest" then look at the response

# git notes
…or create a new repository on the command line
echo "# mailchimp-signup-demo" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/adriangbarnett/mailchimp-signup-demo.git
git push -u origin main

…or push an existing repository from the command line
git remote add origin https://github.com/adriangbarnett/mailchimp-signup-demo.git
git branch -M main
git push -u origin main