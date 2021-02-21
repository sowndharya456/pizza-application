import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";


const useStyles = theme => ({
  root: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

class Checkout extends Component {
  constructor() {
    super();
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Card className={classes.root}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Cart
            </Typography>

            {this.props.cartlist &&
              this.props.cartlist.map(cartItem => (
                  <div key={cartItem.id}>
                      <Typography>
                <Typography variant="body2" component="span">
                  {cartItem.name}
                  </Typography>
                  <IconButton onClick={() => this.props.addToCart(cartItem)}>
                    <AddIcon />
                  </IconButton>
                  <Typography variant="body2" component="span">
                {cartItem.quantity}
                </Typography>
                  <IconButton onClick={() => this.props.removeFromCart(cartItem)}>
                    <RemoveIcon />
                  </IconButton>
                   
                </Typography>
                <Typography>
                <Typography variant="body2" component="span"> Size : {cartItem.selectedSize}</Typography> 
                </Typography>
                <Typography>
                <Typography variant="body2" component="span" > Toppings </Typography> 
                    {cartItem.selectedToppings.map(toppings =>(
                    <Typography variant="body2" component="span"> {toppings}</Typography> 
                    ))}
                </Typography>
                </div>
              ))}
               <Typography variant="body2" component="span"> Total Price : {this.props.totalPrice}</Typography> 
          </CardContent>
          <CardActions>
            <Button size="small">CHECKOUT</Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default withStyles(useStyles)(Checkout);
