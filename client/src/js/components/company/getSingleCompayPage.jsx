import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Paper from '../shared/Paper';
import NavBar from '../shared/navbar';
import CompanyInfo from './partials/companyInfo';
import Table from '../shared/Table';
import { getSingleCompany } from '../../actions/company/getSingleCompany';
import AddButton from '../shared/AddButton';

import {
  productColumns,
  certificateColumns,
  productOptions,
  certificateOptions
} from './data';

class SingleCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyDetails: {},
      products: [],
      certificate: [],
      isLoading: false // eslint-disable-line
    };
  }

  componentDidMount() {
    const { companyId } = this.props.match.params; // eslint-disable-line
    this.props.getSingleCompany(companyId);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      products: nextProps.companyDetails.company.Products, // eslint-disable-line
      certificate: nextProps.companyDetails.company.Certificates, // eslint-disable-line
      companyDetails: nextProps.companyDetails.company
    });
  }

  render() {
    const { companyDetails, products, certificate } = this.state;

    const productListData = products.map(item => [
      item.name, item.category, 'Edit', 'Delete']);

    const certificateListData = certificate.map(item => [
      item.refNo, item.expiryDate, 'View']);

    return (
      <div>
        <NavBar />
        <div className="container">
          <div className="left">
            <div className="top">
              <h2 style={{ textAlign: 'center' }}>Company Info</h2>
              <CompanyInfo
                companyName={companyDetails.name}
                address={companyDetails.address}
                email={companyDetails.email}
                siteAddress={companyDetails.siteAddress}
                phoneNumber={companyDetails.phoneNo}
                contactPerson={companyDetails.contactPerson}
              />
            </div>
            <div className="bottom">
              <div>
                <div className="head"><h2>Certificate List</h2></div>
                <div className="button"><AddButton /></div>
                <div className="clear" />

              </div>
              {certificateListData.length > 0 ?
                <Table
                  data={certificateListData}
                  columns={certificateColumns}
                  options={certificateOptions}
                /> :
                <Paper
                  header="Nothing yet"
                  content="Add Certificates to this company"
                />
                }
            </div>
          </div>
          <div className="right">
            <div>
              <div className="head"><h2>Product List</h2></div>
              <div className="button"><AddButton /></div>
              <div className="clear" />
            </div>
            { productListData.length > 0 ?
              <Table
                data={productListData}
                columns={productColumns}
                options={productOptions}
              /> :
              <Paper
                header="Nothing yet"
                content="Add Products to this company"
              />
            }

            {/* <X data={productListData} /> */}
          </div>
          <div className="clear" />
        </div>
      </div>
    );
  }
}

SingleCompany.propTypes = {
  getSingleCompany: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  companyDetails: state.company
});

export default connect(mapStateToProps, { getSingleCompany })(SingleCompany);
