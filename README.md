# Range Management System

To run the project locally:

1.  Using a terminal, install all the packages in the root folder with the command: `npm install`
2.  Change directory to the client folder: `cd client`
3.  Install all the client packages with the command: `npm install`
4.  Type the command: `npm run dev` to start a local instance of the application
5.  Access the homepage by visiting [localhost:8080](http://localhost:8080)

To deploy the project on Azure:

    Prerequisite(s):

    1.  Visual Studio Code editor with Azure Tools extension installed

1.  Install all the base packages with the command: `npm install`
2.  Change directory to the client folder: `cd client`
3.  Install all the client packages with the command: `npm install`. This will also run the `npm postinstall` command, linked to `npm run build` which will bundle the require JavaScript and CSS files and place them in the server folder under /public
4.  Once completed, change to the server folder and install those packages: `cd ../server` then `npm install`
5.  Return to the root folder: `cd ../` and run the default grunt task: `grunt` or `grunt default`. This will back-up the previous distribution folder, /dist, (that is deployed to Azure) if it exists, then copy the contents of /server and place them in /dist
6.  Click the Azure tab on the sidebar (sign-in if necessary)
7.  Right-click on the app service you wish to deploy to and select /dist when prompted
8.  Browse the webpage when completed