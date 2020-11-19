# Team SBADE - Habit Tracker Productivity App

**Team:** Alicia M Kim, David Lee, Eric Lyda, Brian Wang, Scrum Leader Sergey Gridin


## Table Of Contents
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->
  - [**Description**](#description)
  - [**Technologies**](#technologies)
  - [**Feature List: MVP**](#feature-list-mvp)
    - [User Account](#user-account)
    - [Habit Tracker](#habit-tracker)
    - [Results display](#results-display)
  - [**Feature List: Stretch Goals**](#feature-list-stretch-goals)
    - [* Extending Habit-tracker:](#extending-habit-tracker)
    - [* Extending Results Display:](#extending-results-display)
    - [Full Feature: Progress Reward System](#full-new-feature-progress-reward-system)
    - [(Low-Priority) Miscellaneous](#low-priority-miscellaneous)
  - [**Models & Schema**](#models-schema)
  - [**Routes & Endpoints**](#routes-endpoints)
    - [Frontend](#frontend)
    - [Backend](#backend)
  - [**Wireframes & Templates**](#wireframes-templates)
    - [General Theming](#general-theming)
    - [Responsive Web Design (RWD) Considerations...](#responsive-web-design-rwd-considerations)
    - [Habit tracker page](#habit-tracker-page)
    - [Results display page(s)](#results-display-pages)
    - [User profile (popup options only?)](#user-profile-popup-options-only)
    - [Signup (splash)/signin/logout](#signup-splashsigninlogout)
    - [Add, delete, edit, etc. forms (popups?)](#add-delete-edit-etc-forms-popups)
  - [**User Story**](#user-story)
    - [Signup/signin/signout](#signupsigninsignout)
    - [Navigation](#navigation)
    - [Creating a habit](#creating-a-habit)
    - [Editing/deleting a habit](#editingdeleting-a-habit)
    - [Examining results displays](#examining-results-displays)
    - [Navigator user settings](#navigator-user-settings)
    - [* Browsing and 'buying' rewards](#browsing-and-buying-rewards)
  - [**Seeder Data**](#seeder-data)
    - [Users](#users)
    - [User's Habits](#users-habits)
    - [User's Habit Histories](#users-habit-histories)
    - [User's Rewards/Points](#users-rewardspoints)

<!-- /code_chunk_output -->

## Description
A minimalist productivity app that helps track habit history and review their trends over time, based on Loop Habit Tracker.

(**See Loop Habit Tracker:** https://play.google.com/store/apps/details?id=org.isoron.uhabits&hl=en_US&gl=US)

As this will be a browser app, as opposed to a phone app like the inspiration, we would like to consider features or tweaks that would
make this app suit its platform better, and provide some benefit or feature that the other does not. 

Ideas so far include showing more friendly and intuitive 'habit-health' indicator (like a plant icon), providing a simplistic and 
minimal reward system to motivate usersto continue their habits, and some kind of sharing and/or friend-connecting/accountability 
buddy functionality.

Purpose, market, functionality


## Technologies
- JavaScript
- Python 3
- PostgreSQL
- Psycopg2
- Flask
- SQLAlchemy
- Alembic
- React
- HTML/CSS/Sass
- Visual Studio Code
- ? **TODO** Any others?


## Feature List: MVP
### **User Account**
- Signup/login/logout
- User-specific dashboard
- Store habit history

### **Habit Tracker**
- User can create habits with a title
- Habits are displayed in an interactive list, with check-off buttons for each previous day per habit.
- Habits can be edited or deleted.

### **Results display**
- The user can click a habit to see a visual history of the habit.
- The top shows a few statistics like total number and success rate
- At least one visual display of the data:
    - An icon-indicator that shows overall success.
      *NOTE* Loop has a wheel that fills, but we discussed that there maybe be alternatives that
      show 'milestone' progress, so users can feel rewarded for various levels of progress.
      Ex. the color or size may change at 25%, 50%, 70%, 100%, or maybe it gets 'shinier' etc.
      The idea of a bar, gauge, or loop 'filling up' with progress may still be compatible with this.
    - Line graph (overall trends??)
    - Bar graph/side bar graph (absolute numbers)
    - Calendar display (color in successful days)
    - Frequency-dot-chart (??)

## **Feature List: Stretch Goals**
### * Extending Habit-tracker:
- * (high) Choose habit color
- * Sort-by: name, color, manual (allow user to move habits)
- * (low) Choose habit frequency (1-7 days per week)
- * (low) Option to add description/'question' for habits.
- * (low) Option to archive and hide-archive habits.

### * Extending Results Display:
- * (high/low) Adding addition display types (see above options in MVP). Ideally at least three total (high), max of five (low)
- * Change display mode to daily/weekly/monthly/yearly
    
### **Full New Feature: Progress Reward System**
 - * User can accumulate reward-points with activity and spend them on a variety of minor rewards (virtual currency).
 - * Rewards should be minimal and cosmetic. Ideas/examples:
  - * Earn 'titles' to reflect their progress. Perhaps madlib-style, or Animal-Crossing-like (choose an adjective and a noun from lists)
  - * Unlock new colors
  - * Unlock new avatar/progress-symbol icons (ex. fire, runner/exerciser, flower, trophy, smiley...)
  - * Still open to thinking of other ideas as rewards. Should be low-cost(thesaurus needed).
  
### (Low-Priority) Miscellaneous
 - * Dark/light mode
 - * Share options. Send images of results as email, twitter, etc.
 - * (very low-vague idea only) 'Friend-Accountability': Able to friend others and see their progress.
 - * Unique/random welcome messages
 - * reminder/alarm/notification system?

---------

## Models & Schema
**NOTE-MIRA** Break these out into separate feature packets?
Separate color table, or just a value on the habits table?
Is `created_at` needed for habit_days or habits on top of `date`?

**TABLES LIST**
 - users
 - habits
 - habit_days
 - ?colors?
 - rewards
 - user_rewards

### Tables
| users      | Constraints                                   |
|------------|-----------------------------------------------|
| id         | SERIAL, PRIMARY KEY                           |
| name       | VARCHAR(50) NOT NULL                          |
| email      | VARCHAR(50), NOT NULL, UNIQUE                 |
| hashword   | VARCHAR(250) NOT NULL                         |
| created_at | TIMESTAMP, NOT NULL, DEFAULT VALUE=new Date() |
|*points     | INTEGER, NOT NULL, DEFAULT VALUE=0            |
|*setting    | VARCHAR(250)                                  |


| habits      | Constraints                                   |
|-------------|-----------------------------------------------|
| id          | SERIAL, PRIMARY KEY                           |
| habit       | VARCHAR(50), NOT NULL                         |
| user_id     | INTEGER, FOREIGN KEY=users.id, NOT NULL       |
| color_id    | INTEGER, FOREIGN KEY=colors.id, NOT NULL      |
| description | VARCHAR(250)                                  |
| frequency   | INTEGER                                       |
| ?created_at | TIMESTAMP, NOT NULL, DEFAULT VALUE=new Date() |


| habit_days  | Constraints                                   |
|-------------|-----------------------------------------------|
| id          | SERIAL, PRIMARY KEY                           |
| date        | DATE, NOT NULL, DEFAULT VALUE=new Date()      |
| checked     | BOOLEAN, DEFAULT VALUE=false                  |
| habit_id    | INTEGER, FOREIGN KEY=habits.id, NOT NULL      |
| ?created_at | TIMESTAMP, NOT NULL, DEFAULT VALUE=new Date() |


| colors | Constraints                   |
|--------|-------------------------------|
| id     | SERIAL, PRIMARY KEY           |
| color  | VARCHAR(50), NOT NULL, UNIQUE |


| rewards | Constraints                        |
|---------|------------------------------------|
| id      | SERIAL, PRIMARY KEY                |
| reward  | VARCHAR(50)                        |
| type    | VARCHAR(20)                        |
| cost    | INTEGER, NOT NULL, DEFAULT VALUE=1 |


| user_rewards | Constraints                               |
|--------------|-------------------------------------------|
| id           | SERIAL, PRIMARY KEY                       |
| user_id      | INTEGER, FOREIGN KEY=users.id, NOT NULL   |
| reward_id    | INTEGER, FOREIGN KEY=rewards.id, NOT NULL |


<!-- 
|       | Constraints         |
|-------|---------------------|
| id    | SERIAL, PRIMARY KEY |
|       |  |
|       |  | 
-->


---------

## Routes & Endpoints
### Frontend
**NOTE** Remember to decide and integrate authentication/privacy setting concerns too for each route, 
based on how we decide to go about it.

#### Entry/exit points-ROOT: `/`
| METHOD | Route Path | Purpose         |
|--------|------------|-----------------|
| GET    | `/`          | render splash page |
| GET    | `/home`      | render user's habit-tracker homepage | 
| POST   | `/signup` | Create new account and log them in |
| POST   | `/signin` | Verify auth and log them in |
| POST   | `/signout` | Delete auth and logout |
|  |
| 

#### User-ROOT: `/users/:id`
| METHOD | Route Path | Purpose         |
|--------|------------|-----------------|
| GET | `/` | renders user profile page with habits |
| GET | `/habits/:id/history` | renders page with visual data displays of specific habit's history |
|  |  | 


#### Habits-ROOT: `/users/:id/habits`
| METHOD | Route Path | Purpose         |
|--------|------------|-----------------|
<!-- | GET    | `/` | Get a list of all the user's habits | -->
| GET    | `/:habit_id` | Get a single habit's full details (`habit_days` history) |
| POST   | `/` | Create a new habit |
| PATCH  | `/:habit_id` | Edit a habit | 
| DELETE | `/:habit_id` | Delete a habit |

#### Individual Habit History-ROOT: `/users/:id/habits/:id`
`/days`, `/weeks`, `/months`, `/years`? 
`/data/bar`, `/data/line`, `/data/dot`, `/data/calendar`?
| METHOD | Route Path | Purpose         |
|--------|------------|-----------------|
| GET | |
|  |   |
|  |  | 


| METHOD | Route Path | Purpose         |
|--------|------------|-----------------|
|  |  |
|  |  |
|  |  | 


<!-- | METHOD | Route Path | Purpose         |
|--------|------------|-----------------|
|  |  |
|  |  |
|  |  |  -->


/settings???

* idea for user accountability connection-creation
/users/:id
friend join table boolean

### Backend
/users - login, tokens, security
post - make new user
put - edit user details
get - get user details
delete - delete user account
token????

user/id/habits/id - get user's list of habits - to show list, crud
get - get all habits by user,
  get with filter? color, other?
  /patch - edit habit
  /delete - delete habit
  /create - make a habit
  get only select time? day, last week, last month, last year
  * clean up data back here before sending back? ex. for bar graph, etc.{}
  
/days - history
POST habit_days/:id/post - boolean - toggle, not 'turn on'
/days/current_week for the interactive ribbon display

/days/bar/weeks/:limit - somehow customize the query and data structure to suit the exact needs
for the requested graph-data???

* GET /users/:id/rewards - get user 'inventory'? 
* GET /rewards - get all rewards for shop
* POST /rewards/:id/purchase - give user reward, lower points

* plant/status icon indicator? how handle, don't forget

---------

## Wireframes & Templates
### General Theming
- **Colors** (base/background, primary, secondary, accent...)
- **Fonts** (Choose 1-2 main ones, 3-5 sizes (relative), don't have more than 3 fonts, less is more)
- **Aesthetic** (If based on Loop Habit Tracker, perhaps ex. Clean, minimal, cheerful, * slightly customizable to people's tastes with rewards)
- ** Etcetera** ...

### Responsive Web Design (RWD) Considerations...
**TODO** Should we try a mobile-first approach for the CSS/design layout?
**TODO** As a web-browser app, how could/should we adjust this to better-suit our platform? :S
I feel as though compared to a phone app, 'visiting a website' each day to track habits feels less intuitive and effortless.
Any ideas on how to mitigate that?
...Browser extension? :S

### Navigation
Should be able to:
- Go to habit-tracker home
- Check settings/edit user
- Log out
- Misc: about, contact, help/faq

### Signup (splash)/signin/logout
Popup forms, or embedded in splash page, or both?
Should be fairly straightforward.

### Habit tracker page
Show list of habits.
Each habit is a row in a table: status icon, habit title, daily check-buttons for past 7 days.
Perhaps in desktop mode, a button on the side for edit/deleting.
'Sort by' dropdown menu.
Links to each habit's history page.
Buttons to add/edit/delete tasks.
Perhaps the user's name and any user-spec

### Results display page(s)
On mobile/portrait, a column of displays, scroll down. On landscape/desktop, fit
as a responsive grid at breakpoint.

*A ? help button (or tooltip!) in the corner of data displays to explain what

*Share button for each grid, and the entire page.


### Add, delete, edit, etc. forms (popups?)
How to present the forms for these CRUD options to the user?


---------

## User Story

### Signup/signin/signout


### Navigation


### Creating a habit
  0. Click +habit button
  1. Write title
  2. * Choose a color
  3. * Choose frequency
  4. * Add a longer description
  5. Submit

### Editing/deleting a habit


### Examining results displays
  0. Click on habit to see more (perhaps 'see more...')
  1. Show one habit, including title/description/frequency
  2. At-a-glance overview - wheel/badge progress indicator
  3. Statistics for last month, last year, total (percentage and ltieral amount) - last month? - simplify??
  4. For history graphs, scroll left for more history
  5. Display graphs by day/week/month/year - click dropdown
  6. Remember to show easy-to-see access to 'cancel back' to habit page

### Navigator user settings


### * Browsing and 'buying' rewards


---------

## Seeder Data
**TODO** MVP 1, ideally at least 3, more would be nice but low-priority.

### Users
Different users having different styles to showcase the app's flexibility?

### User's Habits
- Exercise and health goals.
- Social commitment goals.
- Fun/work-life balance goals.
- Chores/utilitarian.
- Learning/hobbies/personal

### User's Habit Histories
- Example of a committed habit-builder
- Volatile habit-builder
- Failed habit builder
- Normalish habit-builder

### User's Rewards/Points
**NOTE-MIRA** For now, just reward ideas:
* Themes (colors)
* Titles
* Checkmark symbols
* Colors
* avatar badge? reward? 

