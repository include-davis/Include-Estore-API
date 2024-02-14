# Some Notes Before You Begin
Make sure you follow all of the steps in "Setting Up Your Development Environment" before attempting to even look at the code. 

Also, read through the docs linked under the "Contributing to the Server" section so you can get a feel for the tools and syntax we will be going through. For your convenience, I have linked them here as well.

**Documentation to read through for Prisma**
- https://www.prisma.io/docs/concepts/components/prisma-schema/data-model#defining-fields
- https://www.prisma.io/docs/concepts/components/prisma-schema/relations
- https://www.prisma.io/docs/concepts/components/prisma-client/crud

**Resources on Database Migrations**
- https://www.astera.com/type/blog/database-migration-what-it-is-and-how-it-is-done/

**Resources on GraphQL/Apollo**  
These are pulled from https://www.apollographql.com/tutorials/browse
- https://www.apollographql.com/tutorials/lift-off-part1
- https://www.apollographql.com/tutorials/lift-off-part2
- https://www.apollographql.com/tutorials/lift-off-part3
- https://www.apollographql.com/tutorials/lift-off-part4

# Setting Up Your Development Environment

Before you begin, create a folder for this team wherever you want to store any GitHub repos that you will be cloning on your device in this cohort. You can name it include, platform_team, or literally anything you want to. If you choose to name it "include", **do not use a '#' in your folder name**, it'll cause a bunch of problems later.

## 1. NODE.JS

Node.js is a runtime environment that is used to run Javascript code. It comes with the Node Package Manager (npm) that helps us manage the Javascript packages used in our project. To set up node.js:

1. Download the Node.js installer for your OS from https://nodejs.org/en/download/current
2. Run the installer and follow the installation wizard.
3. Once the installation finishes, open a terminal on VSCode and type _node --version_ to verify your node installation. Type _npm --v_ to verify your npm installation.

   a. If you get an error saying that node or npm is not recognized as a command, try restarting VSCode to see if the issue fixes itself. (If you had VSCode opened while installing Node, this should fix it.)
   b. If the problem persists, search for _Environment variables_ in your Start menu. Click on _Edit your Environment variables_. Click on _Environment Variables_ in the new window that opens up.
   c. Find the variable _Path_ and click on _Edit_.
   d. Check for _C:\Program Files\nodejs\\_ in the list of paths that appear. If it's not there, click on _New_ and add it to the list.
   e. Restart VSCode and it should ideally work now.

**If you already have node**  
Try to update your node version to v21.1.0 so you don't get random warnings.

## 2. ESLINT EXTENSION

ESLint is an extension that ensures that your code adheres to certain code style. It also auto-formats your code on save in VSCode. To enable it:

