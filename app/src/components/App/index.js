import React, { Component } from "react";
import Books from "../Books";
import "./index.scss";
import translations from "./i18n";
import LocaleContext from "../../services/context";
import { LOCALE_DEFAULT } from "../../settings/constants";

class App extends Component {
  render() {
    const { locale } = this.context ?? LOCALE_DEFAULT;

    return (
      <div className="p-app">
        <div className="p-app__books">
          <h1 data-testid="app-title">{translations[locale].title}</h1>
          <Books />
        </div>
      </div>
    );
  }
}

App.contextType = LocaleContext;

export default App;
