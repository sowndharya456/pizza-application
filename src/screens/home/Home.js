import React, { Component } from "react";
import Header from "../../common/header/Header";
import PizzaMenu from "../pizzaMenu/PizzaMenu";
import Footer from "../../common/footer/Footer";
import "../../screens/home/Home.css";
import Checkout from "../checkout/Checkout";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      pizzalist: [],
      displaylist: [],
      cartlist: [],
      totalPrice: 0,
      viewType: "product",
      alignment: "ALL",
      totalCartQuantity: 0
    };
  }

  changeViewHandler = () => {
    this.setState({
      viewType: "checkout"
    });
  };

  filterByTypeHandler = type => {
    let sortedlist = this.state.pizzalist;
    if (type === "VEG") {
      sortedlist = sortedlist.filter(item => item.isVeg === true);
    }
    if (type === "NONVEG") {
      sortedlist = sortedlist.filter(item => item.isVeg === false);
    }
    this.setState({
      displaylist: sortedlist
    });
  };
  handleChange = event => {
    this.setState({
      alignment: event.target.value
    });
  };
  sortPizzaHandler = filtername => {
    let sortedlist = this.state.pizzalist;
    if (filtername === "Rating") {
      sortedlist = sortedlist.sort(this.compareByRating);
    } else {
      sortedlist = sortedlist.sort(this.compareByPrice);
    }
    this.setState({
      displaylist: sortedlist
    });
  };

  compareByRating(A, B) {
    if (A.rating > B.rating) {
      return 1;
    } else if (A.rating < B.rating) {
      return -1;
    } else return 0;
  }

  compareByPrice(A, B) {
    if (A.price > B.price) {
      return 1;
    } else if (A.price < B.price) {
      return -1;
    } else return 0;
  }

  addItemToCart = item => {
    let tempCartlist;
    let tempquantity;
    let itemPricebyqty = 0;
    let totquantity = 0;
    let tempCost = this.state.totalPrice;
    let tempItem = this.state.cartlist.find(
      cartItem => cartItem.id === item.id
    );
    if (tempItem !== undefined) {
      tempCartlist = this.state.cartlist.map(product => {
        if (product.id === item.id) {
          tempquantity = product.quantity + 1;
          totquantity = this.state.totalCartQuantity + 1;
          itemPricebyqty = product.totitemPrice + product.price;
          tempCost = tempCost + product.price;
          return {
            ...product,
            quantity: tempquantity,
            totitemPrice: itemPricebyqty
          };
        }
        return product;
      });
    } else {
      let updateItem = this.state.pizzalist.find(
        product => product.id === item.id
      );
      itemPricebyqty = itemPricebyqty+updateItem.price;
      updateItem = { ...updateItem, quantity: 1, totitemPrice: itemPricebyqty };

      tempCartlist = [...this.state.cartlist, updateItem];
      totquantity = this.state.totalCartQuantity + 1;
      tempCost = tempCost + updateItem.price;
    }

    this.setState({
      cartlist: tempCartlist,
      totalPrice: tempCost,
      totalCartQuantity: totquantity
    });
    console.log(this.state.cartlist);
  };

  checkout = () => {
    this.props.router_props.history.push("/checkout");
  };

  removeItemFromCart = item => {
    let tempCartlist;
    let tempquantity;
    let itemPricebyqty = 0;
    let totalCost = this.state.totalPrice;
    let totalCartQty = this.state.totalCartQuantity;
    let tempItem = this.state.cartlist.find(
      cartItem => cartItem.id === item.id
    );
    if (tempItem !== undefined) {
      tempCartlist = this.state.cartlist.map(product => {
        if (product.id === item.id) {
          tempquantity = product.quantity - 1;
          itemPricebyqty = product.totitemPrice - product.price;
          totalCost = totalCost - product.price;
          totalCartQty = totalCartQty - 1;
          return { ...product, quantity: tempquantity , totitemPrice :itemPricebyqty};
        }
        return product;
      });
    }

    tempCartlist = tempCartlist.filter(product => product.quantity !== 0);
    this.setState({
      cartlist: tempCartlist,
      totalPrice: totalCost,
      totalCartQuantity: totalCartQty
    });
    console.log(this.state.cartlist);
  };

  componentDidMount() {
    fetch("https://run.mocky.io/v3/ec196a02-aaf4-4c91-8f54-21e72f241b68")
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          pizzalist: data,
          displaylist: data
        });
      });
  }

  render() {
    return (
      <div className="homeclass">
        <div className="headerclass">
          <Header
            changeViewHandler={this.changeViewHandler}
            totalCartQuantity={this.state.totalCartQuantity}
          />
        </div>
        <div className="filterclass">
          <Grid item>
            <ToggleButtonGroup
              size="small"
              value={this.alignment}
              exclusive
              onChange={this.handleChange}
            >
              <ToggleButton
                value="ALL"
                onClick={() => this.filterByTypeHandler("ALL")}
              >
                ALL
              </ToggleButton>
              <ToggleButton
                value="VEG"
                onClick={() => this.filterByTypeHandler("VEG")}
              >
                VEG
              </ToggleButton>
              <ToggleButton
                value="NONVEG"
                onClick={() => this.filterByTypeHandler("NONVEG")} >
                NONVEG
              </ToggleButton>
            </ToggleButtonGroup>
              <Button
                variant="contained"
                color="primary" onClick={() => this.sortPizzaHandler("Rating")}>
                Sort By Rating
              </Button>
              <Button
                variant="contained"
                color="primary" onClick={() => this.sortPizzaHandler("Price")}>
                Sort By Price
              </Button>
           
          </Grid>
        </div>
        <div className="mainclass">
          {this.state.viewType === "product" ? (
            <PizzaMenu
              pizzalist={this.state.displaylist}
              cartlist={this.state.cartlist}
              addToCart={this.addItemToCart}
              removeFromCart={this.removeItemFromCart}
            />
          ) : (
            <div>
              <Checkout
                cartlist={this.state.cartlist}
                totalPrice={this.state.totalPrice}
                addToCart={this.addItemToCart}
                removeFromCart={this.removeItemFromCart}
              />
            </div>
          )}
        </div>

        <div className="footerclass">
          <Footer />
        </div>
      </div>
    );
  }
}

export default Home;
