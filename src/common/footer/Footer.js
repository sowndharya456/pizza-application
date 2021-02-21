import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
});

class Footer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <Typography
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                Contact us
              </Typography>
              <Typography variant="h6" className={classes.title}>
                Facebook
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(Footer);
