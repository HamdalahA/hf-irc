
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Delete from '@material-ui/icons/Delete';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  }
});

function IconLabelButtons(props) {
  const { classes } = props;
  return (
    <div>
      <Button
        className={classes.button}
        variant="raised"
        size="small"
        color="secondary"
      >
        Del
        <Delete className={classes.rightIcon} />
      </Button>
    </div>
  );
}

IconLabelButtons.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line
};

export default withStyles(styles)(IconLabelButtons);
