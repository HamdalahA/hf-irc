import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import AddButton from '../shared/AddButton';
import imageUpload from '../../utils/imageUpload';


function getModalStyle() {
  const top = 70;
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
    width: 300,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class AddCertificateModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          snackBar: false,
          modal: false,
          refNo: '',
          imageUrl: '',
          companyName: '',
          expiryDate: '',
          isLoading: false,
          error: false,
          success: false,
          successMessage: '',
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleSnakBarClose = this.handleSnakBarClose.bind(this);
 
    }

  handleOpen = () => {
    this.setState({ modal: true });
  };

  handleClose = () => {
    this.setState({ modal: false });
  };

  handleSnakBarClose() {
    this.setState({ snackBar: false, success: false });
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const { companyId } = this.props; // eslint-disable-line    
      this.props.addCertificate(this.state, companyId);
    }

    onDrop(files) {
        this.setState({
          isLoading: true
        });
        imageUpload(files)
          .then((response) => {
            const { body } = response;
            const fileURL = body.secure_url;
            if (fileURL) {
              this.setState({
                imageUrl: fileURL,
                isLoading: false
              });
            }
          });
      }

  render() {
    const { classes } = this.props;

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
        { this.state.success ? snackBarFunc('Certificate successfully uploaded') : null }
        {this.state.error ? snackBarFunc(error) : null}
        <div className="button"><AddButton onClick={this.handleOpen} /></div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.modal}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
          <div className="add-cert-form">
            <div className={classes.root}>
              <h4 style={{ textAlign: 'center', width: '80%' }}>Add Certificate</h4>
              <form onSubmit={this.onSubmit}>
                <FormControl className={classes.margin} fullWidth>
                  <InputLabel htmlFor="refNo">Ref No</InputLabel>
                  <Input
                    id="ref"
                    value={this.state.refNo}
                    onChange={this.onChange}
                    name="refNo"
                  />
                </FormControl>

                <FormControl className={classes.margin}>
              <InputLabel htmlFor="exampleFile" />
                <Input
                  type="file"
                  name="imageUrl"
                  onChange={this.onDrop}
                  accept="image/*"
                  multiple
                  type="file"
                />
            </FormControl>

                <FormControl className={classes.margin} fullWidth>
                <TextField
                  id="date"
                  label="Expiry date"
                  type="date"
                  className={classes.textField}
                  name="expiryDate"
                  onChange={this.onChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
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
                    Add
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

AddCertificateModal.propTypes = {
  classes: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(AddCertificateModal);
