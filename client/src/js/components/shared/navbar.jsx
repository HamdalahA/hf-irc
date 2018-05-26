import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    flexGrow: 3,
  },
  flex: {
    flex: 3,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 5,
  },
};

const logo = require('../../../assets/img/logo.jpg');

class ButtonAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <img
              className="logo"
              src={logo}
              alt="Card cap"
            />
            <Typography variant="title" color="inherit" className={classes.flex}>
            Halal Food IRS
            </Typography>
            <Button color="inherit">Add Company</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
