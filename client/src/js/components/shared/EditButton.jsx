import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Edit from '@material-ui/icons/Edit';

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
        variant="raised"
        color="primary"
        onClick={() => onClick()}
      >
        Edit <Edit />
      </Button>
    </div>
  );
}

IconLabelButtons.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line
  onClick: PropTypes.func.isRequired
};

export default withStyles(styles)(IconLabelButtons);
