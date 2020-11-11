import { createBrowserHistory } from "history";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router } from "react-router";
import { createGlobalStyle } from "styled-components";

import { PageContent } from "./components/PageContent";

const history = createBrowserHistory({ basename: "/" });

// Use createGlobalStyle to change the background of 'body' element
const GlobalStyle = createGlobalStyle`
  body {
    background-color: #2053D6;
  }
`;

// Create component for the page
const Page = () => (
  <>
    <Router history={history}>
      <PageContent />
      <GlobalStyle />
    </Router>
  </>
);

// Render the page into DOM
ReactDOM.render(<Page />, document.getElementById("root"));
