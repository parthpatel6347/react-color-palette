import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Palette from "./Palette";
import seedColors from "./seedPalette";

class App extends Component {
  findPalette(id) {
    return seedColors.find(function (palette) {
      return palette.id === id;
    });
  }
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <h1>palette home</h1>} />
        <Route
          exact
          path="/palette/:id"
          render={(routeProps) => (
            <Palette palette={this.findPalette(routeProps.match.params.id)} />
          )}
        />
      </Switch>

      /* <div>
        <Palette {...seedColors[0]} />
      </div> */
    );
  }
}

export default App;
