import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import DeleteButton from '../shared/DeleteButton';
import EditButton from '../shared/EditButton';
import ViewButton from '../shared/ViewButton';
import Modal from '../shared/EditCompanyModal';

export const productColumns = [
  {
    name: 'Name',
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: 'Category',
    options: {
      filter: true,
      sort: false,
    }
  },
  {
    name: 'Edit',
    options: {
      filter: true,
      sort: false,
      customRender: index => ( // eslint-disable-line
        <EditButton />
      )
    }
  },
  {
    name: 'Delete',
    options: {
      filter: true,
      sort: false,
      customRender: index => ( // eslint-disable-line
        <DeleteButton /> // eslint-disable-line
      )
    }
  },
];

export const certificateColumns = [
  {
    name: 'Reference Number',
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: 'Expiry Date',
    options: {
      filter: true,
      sort: false,
      customRender: (index, value) => {
        const date = moment(value).format('dddd MMM Do YYYY');
        return date;
      }
    }
  },
  {
    name: 'View',
    options: {
      filter: true,
      sort: false,
      customRender: index => ( // eslint-disable-line
        <ViewButton />
      )
    }
  }
];

export const companiesColumns = [
  {
    name: 'Name',
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: 'Email',
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: 'Site Address',
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: 'Phone Number',
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: 'View',
    options: {
      filter: true,
      sort: true,
      customRender: (index, value) => ( // eslint-disable-line
        <Link to={`/company/${value}`}>
          <ViewButton />
        </Link>
      )
    }
  },
  {
    name: 'Edit',
    options: {
      filter: true,
      sort: true,
      customRender: (index, value) => { // eslint-disable-line
        return <Modal value={value} />;
      }
    }
  },
  {
    name: 'Delete',
    options: {
      filter: true,
      sort: true,
      customRender: index => ( // eslint-disable-line
        <DeleteButton /> // eslint-disable-line
      )
    }
  },
];

export const productOptions = {
  filterType: 'dropdown',
  responsive: 'stacked',
  rowsPerPageOptions: [10, 15, 30],
  selectableRows: false
};

export const certificateOptions = {
  filterType: 'dropdown',
  responsive: 'stacked',
  rowsPerPageOptions: [10, 20, 30],
  rowsPerPage: 5,
  selectableRows: false
};


export const companiesOptions = {
  filterType: 'dropdown',
  responsive: 'stacked',
  // rowsPerPageOptions: [10, 20, 30],
  selectableRows: false
};
