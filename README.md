# vuejs-quarkus-oauth

The accompanying blog post for this repo can be found here: <https://betweendata.io/posts/vuejs-quarkus-oauth/>.

## Scope

This application is web-based. Once the user navigates to the main page (`/`) the user can see a generic welcome message. Furthermore a link titled *Home* is visible which allows the user to navigate to the main page. This link is visible no matter which page the user navigates to.

A button allows the user to log into the application. Once the user is logged in two additional links are visible.

The first is titled *Protected*.  This link takes the user to the `/protected` page. On this page the user sees a secret message. This message will be different depending if the user has the role *user* assigned or not.

The second link is titled *Profile*. This link takes the user to the `/profile` page. On this page the user can see it's profile information. This includes the name and the roles assigned to the user.

## Setup

This application consists out of three parts:

* *webclient-service* (User facing frontend application.)
* *backend-service* (Backend application providing the REST API.)
* *authentication-service* (Authentication provider and user manager.)

The following chapters describe how to setup the application on your own machine. I am using Linux (Ubuntu) but the instructions should work on Windows and Mac as well.

### Prerequisites

### webclient-service (<https://vuejs.org/>)

No special setup is requried. The only thing you need is [yarn](https://yarnpkg.com/lang/en/) or [npm](https://www.npmjs.com/).

Just navigate into the `webclient-service` folder and execute: `yarn serve`.

### backend-service (<https://quarkus.io/>)

For the backend to work you'll need [Maven](https://maven.apache.org/), [OpenJDK](https://adoptopenjdk.net/) (8 or 11) and [GraalVM](https://www.graalvm.org/).

For detailed instructions see the [Quarkus - Get Started](https://quarkus.io/get-started/) guide.

Once you have everything setup just navigate into the `backend-service` folder and execute: `./mvnw compile quarkus:dev`

### authentication-service (<https://www.keycloak.org/>)

The easiest way to set it up is using Docker.

`docker run -d --name authentication-service -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin -p 8180:8080 quay.io/keycloak/keycloak`

After the container is created it should take 1-2 min till you can open the admin panel using the URL <http://localhost:8180>.

* Click the link *Administration Console* and log into the UI as user `admin` with password `admin`.

The next step is to create a realm. A realm contains everything required to setup the authentication for one application and all related services.

* Hoover over *Master* in upper left corner and click on *Add realm*
* Download the realm config (`realm-export.json`) found in the root of this repository
* Select the downloaded config and click *Create*

This creates the realm with all required clients. What it does not create is the users. For our example we need two users. One having the role `user` and the other one without that role.

* In the left menu click on *Users*
* In the top right of the table click on *Add user*
* Fill in the *Username* field with `susan`
* Leave the rest as is and click *Save*
* You'll now see additional tabs in the top. Click on *Credentials*.
* Fill in both fields with a password of your choice and change the toggle for *Temporary* to `OFF`.
* Click *Reset Password* and confirm the action clicking *Change password*

Repeat the above procedere to create the user `peter`. *Peter* will be the user we assign the role `user` to.

* After reseting the password for *peter* click on the *Role Mappings* tab.
* Click on `user` in the *Available Roles* box and click *Add selected*.

That's it! The authentication server is all setup and good to go.
