# Team SBADE - Habit Tracker Productivity App
A minimalist productivity app based on Loop Habit Tracker (See: https://play.google.com/store/apps/details?id=org.isoron.uhabits&hl=en_US&gl=US) .

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
    - [(Low-Priority) Miscellaneous](#low-priority-miscellaneious)
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
  
### (Low-Priority) Miscellaneious
 - * Dark/light mode
 - * Share options. Send images of results as email, twitter, etc.
 - * (very low-vague idea only) 'Friend-Accountability': Able to friend others and see their progress.

---------

## Models & Schema
**TODO** Break these out into separate feature packets?

**NOTES** For now, quick thoughts: User, Habit, Day, Habit-Success (boolean), Habit-history?, rewards, reward-points, user-owned-rewards...


---------

## Routes & Endpoints
### Frontend


### Backend


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

### Habit tracker page


### Results display page(s)
Perhaps combine with habit tracker on landscape/desktop displays?

### User profile (popup options only?)


### Signup (splash)/signin/logout


### Add, delete, edit, etc. forms (popups?)


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


### User's Habits


### User's Habit Histories


### User's Rewards/Points


