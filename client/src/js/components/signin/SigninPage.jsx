import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Email from '@material-ui/icons/Email';
import Lock from '@material-ui/icons/Lock';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  }
});

class SinginPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      amount: '',
      password: '',
      weight: '',
      weightRange: '',
      showPassword: false,
    }; 

    this.handleChange = this.handleChange.bind(this);
  }

   handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className="background">
        <div className="wrapper">
          <div className="signin-form">
            <div className={classes.root} id="s-form">
              <h1 style={{textAlign: 'center', width: '100%'}}>Signin</h1> 
              <form action="index.html">
                <FormControl className={classes.margin} fullWidth={true}>
                    <InputLabel htmlFor ="input-with-icon-adornment">Username/Email</InputLabel>
                    <Input
                      id="input-with-icon-adornment"
                      endAdornment={
                        <InputAdornment position="end">
                          <Email />
                        </InputAdornment>
                      }
                    />
                </FormControl>
                
                <FormControl className={classNames(classes.margin)} fullWidth={true}>
                  <InputLabel htmlFor="adornment-password">Password</InputLabel>
                  <Input
                    id="adornment-password"
                    type={this.state.showPassword ? 'text' : 'password'}
                    value={this.state.password}
                    onChange={this.handleChange('password')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.handleClickShowPassword}
                          onMouseDown={this.handleMouseDownPassword}
                        >
                          {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <br/>
                <br/>
                <br/>
                <Button className={classes.button} variant="raised">
                  Singin
                  <Lock className={classes.rightIcon} />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div> 
    );
  }
}

SinginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SinginPage);
