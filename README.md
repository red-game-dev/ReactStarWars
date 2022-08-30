# Task Completed

First of all, thank you for waiting for this much time, unforunately had endless of queries, travel, work, loan, bank, notary related matters which left me with little time back than. The task has been completed, along with the extra bonus points asked. Below will add the list of things introduced along this project.

## @tanstack/react-query

This is used to handle the api requests hooks and as well the caching to prevent extra requests unneeded, especially for data that usually doesn't change much. Having redis is important on the backend, yet the frontend should as well cache what is needed to be cached.

Further more you can see the plugin configuration at `@plugins/QueryClient`

## beautiful-react-hooks

Set of hooks that allow us to use general usage hooks such as `useThrottledCallback`, `useDebouceCallback`, `useDidMount`, and many others are avaialble at their docs.

## craco

This one would say it is very essential for the following reasons

- Handles webpack matters without the need to eject the app whne using create react app
- Further Jest configuration + `react-app-rewire-alias` for alias
- Generally used for alias in our case for @name/*

## React Routing Dom

We'll know what it is for, and I'm using it for the routing, along with few hooks that we need such as `useNavigation` and `useParams`, you can find it as well used as a hook in `useNavQuery`

## Axios

Use this for our api requests handler, which will be combined later with @transtack/react-query hooks

## antd

Used this for design, yet generally I do not use this, first of all I do not really use chinese libs, due of certain events acquired around the world. Although the lib is used by many and is amazing, yet got althernatives to it which they're twice as much better.

## recoil

Used this for state, which allows cross state component, aka state management. One of good things about it, it is as well minimal

## Tests

Added tests generally for the following

- Testing utils
- Testing hooks
- Testing main app - Could add more for pages if required

## Structure

Aimed to provide a good structure for this project, since it is small project as well.

## Architecture

The general architecture of how everything is split and designed is to simplify everything as much as possible and remain performant. Introducing of reusability is in place, yet is not too much, as would be tiedly coupled later and would make it bigger problem to split and/or fix if any issue happens. Keep code simple and readable, in fact max of lines doesnt exceed 100 lines for no file.

## Full Typescript support

The whole project is full typescript support, including interfaces of the api.

## Futher improvements that could have been introduced

- ESlint
- Storyboard
- Further more tests, especially components testing
- Design could have been made more attractive, yet I believe in this task one of most important queries is the performance, as we know react anyone can write it, but not everyone can write it properly, which can end up with endless performance issues.
- Try and reduce more packages from the package, yet kept it to minimum, in fact the maximum a bit of extra package would be `beatiful-react-hooks`.

## Cheers

Cheers for the test, looking forward to hear from you

Best regards,
Red
