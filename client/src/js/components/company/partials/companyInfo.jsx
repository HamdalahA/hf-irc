import React from 'react';
import PropTypes from 'prop-types';

const companyInfo = ({
  companyName, address, email, siteAddress, phoneNumber, contactPerson
}) => (
  <table>
    <tbody>
      <tr>
        <th>Company Name</th>
        <td>{companyName}</td>
      </tr>
      <tr>
        <th>Address</th>
        <td>{address}</td>
      </tr>
      <tr>
        <th>Email</th>
        <td>{email}</td>
      </tr>
      <tr>
        <th>Site Address</th>
        <td>{siteAddress}</td>
      </tr>
      <tr>
        <th>Contact Person</th>
        <td>{contactPerson}</td>
      </tr>
      <tr>
        <th>Phone Number</th>
        <td>{phoneNumber}</td>
      </tr>
    </tbody>
  </table>
);

companyInfo.propTypes = {
  companyName: PropTypes.string,
  address: PropTypes.string,
  email: PropTypes.string,
  phoneNumber: PropTypes.string,
  siteAddress: PropTypes.string,
  contactPerson: PropTypes.string
};

companyInfo.defaultProps = {
  companyName: '',
  address: '',
  email: '',
  siteAddress: '',
  phoneNumber: '',
  contactPerson: ''
};

export default companyInfo;
