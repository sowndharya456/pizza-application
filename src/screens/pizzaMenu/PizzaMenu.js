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
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
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

const useStyles = theme => ({
  root: {
    flexGrow: 1,
    padding: "20px"
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
    height: 140
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

  selectToppingsHandler = event => {
    let tempselectedToppings = this.state.selectedToppings;
    if (event.target.checked) {
      tempselectedToppings.push(event.target.value);
    } else {
        tempselectedToppings = tempselectedToppings.filter(topping => {
            if(topping === event.target.value)
            {
                return;
            }
            else {
                return topping;
            }
        })
    }
    this.setState({
      selectedToppings: tempselectedToppings
    });
  };

  handleAddItemToCart =() =>{
      let tempselectedPizza =this.state.selectedPizza;
      tempselectedPizza.selectedToppings = this.state.selectedToppings;
      tempselectedPizza.selectedSize=this.state.selectpizzasize;
      this.props.addToCart(tempselectedPizza);
      this.handleClose();
  }
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
        {items.map(item => (
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
            key={item.name}
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
              <Grid item xs={3} >
                <Card className={classes.cardroot} key={pizza.id}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={pizza.img_url}
                      title={pizza.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {pizza.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {pizza.description}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                         <IconButton style={pizza.isVeg === true ? { color: 'green' } : { color: 'red' }} >
                                                       <FiberManualRecordIcon />
                         </IconButton>
                      </Typography>
                      <div>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          Rating : {pizza.rating}
                        </Typography>
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
                    <IconButton onClick={() => this.props.addToCart(pizza)}>
                      <AddIcon />
                    </IconButton>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => this.handleClickOpen(pizza)}
                    >
                      Add To Cart
                    </Button>
                    <IconButton
                      onClick={() => this.props.removeFromCart(pizza)}
                    >
                      <RemoveIcon />
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
                          {this.state.selectedPizza.size[0].items.map(item => (
                            <RadioGroup
                              aria-label="size"
                              name="size1"
                              value={this.state.selectpizzasize}
                              onChange={this.changePizzaSizeHandler}
                              key={item.size}
                            >
                              <FormControlLabel
                                value={item.size}
                                control={<Radio />}
                                label={item.size}
                              />
                            </RadioGroup>
                          ))}
                        </FormControl>

                        {this.state.selectedPizza.toppings.length ? (
                         
                            this.renderToppings(
                              this.state.selectedPizza.toppings[0]
                            )
                         
                        ) : (
                          "No Toppings Available"
                        )}
                      </DialogContentText>
                    ) : (
                      ""
                    )}
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button
                      onClick={this.handleAddItemToCart}
                      color="primary"
                    >
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
