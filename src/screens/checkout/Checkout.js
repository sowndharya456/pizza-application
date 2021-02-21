import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import CardMedia from "@material-ui/core/CardMedia";
import "../checkout/Checkout.css";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = theme => ({
  root: {
    minWidth: 275,
    
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 18
  },
  pos: {
    marginBottom: 12
  },
  rootCartCard: {
    display: "flex"
  },
  details: {
    display: "flex"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: 200
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  playIcon: {
    height: 38,
    width: 38
  }
});

class Checkout extends Component {
 
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Card className={classes.root}>
          <Typography className={classes.title} component="h1" variant="h1">
            <b>Cart</b>
          </Typography>
          <div className="listingCartItems">
            {this.props.cartlist &&
              this.props.cartlist.length !== 0 &&
              this.props.cartlist.map(cartItem => (
                <Card className={classes.rootCartCard} key={cartItem.details}>
                  <CardMedia
                    className={classes.cover}
                    image={cartItem.img_url}
                    title={cartItem.name}
                  />
                  <div className={classes.details}>
                    <CardContent className={classes.content}>
                      <div className="leftCard">
                        <Typography component="h5" variant="h5">
                          {cartItem.name}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                          Size: {cartItem.selectedSize}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                          Toppings
                        </Typography>
                        <List
                          component="nav"
                          aria-label="secondary mailbox folders"
                        >
                          {cartItem.selectedToppings.map(toppings => (
                            <ListItem button>
                              <ListItemText primary={toppings} />
                            </ListItem>
                          ))}
                        </List>
                      </div>
                      <div className="rightCard">
                        <IconButton
                          onClick={() => this.props.addToCart(cartItem)}
                        >
                          <AddIcon />
                        </IconButton>
                        <Typography variant="body2" component="span">
                          {cartItem.quantity}
                        </Typography>
                        <IconButton
                          onClick={() => this.props.removeFromCart(cartItem)}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography>{cartItem.totitemPrice}</Typography>
                      </div>
                    </CardContent>
                    <div className={classes.controls}>
                      <IconButton aria-label="next"></IconButton>
                    </div>
                  </div>
                </Card>
              ))}
            {this.props.cartlist.length === 0 && (
              <Typography variant="h6" component="hh6">
                No items in cart
              </Typography>
            )}
          </div>

          <div class='finalCheckoutContainer'>
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Typography variant="h5" component="h2">
                  Checkout
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  Total Price : {this.props.totalPrice}
                </Typography>
                <Typography variant="body2" component="p"></Typography>
              </CardContent>
            </Card>
          </div>
        </Card>
      </div>
    );
  }
}

export default withStyles(useStyles)(Checkout);
