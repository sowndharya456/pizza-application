import React from "react";
import { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import Icon from "@material-ui/core/Icon";

const useStyles = theme => ({
  root: {
    flexGrow: 1,
    padding: '5%',

  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  cardroot: {
    maxWidth: 345
  },
  media: {
    height: 200
  }
});

class PizzaMenu extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      selectedPizza: undefined,
      selectedToppings: [],
      selectpizzasize: ""
    };
  }

  handleClickOpen = pizza => {
    this.setState({
      open: true,
      selectedPizza: pizza,
      selectedTopping: {}
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
      selectedToppings: [],
      selectpizzasize: ""
    });
  };

  changePizzaSizeHandler = event => {
    this.setState({
      selectpizzasize: event.target.value
    });
  };
  changePizzaToppingsHandler = event => {
    let tempselectedToppings = [];
    tempselectedToppings.push(event.target.value);
    this.setState({
      selectedToppings: tempselectedToppings
    });
  };

  showActions(pizza) {
    let tempItem = this.props.cartlist.find(
      cartItem => cartItem.id === pizza.id
    );
    if (tempItem !== undefined) {
      return <Typography>{tempItem.quantity}</Typography>;
    } else {
      return (
        <Button
          size="small"
          variant="contained"
          color="primary" 
          onClick={() => this.handleClickOpen(pizza)}
        >
          Add To Cart
        </Button>
      );
    }
  }

  selectToppingsHandler = event => {
    let tempselectedToppings = this.state.selectedToppings;
    if (event.target.checked) {
      tempselectedToppings.push(event.target.value);
    } else {
      tempselectedToppings = tempselectedToppings.filter(topping => topping !== event.target.value);
    }
    this.setState({
      selectedToppings: tempselectedToppings
    });
  };

  handleAddItemToCart = () => {
    let tempselectedPizza = this.state.selectedPizza;
    tempselectedPizza.selectedToppings = this.state.selectedToppings;
    tempselectedPizza.selectedSize = this.state.selectpizzasize;
    this.props.addToCart(tempselectedPizza);
    this.handleClose();
  };
  renderToppings = toppingsObject => {
    const { items, isRadio, title } = toppingsObject;
    return isRadio ? (
      <FormControl component="fieldset">
        <FormLabel component="legend">{title}</FormLabel>

        <RadioGroup
          aria-label="name"
          name="name1"
          value={this.state.selectedToppings[0]}
          onChange={this.changePizzaToppingsHandler}
        >
          {items.map(item => (
            <FormControlLabel
              value={item.name}
              control={<Radio />}
              label={item.name}
              key={item.name}
            />
          ))}
        </RadioGroup>
      </FormControl>
    ) : (
      <FormControl component="fieldset">
        <FormLabel component="legend">{title}</FormLabel>
        {items.map((item,index) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.selectedToppings.includes(item.name)}
                value={item.name}
                onChange={this.selectToppingsHandler}
                name={item.name}
              
              />
            }
            label={item.name}
            key={index}
          />
        ))}
      </FormControl>
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="menuList">
        <div className={classes.root}>
          <Grid container spacing={6}>
            {this.props.pizzalist.map(pizza => (
              <Grid item xs={3} key={pizza.id}>
                <Card className={classes.cardroot} >
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={pizza.img_url}
                      title={pizza.name}
                    />
                    <CardContent>
                   
                      <h2>
                      <Icon
                          style={
                            pizza.isVeg === true
                              ? { color: "green", fontSize: "small" }
                              : { color: "red", fontSize: "small" }
                          } >
                          <FiberManualRecordIcon />
                        </Icon> {pizza.name}
                      </h2>
                      <div style={{height: '30px', overflow: 'hidden',  paddingBottom: '5px'} }>
                        {pizza.description}
                      </div>
                      <div>
                            <Rating
                              name="read-only"
                              value={pizza.rating}
                              precision={0.5}
                              size="small"
                              readOnly
                            />
                        
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          Price : ₹{pizza.price}
                        </Typography>
                      </div>
                    </CardContent>

                  </CardActionArea>
                  <CardActions>
                    <IconButton  onClick={() => this.props.addToCart(pizza)}>
                      <AddIcon style={ {fontSize:'small'}} />
                    </IconButton>
                    {this.showActions(pizza)}
                    <IconButton
                      onClick={() => this.props.removeFromCart(pizza)}
                    >
                      <RemoveIcon style={ {fontSize:'small'}}  />
                    </IconButton>
                  </CardActions>
                </Card>
                <Dialog
                  open={this.state.open}
                  onClose={this.handleClose}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">
                    Customize Your Pizza
                  </DialogTitle>

                  <DialogContent>
                    {this.state.selectedPizza ? (
                      <DialogContentText>
                        <FormControl component="fieldset">
                          <FormLabel component="legend">choose size</FormLabel>
                          {this.state.selectedPizza.size[0].items.map((item,index) => (
                            <RadioGroup
                              aria-label="size"
                              name="size1"
                              value={this.state.selectpizzasize}
                              onChange={this.changePizzaSizeHandler}
                              key={index}
                            >
                              <FormControlLabel
                                value={item.size}
                                control={<Radio />}
                                label={item.size}
                              />
                            </RadioGroup>
                          ))}
                        </FormControl>

                        {this.state.selectedPizza.toppings.length
                          ? this.renderToppings(
                              this.state.selectedPizza.toppings[0]
                            )
                          : "No Toppings Available"}
                      </DialogContentText>
                    ) : (
                      ""
                    )}
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={this.handleAddItemToCart} color="primary">
                      ADD
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(PizzaMenu);
