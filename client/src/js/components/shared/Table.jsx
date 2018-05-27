import React from 'react';
import MUIDataTable from 'mui-datatables';
import PropTypes from 'prop-types';


const Table = ({ data, columns, options }) => (
  <MUIDataTable
    data={data}
    columns={columns}
    options={options}
  />
);

Table.propTypes = {
  data: PropTypes.array, // eslint-disable-line
  columns: PropTypes.array, // eslint-disable-line
  options: PropTypes.object // eslint-disable-line
};

Table.defaultProps = {
  data: [],
  columns: [],
  options: {},
};

export default Table;
