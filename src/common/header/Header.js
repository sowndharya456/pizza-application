import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";

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
const StyledBadge = withStyles(theme => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px"
  }
}))(Badge);
class Header extends Component {
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
                
              </Typography>
              <Typography variant="h6" className={classes.title}>
                THE PIZZA SHOP
              </Typography>
              <IconButton
                aria-label="cart"
                onClick={this.props.changeViewHandler}
              >
                <StyledBadge
                  badgeContent={this.props.totalCartQuantity}
                  color="secondary"
                >
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton>
            </Toolbar>
          </AppBar>
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(Header);
