import React from "react";
import { FC } from "react";
import { Route, Switch } from "react-router";

import { MainPage } from "./MainPage";

export const PageContent: FC = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={MainPage} />
      </Switch>
    </div>
  );
};
