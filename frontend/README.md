# MIRA NOTES

1. NODES -

- Add node
- delete node
- add link
- customize link
- delete link
- save coordinates
- save changes to database

2. LIVE PLAY

3. FORMS AND DISPLAY - STYLING

4. ??? WTF I DON'T REMEMBER ????

- HEROKU NPSEED, HEROKU TALESPINNER, TESTS, ADOBE

# Flask React Project

This is the backend for the Flask React project.

## Getting started

1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/appacademy-starters/react-project-starter.git
   ```

2. Install dependencies

   ```bash
   pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
   ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

---

_IMPORTANT!_
If you add any python dependencies to your pipfiles, you'll need to regenerate your requirements.txt before deployment.
You can do this by running:

```bash
pipenv lock -r > requirements.txt
```

_ALSO IMPORTANT!_
psycopg2-binary MUST remain a dev dependency because you can't install it on apline-linux.
There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.

---

## Deploy to Heroku

1. Create a new project on Heroku
2. Under Resources click "Find more add-ons" and add the add on called "Heroku Postgres"
3. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line)
4. Run

   ```bash
   pipenv lock -r > requirements.txt
   heroku login
   ```

5. Login to the heroku container registry

   ```bash
   heroku container:login
   ```

6. Update the `REACT_APP_BASE_URL` variable in the Dockerfile.
   This should be the full URL of your Heroku app: i.e. "https://flask-react-aa.herokuapp.com"
   NOTE FROM JAMES Make sure there is no trailing slash!
7. Push your docker container to heroku from the root directory of your project.
   This will build the dockerfile and push the image to your heroku container registry

   ```bash
   heroku container:push web -a {NAME_OF_HEROKU_APP}
   ```

8. Release your docker container to heroku

   ```bash
   heroku container:release web -a {NAME_OF_HEROKU_APP}
   ```

9. set up your database:

   ```bash
   heroku run -a {NAME_OF_HEROKU_APP} flask db upgrade
   heroku run -a {NAME_OF_HEROKU_APP} flask seed all
   ```

10. Under Settings find "Config Vars" and add any additional/secret .env variables.

11. profit

# The C# Player's Guide (Fourth Edition) by RB Whitaker

> **Technologies:** C# 9, .NET5, Visual Studio 2019

## Table of Contents

-
-
-

## Part 1: The Basics

- Level 1: Learn the main features of C# and .NET.
- Level 2: Install tools to allow us to begin programming in C#.
- Level 3: Write our first few programs and learn the basic ingredients of a C# program.
- Level 4: Annotate your code with comments.
- Level 5: Store data in variables.
- Level 6: Understand the type system.
- Level 7: Do basic math.
- Level 8: Get input from the user.
- Level 9 & 10: Make decisions.
- Level 11: Run code more than once in loops.
- Level 12: Make arrays, which contain multiple pieces of data.
- Level 13: Make methods, which are named, packaged, reusable bits of code.
- Level 14: Understand how memory is used in C#.

---

### Level 1: The C# Programming Language

- C# is a general programming language. You can make almost anything with it.
- C# runs on .NET, which is many things: a runtime that supports your program, a library of code to build upon, and a set of tools to aid in constructing programs.

#### What is C#?

#### What is .NET?

> Knowledge Check: C#
>
> 1. C# is not a special-purpose language optimized for making web applications. It is a general use language that can be used to build almost anything.
> 2. C# runs on the framework .NET.

---

### Level 2: Getting an IDE

- Programming is complex; you want an IDE to make programming life easier
- Visual Studio is the most used IDE for C# programming. Visual Studio Community is free, feature-rich, and recommended for beginners.
- Other C# IDEs exist, including Visual Studio Code and Rider.

#### A Comparison of IDEs

- **Visual Studio** -
- **Visual Studio Code** -
- **Visual Studio for Mac** -
- **JetBrains Rider** -
- **Other IDEs** -
- **OnlineEditors** -
- **No IDE** -

#### Installing Visual Studio

> **Challenge: Install Visual Studio**

---

### Level 3: Hello World: Your First Program

- New projects usually begin life by being generated from a template.
- A C# proram starts running in the program's entry point or main method.
- A full Hello World program looks like this: `System.Console.WriteLine("Hello World!")`;
- Statements are single commands for the computer to perform. They run one after the next.
- Expressions allow you to define a value that is computed as the program runs from other elements.
- Variables let you store data for use later.
- `Console.Readline()` retrieves a full line of text that a user types from the console window.

#### Creating a New Project

#### A Brief Tour of Visual Studio

#### Compiling and Running Your Program

> **Challenge: Hello World!**

#### The Adventure Begins

##### `using` Directives

> **Challenge: What Comes Next**

##### Multiple Statements

> **Challenge: The Makings of a Programmer**

##### Expressions

##### Variables

##### Reading Text from the Console

> **Challenge: Consolas and Telim**

#### Compiler Errors, Debuggers, and Configurations

##### Compiler Errors

##### Debugging

##### Build Configurations

---

### Level 4: Comments

- Comments let you put text in a program that the computer ignores, but that helps programmers understand or remember what the code does.
- Anything after two slashes (`//`) on a line is a comment, as is anything between `/*` and `*/`.

#### How to Make Good Comments

> **Challenge: The Thing Namer 3000**

---

Level 5: Variables

- A variable is a named location in memory for storing data.
- Variables have a type, a name, and a value (contents).
- Variables are declared (created) like this: `int number;`.
- Assigning values to variables is done with the assignment operator: `number = 3;`
- Using a variable name in an expression will copy the value out of the variable.
- Give your variables good names. You will be glad you did.

#### What is a Variable?

#### Creating and Using Variables in C#

#### Integers

#### Reading from a Variable Does Not Change It

#### Clever Variable Tricks

#### Variable Names

> **Knowledge Check: Variables**

---

### Level 6: The C# Type System

- Types of variables and values matter in C#. They are not interchangeable.
- There are eight integer types for storing integers of differing sizes and ranges: `int`, `short`, `long`, `byte`, `sbyte`, `uint`, `ushort`, and `ulong`.
- The `char` type stores single characters.
- The `string` type stores longer text.
- There are three types for storing real numbers: `float`, `double`, and `decimal`.
- The `bool` type stores truth values (true and false) used in logic.
- These types are the building blocks of a much larger system.
- Using `var` for a variable's type tells the compiler to infer its type from the surrounding code, so you do not have to type it out. (But it still has a specific type.)
- The `System.Convert` class is a useful class to convert from one type to another.

#### Representing Data in Binary

#### Integer Types

##### Declaring and Using Variables with Integer Types

##### The Digit Seperator

##### Choosing Between Integer Types

##### Binary and Hexadecimal Literals

#### Text: Characters and Strings

#### Floating-Point Types

##### Scientific Notation

#### The `bool` Type

> **Challenge: The Variable Shop**

> **Challenge: The Variable Shop Returns**

#### Type Inference

#### The `Convert` Class

> **Knowledge Check: Type System**

---

### Level 7: Math

-
