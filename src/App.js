import React, { Component } from "react";
import { Route } from "react-router-dom";
import Navbar from "./Navbar";
import NewPaletteForm from "./NewPaletteForm";
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import seedColors from "./seedPalette";
import "./App.css";

import { spring, AnimatedSwitch } from "react-router-transition";

function mapStyles(styles) {
  return {
    opacity: styles.opacity,
  };
}

function bounce(val) {
  return spring(val, {
    stiffness: 90,
    damping: 15,
  });
}

const bounceTransition = {
  atEnter: {
    opacity: 0,
  },

  atLeave: {
    opacity: bounce(0),
  },

  atActive: {
    opacity: bounce(1),
  },
};

class App extends Component {
  constructor(props) {
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
    this.state = {
      palettes: savedPalettes || [...seedColors],
    };
    this.findPalette = this.findPalette.bind(this);
    this.addPalette = this.addPalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }
  findPalette(id) {
    return this.state.palettes.find((palette) => palette.id === id);
  }

  addPalette(newPalette) {
    this.setState(
      { palettes: [newPalette, ...this.state.palettes] },
      this.syncLocalStorage
    );
  }

  deletePalette(id) {
    this.setState(
      (curState) => ({
        palettes: curState.palettes.filter((palette) => palette.id !== id),
      }),
      this.syncLocalStorage
    );
  }

  syncLocalStorage() {
    window.localStorage.setItem(
      "palettes",
      JSON.stringify(this.state.palettes)
    );
  }

  render() {
    return (
      <Route
        render={({ location }) => (
          <AnimatedSwitch
            atEnter={bounceTransition.atEnter}
            atLeave={bounceTransition.atLeave}
            atActive={bounceTransition.atActive}
            mapStyles={mapStyles}
            className="route-wrapper"
            location={location}
          >
            <Route
              exact
              path="/palette/new"
              render={(routeProps) => (
                <NewPaletteForm
                  addPalette={this.addPalette}
                  {...routeProps}
                  palettes={this.state.palettes}
                />
              )}
            />
            <Route
              exact
              path="/"
              render={(routeProps) => (
                <div>
                  <Navbar location="home" />
                  <PaletteList
                    palettes={this.state.palettes}
                    deletePalette={this.deletePalette}
                    {...routeProps}
                  />
                </div>
              )}
            />
            <Route
              exact
              path="/palette/:id"
              render={(routeProps) => (
                <Palette
                  palette={this.findPalette(routeProps.match.params.id)}
                />
              )}
            />
            <Route
              render={(routeProps) => (
                <div>
                  <Navbar location="home" />
                  <PaletteList
                    palettes={this.state.palettes}
                    deletePalette={this.deletePalette}
                    {...routeProps}
                  />
                </div>
              )}
            />
          </AnimatedSwitch>
        )}
      />
    );
  }
}

export default App;
