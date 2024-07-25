/* eslint-disable react/prop-types */
import { Card, Spinner } from "react-bootstrap";
import { useGetBorderQuery } from "../../../Redux/service/auth/borderService";
import { useMemo } from "react";
import Table from "./../../../ReactTable/Table";

const Border = () => {
  const { data: borderResponse, isLoading, error } = useGetBorderQuery();

  const data = borderResponse?.data?.data || [];

  const ActionColumn = ({ row }) => {
    console.log(row);
    return (
      <>
        <span role="button" className="text-primary mx-2">
          <i className="bi bi-pencil-square"></i>
        </span>
        <span role="button" className="text-warning mx-2">
          <i className="bi bi-trash"></i>
        </span>
        <span role="button" className="text-primary mx-2">
          <i className="bi bi-card-checklist"></i>
        </span>
      </>
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: "SL",
        accessor: "sl",
        Cell: ({ row }) => row.index + 1,
        classes: "table-user",
      },
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ value }) => value || "n/a",
        classes: "table-user",
      },

      {
        Header: "RoomNumber",
        accessor: "roomNumber",
        Cell: ({ value }) => value || "n/a",
        classes: "table-user",
      },
      {
        Header: "Mobile",
        accessor: "mobile",
        Cell: ({ value }) => value || "n/a",
        classes: "table-user",
      },
      {
        Header: "status",
        accessor: "status",
        Cell: ({ value }) => value || "n/a",
        classes: "table-user",
      },
      {
        Header: "Action",
        accessor: "action",
        classes: "table-action",
        Cell: ActionColumn,
      },
    ],
    []
  );

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center fade-in"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" variant="primary" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }
  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error!</h4>
          <p>There was an error loading border data. Please try again later.</p>
          <hr />
          <p className="mb-0">
            If the problem persists, contact:{" "}
            <span className="text-primary">
              <a href="https://mail.google.com/" target="_blank">
                shahriar.cse@gmail.com
              </a>
            </span>
          </p>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="card shadow-lg">
        <div className="card-body">
          <div className="mx-2 mt-3 border-none">
            <Card.Body>
              <Table columns={columns} data={data || []} />
            </Card.Body>
          </div>
        </div>
      </div>
    </>
  );
};

export default Border;
