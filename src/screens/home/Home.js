import React, { Component } from "react";
import Header from "../../common/header/Header";
import PizzaMenu from "../pizzaMenu/PizzaMenu";
import Footer from "../../common/footer/Footer";
import "../../screens/home/Home.css";
import Checkout from "../checkout/Checkout";
import ToggleOnIcon from "@material-ui/icons/ToggleOn";
import ToggleOffIcon from "@material-ui/icons/ToggleOff";
import Button from "@material-ui/core/Button";
import { IconButton } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

class Home extends Component {
  constructor() {
    super();
    const products = (this.state = {
      pizzalist: [],
      displaylist: [],
      cartlist: [],
      totalPrice: 0,
      viewType: "product",
      alignment: "ALL"
    });
  }

  changeViewHandler = () => {
    this.setState({
      viewType: "checkout"
    });
  };

  filterByTypeHandler = type => {
    let sortedlist = this.state.pizzalist;
    if (type === "VEG") {
      sortedlist = sortedlist.filter(item => {
        if (item.isVeg === true) {
          return item;
        }
      });
    }
    if (type === "NONVEG") {
      sortedlist = sortedlist.filter(item => {
        if (item.isVeg === false) {
          return item;
        }
      });
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
    let tempCost = this.state.totalPrice;
    let tempItem = this.state.cartlist.find(
      cartItem => cartItem.id === item.id
    );
    if (tempItem !== undefined) {
      tempCartlist = this.state.cartlist.map(product => {
        if (product.id === item.id) {
          tempquantity = product.quantity + 1;
          tempCost = tempCost + product.price;
          return { ...product, quantity: tempquantity };
        }
        return product;
      });
    } else {
      let updateItem = this.state.pizzalist.find(
        product => product.id === item.id
      );

      updateItem = { ...updateItem, quantity: 1 };

      tempCartlist = [...this.state.cartlist, updateItem];
      tempCost = tempCost + updateItem.price;
    }

    this.setState({ cartlist: tempCartlist, totalPrice: tempCost });
    console.log(this.state.cartlist);
  };

  checkout = () => {
    this.props.router_props.history.push("/checkout");
  };

  removeItemFromCart = item => {
    let tempCartlist;
    let tempquantity;
    let totalCost = this.state.totalPrice;
    let tempItem = this.state.cartlist.find(
      cartItem => cartItem.id === item.id
    );
    if (tempItem !== undefined) {
      tempCartlist = this.state.cartlist.map(product => {
        if (product.id === item.id) {
          tempquantity = product.quantity - 1;
          totalCost = totalCost - product.price;
          return { ...product, quantity: tempquantity };
        }
        return product;
      });
    }

    tempCartlist = tempCartlist.filter(product => {
      if (product.quantity !== 0) {
        return product;
      }
    });
    this.setState({
      cartlist: tempCartlist,
      totalPrice: totalCost
    });
    console.log(this.state.cartlist);
  };

  componentDidMount() {
    // let that=this;
    // let xml = new XMLHttpRequest();
    // let data=null;

    // xml.addEventListener("readystatechange", function(){

    //     if(this.readState === 4 ){
    //         console.log('inside respone');
    //     //let jsonResponse = JSON.parse(this.response);
    //     console.log(this.response);
    //     }
    // }
    // );
    // console.log(`${process.env.REACT_APP_API}`);
    // xml.open("GET","/v3/ec196a02-4c91-8f54-21e72f241b68");
    // xml.setRequestHeader("Cache-Control","no-cache");
    // xml.send(data);

    let response = [
      {
        id: 1,
        name: "Margherita",
        description: "A classic delight with 100% Real mozzarella cheese",
        isVeg: true,
        rating: 3.5,
        price: 239,
        img_url:
          "https://upload.wikimedia.org/wikipedia/commons/6/6f/Pizza_on_stone.jpg",
        size: [
          {
            isRadio: true,
            title: "choose size",
            items: [
              {
                size: "Regular"
              },
              {
                size: "Medium"
              },
              {
                size: "Large"
              }
            ]
          }
        ],
        toppings: [
          {
            isRadio: false,
            title: "choose topping(s)",
            items: [
              {
                name: "Red Pepper"
              },
              {
                name: "Onion"
              },
              {
                name: "Grilled Mushroom"
              },
              {
                name: "Extra Cheese"
              },
              {
                name: "Black Olive"
              }
            ]
          }
        ]
      },
      {
        id: 2,
        name: "Double Cheese Margherita",
        description:
          "A classic delight loaded with extra 100% real mozzarella cheese",
        isVeg: true,
        rating: 5,
        price: 375,
        img_url:
          "https://upload.wikimedia.org/wikipedia/commons/d/d1/Pepperoni_pizza.jpg",
        size: [
          {
            isRadio: true,
            title: "choose size",
            items: [
              {
                size: "Regular"
              },
              {
                size: "Medium"
              },
              {
                size: "Large"
              }
            ]
          }
        ],
        toppings: [
          {
            isRadio: true,
            title: "choose topping(s)",
            items: [
              {
                name: "Red Pepper"
              },
              {
                name: "Onion"
              },
              {
                name: "Grilled Mushroom"
              },
              {
                name: "Extra Cheese"
              },
              {
                name: "Black Olive"
              }
            ]
          }
        ]
      },
      {
        id: 3,
        name: "Pepper Barbecue & Onion",
        description: "A classic favorite with pepper barbeque chicken & onion",
        isVeg: false,
        rating: 4.5,
        price: 435,
        img_url:
          "https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg",
        size: [
          {
            isRadio: true,
            title: "choose size",
            items: [
              {
                size: "Regular"
              },
              {
                size: "Medium"
              },
              {
                size: "Large"
              }
            ]
          }
        ],
        toppings: [
          {
            isRadio: false,
            title: "choose topping(s)",
            items: [
              {
                name: "Red Pepper"
              },
              {
                name: "Onion"
              },
              {
                name: "Grilled Mushroom"
              },
              {
                name: "Extra Cheese"
              },
              {
                name: "Black Olive"
              }
            ]
          }
        ]
      },
      {
        id: 4,
        name: "Cheese n Tomato",
        description: "A delectable combination of cheese and juicy tomato",
        isVeg: true,
        rating: 3.5,
        price: 345,
        img_url:
          "https://upload.wikimedia.org/wikipedia/commons/6/6f/Pizza_on_stone.jpg",
        size: [
          {
            isRadio: true,
            title: "choose size",
            items: [
              {
                size: "Regular"
              },
              {
                size: "Medium"
              },
              {
                size: "Large"
              }
            ]
          }
        ],
        toppings: [
          {
            isRadio: false,
            title: "choose topping(s)",
            items: [
              {
                name: "Red Pepper"
              },
              {
                name: "Onion"
              },
              {
                name: "Grilled Mushroom"
              },
              {
                name: "Extra Cheese"
              },
              {
                name: "Black Olive"
              }
            ]
          }
        ]
      },
      {
        id: 5,
        name: "Cheese n Corn",
        description:
          "Sweet & Juicy Golden corn and 100% real mozzarella cheese in a delectable combination !",
        isVeg: true,
        rating: 5,
        price: 345,
        img_url:
          "https://upload.wikimedia.org/wikipedia/commons/d/d1/Pepperoni_pizza.jpg",
        size: [
          {
            isRadio: true,
            title: "choose size",
            items: [
              {
                size: "Regular"
              },
              {
                size: "Medium"
              },
              {
                size: "Large"
              }
            ]
          }
        ],
        toppings: [
          {
            isRadio: true,
            title: "choose topping(s)",
            items: [
              {
                name: "Red Pepper"
              },
              {
                name: "Onion"
              },
              {
                name: "Grilled Mushroom"
              },
              {
                name: "Extra Cheese"
              },
              {
                name: "Black Olive"
              }
            ]
          }
        ]
      },
      {
        id: 6,
        name: "Achari Do Pyaza",
        description:
          "Tangy & spicy achari flavors on a super cheesy onion pizza- as desi as it gets!",
        isVeg: true,
        rating: 4,
        price: 345,
        img_url:
          "https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg",
        size: [
          {
            isRadio: true,
            title: "choose size",
            items: [
              {
                size: "Regular"
              },
              {
                size: "Medium"
              },
              {
                size: "Large"
              }
            ]
          }
        ],
        toppings: [
          {
            isRadio: false,
            title: "choose topping(s)",
            items: [
              {
                name: "Red Pepper"
              },
              {
                name: "Onion"
              },
              {
                name: "Grilled Mushroom"
              },
              {
                name: "Extra Cheese"
              },
              {
                name: "Black Olive"
              }
            ]
          }
        ]
      },
      {
        id: 7,
        name: "Chicken Golden Delight",
        description:
          "Double pepper barbecue chicken, golden corn and extra cheese, true delight",
        isVeg: false,
        rating: 4.5,
        price: 490,
        img_url:
          "https://upload.wikimedia.org/wikipedia/commons/6/6f/Pizza_on_stone.jpg",
        size: [
          {
            isRadio: true,
            title: "choose size",
            items: [
              {
                size: "Regular"
              },
              {
                size: "Medium"
              },
              {
                size: "Large"
              }
            ]
          }
        ],
        toppings: [
          {
            isRadio: false,
            title: "choose topping(s)",
            items: [
              {
                name: "Red Pepper"
              },
              {
                name: "Onion"
              },
              {
                name: "Grilled Mushroom"
              },
              {
                name: "Extra Cheese"
              },
              {
                name: "Black Olive"
              }
            ]
          }
        ]
      },
      {
        id: 8,
        name: "Chicken Fiesta",
        description:
          "Grilled chicken rashers, peri-peri chicken, onion & capsicum, a complete fiesta",
        isVeg: false,
        rating: 4,
        price: 490,
        img_url:
          "https://upload.wikimedia.org/wikipedia/commons/d/d1/Pepperoni_pizza.jpg",
        size: [
          {
            isRadio: true,
            title: "choose size",
            items: [
              {
                size: "Regular"
              },
              {
                size: "Medium"
              },
              {
                size: "Large"
              }
            ]
          }
        ],
        toppings: [
          {
            isRadio: false,
            title: "choose topping(s)",
            items: [
              {
                name: "Red Pepper"
              },
              {
                name: "Onion"
              },
              {
                name: "Grilled Mushroom"
              },
              {
                name: "Extra Cheese"
              },
              {
                name: "Black Olive"
              }
            ]
          }
        ]
      },
      {
        id: 9,
        name: "Pepper Barbecue Chicken",
        description: "Pepper barbecue chicken for that extra zing",
        isVeg: false,
        rating: 3.5,
        price: "375",
        img_url:
          "https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg",
        size: [
          {
            isRadio: true,
            title: "choose size",
            items: [
              {
                size: "Regular"
              },
              {
                size: "Medium"
              },
              {
                size: "Large"
              }
            ]
          }
        ],
        toppings: [
          {
            isRadio: false,
            title: "choose topping(s)",
            items: [
              {
                name: "Red Pepper"
              },
              {
                name: "Onion"
              },
              {
                name: "Grilled Mushroom"
              },
              {
                name: "Extra Cheese"
              },
              {
                name: "Black Olive"
              }
            ]
          }
        ]
      },
      {
        id: 10,
        name: "Veggie Paradise",
        description:
          "The awesome foursome! Golden corn, black olives, capsicum, red paprika",
        isVeg: true,
        rating: 5,
        price: 435,
        img_url:
          "https://upload.wikimedia.org/wikipedia/commons/6/6f/Pizza_on_stone.jpg",
        size: [
          {
            isRadio: true,
            title: "choose size",
            items: [
              {
                size: "Regular"
              },
              {
                size: "Medium"
              },
              {
                size: "Large"
              }
            ]
          }
        ],
        toppings: [
          {
            isRadio: true,
            title: "choose topping(s)",
            items: [
              {
                name: "Red Pepper"
              },
              {
                name: "Onion"
              },
              {
                name: "Grilled Mushroom"
              },
              {
                name: "Extra Cheese"
              },
              {
                name: "Black Olive"
              }
            ]
          }
        ]
      }
    ];

    this.setState({
      pizzalist: response,
      displaylist: response
    });
  }

  render() {
    return (
      <div className="homeclass">
        <div className="headerclass">
          <Header changeViewHandler={this.changeViewHandler} />
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
                onClick={() => this.filterByTypeHandler("NONVEG")}
              >
                NONVEG
              </ToggleButton>
            </ToggleButtonGroup>
       

          <IconButton>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.sortPizzaHandler("Rating")}
            >
              Sort By Rating
            </Button>
          </IconButton>
          <IconButton>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.sortPizzaHandler("Price")}
            >
              Sort By Price
            </Button>
          </IconButton>
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
