import React, { useState, useCallback } from "react";
import { TextField, Button, Grid } from "@material-ui/core";

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

export function NewPostForm({ onSubmit }) {
  const [author, authorOnChange] = useInput("");
  const [title, titleOnChange] = useInput("");
  const [text, textOnChange] = useInput("");

  const onFormSubmit = useCallback(
    function(event) {
      event.preventDefault();
      onSubmit(author, title, text);
    },
    [author, title, text, onSubmit]
  );

  return (
    <form onSubmit={onFormSubmit}>
      <Grid container direction="column">
        <TextField label="Name" value={author} onChange={authorOnChange} />
        <TextField label="Titel" value={title} onChange={titleOnChange} />
        <TextField
          multiline
          label="Inhalt"
          value={text}
          onChange={textOnChange}
        />
        <Button type="submit">Erstellen</Button>
      </Grid>
    </form>
  );
}
