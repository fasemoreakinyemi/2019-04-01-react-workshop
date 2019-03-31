import React, { useCallback } from "react";
import { Redirect } from "react-router";
import useRequest from "react-use-request";
import { postsApi } from "../constants";
import { NewPostForm } from "../Components/NewPostForm";

export function CreateNewPost() {
  const { loading, data, error, request } = useRequest({
    method: "post",
    url: postsApi,
    lazy: true
  });

  const onSubmit = useCallback(
    function(author, title, text) {
      request({
        data: {
          fields: {
            author: { stringValue: author },
            title: { stringValue: title },
            text: { stringValue: text }
          }
        }
      });
    },
    [request]
  );

  if (loading) {
    return "Formular wird abgeschickt";
  }

  if (error) {
    console.error(error);
    return "Fehler beim Formular versenden";
  }

  if (data) {
    return <Redirect to="/posts" />;
  }

  return <NewPostForm onSubmit={onSubmit} />;
}
