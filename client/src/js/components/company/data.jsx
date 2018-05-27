import React from 'react';
import moment from 'moment';
import DeleteButton from '../shared/DeleteButton';
import EditButton from '../shared/EditButton';
import ViewButton from '../shared/ViewButton';

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

export const productOptions = {
  filterType: 'dropdown',
  responsive: 'stacked',
  rowsPerPageOptions: [5, 10, 15]
};


export const certificateOptions = {
  filterType: 'dropdown',
  responsive: 'stacked',
  rowsPerPageOptions: [5, 10, 15],
  rowsPerPage: 5
};
