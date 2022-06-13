# SCAMP-C6-Assessment

## Automated Payment Reminder Application

[Documentation](https://documenter.getpostman.com/view/19816123/Uz5NjtJL)

### Local Setup
Create and connect to the Mongo database (Instructions may need to be adapted based on operating system):
**Ensure the db directory exists**

```
'<path to mongod executable file>' --dbpath /data/db/ 
```
### Create a .env file in the root directory 
Nodemailer is used to send emails and in dev, mailtrap is used for testing. 
You can create a free [mailtrap account](mailtrap.io) to get access to the secrets to store in the .env
```
DB_DEV=<connection_string>
PORT=<port>
NODE_ENV=<env>

EMAIL_HOST_DEV=<email_host>
EMAIL_PORT_DEV=<email_port> 
EMAIL_USER_DEV=<email_user>
EMAIL_PASS_DEV=<email_pass>

BCRYPT_SALT=<salt_number>
JWT_SECRET=<whatever secret you'd like>
```

In the root directory, install dependencies

```
npm install
```

#### Running the Application Locally

```
npm start
```
This starts the server on the port specified in your .env file or localhost:3000
