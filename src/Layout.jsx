import React from "react";

import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(function(theme) {
  return {
    root: {
      minHeight: "100vh"
    },
    paperContainer: {
      padding: theme.spacing.unit
    },
    paper: {
      height: "100%"
    },
    contentArea: {
      padding: theme.spacing.unit
    }
  };
});

export function Layout({ menuItems, children }) {
  const classNames = useStyles();

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="stretch"
      className={classNames.root}
    >
      <Grid item xs={3} className={classNames.paperContainer}>
        <Paper className={classNames.paper}>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
          >
            {menuItems}
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={9} className={classNames.paperContainer}>
        <Paper className={classNames.paper}>
          <main className={classNames.contentArea}>{children}</main>
        </Paper>
      </Grid>
    </Grid>
  );
}
