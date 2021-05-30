# `React challenge - Covid report`

### Overview
Create an app using React and React Hooks that will be a Covid report.

- Use [fontawesome](https://fontawesome.com/) for icons needs and [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) for requests;
- You should not use Bootstrap or jQuery for this challenge. Third-party packages are allowed, when necessary;
- Use a CSS preprocessor;
- The font-family used in the template is Nunito;
- Spend, at max, 8 hours on this project;
- We prefer to see effective use of state management, thoughtfulness in component building and focus on performance, responsiveness and accessibility best practices over styling if you are running out of time. We'll evaluate the quality and organization of your code - even if it is incomplete.

### Requirements
- Integrate with [COVID-19 data API](https://rapidapi.com/Gramzivi/api/covid-19-data). You'll need to create an account at [RapidAPI](https://rapidapi.com/) to get a free API key.
- Integrate with [Open Layers Map API](https://openlayers.org/en/latest/examples/icon-color.html). You'll need to download the package with [Yarn](https://yarnpkg.com/package/ol) or [npm](https://www.npmjs.com/package/ol);
- We want to evaluate how you handle the Mobile First approach.  Mobile design is provided, get creative with responsive desktop designs;
- Add tests for your code (we recommend [Jest](https://jestjs.io/) but you can use any framework you like).

- When you open the app the main page will display a zoomed map at Brazil, and a dropped pin. When you click on this pin it should open a detail page about the Covid data in the country.
- The URL should change ([consider using react-router](https://github.com/ReactTraining/react-router)) when a dropped pin is clicked. If a user copy/pastes the URL into a new window, the same covid detail page should display;
- Detail page should show the number of confirmed, recovered and death cases for that country, and the date of the last report update
- There should be a search bar allowing users to search for a country;
- When a country is searched the map page should zoom to that country, and a pin with the details should appear.

### Bonus (optional)
We would prefer you spent as much time focusing on performance and accessibility as possible, but if you finish early here are some options for bonus points:

- Add a "Info" icon in the modal for a country;
- The info icon should 'favorite' this country;
- Store this data in the users browser;
- If any favorited recipes are detected in the browser, add a button on the home page that shows a list of these countries.

### Submission
Once you've completed your project, deploy the code (to a free account on Heroku), and submit links to the hosted instance and your github repo. Remember to add instructions on how to run the project, if necessary.
