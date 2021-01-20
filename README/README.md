# Persistamp - Habit Tracker Productivity App

**Team:** Alicia M Kim, David Lee


## Table Of Contents
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->
  - [Description](#description)
- [Persistamp - Habit Tracker Productivity App](#persistamp-habit-tracker-productivity-app)
  - [Table Of Contents](#table-of-contents)
  - [Developers](#developers)
    - [Alicia Mira Kim](#alicia-mira-kim)
    - [David Lee](#david-lee)
  - [Description](#description)
  - [Technologies](#technologies)
  - [Features](#features)
    - [Create and Track Healthy Habits](#create-and-track-healthy-habits)
    - [Categorize Your Habits within 'Programs'](#categorize-your-habits-within-programs)
  - [Build Program Reward Shops](#build-program-reward-shops)
  - [Redeem Rewards with Points](#redeem-rewards-with-points)
    - [Customize Your Style](#customize-your-style)
    - [Track Your Results](#track-your-results)
    - [Drag-n-drop and Auto-Sort Options](#drag-n-drop-and-auto-sort-options)
    - [Public or Private](#public-or-private)
  - [Future: Feature Stretch Goals](#future-feature-stretch-goals)
  - [Models & Schema](#models-schema)
  - [MVP FEATURE TABLES](#mvp-feature-tables)
    - [`users`](#users)
    - [`programs`](#programs)
    - [`memberships`](#memberships)
    - [`habits`](#habits)
    - [`stamps`](#stamps)
  - [REWARD SYSTEM FEATURE](#reward-system-feature)
    - [`rewards`](#rewards)
    - [`redeemed`](#redeemed)
    - [`bonds`](#bonds)
  - [Routes & Endpoints](#routes-endpoints)
    - [Frontend](#frontend)
      - [ROOT: `/`](#root)
    - [Backend](#backend)
      - [ROOT: `/users`](#root-users)
      - [ROOT: `/programs`](#root-programs)
      - [ROOT: `/programs/:pid/members`](#root-programspidmembers)
      - [ROOT: `/programs/:pid/habits`](#root-programspidhabits)
      - [ROOT: `/programs/:pid/habits/:hid/members/:uid`](#root-programspidhabitshidmembersuid)
      - [ROOT: `/rewards`](#root-rewards)
      - [ROOT: `/programs/:pid/rewards`](#root-programspidrewards)
  - [Wireframes & Templates](#wireframes-templates)
    - [General Theming](#general-theming)

<!-- /code_chunk_output -->

## Developers
### Alicia Mira Kim
![GitHub]()
![LinkedIn]()
![AngelList]()
![alicia.mira.kim@gmail.com]

### David Lee
![GitHub]()
![LinkedIn]()
![AngelList]()

## Description
![live site](https://persistamp.herokuapp.com)

A browser-based productivity app to help users track their healthy habits, earn points, analyze habit trends over time, and set and redeem rewards as goals.

Inspired from the mobile app **Loop Habit Tracker:** https://play.google.com/store/apps/details?id=org.isoron.uhabits&hl=en_US&gl=US

Persistamp's design is inspired by reward cards and sticker reward systems. The visually appealing 'program card' system, emulating the style of loyalty reward cards, is meant to encourage users to track their habits by 'stamping' successful days on their personalized cards. The user can view each habit's history analytics, such as a line graph, calendar, and statistics like longest streak.

With each stamp, the user gains points for the program the habit is included in. A program's reward shop can be stocked by the user with their own custom reward ideas ex. 'Take a day off', 'Enjoy a pumpkin spice latte', 'Play games for 1 hour', and set their cost, quantity, and custom color/icon appearance. Redeemed rewards are displayed for posterity in a receipt-style log as 'proof of their purchase'.

## Technologies
- JavaScript
- Python 3
- React
- HTML/CSS
- PostgreSQL
- Psycopg2
- Flask
- SQLAlchemy
- Alembic
- Visual Studio Code
- Docker
- Flask-WTF, WTForms
- recharts
- beautiful-react-dnd
- Werkzeug
- Marshmallow-SQLAlchemy

## Features
### Create and Track Healthy Habits
Whether it's 'take a walk', 'draw every day', 'call Mom', or 'do the dishes', a user can create habits, set their 'frequency' (1-7x per week), and even decide the color and icon to 'stamp' off each successful day. 

### Categorize Your Habits within 'Programs'
Users can create reward-card-style 'program' cards to group habits according to personal preference. ex. 'Chores', 'Creative', 'Social', 'Health'. 

## Build Program Reward Shops
Each program comes with its own reward shop. Users can fill shops with custom-made rewards like 'Buy a new book', 'Order pizza', 'Watch TV for 1 hour', or 'Beach vacation', with settings available for cost, quantity, description, and custom appearance.

## Redeem Rewards with Points
With every successfully stamped day, keeping up healthy habits racks up points for its associated program, which can be spent to redeem rewards in the program's reward shop. Redeemed rewards are then logged to a receipt-style log of 'shop purchases' for posterity!

### Customize Your Style
Program cards, habits, and rewards can be customized with a unique color and icon to help easily visually differentiate them.

### Track Your Results
Click a habit to see analytics for that habit's history, including a line graph, calendar, scores and statistics.

### Drag-n-drop and Auto-Sort Options
An intuitive drag-n-drop interface lets users manually sort habits and programs in any desired order, on top of options to sort by name, color, and creation date.

### Public or Private
Set the privacy mode of habits individually, so that habit history details can be shared to others or kept a secret.

## Future: Feature Stretch Goals
- Add friends
- Accountability buddies
- Messaging

- Public/private user profile, programs
- User Profile page
- Custom frequency options to allow from 'out of any number', rather than only by 'week'. Ex. '3 days out of 30'.
- Dark/light mode
- (low) Option to archive and hide-archive habits.
- Change display mode to daily/yearly
- (low) Adding addition display types (see above options in MVP). Ideally at least three total (high), max of five (low)

---------

## Models & Schema
**NOTE-MIRA** Break these out into separate feature packets?
Separate color table, or just a value on the habits table?
Is `created_at` needed for habit_days or habits on top of `date`?

![Table Models](N:\OneDrive\Studies\aa\w20\PersiStamp.png)

**TABLES LIST**
- users
- memberships
- programs
- habits
- stamps
- rewards
- redeemed
- colors
- icons
- bonds


## MVP FEATURE TABLES
### `users`
| users      | Constraints                                   |
|------------|-----------------------------------------------|
| id         | SERIAL, PRIMARY KEY                           |
| first_name | VARCHAR(25) NOT NULL                          |
| last_name  | VARCHAR(25) NOT NULL                          |
| username   | VARCHAR(25) NOT NULL |
| birthday   | DATE |
| email      | VARCHAR(320), NOT NULL, UNIQUE                 |
| hashword   | VARCHAR(255) NOT NULL                         |
| color_id   | FOREIGN KEY(colors.id), NOT NULL |
| stamp_id   | FOREIGN KEY(stamps.id), NOT NULL |
| pids_order | ARRAY(INTEGER), NOT NULL, DEFAULT VALUE=[] |
| is_private | BOOLEAN, NOT NULL, DEFAULT VALUE=False |
| created_at | TIMESTAMP, NOT NULL, DEFAULT VALUE=new Date() |

### `programs`
| columns   | Constraints                              |
|-----------|------------------------------------------|
| id        | SERIAL, PRIMARY KEY                      |
| title     | VARCHAR(25), NOT NULL |
| description | VARCHAR(250) |
| color_id   | FOREIGN KEY(colors.id), NOT NULL |
| stamp_id   | FOREIGN KEY(stamps.id), NOT NULL |
| hids_order | ARRAY(INTEGER), NOT NULL, DEFAULT VALUE=[] |
| rew_ids_order |  ARRAY(INTEGER), NOT NULL, DEFAULT VALUE=[] |
| is_private | BOOLEAN, NOT NULL, DEFAULT VALUE=False |
| creator_id | INTEGER, FOREIGN KEY=users.id, NOT NULL |
| created_at | TIMESTAMP, NOT NULL, DEFAULT VALUE=new Date() |

### `memberships`
| columns   | Constraints                              |
|-----------|------------------------------------------|
| id        | SERIAL, PRIMARY KEY                      |
| program_id | INTEGER, FOREIGN KEY=programs.id, NOT NULL |
| member_id  | INTEGER, FOREIGN KEY=users.id, NOT NULL |
| stamper_id | INTEGER, FOREIGN KEY=users.id           |
| points     | INTEGER, NOT NULL, DEFAULT VALUE=0 |

### `habits`
| habits      | Constraints                                   |
|-------------|-----------------------------------------------|
| id          | SERIAL, PRIMARY KEY                           |
| title       | VARCHAR(25), NOT NULL                         |
| description | VARCHAR(250)                                  |
| frequency   | INTEGER, NOT NULL, DEFAULT VALUE=1            |
| color_id    | FOREIGN KEY(colors.id), NOT NULL |
| stamp_id    | FOREIGN KEY(stamps.id), NOT NULL |
| program_id  | INTEGER, FOREIGN KEY=programs.id, NOT NULL    |
| creator_id  | INTEGER, FOREIGN KEY=users.id, NOT NULL       |
| created_at  | TIMESTAMP, NOT NULL, DEFAULT VALUE=new Date() |


### `stamps`
| columns     | Constraints                                   |
|-------------|-----------------------------------------------|
| id          | SERIAL, PRIMARY KEY                           |
| date        | DATE, NOT NULL                                |
| status      | VARCHAR(25), NOT NULL, DEFAULT VALUE="unstamped" |
| member_id   | INTEGER, FOREIGN KEY=users.id, NOT NULL       |
| habit_id    | INTEGER, FOREIGN KEY=habits.id, NOT NULL      |

## REWARD SYSTEM FEATURE
### `rewards`
| columns | Constraints                          |
|---------|--------------------------------------|
| id      | SERIAL, PRIMARY KEY                  |
| type    | VARCHAR(25), DEFAULT VALUE="custom"  |
| title   | VARCHAR(50), NOT NULL                |
| description | VARCHAR(250) |
| cost     | INTEGER, NOT NULL, DEFAULT VALUE=5  |
| color_id   | FOREIGN KEY(colors.id), NOT NULL |
| stamp_id   | FOREIGN KEY(stamps.id), NOT NULL |
| limit_per_member | INTEGER, NOT NULL, DEFAULT VALUE=-1 |
| quantity | INTEGER, NOT NULL, DEFAULT VALUE=1  |
| program_id | INTEGER, FOREIGN KEY=programs.id  |
| creator_id | INTEGER, FOREIGN KEY=users.id |
| created_at | TIMESTAMP, DEFAULT VALUE=new Date() |

### `redeemed`
| user_rewards | Constraints                               |
|--------------|-------------------------------------------|
| id           | SERIAL, PRIMARY KEY                       |
| user_id      | INTEGER, FOREIGN KEY=users.id, NOT NULL   |
| reward_id    | INTEGER, FOREIGN KEY=rewards.id, NOT NULL |
| redeemed_at  | TIMESTAMP, DEFAULT VALUE=new Date(), NOT NULL |

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
| GET    | `/`        | splash page, if no auth |
| GET    | `/`        | user homepage, if auth checks |
| GET    | `/about`   | about page |
| GET    | `/logout`   | logout user |
| GET    | `/users/:uid` | user's public profile page |
| GET    | `/users/:uid/redeemed` | user's redeemed reward history |
| GET    | `/programs/:pid/redeemed` | user's redeemed reward history for a program |
| GET    | `/habits/:hid/memberships/:mid` | public habit history page for a user's habit |
| GET    | `/users/:uid/bonds` | user's bonds. |
| GET    | `/programs/:pid/memberships/:mid/rewards` | reward shop for a user and program |

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

- **Fonts** Berkshire Swash (Google), Cambria (headers), Calibri...
- **Aesthetic** Colorful but modern. Analog-feel of paper, stamps, traditional materials, sticky notes/journals, 'reward boards', et cetera? Chalkboard?