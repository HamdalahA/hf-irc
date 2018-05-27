import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ButtonAppBar from '../shared/navbar';
import moment from 'moment';
import { getCompaniesRequest, addCompanyRequest } from '../../actions/company/companies';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
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
});

class CompanyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingCompanies: false,
      page: 1
    };
  }
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  componentDidMount() {
    this.props.getCompaniesRequest();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      page: nextProps.pageCount
    });
  }

  render() {
    const { classes, companies } = this.props;
    return (
      <Paper className={classes.root}>
      <ButtonAppBar
      addCompany={this.props.addCompanyRequest}
      />
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Company Id</CustomTableCell>
            <CustomTableCell>Company Name</CustomTableCell>
            <CustomTableCell>Address</CustomTableCell>
            <CustomTableCell>Company Email</CustomTableCell>
            <CustomTableCell>Reg Date</CustomTableCell>
            <CustomTableCell>Company Phone No</CustomTableCell>
            <CustomTableCell>Site Address</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {companies.map(company => {
            return (
              <TableRow className={classes.row} key={company.id}>
                <CustomTableCell component="th" scope="row">
                  {company.id}
                </CustomTableCell>
                <CustomTableCell>{company.name}</CustomTableCell>
                <CustomTableCell>{company.address}</CustomTableCell>
                <CustomTableCell>{company.email}</CustomTableCell>
                <CustomTableCell>{moment(company.createdAt).format("Do MMM YYYY")}</CustomTableCell>
                <CustomTableCell>{company.phoneNo}</CustomTableCell>
                <CustomTableCell>{company.siteAddress}</CustomTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
  }
}

CompanyPage.propTypes = {
  classes: PropTypes.object.isRequired,
  getCompaniesRequest: PropTypes.func.isRequired,
  addCompanyRequest: PropTypes.func.isRequired,
  pageCount: PropTypes.number,
  isLoadingCompanies: PropTypes.bool,
};

CompanyPage.defaultProps = {
  companies: [],
  company: {},
  pageCount: 0,
  isLoadingCompanies: true
};

function mapStateToProps(state) {
  return {
    companies: state.company.companies,
    company: state.company.company,
    isLoadingCompanies: state.company.isLoadingCompanies,
  };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, { getCompaniesRequest, addCompanyRequest })
)(CompanyPage);
