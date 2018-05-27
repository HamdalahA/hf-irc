import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

function getModalStyle() {
  const top = 50;
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
          open: false,
          name: '',
          email: '',
          address: '',
          phoneNo: '',
          contactPerson: '',
          siteAddress: '',
          isLoading: false,
          error: false,
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
 
    }
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
      this.props.addCompany(this.state);
    }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button onClick={this.handleOpen} className="comp-title">Add Company</Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
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
  addCompany: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(AddCompanyModal);
