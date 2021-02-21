import React, { Component } from 'react';
import Header from '../../common/header/Header';
import PizzaMenu from '../pizzaMenu/PizzaMenu';
import Footer from '../../common/footer/Footer';
import Checkout from '../checkout/Checkout';

class Summary extends Component{
render() {
    return (
        <div className="homeclass">
            <div className="headerclass">
                <Header changeViewHandler={this.props.changeViewHandler} />
            </div>
            <div className="mainclass">
           <Checkout />
           </div>
           
            <div className="footerclass">
            <Footer/>
            </div>
        </div>
    );
}

}

export default Summary;