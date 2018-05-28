import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import blue from '@material-ui/core/colors/blue';
import EditButton from '../shared/EditButton';
import {
  getSingleCompany,
  editCompany
} from '../../actions/company/getSingleCompany';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
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

class SimpleModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      snackBar: false,
      name: 'ok',
      email: '',
      address: '',
      phoneNo: '',
      contactPerson: '',
      siteAddress: '',
      isLoading: false
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleSnakBarClose = this.handleSnakBarClose.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // console.log('isLoading...', nextProps);
    this.setState({
      name: nextProps.companyDetails.name,
      email: nextProps.companyDetails.email,
      address: nextProps.companyDetails.address,
      phoneNo: nextProps.companyDetails.phoneNo,
      contactPerson: nextProps.companyDetails.contactPerson,
      siteAddress: nextProps.companyDetails.siteAddress,
      isLoading: nextProps.isLoading
    });
  }

  onSubmit(event) {
    event.preventDefault();
    const { value } = this.props // eslint-disable-line

    this.props.editCompany(this.state, value);
    this.setState({
      snackBar: true,
      open: false
    });
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleOpen() {
    const { value } = this.props // eslint-disable-line
    this.props.getSingleCompany(value);
    this.setState({ open: true, isLoading: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleSnakBarClose() {
    this.setState({ snackBar: false });
  }

  render() {
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
    const { classes } = this.props;

    return (
      <div>
        {this.state.snackBar ? snackBarFunc('Company updated successfully') : null}
        <EditButton onClick={this.handleOpen} />
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <div className="add-company-form">
              <div className={classes.root}>
                <h4 style={{ textAlign: 'center', width: '100%' }}>Edit Company</h4>
                {this.state.isLoading ?
                  <div style={{ padding: '5%' }}>
                    <CircularProgress size={24} className={classes.buttonProgress} />
                  </div>
                :
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
                    Edit
                      </Button>

                    </div>
                  </form>
                }
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line
  value: PropTypes.number.isRequired,
  getSingleCompany: PropTypes.func.isRequired,
  editCompany: PropTypes.func.isRequired
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

const mapStateToProps = state => ({
  companyDetails: state.company.company,
  isLoading: state.company.isLoading
});

export default connect(
  mapStateToProps,
  { getSingleCompany, editCompany }
)(SimpleModalWrapped);
