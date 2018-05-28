import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Add from '@material-ui/icons/Add';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  icon: {
    margin: theme.spacing.unit * 2,
  },
});

function IconLabelButtons(props) {
  const { classes, onClick } = props;
  return (
    <div>
      <Button
        className={classes.button}
        size="small"
        variant="outlined"
        color="primary"
        onClick={() => onClick()}
      >
        <Add />
      </Button>
    </div>
  );
}

IconLabelButtons.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line
};

export default withStyles(styles)(IconLabelButtons);
