import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import blue from '@material-ui/core/colors/blue';
import ButtonAppBar from '../shared/navbar';
import Table from '../shared/Table';

import {
  getCompaniesRequest,
  addCompanyRequest
} from '../../actions/company/companies';
import { companiesColumns, companiesOptions } from './data';

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
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

class CompanyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      isLoadingCompanies: false
    };
  }

  componentDidMount() {
    this.props.getCompaniesRequest();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isLoadingCompanies: nextProps.isLoadingCompanies, // eslint-disable-line
      companies: nextProps.companies // eslint-disable-line
    });
  }

  render() {
    const { classes } = this.props;
    const { companies, isLoadingCompanies } = this.state;

    const data = companies.map(item => [
      item.name, item.email, item.siteAddress, item.phoneNo, item.id, item.id, item.id,
    ]);
    console.log('data', data);
    return (
      <Paper className={classes.root}>
        <ButtonAppBar
          addCompany={this.props.addCompanyRequest}
        />
        {isLoadingCompanies ?
          <CircularProgress size={80} className={classes.buttonProgress} />
        :
          <Table
            title="Company List"
            data={data}
            columns={companiesColumns}
            options={companiesOptions}
          />
        }
      </Paper>
    );
  }
}

CompanyPage.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line
  getCompaniesRequest: PropTypes.func.isRequired,
  addCompanyRequest: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
  companies: state.company.companies,
  isLoadingCompanies: state.company.isLoadingCompanies,
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, { getCompaniesRequest, addCompanyRequest })
)(CompanyPage);
