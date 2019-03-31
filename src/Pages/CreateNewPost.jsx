import React, { useState, useCallback } from "react";
import { postsApi } from "../constants";

function sendData(title, author, text) {
  return fetch(postsApi, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      fields: {
        author: { stringValue: author },
        title: { stringValue: title },
        text: { stringValue: text }
      }
    })
  });
}

function useInput(initialValue) {
  const [state, setState] = useState(initialValue);
  const onChangeHandler = useCallback(
    function(event) {
      setState(event.target.value);
    },
    [setState]
  );
  return [state, onChangeHandler];
}

export function CreateNewPost() {
  const [state, setState] = useState("filling"); // filling or sending or error

  const [author, authorOnChange] = useInput("");
  const [title, titleOnChange] = useInput("");
  const [text, textOnChange] = useInput("");

  const onFormSubmit = function(event) {
    event.preventDefault();

    setState("sending");
    sendData(author, title, text)
      .then(function() {
        window.location.reload(); // "redirect" zur Startseite ;)
      })
      .catch(function(error) {
        console.error(error);
        setState("error");
      });
  };

  return (
    <form onSubmit={onFormSubmit}>
      <label>
        Titel: <input type="text" value={title} onChange={titleOnChange} />
      </label>
      <br />
      <label>
        Autor: <input type="text" value={author} onChange={authorOnChange} />
      </label>
      <br />
      <label>
        Text: <textarea value={text} onChange={textOnChange} />
      </label>
      <br />
      <button disabled={state === "sending"}>Absenden!</button>
    </form>
  );
}
