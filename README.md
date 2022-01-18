# Enterprise React tech stack in 2022
This is the React tech stack you need to build a big scalable reliable and nice looking app in 2022. 


## Motivation
React ecosystem is changing rapidly as well as the whole frontend development area. It is not easy to compile a modern tech stack to build professional enterprise-class web apps.
This is an opinionated boilerplate that helps you to get a quick start.

## Main modules
* React SSR framework [Next.js](https://nextjs.org/).
* Central state management [Redux](https://redux.js.org/).
* Next and Redux connector [next-redux-wrapper](https://github.com/kirill-konshin/next-redux-wrapper).
* Async middleware for Redux [Redux-Saga](https://redux-saga.js.org/).
* Translation and i18n [next-translate](https://github.com/vinissimus/next-translate).
* Form library [React Hook Form](https://react-hook-form.com/).
* UI design system [Chakra](https://chakra-ui.com/).


## Tech Stack description
There is an [article](https://medium.com/p/3126ed43ba58) describing the main ideas behind this tech stack. 

## Installation and usage
* install [yarn](https://yarnpkg.com/lang/en/docs/install/).
* in local project directory run `yarn` to load modules.
* run `npm run dev` to start the app.

## Working demo
You can see this app in action at [Vercel hosting](https://enterprise-react-2022.vercel.app/)

## Demo functionality
The demo app uses [Fake Store API](https://fakestoreapi.com/).  
It has three pages that a typical online shop would have:
* Product list (Shop)
* Product cart (Cart)
* User profile (User)  

All pages should look nice in all screen resolutions.   

These 3 pages use `getInitialProps` data fetching method. There is no real functionality to add products to the cart, so you need to navigate via the menu.  
To demonstrate the other two data fetching methods `getServerSideProps` and `getStaticProps` there are two additional pages that have the same functionality
as the two main ones but use different data fetching methods under the hood.

