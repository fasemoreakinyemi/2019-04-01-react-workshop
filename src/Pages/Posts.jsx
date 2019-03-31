import React from "react";
import useRequest from "react-use-request";
import { postsApi } from "../constants";
import { Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(function(theme) {
  return {
    marginBottom: {
      marginBottom: theme.spacing.unit
    }
  };
});

export function Posts() {
  const classNames = useStyles();

  const { loading, data, error } = useRequest({
    method: "get",
    url: postsApi
  });

  if (loading) {
    return "...wird geladen...";
  }

  if (error) {
    console.error(error);
    return "Beim Laden ist ein Fehler aufgetreten!";
  }

  return data.documents.map(function(document) {
    return (
      <Card key={document.name} className={classNames.marginBottom}>
        <CardContent>
          <Typography variant="h5">
            {document.fields.title.stringValue}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography variant="subtitle2">
            Autor: {document.fields.author.stringValue}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography variant="body1">
            {document.fields.text.stringValue}
          </Typography>
        </CardContent>
      </Card>
    );
  });
}
