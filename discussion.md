# Dicussion

This application builds on the simple Employee C.V. Management app that you can walk through building in two parts:

- [Introduction To React]()
- [Introduction To Redux]()

Or you can just have a look at this application where I discuss a number of things that are going on in this project.

## Running the app

### Requirements
* node `^4.5.0`
* npm `^3.0.0`

### Install from source

First, clone the project:

```
git clone https://github.com/justsayno/employee-cv-manager-app
cd employee-cv-manager-app
```

Then install dependencies and check to see it works

```
npm install                   # Install project dependencies
npm start                     # Compile and launch
```

If everything works you should see the following (if it doesn't  try [http://localhost:3000](http://localhost:3000):

![Employee Dashboard](images/employee-dashboard.png)

## Webpack

This project is an example of a very advanced webpack build.

***More Details**

- Linting
- Babel
- Module Bundling
- Module resolution helpers
- Assets
- Styles (sass)
- Environment Variables
- Hot Module Reloading

## Project Layout

The main thing to know about this project and the [starter kit](https://github.com/davezuko/react-redux-starter-kit) it is based on is that all your ***application*** code goes in the `src/` folder.
The rest of the code relates to the webpack build which changes a lot so I won't go into huge detail in this discussion to avoid having to update
this in the future.

I will discuss the project layout within the source folder. This is based on the [Fractal Project Layout](https://github.com/davezuko/react-redux-starter-kit/wiki/Fractal-Project-Structure)
concept where rather than grouping things by their type such as 'components', 'reducers' and 'actions' in seerate folders
you instead group it by their place in the application domain.

For example in this project I have the dashbaord which can be found as the 'src/routes/Home' route and the employee profile page which is 
represented by the 'src/routes/EmployeeProfile' route. Each of these routes are self contained and have their own containers, components and redux modules.
There are also global things such as layouts and re-usable components.

## SCSS - MaterializeCss

This project uses sass (a css pre-processor) in combination with [MaterialiseCss](http://materializecss.com/) which is an open source implementation of Googles Material Design in 
a sass framework. 

Most of the style assets are in 'src/styles' unless it is component specific and I have imported and kept them with the component.

I have included pulling in MaterializeCss from npm and using the source scss to bring in a custom build. This allows me to strip out the features I am not
using as well as customise variables if I want. This can be done in the '_variables.scss' and '_colors.scss' files.

### Using Redux as a Cache

If you havea look in `src/Routes/EmployeeProfile/modules/employeeProfile` at how the reducer logic in here works you will find that even though the page
itself is dealing with a single profile I have cached each one. I also update each on and 'invalidate' them when they are updated so they are fetched again.

### Using Local Component State when appropriate

In the toggle for the profile edit I have not used Redux because it is a local thing to the component. It does not effect any of the other components in my application and 
the complexity to use Redux state is not worth it.

### Reselect for selecting

In the employeeProfile modules I have craeted a number of helper functions that make selecting slices of my state a lot easier. Contrast this with the `Home` route
and you will see how I can re-use the same logic a lot of times.

### Authentication

Using OAuth and just not letting the user get to the application until they log in.

### Redux forms

Using redux forms simplifies the 2 way data binding that you really want. Have a look at how the reducer looks in redux dev tools and you make edits to the form.
This can be foudn in `src/routes/EmployeeProfile/Components/EmployeeDetailsEdit.js`.

### Deployment

Using blob storage and updating a web application. Seperate concerns
