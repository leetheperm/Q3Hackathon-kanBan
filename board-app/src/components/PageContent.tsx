import React from "react";
import { FC } from "react";
import { Route, Switch } from "react-router";

import { Board } from "./boardComponents/Board";

export const PageContent: FC = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Board} />
      </Switch>
    </div>
  );
};
