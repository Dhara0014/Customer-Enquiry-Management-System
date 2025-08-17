import React from 'react'
import DataTable from 'react-data-table-component'

const TableComponent = ({columns, filteredCustomers}) => {
    const customStyles = {
        rows: {
          style: {
            minHeight: "48px",
          },
        },
        headCells: {
          style: {
            paddingLeft: "12px",
            paddingRight: "12px",
            backgroundColor: "#f3f4f6",
            fontWeight: "bold",
            fontSize: "14px",
            color: "#374151",
          },
        },
        cells: {
          style: {
            paddingLeft: "12px",
            paddingRight: "12px",
            fontSize: "15px",
          },
        },
      };
  return (
    <DataTable
        columns={columns}
        data={filteredCustomers}
        customStyles={customStyles}
        pagination
        highlightOnHover
        striped
      />
  )
}

export default TableComponent