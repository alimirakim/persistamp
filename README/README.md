# Team SBADE - Habit Tracker Productivity App

**Team:** Alicia M Kim, David Lee, Eric Lyda, Brian Wang, Scrum Leader Sergey Gridin

**NOTE-MIRA** I have commented out a lot of details that will only be relevant for later stretch goals (mainly rewards and accountability buddies) to hopefully make it easier to read the important things. Please look at the code of this readme if you wish to see any of that. The section immediately below of 'goals' is just a rough spit-out of thoughts to help start thinking about potential workflow, to give some kind of starting point. Please add your own notes as any of you see fit.

## Table Of Contents
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->
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
      - [ROOT: `/`](#root)
      - [ROOT: `/users/:uid`](#root-usersuid)
      - [ROOT: `/settings`](#root-settings)
      - [ROOT: `/programs/:pid/habits`](#root-programspidhabits)
      - [ROOT: `/users/:uid/habits/:hid/history` MIRA I dunno' if this is the ideal routing for these LOL just winged something](#root-usersuidhabitshidhistory-mira-i-dunno-if-this-is-the-ideal-routing-for-these-lol-just-winged-something)
      - [ROOT: `/programs/:pid/stampers`](#root-programspidstampers)
    - [Backend](#backend-1)
      - [ROOT: `/users`](#root-users)
      - [ROOT: `/programs`](#root-programs)
      - [ROOT: `/programs/:pid/members`](#root-programspidmembers)
      - [ROOT: `/programs/:pid/habits`](#root-programspidhabits-1)
      - [ROOT: `/programs/:pid/habits/:hid/members/:uid`](#root-programspidhabitshidmembersuid)
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

![Table Models](N:\OneDrive\Studies\aa\w20\PersiStamp.png)

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
| color    | VARCHAR(7), NOT NULL, DEFAULT VALUE='#000000' |
| stamp    | VARCHAR(50), NOT NULL, DEFAULT VALUE='award' |
| limit_per_member | INTEGER, NOT NULL, DEFAULT VALUE=-1 |
| quantity | INTEGER, NOT NULL, DEFAULT VALUE=1  | NOTE -1 = unlimited?
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

**NOTE** Remember to decide and integrate authentication/privacy setting concerns too for each route, 
based on how we decide to go about it.

#### ROOT: `/`
| METHOD | Route Path | Purpose         |
|--------|------------|-----------------|
| GET    | `/`        | render splash page, if no auth |
| GET    | `/`        | renders user profile dash-page, if auth checks |
| GET    | `/home`    | render user's habit-tracker homepage | 
| GET    | `/signup`  | Render the signup form |
| POST   | `/signup`  | Create new account and log them in |
| GET    | `/signin`  | Render the sign-in form |
| POST   | `/signin`  | Verify auth and log them in |
| GET    | `/signout` | Render the logout form (may be unnecessary) |
| POST   | `/signout` | Delete auth and logout |

#### ROOT: `/users/:uid`
| METHOD | Route Path | Purpose         |
|--------|------------|-----------------|
| GET    | `/` | renders user's public profile page |

| GET    | `/redeemed` | renders user's redeemed reward history |
| GET    | `/programs/:pid/redeemed` | renders user's redeemed reward history for a program |
| GET    | `/programs/:pid/habits/:hid/history` | renders the public habit history page for a user's habit (MIRA not for MVP, I think, because I think having the option to make this private would be best?) | 
| GET    | `/bonds` | renders a list of user's bonds. |
| GET    | `/bonds/create` | renders a form to request a bond with another user. |
| POST   | `/bonds/create` | creates a bond between users. |
| GET    | `/bonds/remove` | renders a form to confirm removal of a bond. |
| DELETE | `/bonds/remove` | deletes a bond between users.. |


#### ROOT: `/settings`
| METHOD | Route Path | Purpose         |
|--------|------------|-----------------|
| GET    | `/`        | renders a logged-in user's settings page. |
| GET    | `/edit`    | Render a form to edit details of a user's account. |
| PATCH  | `/edit`    | Edit details of a user's account. |
| GET    | `/delete`  | Render a form to delete the logged-in user's account. |
| DELETE | `/delete`  | Delete the logged-in user's account. |


#### ROOT: `/programs`
| METHOD | Route Path | Purpose         |
|--------|------------|-----------------|
| GET    | `/`        | renders a list of a logged-in user's programs |
| GET    | `/create`  | Render 'create new program' form. |
| POST   | `/create`  | Create a new program |
| GET    | `/:pid/edit` | Edit a program | 
| PATCH  | `/:pid/edit` | Render 'edit' form for a program. | 
| GET    | `/:pid/delete` | Render a delete confirmation for a program. |
| DELETE | `/:pid/delete` | Delete a program | 


#### ROOT: `/programs/:pid/habits`
| METHOD | Route Path | Purpose         |
|--------|------------|-----------------|
| GET    | `/`        | renders a logged-in user's program of habits and daily-stamps. |
| GET    | `/create`  | Render 'create new habit' form. |
| POST   | `/create`  | Create a new habit |
| GET    | `/:hid/edit` | Edit a habit | 
| PATCH  | `/:hid/edit` | Render 'edit' form for a habit. | 
| GET    | `/:hid/delete` | Render a delete confirmation for a habit. |
| DELETE | `/:hid/delete` | Delete a habit |

#### ROOT: `/users/:uid/habits/:hid/history` MIRA I dunno' if this is the ideal routing for these LOL just winged something
> **NOTE-MIRA:**  - I believe we agreed MVP would include line and calendar graphs and only one type of depiction (by weeks, the same as Loop Habit Tracker's default?)

| METHOD | Route Path | Purpose         |
|--------|------------|-----------------|
| GET    |`/`         | renders page with visual data displays of specific habit's history |  
| GET    | `/line/days`  |  |
| GET    | `/line/weeks` | MVP |
| GET    | `/line/months` |  |
| GET    | `/line/years`  |  |
| GET    | `/calendar/days`   |  |
| GET    | `/calendar/weeks`  | MVP |
| GET    | `/calendar/months` |  |
| GET    | `/calendar/years`  |  |
| GET    | `/bar/days`   |  |
| GET    | `/bar/weeks`  |  |
| GET    | `/bar/months` |  |
| GET    | `/bar/years`  |  |
| GET    | `/bubble/days`   |  |
| GET    | `/bubble/weeks`  |  |
| GET    | `/bubble/months` |  |
| GET    | `/bubble/years`  |  |
<!-- 
| GET    | `/days`   | Not sure if day-only routes might have a use, keeping this here just in case |
| GET    | `/weeks`  |  |
| GET    | `/months` |  |
| GET    | `/years`  |  | 
-->

#### ROOT: `/programs/:pid/rewards`
| GET    | `/` | render the reward shop page for a program. |
| POST   | `/:pid/create` | create a custom reward for a program |
| PATCH  | `/:rid/edit`   | edit a custom reward for a program |
| DELETE | `/:rid/delete` | delete a custom reward for a program |
| GET    | `/redeemed` | render a history of redeemed rewards for a program |
| GET    | `/:rid/redeemed` | render a history of redemptions for one of a program's rewards | -->

#### ROOT: `/rewards`
| METHOD | Route Path | Purpose         |
|--------|------------|-----------------|
| GET    | `/create` | render the create-custom-reward form |
| GET    | `/edit`   | render the edit-custom-reward form
| GET |  | `/delete` | render the delete-confirmation reward form -->

#### ROOT: `/programs/:pid/users`
| METHOD | Route Path | Purpose         |
|--------|------------|-----------------|
| GET    | `/` | Render the list of users of a program |
| GET    | `/members` | Render the list of members of a program |
| GET    | `/stampers` | Render the list of stampers of a program |
| GET    | `/join` | Render a form to join a program as a member or stamper. |
| POST   | `/join` | Add a user as a member or stamper of a program. |
| GET    | `/leave` | Render a form to leave a program. |
| DELETE | `/leave` | Remove a user from a program. |
| GET    | `/invite` | Render a form to invite a bonded user to a program as a member or stamper. |
| POST   | `/invite` | Send an invite to program to a user. -->

#### ROOT: `/programs/:pid/stampers`
| METHOD | Route Path | Purpose         |
|--------|------------|-----------------|
| GET    |  |
| POST   | `/programs/:pid/habits/:hid/members/:uid/stamp` | Give stamp to a user for a habit program and day.
| POST   | `/programs/:pid/habits/:hid/members/:uid/ping` | Ping stamper for approval for a habit program and day.
| POST   | `/programs/:pid/habits/:hid/members/:uid/unstamp` | Remove a stamp for a habit program and day.
| POST   |  |
| PATCH  |  | 
| DELETE |  |

<!-- 
#### ROOT: ``
| METHOD | Route Path | Purpose         |
|--------|------------|-----------------|
|  |  |
|  |  |
|  |  |  -->


### Backend
#### ROOT: `/users`
| METHOD | Route Path | Purpose         |
|--------|------------|-----------------|
| POST   | `/`        | Validate signup and make new user account. |
| GET    | `/:uid/cookie` | Authenticate login, return cookie and `user` | NOTE Not quite sure yet this would be the right way to do this...
| GET    | `/:uid`     | Get `user` information |
| PATCH  | `/:uid`     | Authenticate and edit `user` details |
| DELETE | `/:uid`     | Delete a `user` account |
| GET    | `/:uid/auth` | Not sure, but I think we may need a route just to check auth? |
| GET    | `/:uid/programs` | Get all a `user`'s subscribed `programs`. |

**NOTE-MIRA** For reward and buddies stretch goal features only.
| GET    | `/:uid/redeemed` | Get all a `user`'s `redeem`ed rewards. |
| GET    | `/:uid/redeemed/:type` | Get all a `user`'s `redeem`ed rewards of a specific `type`. |
| GET    | `/:uid/bonds` | Get all a `user`'s `bond`s. |
| POST   | `/:uid/bonds` | Create a `bond` with another `user`. |
| DELETE | `/:uid/bonds/:bid` | Delete a `bond` with a `user`. |


#### ROOT: `/programs`
| METHOD | Route Path | Purpose         |
|--------|------------|-----------------|
| POST   | `/`        | Create a new `program`.    |
| GET    | `/:pid`    | Get a `program`'s details. |
| PATCH  | `/:pid`    | Edit a `program`.   |
| DELETE | `/:pid`    | Delete a `program`. |
| GET    | `/:pid/stampers` | Get all a `program`'s `stamper`s. |
| GET    | `/:pid/stampers/:uid` | Get a specific `stamper` and the member(s) they are accountable for. | 

#### ROOT: `/programs/:pid/members`
| METHOD | Route Path | Purpose         |
|--------|------------|-----------------|
| GET    | `/`        | Get a `program`'s `member`s. |
| POST   | `/:uid`    | Add a `member` to the `program`. |
| DELETE | `/:uid`    | Delete a `member` from the `program`. | 
| GET    | `/:uid/habits` | Get a `member`'s `habit`s for a `program`, including last seven days of history for each. |
| GET    | `/:uid/habits/:hid` | Get a `user` `habit`'s details, including full history (via `stamp_checks`) |
| GET    | `/:uid/stamper` | Get a `member`'s `stamper` in the `program`.
| PATCH  | `/:uid/stamper` | Change a `member`'s `stamper` in the `program`.
| DELETE | `/:uid/stamper` |  Unassign the assigned `stamper`.

#### ROOT: `/programs/:pid/habits`
| METHOD | Route Path | Purpose         |
|--------|------------|-----------------|
| GET    | `/`        | Get all a `program`'s `habits`, including last seven days of history for each. |
| GET    | `/:hid`    | Get a `habit`'s details, including full histories for from all members (via `stamp_checks`) |
| POST   | `/`        | Create a `habit` for a `program`. |
| PATCH  | `/:hid`    | Edit a `habit` for a `program`. |
| DELETE | `/:hid`    | Delete a `habit` for a `program`. |

#### ROOT: `/programs/:pid/habits/:hid/members/:uid`
| POST   | `/stamp`   | Change status of associated `daily_stamp` to 'stamped' |
| DELETE | `/`     | Change status of associated `daily_stamp` to 'unstamped' |
| POST   | `/ping`     | Change status of associated `daily_stamp` to 'pending' | 


#### ROOT: `/rewards`
| METHOD | Route Path | Purpose         |
|--------|------------|-----------------|
| GET    | `/`        | Get all default rewards. |
| GET    | `/:type`   | Get all rewards of a specific type. | <-- default-permanent options only



#### ROOT: `/programs/:pid/rewards`
| METHOD | Route Path | Purpose         |
|--------|------------|-----------------|
| GET    | `/`        | Get all a `program`'s custom `reward`s. |
| POST   | `/`        | Create a new custom `reward`. |
| PATCH  | `/:rid`    | Edit a custom `reward`.    |
| DELETE | `/:rid`    | Delete a custom `reward`.  | 
| POST   | `/:rid/redeem/users/:uid` | Redeem a `reward` for a `user` | <-- effects points

<!--
| METHOD | Route Path | Purpose         |
|--------|------------|-----------------|
|  |  |  |
|  |  |  |
|  |  |  | 
-->

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
