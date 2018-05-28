import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Snackbar from '@material-ui/core/Snackbar';
import InputLabel from '@material-ui/core/InputLabel';
import { addCompanyRequest } from '../../actions/company/companies';


function getModalStyle() {
  const top = 60;
  const left = 80;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: 300,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class AddCompanyModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      snackBar: false,
      name: '',
      email: '',
      address: '',
      phoneNo: '',
      contactPerson: '',
      siteAddress: '',
      isLoading: false,
      error: {},
      success: false,
      successMessage: '',
      message: '',
      err: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleSnakBarClose = this.handleSnakBarClose.bind(this);
  }

  componentWillMount() {
    this.setState({
      error: {},
      err: false,
      success: false,
      successMessage: '',
    });
  }
  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.error).length > 0 && nextProps.error.error !== undefined) {
      this.setState({
        err: true,
        success: false,
        successMessage: '',
        error: nextProps.error.error,
        snackBar: true
      });
      this.handleOpen();
      return this;
    }

    if (nextProps.addSuccess) {
      this.setState({
        err: false,
        success: nextProps.addSuccess,
        successMessage: nextProps.successMessage,
        snackBar: true,
        name: '',
        email: '',
        address: '',
        phoneNo: '',
        contactPerson: '',
        siteAddress: '',
        error: {}
      });
      this.handleClose();
    }
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    this.setState({
      error: {},
      isLoading: true,
      successMessage: '',
      success: false,
      err: false
    });
    this.props.addCompanyRequest(this.state).then((x) => {
      console.log('its fine', x);
    }, (err) => {
      console.log('its not fine ');
    });
  }

  handleOpen() {
    this.setState({ modal: true });
  }

  handleClose() {
    this.setState({ modal: false });
  }

  handleSnakBarClose() {
    this.setState({ snackBar: false, success: false, successMessage: '' });
  }

  render() {
    const { classes } = this.props;
    const {
      error, err, success, successMessage
    } = this.state;

    const snackBarFunc = msg => (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={4000}
        open={this.state.snackBar}
        onClose={this.handleSnakBarClose}
        ContentProps={{
            'aria-describedby': 'message-id',
          }}
        message={<span id="message-id">{msg}</span>}
      />
    );

    return (
      <div>
        { success ? snackBarFunc(successMessage) : null }
        {err ? snackBarFunc(error) : null}

        <Button onClick={this.handleOpen} className="comp-title">Add Company</Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.modal}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <div className="add-company-form">
              <div className={classes.root}>
                <h4 style={{ textAlign: 'center', width: '70%' }}>Register Company</h4>
                <form onSubmit={this.onSubmit}>
                  <FormControl className={classes.margin} fullWidth>
                    <InputLabel
                      htmlFor="name"
                    >Company Name
                    </InputLabel>
                    <Input
                      id="name"
                      value={this.state.name}
                      onChange={this.onChange}
                      name="name"
                    />
                  </FormControl>

                  <FormControl className={classes.margin} fullWidth>
                    <InputLabel htmlFor="address">Address</InputLabel>
                    <Input
                      id="address"
                      name="address"
                      value={this.state.address}
                      onChange={this.onChange}
                    />

                  </FormControl>
                  <FormControl className={classes.margin} fullWidth>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input
                      id="email"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange}
                    />

                  </FormControl>

                  <FormControl className={classes.margin} fullWidth>
                    <InputLabel htmlFor="phoneNo">Phone No</InputLabel>
                    <Input
                      id="phoneNo"
                      name="phoneNo"
                      value={this.state.phoneNo}
                      onChange={this.onChange}
                    />
                  </FormControl>

                  <FormControl className={classes.margin} fullWidth>
                    <InputLabel htmlFor="contact">Contact Person</InputLabel>
                    <Input
                      id="contactPerson"
                      name="contactPerson"
                      value={this.state.contactPerson}
                      onChange={this.onChange}
                    />
                  </FormControl>

                  <FormControl className={classes.margin} fullWidth>
                    <InputLabel htmlFor="address">Site Address</InputLabel>
                    <Input
                      id="siteAddress"
                      name="siteAddress"
                      value={this.state.siteAddress}
                      onChange={this.onChange}
                    />
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
                      primary="true"
                    >
                    Register
                    </Button>

                  </div>
                </form>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

AddCompanyModal.propTypes = {
  addCompanyRequest: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isLoadingCompanies: state.company.isLoadingCompanies,
  error: state.company.error,
  addSuccess: state.company.addSuccess,
  successMessage: state.company.successMessage
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, { addCompanyRequest })
)(AddCompanyModal);
