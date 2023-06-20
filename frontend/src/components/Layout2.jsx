import React, { PropTypes } from "react";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./Layout.css";
import Header from "../Header";
import Feedback from "../Feedback";
import Footer from "../Footer";
import Sidebar from "../Sidebar";

import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import AppBar from "material-ui/AppBar";
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

function Layout({ children }) {
  return (
    <div>
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <AppBar title="My web" />
      </MuiThemeProvider>

      <Sidebar />
      {React.Children.only(children)}
      <Feedback />
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default withStyles(s)(Layout);
