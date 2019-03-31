import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import { Index } from "./Pages/Index";
import { Posts } from "./Pages/Posts";
import { CreateNewPost } from "./Pages/CreateNewPost";

function useNavigation(target, setPage) {
  return useCallback(
    function(event) {
      event.preventDefault();
      setPage(target);
    },
    [target, setPage]
  );
}

function App() {
  const [currentPage, setPage] = useState("start");

  const navigateToStart = useNavigation("start", setPage);
  const navigateToPosts = useNavigation("posts", setPage);
  const navigateToNew = useNavigation("new", setPage);

  return (
    <div className="App">
      <nav>
        <a href="" onClick={navigateToStart}>
          Startseite
        </a>
        <br />
        <a href="" onClick={navigateToPosts}>
          Posts
        </a>
        <br />
        <a href="" onClick={navigateToNew}>
          Neuen Post erstellen
        </a>
      </nav>
      <main>
        {currentPage === "start" && <Index name="Nutzer" />}
        {currentPage === "posts" && <Posts />}
        {currentPage === "new" && <CreateNewPost />}
      </main>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
