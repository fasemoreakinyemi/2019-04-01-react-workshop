# React-Workshop WueWW 2019

Anmerkung: diese Branch ist eine Beispiel-Implementierung nur auf der Basis von React, ohne externe Komponenten.  
Es gibt noch eine zweite Branch, die material-ui, react-router-dom und react-use-request nutzt: https://github.com/phryneas/2019-04-01-react-workshop/tree/with-external-packages

- Auschecken dieser Branch mit Codesandbox: https://codesandbox.io/s/github/phryneas/2019-04-01-react-workshop/tree/vanilla-react/
- Auschecken der anderen Branch mit Codesandbox: https://codesandbox.io/s/github/phryneas/2019-04-01-react-workshop/tree/with-external-packages/

## React-Komponenten

React-Komponenten werden in JSX geschrieben. Das ist eine HTML-ähnliche Schreibweise für JavaScript

So ist

```jsx
<div className="card">
  <h1 style={{ color: "green" }}>Ueberschrift</h1>
  <p>Text</p>
</div>
```

eigentlich nur eine Kurzschreibweise für

```javascript
React.createElement(
  "div",
  {
    className: "card"
  },
  React.createElement(
    "h1",
    {
      style: {
        color: "green"
      }
    },
    "Ueberschrift"
  ),
  React.createElement("p", null, "Text")
);
```

- Eine React-Komponente ist in der Regel eine Funktion, die ein Argument entgegennimmt - die Eigenschaften, die in den jsx-Attributen übergeben werden. Dieses Argument wird in der Regel mit `props` benannt.
- React-Komponenten werden in Dateien mit der Endung `.jsx` geschrieben.
- In allen Dateien, die eine React-Komponente beinhalten, muss sich dieser Import befinden: `import React from 'react'`.
- Innerhalb der JSX-Schreibweise kann ganz nomaler JavaScript-Code evaluiert werden, wenn er zwischen geschweiften Klammern steht.

**Beispiel**:

```jsx
function Card(props) {
  return (
    <div className="card">
      <h1 style={{ color: "green" }}>{props.title}</h1>
      <p>{props.content}</p>
    </div>
  );
}

// Verwendung:
<Card title="Ueberschrift" content="Text" />;
```

- eine Komponente kann auch Kinder-Komponenten (oder Text etc.) übergeben bekommen. Diese stehen dann als `props.children` zur Verfügung.

```jsx
function Card(props) {
  return (
    <div className="card">
      <h1 style={{ color: "green" }}>{props.title}</h1>
      <p>{props.children}</p>
    </div>
  );
}

// Verwendung:
<Card title="Ueberschrift">Text</Card>;
```

## Destructuring

Man kann mittels destructuring eine Objektvariable in ihre Einzelteile zerlegen:

```javascript
const combined = {
  name: "Thomas",
  age: 51,
  address: "Hauptstraße",
  city: "Würzburg"
};

const { name, age, ...rest } = combined;
console.log(name); // 'Thomas'
console.log(age); // 51
console.log(rest); // { address: 'Hauptstraße', city: 'Würzburg' }
```

Das lässt sich z.B. auch in Funktionsargumenten für das props-Argument verwenden:

```javascript
function MeineKomponente({ title, content }) {
  //...
}
```

ist gleichbedeutend mit

```javascript
function MeineKomponente(props) {
  const title = props.title;
  const content = props.content;
}
```

## Imports und Exports

Man kann Variablen auf verschiedene Arten und Weisen aus Dateien exportieren:

```javascript
export default function A(/* ... */) {
  /* ... */
}
export function B(/* ... */) {
  /* ... */
}
export const C = "...";
const D = "...";
export { D };
```

aus einer anderen Datei kann man diese Variablen dann wieder importieren:

```javascript
import A, { B, C, D } from "./meineDatei";
// oder
import { default as A, B, C, D } from "./meineDatei";
```

Die Endung `.js` bzw. `.jsx` wird hierbei nicht angegeben.

Beim Importieren kann man die Exporte auch direkt umbenennen:

```javascript
import W, { B as X, C as Y, D as Z } from "./meineDatei";
// oder
import { default as W, B as X, C as Y, D as Z } from "./meineDatei";
```

# Test-API

Zum testen steht eine REST-Api für einen Google Cloud Firestore zur Verfügung - Zugriff wie folgt:

## Abrufen von Werten

```javascript
fetch(
  "https://firestore.googleapis.com/v1/projects/reactworkshop-13106/databases/(default)/documents/Post"
)
  .then(function(response) {
    return response.json();
  })
  .then(function(jsonData) {
    console.log(jsonData);
  });
```

Ergebnis:

```json
{
  "documents": [
    {
      "name": "projects/reactworkshop-13106/databases/(default)/documents/Post/Dy0kGWZwo8yD32P7N4iQ",
      "fields": {
        "text": {
          "stringValue": "Wenn du diese Nachricht hier siehst bist du schon verdammt weit!"
        },
        "author": {
          "stringValue": "Lenz"
        },
        "title": {
          "stringValue": "Herzlichen Glückwunsch!"
        }
      },
      "createTime": "2019-03-30T16:34:51.494696Z",
      "updateTime": "2019-03-30T16:49:05.618793Z"
    },
    {
      "name": "projects/reactworkshop-13106/databases/(default)/documents/Post/V4jbFdyrefQ6GuaZQa5J",
      "fields": {
        "author": {
          "stringValue": "Lenz"
        },
        "title": {
          "stringValue": "Noch ein Test"
        },
        "text": {
          "stringValue": "Und noch mehr Text"
        }
      },
      "createTime": "2019-03-31T12:38:38.294609Z",
      "updateTime": "2019-03-31T12:38:38.294609Z"
    }
  ]
}
```

## Speichern von Werten:

```javascript
fetch(
  "https://firestore.googleapis.com/v1/projects/reactworkshop-13106/databases/(default)/documents/Post",
  {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      fields: {
        author: { stringValue: "TestAutor" },
        title: { stringValue: "TestTitel" },
        text: { stringValue: "TestText" }
      }
    })
  }
).then(function() {
  console.log("erfolgreich gespeichert");
});
```

# Links

Resourcen:

- [React](https://reactjs.org/) - sehr lesenswerte Dokumentation
- [Overreacted Blog](https://overreacted.io/) - Blog eines React-Maintainers
- [React-Kurse auf Egghead](https://egghead.io/courses/the-beginner-s-guide-to-react) - teilweise kostenlose, sehr gute Kursreihen

Im Rahmen des Workshops verwendete Bibliotheken:

- [material-ui](https://material-ui.com/)
- [react-router-dom](https://reacttraining.com/react-router/web/guides/quick-start)
- [react-use-request](https://github.com/gsantiago/react-use-request)
