import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
} from "react-router-dom";
import React, { Component } from "react";
import Navbar from "./Components/Navbar";
import NewsComponent from "./Components/NewsComponent";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  state = {
    progress: 50,
  };
  setProgress = (progress) => {
    this.setState({ progress: progress });
  };
  render() {
    let apiKey = "965043ff12234368aec5d8a18fe0616a";
    let pageSize = 9;
    return (
      <div>
        <Router>
          <LoadingBar
            color="#f11946"
            height={3}
            progress={this.state.progress}
          />

          <Navbar />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <NewsComponent
                  key="general"
                  setProgress={this.setProgress}
                  pageSize={pageSize}
                  apiKey={apiKey}
                  category="general"
                />
              }
            />
            <Route
              exact
              path="/entertainment"
              element={
                <NewsComponent
                  key="entertainment"
                  setProgress={this.setProgress}
                  pageSize={pageSize}
                  apiKey={apiKey}
                  category="entertainment"
                />
              }
            />
            <Route
              exact
              path="/business"
              element={
                <NewsComponent
                  key="business"
                  setProgress={this.setProgress}
                  apiKey={apiKey}
                  pageSize={pageSize}
                  category="business"
                />
              }
            />
            <Route
              exact
              path="/health"
              element={
                <NewsComponent
                  key="health"
                  apiKey={apiKey}
                  setProgress={this.setProgress}
                  pageSize={pageSize}
                  category="health"
                />
              }
            />
            <Route
              exact
              path="/science"
              element={
                <NewsComponent
                  apiKey={apiKey}
                  setProgress={this.setProgress}
                  key="science"
                  pageSize={pageSize}
                  category="science"
                />
              }
            />
            <Route
              exact
              path="/sports"
              element={
                <NewsComponent
                  setProgress={this.setProgress}
                  apiKey={apiKey}
                  key="sports"
                  pageSize={pageSize}
                  category="sports"
                />
              }
            />
            <Route
              exact
              path="/technology"
              element={
                <NewsComponent
                  apiKey={apiKey}
                  key="technology"
                  setProgress={this.setProgress}
                  pageSize={pageSize}
                  category="technology"
                />
              }
            />
          </Routes>
        </Router>
      </div>
    );
  }
}
