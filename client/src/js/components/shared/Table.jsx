import React from 'react';
import MUIDataTable from 'mui-datatables';
import PropTypes from 'prop-types';


const Table = ({
  title, data, columns, options
}) => (
  <MUIDataTable
    title={title}
    data={data}
    columns={columns}
    options={options}
  />
);

Table.propTypes = {
  data: PropTypes.array, // eslint-disable-line
  columns: PropTypes.array, // eslint-disable-line
  options: PropTypes.object, // eslint-disable-line
  title: PropTypes.string
};

Table.defaultProps = {
  data: [],
  columns: [],
  options: {},
  title: ''
};

export default Table;
