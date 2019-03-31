import React from "react";

import { Layout } from "./Layout";
import { MenuItem, MenuList } from "@material-ui/core";
import { ThemeProvider, makeStyles } from "@material-ui/styles";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import { Index } from "./Pages/Index";
import { Posts } from "./Pages/Posts";
import { CreateNewPost } from "./Pages/CreateNewPost";

const useStyles = makeStyles({
  selected: {
    color: "red"
  }
});

export function App({ theme }) {
  const classNames = useStyles();
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Layout
          menuItems={
            <MenuList>
              <NavLink to="/" exact activeClassName={classNames.selected}>
                <MenuItem>Hauptseite</MenuItem>
              </NavLink>
              <NavLink to="/posts" exact activeClassName={classNames.selected}>
                <MenuItem>Posts</MenuItem>
              </NavLink>
              <NavLink to="/new" exact activeClassName={classNames.selected}>
                <MenuItem>Neuen Post erstellen</MenuItem>
              </NavLink>
            </MenuList>
          }
        >
          <Switch>
            <Route path="/posts" exact component={Posts} />
            <Route path="/new" exact component={CreateNewPost} />
            <Route path="/" component={Index} />
          </Switch>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
}
