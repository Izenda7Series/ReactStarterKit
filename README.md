# Izenda ReactStarterKit

## Overview
The ReactStarterKit illustrates the concepts of integrating Izenda into ReactStarterKit applications.

### Q. What is in this repository?

### A. This is a simple example using a project template with Izenda Embedded into it. This repository is only an example of integrating Izenda into another application. The project template used in this scenario is used as a substitute for your application. This repository shows examples of how you might embed Izenda into your application.

 :warning: **The ReactStarterKit is designed for demonstration purposes and should not be used as an “as-is” fully-integrated solution. You can use the kit for reference or a baseline but ensure that security and customization meet the standards of your company.**


 :warning: **The Izenda configuration database script provided is currently configured for version 3.10.0 of Izenda.**

## Installation 
 
### Deploying the Izenda API & Database

In this integration kit, you will be following the same steps that you would to set up the Angular Starter Kit. For Izenda developers, this integration is based off the newer Angular Starter Kit rather than the older Angular2StarterKit.

- You will first need to set up the Izenda configuration database. Create a database with a name of your chosing then using the Izenda.sql script located in the directory "integration/DbScripts". You will need to check the database version in the Izenda.DbVersion table and upgrate to the necessary version using the schema migration tool available at downloads.izenda.com

### Deploying the WebAPI & Database
- Create another database of your choosing for the Web Api database. This is the database for the WebApi application. It contains the users, roles, tenants used to login. You may use any name of your choosing, just be sure to modify the script below to use the new database name.
- Use the  Starterkit_Api.sql script located in the "integration/DbScripts" directory to generate the necessary schema for the database. 
- Run/Deploy the WebApiStarterKit solution located in integration/WebApiStarterKit and modify the web.config (Line 75) file with a valid connection string to this new database.

```xml
  <connectionStrings>
    <add name="DefaultConnection" connectionString="[your connection string here]" providerName="System.Data.SqlClient" />
  </connectionStrings>
``` 
- Modify the 'IzendaApiUrl' value in the WebApiStarterKit web.config (Line 80) file with the url of the Izenda API.
```xml
<add key="IzendaApiUrl" value="http://localhost:9999/api/" />
```

### Deploying the Retail Database (optional)
Create the Retail database with the RetailDbScript.sql located in the "integration/DbScripts" directory.

### Configuring ReactStarterKit
- Change the 'WebApiUrl' value in the src/izenda-helpers/config.js file with the URL for the Izenda API. 

```javascript
"WebApiUrl": "http://localhost:9999/api/",
``` 
- Open the src/izenda-helpers/ApiEndpointConfig.js  file and ensure 'apiEndPoint' is set. This will default to http://localhost:3358/ and can be left as is. 

```javascript
let apiEndPoint = "http://localhost:3358/";
``` 
- Download a copy of the EmbeddedUI. The EmbeddedUI can be found on our <a href="https://downloads.izenda.com/">Downloads Page</a> in our version directories. Select the version directory that corresponds Izenda configuration database version and click the "EmbeddedUI" resource in the directory. 
- Extract the files of the EmbeddedUI and place them in the libs/IzendaSynergy directory.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Run WebApi2StarterKit in Visual Studio
- Build and run the WebApi2StarterKit project and login with the System Admin account below:<br />
   Tenant: <br />
   Username: IzendaAdmin@system.com<br />
   Password: Izenda@123<br />

- Once you have logged in successfully, navigate to the Settings tab and enter your Izenda License Key .
- Now navigate to Settings > Data Setup > Connection String and replace the current connection string with the one you created for the Retail Database.

- Click Reconnect and then save


## Post Installation

 :warning: In order to ensure smooth operation of this kit, the items below should be reviewed.
 
 
### Exporting

Update the WebUrl value in the IzendaSystemSetting table with the URL for your front-end. You can use the script below to accomplish this. As general best practice, we recommend backing up your database before making any manual updates.

```sql

UPDATE [IzendaSystemSetting]
SET [Value] = '<your url here including the trailing slash>'
WHERE [Name] = 'WebUrl'

``` 

If you do not update this setting, charts and other visualizations may not render correctly when emailed or exported. This will also be evident in the log files as shown below:

`[ERROR][ExportingLogic ] Convert to image:
System.Exception: HTML load error. The remote content was not found at the server - HTTP error 404`

</br>

### Authentication Routes

Ensure that the AuthValidateAccessTokenUrl and AuthGetAccessTokenUrl values in the IzendaSystemSetting table use the fully qualified path to those API endpoints. 

Examples:

| Name                       | Value                                                   | 
| -------------------------- |:--------------------------------------------------------|
| AuthValidateAccessTokenUrl |http://localhost:3358/api/account/validateIzendaAuthToken|
| AuthGetAccessTokenUrl      |http://localhost:3358/api/account/GetIzendaAccessToken   |

</br>

You can use the script below to accomplish this. As general best practice, we recommend backing up your database before making any manual updates.

```sql

UPDATE [IzendaSystemSetting]
SET [Value] = '<your url here>'
WHERE [Name] = 'AuthValidateAccessTokenUrl'

UPDATE [IzendaSystemSetting]
SET [Value] = '<your url here>'
WHERE [Name] = 'AuthGetAccessTokenUrl'

``` 

:no_entry: If these values are not set, the authentication will not work properly.

## Further details about Izenda integration

- <a href="https://www.izenda.com/docs/install/.install.html">Installation and Maintenance Guide<a/>
- <a href="https://www.izenda.com/docs/dev/.developer_guide.html">Developer Guide</a>
- <a href="https://www.izenda.com/docs/dev/.developer_guide_integrated_scenarios.html">Developer Guide for Integrated Scenarios</a>

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