1. Go to the Extensions tab on VSCode and install _ESLint_.
2. Once it is installed, open your Command Palette by pressing **Ctrl + SHift + P**/**Command + Shift + P** and search for **Preferences: Open Workspace Settings (JSON)**. Open the file and add this code into the file. This will autoformat your code on save and also configure tab sizes:

   ```json
   {
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "eslint.validate": [
        "javascript"
    ],
    "[javascript]": {
        "editor.indentSize": 2
    }, 
    "[prisma]": {
        "editor.indentSize": 2
    }
   ```

## 3. Postgres
1. Install Postgres by following this tutorial: https://www.prisma.io/dataguide/postgresql/setting-up-a-local-postgresql-database#setting-up-postgresql-on-windows
2. Follow this tutorial to create a user and create a database: https://commandprompt.com/education/how-to-create-user-create-database-grant-privileges-in-postgresql/
3. Grant the user you just created CREATEDB permissions with the command ```ALTER USER username CREATEDB;```

## 4. DBeaver
By now, you should have a database and user created in postgres. This means you can try connecting to it in DBeaver, a nice UI tool that allows you to view your database and also view ER diagrams.
1. Connect to your database by clicking the new database connection in the top left corner. It should look like a Plug with a green + sign.
2. Choose Postgres when asked for Database type.
3. You should only have to change 3 things: "Database", "Username", and "Password". Change those to the name of the database you created, the name of your user, and the password you chose for that user.
4. If it works, then you should be able to click into the database connection and view the contents by going through it like a file structure. The path for our data will be ```Databases --> [dbname] --> Schemas --> public```. There shouldn't really be anything to see but if you can click around the "file structure" it means you're connected.

## 5. environment file
Create a file called ```.env``` in the root of the codebase and paste in the following (replace ```username```, ```password```, and ```db_name``` to fit your own information which is the same as what you input into DBeaver).
```
DATABASE_URL="postgresql://username:password@localhost:5432/db_name?schema=public"
```

## 6. Other Extensions
For Prisma file highlighting: https://marketplace.visualstudio.com/items?itemName=Prisma.prisma

For GraphQL schema highlighting: https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql-syntax

## Getting Started
Set up:

`npm install` for package installations. This will install all packages specified in the package.json file.

Run the development server:

```bash
npm run dev
```
Open up http://localhost:4000/graphql to open the graphql playground and test your server

Run a linting test for the /src folder:

```bash
npm run lint
```

## Migrations
If you want to reset the database, or if your migration history is not in sync with the database, try running: ```npx prisma migrate dev```.  
This will reset your database and make sure your database is in sync with the prisma schema.

# Contributing to the Server
## Adding a new Data Type
### Prisma
Prisma is our ORM (object relational mapping). It allows us to manipulate our database without writing raw SQL(which is very error prone). It transforms our CRUD operations into an object oriented style.

**Documentation to read through for Prisma**
- https://www.prisma.io/docs/concepts/components/prisma-schema/data-model#defining-fields
- https://www.prisma.io/docs/concepts/components/prisma-schema/relations
- https://www.prisma.io/docs/concepts/components/prisma-client/crud

Prisma also creates database migrations for us. Database Migrations are effectively incremental SQL commands that are fed to our database one by one to change schemas or seed the database.

**Resources on Database Migrations**
- https://www.astera.com/type/blog/database-migration-what-it-is-and-how-it-is-done/

To create a new data type, your first step is to create a new ```[DataType].schema``` file in the /prisma/models folder where the datatype name is **singular** (Post, User, Song, Playlist, UserInterface, ColorPalette).

After you're done making the schema, run ```npm run schema:gen``` to compile it. Prisma does not support multifile schemas so we had to use a bash script to combine it into schema.prisma manually.

### GraphQL
GraphQL is our REST API alternative. We are running an Apollo/GraphQL server on express. GraphQL has the benefit of allowing us to specify the structure of the data we want back from the server. This way, we avoid receiving excess data.

**Resources on GraphQL/Apollo**  
These are pulled from https://www.apollographql.com/tutorials/browse
- https://www.apollographql.com/tutorials/lift-off-part1
- https://www.apollographql.com/tutorials/lift-off-part2
- https://www.apollographql.com/tutorials/lift-off-part3
- https://www.apollographql.com/tutorials/lift-off-part4

#### TypeDefs
When creating a new DataType, similarly to the Prisma schema, you have to define the schema in GraphQL, using the same DataType and field names as you did in the prisma file. To do so, add a file called ```[DataType].js``` in the /src/typeDefs folder once again using **singular** names for the datatype.

After creating the ```[DataType].js``` file, add it to the /src/typeDefs/index.js

#### Resolvers
GraphQL allows you to add fields to your typeDefs that do not correlate to a field in the database. When this happens, you have to define how GraphQL should handle the request. You can also use resolvers to define queries and mutations in GraphQL.

To do so, add a file called ```[DataType].js``` in the /src/resolvers folder once again using **singular** names for the datatype.

After creating the ```[DataType].js``` file, add it to the /src/resolvers/index.js

#### Services
Services are not built into GraphQL, but most people split the functionality from resolvers into the definitions and the actual logic behind the scenes. Our codebase defines these functions as static methods to a class that has the same name as the DataType but **PURAL**.

Create a ```[DataType(s)].js``` file in /src/services and copy the template from other files.

## Final Notes
As you can see, there is a lot of code to edit everytime you want to make new feature in the database. Basic Apollo/GraphQL servers keep everything in one file, but that is not scalable. In order to keep it scalable, I had to spend a lot of time setting up this codebase, which will never be exactly the same as any other codebase you see someone else set up in the future (since there are so many tradeoffs to consider).

Also, if you think it's a lot of work to add new features already, then you aren't ready for when we add in unit testing 🙂
