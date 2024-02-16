# WM-MVC-Tech-Blog

## Table of Contents
* [Description](#description)
* [Deployed Application](#deployed-application)
* [Installation](#installation-instructions)
* [Usage](#usage-instructions)
* [Screenshots](#screenshots)
* [Contributing](#contribution-guidelines)
* [Credits](#credits)
* [Questions](#questions)

## Description <a name="description"></a> 
This project is a CMS-style blog site similar to a Wordpress site, where developers can publish blogs and comment on other developers' posts as well. This project follows an MVC architecture. Handlebars.js is the templating language, Sequelize is the ORM and the expression-session npm package was used for authentication. The dotenv package was used to employ environment variables and the bcrypt package to hash passwords.

## Deployed Application <a name="deployed-application"></a>
[Deployed App]()

## Installation <a name="installation-instructions"></a>
Clone this repository locally. Add a .env file and add
```md
DB_NAME='blogs_db'
DB_USER='root'
DB_PASSWORD='your_mysql_password'
```

Then, open the terminal and run:
```md
npm i
```

## Usage <a name="usage-instructions"></a>
```md
npm run seed
npm run start
```

## Screenshots <a name="screenshots"></a>
![Landing Page](/assets/images/MVC-Tech-Blog-Screenshot-1.png)
![Login Page](/assets/images/MVC-Tech-Blog-Screenshot-2.png)
![Dashboard](/assets/images/MVC-Tech-Blog-Screenshot-3.png)
![Individual Blog Page](/assets/images/MVC-Tech-Blog-Screenshot-4.png)

## Credits <a name = "credits"></a>
I met with tutor Jacob Carver on February 10, 2024 and we spent a couple of hours debugging in an attempt to enable a logged-in user to edit their own posts. We were not successful as of yet, but I feel our approach of toggling the handlebars state from editing to saved is a sound one. I hope to figure this out in future development.

This project is largely based off the mini-project in the MVC module from the [UCSD-VIRT-FSF-PT-09-2023-U-LOLC](https://git.bootcampcontent.com/University-of-California---San-Diego/UCSD-VIRT-FSF-PT-09-2023-U-LOLC) GitLab repository.

## Contributing <a name="contribution-guidelines"></a>
Be respectful and please reach out.

## Questions
Please feel free to reach out to me with questions or suggestions for this app.<br>
My GitHub user name is wmason1997 and here is my profile: [https://github.com/wmason1997](https://github.com/wmason1997).<br>
My email is williamcmason1997@gmail.com