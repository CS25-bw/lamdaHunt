import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Link } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  button: {
    fontSize: "18px",
    display: "flex",
    justifyContent: "flex-end",
    marginLeft: "20px"
  },
  title: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "flex-start",
    fontSize: "18px"
  }
}));

function NavBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" title="Lambda Treasure Hunt 💰">
        <Toolbar>
          <div className={classes.title}>
            <Link
              style={{ color: "#000", textDecoration: "none" }}
              component={RouterLink}
              to="/"
            >
              <span role="img" aria-label="moneybag">
                💰
              </span>{" "}
              Lambda Treasure Hunt{" "}
              <span role="img" aria-label="moneybag">
                💰
              </span>
            </Link>
          </div>
          <Link
            component={RouterLink}
            to="/home"
            style={{ textDecoration: "none" }}
            color="secondary"
            className={classes.button}
          >
            Home
          </Link>
          <Link
            component={RouterLink}
            to="/about"
            style={{ textDecoration: "none" }}
            color="secondary"
            className={classes.button}
          >
            About
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
