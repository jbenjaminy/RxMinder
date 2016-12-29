# RxMinder (beta) #

***A simple solution to ensure your medication is taken on time, every time.***

## Author ##
 * [Ben Young](www.jbenjaminy.com) - A full-stack web developer, based in Houston, Texas.

## Built With ##
 * [React.js](https://facebook.github.io/react/) - A frontend JavaScript library.
 * [Node.js](https://nodejs.org/en/) - A backend JavaScript runtime.
 * [Express.js](http://expressjs.com/) - A web framework for Node.js.
 * [PostgreSQL](https://www.postgresql.org/) - An object-relational database system.

## Deployment ##

 * A live version of the app can be viewed at [rx-minder.jbenjaminy.com](https://rx-minder.jbenjaminy.com).

![RxMinder Screenshot]( "RxMinder")

## Trello Board ##

 * Check out the project's design, bugs, and pending features on [trello.com](https://trello.com/b/smiTIVJi/rxminder).

 ![Trello Board Screenshot]( "Trello Board")

## Local Setup (Mac users)##

*These instructions will get you a copy of RxMinder up and running on your local machine for development and testing purposes.*

### Requirements ###

*The technologies you will need and how to install them.*

- - - -

#### Git/GitHub ####
 * Create free account on [github.com](https://github.com).

 * Check if your Git command-line tools are installed.
  * Open the __Terminal__ app and type:
  ```
   `git`
  ```
  * Follow the prompts if installation is required.

 * Connect your local copy of Git with your GitHub account.
  * Configure username:
  ```
   `git config --global user.name "Ben Young`
  ```
  * Configure email address:
  ```
   `git config --global user.email ben@jbenjaminy.com`
  ```

 * Clone repository
  * In Terminal, navigate to the directory in which you would like to download a copy of the project's repository, and type:
  ```
   `git clone https://github.com/jbenjaminy/RxMinder.git`
  ```
  * _(note: the first time you use a Git command after configuring your account, you will be asked to login with your GitHub credentiials)_

 ![Clone Repository Screenshot](http://i.imgur.com/QMwax1k.png "Cloning the Repository")

 - - - - 

#### Node.js & NPM #### - The code uses NPM to manage dependencies. Make sure you have the latest versions of Node.js and NPM installed.

__Homebrew__ - The easiest way is to use Homebrew, a package manager for the Mac. 
* Installing Homebrew.
  * If you do not yet have homebrew installed, in Terminal, type:
  ```
   `ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
  ```

  * Follow the prompts to complete the installation process.

  * Make sure Hombrew has been installed and is working properly:
  ```
   `brew doctor`
  ```

  * Make sure you are running the latest version of Homebrew:
  ```
   `brew update`
  ```

* Install Node.js & NPM using Homebrew
  * In Terminal, type:
  ```
   `brew install node`
  ```

  * To ensure the files have installed properly or check the version you are running, use the following commands.
  ```
   * _For Node.js:_
   `node -v`
  ```

  ```
   * _For NPM:_
   `npm -v`
  ```

  ![Check Node/NPM Versions Screenshot](http://i.imgur.com/ixykO1N.png "Check Node/NPM Versions")

  * Make sure Homebrew has the latest version of the Node.js package:
  ```
   `brew update`
  ```

  * Upgrade Node.js:
  ```
   `brew upgrade node`
  ```

__NodeJS Installer__ - Alternatively, you can use the NodeJS Installer, which can be downloaded directly from [NodeJS.org](https://nodejs.org/en/).

 - - - -

#### PostgreSQL #### - The user data is stored in a PostgreSQL database. Use the following steps to get PosgreSQL up and running on your machine and set up the database.

 * Install PostgreSQL using Homebrew:
 ```
  `brew install postgresql`
 ```

 * Install the PostgreSQL node-module using NPM:
 ```
  `npm install --save pg`
 ```

 * Launch postgreSQL using Homebrew:
 ```
  `brew services start postgresql`
  ```

 * Create a new database for the project:
 ```
  `createdb rx_minder`
 ```

 * Add the schema to the database:
 ```
  `psql -d rx_minder < backend/database/schema.sql`
 ```

 ![Database Setup Screenshot]( "Database Setup")

 * To access the database from the terminal and make manual queries, use the following commands:
 ```
  `psql -d rx_minder`
 ```

__Example queries__
  * __Create__
   * Add a new entry to a table:
   ```
	`insert into TABLE_NAME (COLUMN_ONE_NAME, COLUMN_TWO_NAME) values ('VALUE_ONE', 'VALUE_TWO');`
   ```

  * __Read__
   * Retrieve all entries from a table:
   ```
	`select * from TABLE_NAME;`
   ```
   * Retrieve specific entry from a table:
   ```
	`select VALUE from TABLE_NAME;`
   ```
   * Retrieve multiple columns for all entries matching a specific parameter of one of the columns:
   ```
	`select COLUMN_ONE_NAME, COLUMN_TWO_NAME from TABLE_NAME where COLUMN_ONE_NAME='VALUE';`
   ```

  * __Update__
   * Edit an entry matching a specific paramenter:
   ```
	`update *TABLE_NAME* set *COLUMN_NAME*='VALUE_TWO' where *COLUMN_NAME*='VALUE_ONE';`
   ```

  * __Delete__
   * Remove an entry matching a specific parameter:
   ```
	`delete from *TABLE_NAME* where COLUMN_NAME='VALUE';`
   ```
	* Remove all entries:
	```
	 `delete from TABLE_NAME;`
	```

  ![Manually Querying the Database Screenshot]( "Manually Querying the Database")

## License ##

 This project is licensed under the MIT License - see the [LICENSE.md file](https://github.com/jbenjaminy/RxMinder/blob/master/LICENSE) for details

## Acknowledgements ##
 * [Billie Thompson](https://gist.github.com/PurpleBooth) for the nice [README.md template](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)
 * [Dave McFarland](http://blog.teamtreehouse.com/author/davemcfarland) for the great [tutorial on installing Node/NPM](http://blog.teamtreehouse.com/install-node-js-npm-mac)





