/* eslint-disable react/prop-types */

import { useTable, usePagination, useGlobalFilter } from "react-table";
import "./TableHelper/Table.css";

import { useRef } from "react";

const Table = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
    useTable({ columns, data }, useGlobalFilter, usePagination);

  const tableRef = useRef();

  return (
    <>
      <div className="table-container">
        <div ref={tableRef}>
          <table {...getTableProps()} className="custom-table">
            <thead className="custom-table-header">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      key={column.id}
                      className={column.classes}
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()} className="custom-table-body ">
              {page.map((row, rowIndex) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={rowIndex}>
                    {row.cells.map((cell, cellIndex) => (
                      <td
                        {...cell.getCellProps()}
                        key={cellIndex}
                        style={{ textAlign: "center" }}
                        className={
                          cellIndex % 2 === 0
                            ? "custom-table-cell-even"
                            : "custom-table-cell-odd"
                        }
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Table;
