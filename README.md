# Izenda ReactStarterKit

## Overview
The ReactStarterKit illustrates the concepts of integrating Izenda into ReactStarterKit applications.

### Q. What is in this repository?

### A. This is a simple example using a project template with Izenda Embedded into it. This repository is only an example of integrating Izenda into another application. The project template used in this scenario is used as a substitute for your application. This repository shows examples of how you might embed Izenda into your application.

 :warning: **The ReactStarterKit is designed for demonstration purposes and should not be used as an “as-is” fully-integrated solution. You can use the kit for reference or a baseline but ensure that security and customization meet the standards of your company.**


 :warning: **The Izenda configuration database script provided is currently configured for version 3.10.0 of Izenda.**

## Installation 
 
### Deploying the Izenda API & Database

This Kit requires the SampleAuthApi repository in order to successfully implement. <a href="https://github.com/Izenda7Series/SampleAuthApi">You can find that repository here.</a>

- Create a database named 'IzendaAngular' (This is the database for the Izenda configuration. It contains report definitions, dashboards,etc.). You may use any name of your choosing, just be sure to modify the script below to use the new database name. 
- Download and execute the Izenda.sql script from the from the SampleAuthApi repository in the DbScripts directory. Please note, the database version can be found in the IzendaDBVersion table of this database. This will be necessary when obtaining the proper resources in the following steps.  

- Download and deploy the Izenda API to IIS. The API can be found on our <a href="https://downloads.izenda.com/">Downloads Page</a> in our version directories. Select the version directory that corresponds Izenda configuration database version and click the "API" resource in the directory. 

- Deploy the Izenda API to IIS. The instructions for installing the Izenda API will follow the same instructions for <a href= "https://www.izenda.com/docs/install/doc_installation_guide.html#izenda-installation-as-two-separate-sites"> installing a standalone version of the Izenda's API.</a>

- Download a copy of the <a href="https://github.com/Izenda7Series/Mvc5StarterKit/blob/master/Mvc5StarterKit/izendadb.config">izendadb.config</a> file and copy it to the root of your API deployment. Then modify the file with a valid connection string to this new database.

### Deploying the WebAPI & Database
- Run the StarterKit_Api.sql' from the SampleAuthApi repository in the DbScripts directory. This is the database for the WebApi application. It contains the users, roles, tenants used to login. You may use any name of your choosing, just be sure to modify the script below to use the new database name.
- Modify the web.config file (Line 75) in from the SampleAuthApi repository under the WebApi2StarterKit directory with a valid connection string to this new database.

```xml
  <connectionStrings>
    <add name="DefaultConnection" connectionString="[your connection string here]" providerName="System.Data.SqlClient" />
  </connectionStrings>
``` 
- Modify the 'IzendaApiUrl' value in the same web.config (Line 80) file with the url of the Izenda API.
```xml
<add key="IzendaApiUrl" value="http://localhost:9999/api/" />
```

### Deploying the Retail Database (optional)
Create the Retail database with the RetailDbScript.sql from the SampleAuthApi repository in the DbScripts directory.

### Configuring ReactStarterKit
- Change the 'izendaApiEndPoint' value in the src/izenda-helpers/ApiEndpointConfig.js file with the URL for the Izenda API. 

```javascript
const izendaApiEndPoint = 'http://localhost:9999/';
``` 
- Open the src/izenda-helpers/ApiEndpointConfig.js  file and ensure 'apiEndPoint' is set. This will default to http://localhost:3358/ and can be left as is. 

```javascript
const apiEndPoint = 'http://localhost:3358/';
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

In order to get the create-react-app to work with Izenda, this project used `npm run eject` in order to generate the webpack configuration files needed to load the IzendaSynergy module correctly. Since the EmbeddedUI is such a large module, the usual import means did not work for this implementation and custom webpack configuration was used in file `webpack.config.js`. 
