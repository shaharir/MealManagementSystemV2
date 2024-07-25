import { Card, Spinner } from "react-bootstrap";
import Table from "../../../ReactTable/Table";
import dayjs from "dayjs";
import { useMemo } from "react";
import convertDropdown from "../../../helper/convertDropdown";
import { useGetBorderQuery } from "../../../Redux/service/auth/borderService";
import { useGetSummaryQuery } from "../../../Redux/service/auth/summaryService";

const Summary = () => {
  const { data: summaryGetData, isLoading, error } = useGetSummaryQuery();
  const data = summaryGetData?.data?.data;
  const { data: borderGetData } = useGetBorderQuery(undefined);

  const borderData = borderGetData?.data?.data;
  console.log("data", data);

  const convertedBorderData = useMemo(() => {
    const convertedData = convertDropdown(borderData);
    return convertedData;
  }, [borderData]);

  console.log(convertedBorderData);
  const ActionColumn = ({ row }) => {
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
        Header: "Member Name",
        accessor: "member",
        Cell: ({ value }) => convertedBorderData?.[value]?.name || "n/a",
        classes: "table-user",
      },

      {
        Header: "Meal Rate",
        accessor: "mealRate",
        Cell: ({ value }) => value || "n/a",
        classes: "table-user",
      },
      {
        Header: "Deposit Amount",
        accessor: "depositAmount",
        Cell: ({ value }) => value || "n/a",
        classes: "table-user",
      },
      {
        Header: "Summary Amount",
        accessor: "summaryAmount",
        Cell: ({ value }) => value || "n/a",
        classes: "table-user",
      },

      {
        Header: "Meal Quantity",
        accessor: "mealQuantity",
        Cell: ({ value }) => value || "n/a",
        classes: "table-user",
      },
      {
        Header: "Total Cost",
        accessor: "totalCost",
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
    [data]
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
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque,
        provident.
      </p>
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

export default Summary;
