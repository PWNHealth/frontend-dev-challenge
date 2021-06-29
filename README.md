# `React challenge - Covid report`

***

### Overview
Create an app using React and React tools/features that will be a Covid report.

:arrow_right: You can find the mockups [here](https://www.figma.com/file/fhHLjaROBm1Pc2Ces6G49g/react-challenge-mockups?node-id=103%3A1). You will find all the colors/assets in the Figma file, but you need to log in/sign up first.

### Read this file carefully. All the information you need to start working on is there. But if you have any questions feel free to reach out to us;

- You should *not* use Bootstrap or jQuery for this challenge. Third-party packages are allowed, when necessary;
- We suggest using [fontawesome](https://fontawesome.com/) for icons needs and [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) or [axios](https://github.com/axios/axios) for requests;
- We'd like to see how you handle your CSS with a preprocessor, Styled components, or CSS Modules.
- The font-family used in the mockups is [Nunito](https://fonts.google.com/specimen/Nunito?query=nunito);
- We prefer to see effective use of state management to save the API data, thoughtfulness in component building and focus on performance, responsiveness and over styling if you are running out of time. We'll evaluate the quality and organization of your code - even if it is 'incomplete'.
- [Mobile design is provided](https://www.figma.com/file/fhHLjaROBm1Pc2Ces6G49g/react-challenge-mockups?node-id=103%3A1), get creative with responsive desktop designs. We want to evaluate how you handle the Mobile First approach.
- Spend, at max, 8 hours on this project;

### Requirements
- Integrate with [COVID-19 data API](https://rapidapi.com/Gramzivi/api/covid-19-data). You'll need to create an account at [RapidAPI](https://rapidapi.com/) to get a free API key.
- Integrate with [Open Layers Map API](https://openlayers.org/en/latest/examples/icon-color.html). Download the package with [Yarn](https://yarnpkg.com/package/ol) or [npm](https://www.npmjs.com/package/ol);

- When you open the app the main page will display a zoomed map of Brazil and a dropped pin. When you click on this pin it should open a page with details about the *latest* Covid data in the *country*.
- The URL should change ([consider using react-router](https://github.com/ReactTraining/react-router)) when a dropped pin is clicked/detail page is open. If a user copy/pastes the URL into a new window, the same covid detail page should display;
- Detail page should display the country name, number of confirmed, recovered and death cases, and the date of the last report update (format: MM/DD/YYYY, HH:MM (timezone));
- There should be a search bar allowing users to search for a country.
- When a country is searched the map page should zoom to that country, and a pin should appear. The dropped pin from the previous country should disappear; 
- Display an error if:
    - the search does not return any results;
    - the API return an error;

### Bonus (optional)
If you finish early here are some options for bonus points:

- Add tests for your code (we recommend [Jest](https://jestjs.io/) or [Testing Library](https://testing-library.com/docs/react-testing-library/intro/), but you can use any framework you like).
- As the user types on the search bar, suggest the matching [country name](https://gist.github.com/incredimike/1469814) or create a select/dropdown with the countries list. 
- We'd like to see some accessibility best practices;
- Any cool feature you want to add. Surprise us! :)

### Submission
- Fork this repository to your GitHub account. You must create a private repository;
- When you're done open a pull request with your project. Remember to add instructions on how to run the project, tests, etc.;
- If you think it's useful, publish the project on GitHub Pages, Netlify or Heroku. Don't forget to send the link along with the PR
