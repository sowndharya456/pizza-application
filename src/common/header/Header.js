import React,{Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = theme=> ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  });

class Header extends Component{   
    render(){
        const {classes} = this.props;
        return (
            <div>
                 <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.menuButton} color="inherit" aria-label="menu">
           <img src="/assets/images1.jpeg"/>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            THE PIZZA SHOP
          </Typography>
          <Button color="inherit" onClick={this.props.changeViewHandler}>CHECKOUT</Button>
        </Toolbar>
      </AppBar>
    </div>
            </div>
        );
    }
}

export default withStyles(useStyles) (Header);