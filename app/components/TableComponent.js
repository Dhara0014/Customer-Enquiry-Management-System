import React from 'react'
import DataTable from 'react-data-table-component'

const TableComponent = ({columns, filteredCustomers, loading}) => {
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
        // pagination: {
        //   style: {
        //     border: "2px solid red",
        //     borderTop: "1px solid #e5e7eb",
        //     backgroundColor: "#fff",
        //     borderBottomLeftRadius: "0.75rem",
        //     borderBottomRightRadius: "0.75rem",
        //     padding: "10px 16px",
        //     justifyContent: "flex-end",
        //   },
        //   pageButtonsStyle: {
        //     borderRadius: "6px",
        //     height: "32px",
        //     width: "32px",
        //     padding: "4px",
        //     margin: "0 4px",
        //     cursor: "pointer",
        //     transition: "all 0.2s",
        //     "&:hover:not(:disabled)": {
        //       backgroundColor: "#f3f4f6",
        //     },
        //     "&:disabled": {
        //       cursor: "not-allowed",
        //       opacity: 0.5,
        //     },
        //   },
        // },
        
      };
  return (
    <DataTable
        columns={columns}
        data={filteredCustomers}
        progressPending={loading}
        customStyles={customStyles}
        pagination
        highlightOnHover
        // striped
      />
  )
}

export default TableComponent