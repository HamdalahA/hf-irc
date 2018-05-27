import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Email from '@material-ui/icons/Email';
import Lock from '@material-ui/icons/Lock';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import blue from '@material-ui/core/colors/blue';
import { userSigninRequest } from '../../actions/user/signin';
import validateSigninInput from '../../utils/validations/signin';


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  buttonProgress: {
    color: blue[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

class SinginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      identifier: '',
      password: '',
      errors: {},
      isLoading: false,
      showPassword: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.serverError).length >= 1) {
      this.setState({
        isLoading: false,
        open: true
      });
    } else {
      this.setState({ redirect: true });
    }
  }
  onSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.userSigninRequest(this.state);
    }
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  isValid() {
    const { errors, isValid } = validateSigninInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  handleClickShowPassword() {
    this.setState({ showPassword: !this.state.showPassword });
  }
  handleClose() {
    this.setState({ open: false });
  }

  render() {
    const { classes, serverError } = this.props;
    const { errors, redirect, isLoading } = this.state;

    if (redirect) {
      return <Redirect to="/companies" />;
    }

    return (
      <div className="background">
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          autoHideDuration={4000}
          open={this.state.open}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{serverError.error}</span>}
        />
        <div className="wrapper">
          <div className="signin-form">
            <div className={classes.root} id="s-form">
              <h1 style={{ textAlign: 'center', width: '100%' }}>Sign In</h1>
              <form onSubmit={this.onSubmit}>
                <FormControl className={classes.margin} fullWidth>
                  <InputLabel
                    htmlFor="identifier"
                  >Username/Email
                  </InputLabel>
                  <Input
                    id="identifier"
                    value={this.state.identifier}
                    onChange={this.onChange}
                    name="identifier"
                    endAdornment={
                      <InputAdornment position="end">
                        <Email />
                      </InputAdornment>
                      }
                  />
                  {errors.identifier && <span className="red-text">{errors.identifier}</span>}
                </FormControl>

                <FormControl className={classes.margin} fullWidth>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    id="password"
                    type={this.state.showPassword ? 'text' : 'password'}
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.handleClickShowPassword}
                        >
                          {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                      }
                  />
                  {errors.password && <span className="red-text">{errors.password}</span>}
                </FormControl>

                <br />
                <br />
                <br />
                <div className="center">
                  <Button
                    style={{ textAlign: 'center' }}
                    className={classes.button}
                    variant="raised"
                    type="submit"
                    disabled={isLoading}
                    primary="true"
                  >
                    Singin
                    {isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}

                    <Lock className={classes.rightIcon} />
                  </Button>

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SinginPage.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  userSigninRequest: PropTypes.func.isRequired,
  serverError: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = state => ({
  serverError: state.auth.error
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, { userSigninRequest })
)(SinginPage);
