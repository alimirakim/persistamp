# Team SBADE - Habit Tracker Productivity App

**Team:** Alicia M Kim, David Lee, Eric Lyda, Brian Wang, Scrum Leader Sergey Gridin

**Goal Milestones**
* MVP: habit tracker - make a habit, mark it each day, see the trend results
* Major Stretch 1: reward system - earn points, add custom rewards, 'buy' rewards - provide simple default rewards. MVP, just one easy one. 
* Major Stretch 2: accountability buddy - connect accounts, assigning the 'giver'. click habit to ask for confirmation. giver is pinged and confirms. giver can add custom rewards.
* Major Stretch 3: multiple buddies and programs/trackers - make 'friends'. create trackers specific to 'program', rather than specific to 'user', then associate programs to users. programs have program-specific tasks, rewards, and buddies.

## Table Of Contents
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->
- [**Description**](#description)
- [Team SBADE - Habit Tracker Productivity App](#team-sbade-habit-tracker-productivity-app)
    - [GOAL Tables and good testing seeder data created](#goal-tables-and-good-testing-seeder-data-created)
    - [GOAL: Have backend CRUDs working with postman.](#goal-have-backend-cruds-working-with-postman)
    - [Have frontend fetching, posting, and displaying on templates, full interactivity for user implemented](#have-frontend-fetching-posting-and-displaying-on-templates-full-interactivity-for-user-implemented)
    - [GOAL Make it presentable](#goal-make-it-presentable)
    - [GOAL: Reward CRUDs](#goal-reward-cruds)
    - [GOAL: pretty up the shop, quality check](#goal-pretty-up-the-shop-quality-check)
  - [ACCOUNTABILITY BUDDY FEATURE](#accountability-buddy-feature)
    - [BACKEND](#backend)
    - [FRONTEND](#frontend)
    - [MULTIPLE BUDDIES/PROGRAMS FEATURE](#multiple-buddiesprograms-feature)
  - [Table Of Contents](#table-of-contents)
  - [Description](#description)
  - [Technologies](#technologies)
  - [Feature List: MVP](#feature-list-mvp)
    - [User Account](#user-account)
    - [Habit Tracker](#habit-tracker)
    - [Results display](#results-display)
  - [Feature List: Stretch Goals](#feature-list-stretch-goals)
    - [* Extending Habit-tracker:](#extending-habit-tracker)
    - [* Extending Results Display:](#extending-results-display)
    - [Full New Feature: Progress Reward System](#full-new-feature-progress-reward-system)
    - [(Low-Priority) Miscellaneous](#low-priority-miscellaneous)
  - [Models & Schema](#models-schema)
  - [MVP FEATURE TABLES](#mvp-feature-tables)
    - [`users`](#users)
    - [`programs`](#programs)
    - [`members`](#members)
    - [`habits`](#habits)
    - [`daily_stamps`](#daily_stamps)
  - [REWARD SYSTEM FEATURE](#reward-system-feature)
    - [`rewards`](#rewards)
    - [`redeemed`](#redeemed)
  - [ACCOUNTABILITY CONNECTION FEATURE](#accountability-connection-feature)
    - [`bonds`](#bonds)
  - [Routes & Endpoints](#routes-endpoints)
    - [Frontend](#frontend-1)
      - [Entry/exit points-ROOT: `/`](#entryexit-points-root)
      - [User-ROOT: `/users/:id`](#user-root-usersid)
      - [Habits-ROOT: `/users/:id/habits`](#habits-root-usersidhabits)
      - [Individual Habit History-ROOT: `/users/:id/habits/:id`](#individual-habit-history-root-usersidhabitsid)
    - [Backend](#backend-1)
      - [ROOT: `/users`](#root-users)
      - [ROOT: `/programs`](#root-programs)
      - [ROOT: `/programs/:id/members`](#root-programsidmembers)
      - [ROOT: `/programs/:id/habits`](#root-programsidhabits)
      - [ROOT: `/programs/:id/habits/:habit_id/members/:member_id`](#root-programsidhabitshabit_idmembersmember_id)
  - [Wireframes & Templates](#wireframes-templates)
    - [General Theming](#general-theming)
    - [Responsive Web Design (RWD) Considerations...](#responsive-web-design-rwd-considerations)
    - [Navigation](#navigation)
    - [Signup (splash)/signin/logout](#signup-splashsigninlogout)
    - [Habit tracker page](#habit-tracker-page)
    - [Results display page(s)](#results-display-pages)
    - [Add, delete, edit, etc. forms (popups?)](#add-delete-edit-etc-forms-popups)
  - [User Story](#user-story)
    - [Signup/signin/signout](#signupsigninsignout)
    - [Navigation](#navigation-1)
    - [Creating a habit](#creating-a-habit)
    - [Editing/deleting a habit](#editingdeleting-a-habit)
    - [Examining results displays](#examining-results-displays)
    - [Navigator user settings](#navigator-user-settings)
    - [* Browsing and 'buying' rewards](#browsing-and-buying-rewards)
  - [Seeder Data](#seeder-data)
    - [Users](#users-1)
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
### User Account
- Signup/login/logout
- User-specific dashboard
- Store habit history

### Habit Tracker
- User can create habits with a title
- Habits are displayed in an interactive list, with check-off buttons for each previous day per habit.
- Habits can be edited or deleted.

### Results display
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

## Feature List: Stretch Goals
### * Extending Habit-tracker:
- * (high) Choose habit color
- * Sort-by: name, color, manual (allow user to move habits)
- * (low) Choose habit frequency (1-7 days per week)
- * (low) Option to add description/'question' for habits.
- * (low) Option to archive and hide-archive habits.

### * Extending Results Display:
- * (high/low) Adding addition display types (see above options in MVP). Ideally at least three total (high), max of five (low)
- * Change display mode to daily/weekly/monthly/yearly
    
### Full New Feature: Progress Reward System
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

![Table Models](https://dbdiagram.io/embed/5fb84e793a78976d7b7ccdcb)
<iframe width="560" height="315" src='https://dbdiagram.io/embed/5fb84e793a78976d7b7ccdcb'> </iframe>

**TABLES LIST**
- users
- programs
- members
- habits
- daily_stamps
- rewards
- redeemed
- bonds


## MVP FEATURE TABLES
### `users`
| users      | Constraints                                   |
|------------|-----------------------------------------------|
| id         | SERIAL, PRIMARY KEY                           |
| first_name | VARCHAR(50) NOT NULL                          |
| last_name  | VARCHAR(50) NOT NULL                          |
| email      | VARCHAR(50), NOT NULL, UNIQUE                 |
| hashword   | VARCHAR(250) NOT NULL                         |
| created_at | TIMESTAMP, NOT NULL, DEFAULT VALUE=new Date() |
| color      | VARCHAR(7), NOT NULL, DEFAULT VALUE='#000000'  |
| stamp      | VARCHAR(50), NOT NULL, DEFAULT VALUE='user-circle' |

### `programs`
| columns   | Constraints                              |
|-----------|------------------------------------------|
| id        | SERIAL, PRIMARY KEY                      |
| program   | VARCHAR(50), NOT NULL |
| description | VARCHAR(250)
| color     | VARCHAR(7), NOT NULL, DEFAULT VALUE='#000000' |
| stamp     | VARCHAR(50), NOT NULL, DEFAULT VALUE='calendar-alt' |
| creator_id | INTEGER, FOREIGN KEY=users.id, NOT NULL |
| created_at | TIMESTAMP, NOT NULL, DEFAULT VALUE=new Date() |

### `members`
| columns   | Constraints                              |
|-----------|------------------------------------------|
| id        | SERIAL, PRIMARY KEY                      |
| program_id | INTEGER, FOREIGN KEY=programs.id, NOT NULL |
| member_id  | INTEGER, FOREIGN KEY=users.id, NOT NULL |
| stamper_id | INTEGER, FOREIGN KEY=users.id           | - null by default. if null, memberself-stamps. OR same as member id.
| points | INTEGER, NOT NULL, DEFAULT VALUE=0 |

### `habits`
| habits      | Constraints                                   |
|-------------|-----------------------------------------------|
| id          | SERIAL, PRIMARY KEY                           |
| habit       | VARCHAR(50), NOT NULL                         |
| description | VARCHAR(250)                                  |
| frequency   | ENUM(0, 1, 2, 3, 4, 5, 6, 7)                  |
| color       | VARCHAR(7), NOT NULL, DEFAULT VALUE='#000000' |
| stamp       | VARCHAR(50), NOT NULL, DEFAULT VALUE='check-circle' |
| program_id  | INTEGER, FOREIGN KEY=programs.id, NOT NULL    |
| creator_id  | INTEGER, FOREIGN KEY=users.id, NOT NULL       |
| created_at  | TIMESTAMP, NOT NULL, DEFAULT VALUE=new Date() |


### `daily_stamps`
| columns     | Constraints                                   |
|-------------|-----------------------------------------------|
| id          | SERIAL, PRIMARY KEY                           |
| date        | DATE, NOT NULL                                |
| status      | ENUM('unstamped', 'pending', 'stamped'), NOT NULL, DEFAULT VALUE='unstamped' |
| member_id   | INTEGER, FOREIGN KEY=users.id, NOT NULL       |
| habit_id    | INTEGER, FOREIGN KEY=habits.id, NOT NULL      |

## REWARD SYSTEM FEATURE
### `rewards`
| columns | Constraints                          |
|---------|--------------------------------------|
| id      | SERIAL, PRIMARY KEY                  |
| type    | ENUM('color', 'stamp', 'badge', 'sprite', 'title', 'other', 'custom') |
| reward  | VARCHAR(50), NOT NULL                |
| description | VARCHAR(250) |
| cost     | INTEGER, NOT NULL, DEFAULT VALUE=7  |
| quantity | INTEGER, NOT NULL, DEFAULT VALUE=1  | NOTE -1 = unlimited?
| color    | VARCHAR(7), NOT NULL, DEFAULT VALUE='#000000' |
| stamp    | VARCHAR(50), NOT NULL, DEFAULT VALUE='award' |
| program_id | INTEGER, FOREIGN KEY=programs.id  | NULLABLE
| creator_id | INTEGER, FOREIGN KEY=users.id | NULLABLE
| created_at | TIMESTAMP, DEFAULT VALUE=new Date() | NULLABLE

### `redeemed`
| user_rewards | Constraints                               |
|--------------|-------------------------------------------|
| id           | SERIAL, PRIMARY KEY                       |
| user_id      | INTEGER, FOREIGN KEY=users.id, NOT NULL   |
| reward_id    | INTEGER, FOREIGN KEY=rewards.id, NOT NULL |
| redeemed_at  | TIMESTAMP, DEFAULT VALUE=new Date(), NOT NULL |


## ACCOUNTABILITY CONNECTION FEATURE
### `bonds`
| columns  | Constraints                             |
|----------|-----------------------------------------|
| id       | SERIAL, PRIMARY KEY                     |
| user_id  | INTEGER, FOREIGN KEY=users.id, NOT NULL | combo-unique
| buddy_id | INTEGER, FOREIGN KEY=users.id, NOT NULL |

---------

## Routes & Endpoints
### Frontend
splash
habit tracker
results
shop

friends
badges/rewards
signup form
login form
logout form
settings form
task maker form
program maker form



**NOTE** Remember to decide and integrate authentication/privacy setting concerns too for each route, 
based on how we decide to go about it.

#### Entry/exit points-ROOT: `/`
| METHOD | Route Path | Purpose         |
|--------|------------|-----------------|
| GET    | `/`          | render splash page |
| GET    | `/home`    | render user's habit-tracker homepage | 
| POST   | `/signup` | Create new account and log them in |
| POST   | `/signin` | Verify auth and log them in |
| POST   | `/signout` | Delete auth and logout |

#### User-ROOT: `/users/:id`
| METHOD | Route Path | Purpose         |
|--------|------------|-----------------|
| GET | `/` | renders user profile page with habits |
| GET | `/habits/:id/history` | renders page with visual data displays of specific habit's history |

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


### Backend
#### ROOT: `/users`
| METHOD | Route Path | Purpose         |
|--------|------------|-----------------|
| POST   | `/`        | Validate signup and make new user account. |
| GET    | `/:id/cookie` | Authenticate login, return cookie and `user` | NOTE Not quite sure yet this would be the right way to do this...
| GET    | `/:id`     | Get `user` information |
| PATCH  | `/:id`     | Authenticate and edit `user` details |
| DELETE | `/:id`     | Delete a `user` account |
| GET    | `/:id/auth` | Not sure, but I think we may need a route just to check auth? |
| GET    | `/:id/programs` | Get all a `user`'s subscribed `programs`. |
<!-- 
**NOTE-MIRA** For reward and buddies stretch goal features only.
| GET    | `/:id/redeemed` | Get all a `user`'s `redeem`ed rewards. |
| GET    | `/:id/redeemed/:type` | Get all a `user`'s `redeem`ed rewards of a specific `type`. |
| GET    | `/:id/bonds` | Get all a `user`'s `bond`s. |
| POST   | `/:id/bonds` | Create a `bond` with another `user`. |
| DELETE | `/:id/bonds/:buddy_id` | Delete a `bond` with a `user`. |
-->

#### ROOT: `/programs`
| METHOD | Route Path | Purpose         |
|--------|------------|-----------------|
| POST   | `/`        | Create a new `program`.    |
| GET    | `/:id`     | Get a `program`'s details. |
<!-- | PATCH  | `/:id`     | Edit a `program`.   |
| DELETE | `/:id`     | Delete a `program`. |
| GET    | `/:id/stampers` | Get all a `program`'s `stamper`s. |
| GET    | `/:id/stampers/:stamper_id` | Get a specific `stamper` and the member(s) they are accountable for. | -->

#### ROOT: `/programs/:id/members`
| METHOD | Route Path | Purpose         |
|--------|------------|-----------------|
| GET    | `/`        | Get a `program`'s `member`s. |
<!-- | POST   | `/:member_id` | Add a `member` to the `program`. |
| DELETE | `/:member_id` | Delete a `member` from the `program`. | -->
| GET    | `/:member_id/habits` | Get a `member`'s `habit`s for a `program`, including last seven days of history for each. |
| GET    | `/:member_id/habits/:habit_id` | Get a `user` `habit`'s details, including full history (via `stamp_checks`) |
<!-- | GET    | `/:member_id/stamper` | Get a `member`'s `stamper` in the program.
| PATCH  | `/:member_id/stamper` | Change a `member`'s `stamper` in the program.
| DELETE | `/:member_id/stamper` | Remove the assigned `stamper`. -->

#### ROOT: `/programs/:id/habits`
| METHOD | Route Path | Purpose         |
|--------|------------|-----------------|
| GET    | `/` | Get all a `program`'s `habits`, including last seven days of history for each. |
| GET    | `/:habit_id` | Get a `habit`'s details, including full histories for from all members (via `stamp_checks`) |
| POST   | `/`        | Create a `habit` for a `program`. |
| PATCH  | `/:habit_id` | Edit a `habit` for a `program`. |
| DELETE | `/:habit_id` | Delete a `habit` for a `program`. |

#### ROOT: `/programs/:id/habits/:habit_id/members/:member_id`
| POST   | `/stamp`     | Change status of associated `daily_stamp` to 'stamped' |
| DELETE | `/`     | Change status of associated `daily_stamp` to 'unstamped' |
<!-- | POST   | `/ping`     | Change status of associated `daily_stamp` to 'pending' | -->

<!-- #### ROOT: `/rewards`
| METHOD | Route Path | Purpose         |
|--------|------------|-----------------|
| GET    | `/` | Get all default rewards. |
| GET    | `/:type` | Get all rewards of a specific type. | <-- maybe default-permanent options only?
 -->

<!-- 
#### ROOT: `/programs/:id/rewards`
| METHOD | Route Path | Purpose         |
|--------|------------|-----------------|
| GET    | `/` | Get all a `program`'s custom `reward`s. |
| POST   | `/` | Create a new custom `reward`. |
| PATCH  | `/:reward_id` | Edit a custom `reward`.    |
| DELETE | `/:reward_id` | Delete a custom `reward`.  | 
| POST   | `/:reward_id/redeem/users/:user_id` | Redeem a `reward` for a `user` | <-- effects points
-->

**NOTE** Consider additional routes specific to length of time, for different sort options? Examples: `/:id/days`, `/:id/weeks`, `/:id/months`, `/:id/days/:limit`. Routes that fetch and order by specific values, like color, when created,, name, etc? Examples: `/by-colors`, `by-names`, `by-created-at`. Clean up data back here thoroughly before sending back? ex. for bar graph, etc.{}

**NOTE** Create and run these routes so that there is a default program and it
is used, even if we aren't planning on implementing the feature. I want it.


<!-- | METHOD | Route Path | Purpose         |
|--------|------------|-----------------|
|  |  |
|  |  |
|  |  |  -->

---------

## Wireframes & Templates
### General Theming
- **Title Ideas** PersiStamp or Persistamp (Persistent/Stamp)

- **Logo Ideas** A turtle stamp

- **Colors** (base/background, primary, secondary, accent...)
Colorful and friendly. Dark mode first. Light mode as stretch goal.

  - red-violet-crayola: #af4d98ff;
  - wild-orchid: #d66ba0ff;
  - pastel-pink: #e5a9a9ff;
  - dutch-white: #f4e4baff;
  - celeste: #baf2e9ff;
  - granny-smith-apple: #b0f2b4ff;
  - magic-mint: #9df7e5ff;
  - blizzard-blue: #b8f3ffff;
  - middle-blue: #8ac6d0ff;
  - cadet-blue: #58a4b0ff;
  - dark-slate-blue: #54478cff;
  - sapphire-blue: #2c699aff;
  - blue-munsell: #048ba8ff;
  - keppel: #0db39eff;
  - medium-aquamarine: #16db93ff;
  - light-green: #83e377ff;
  - inchworm: #b9e769ff;
  - corn: #efea5aff;
  - maize-crayola: #f1c453ff;
  - sandy-brown: #f29e4cff;

- **Fonts** (Choose 1-2 main ones, 3-5 sizes (relative), don't have more than 3 fonts, less is more)
- **Aesthetic** (If based on Loop Habit Tracker, perhaps ex. Clean, minimal, cheerful, * slightly customizable to people's tastes with rewards)

Analog-feel of paper, stamps, traditional materials, sticky notes/journals, 'reward boards', et cetera? Chalkboard?

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
