/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { Card, Spinner } from "react-bootstrap";
import { useGetMealQuery } from "../../../Redux/service/auth/mealService";
import Table from "../../../ReactTable/Table";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import convertDropdown from "../../../helper/convertDropdown";
import { useGetBorderQuery } from "../../../Redux/service/auth/borderService";
import MealCreateUpdateModal from "./MealCreateUpdatemodal";
export const DEFAULT_BORDER_VALUE = {
  createdAt: "",
  mealQuantity: "",
};
const Meal = () => {
  const [modal, setModal] = useState(false);
  const [defaultValues, setDefaultValues] = useState(DEFAULT_BORDER_VALUE);
  const { data: mealGetData, isLoading, error } = useGetMealQuery();
  const data = mealGetData?.data?.data;
  const { data: borderGetData } = useGetBorderQuery(undefined);

  const borderData = borderGetData?.data?.data;

  const convertedBorderData = useMemo(() => {
    const convertedData = convertDropdown(borderData);
    return convertedData;
  }, [borderData]);
  console.log(borderData);
  const toggle = () => {
    if (!modal) {
      setModal(modal);
    } else {
      setModal(false);
      setDefaultValues(DEFAULT_BORDER_VALUE);
    }
  };
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
        Header: "Meal Quantity",
        accessor: "mealQuantity",
        Cell: ({ value }) => value || "n/a",
        classes: "table-user",
      },
      {
        Header: "Created Date",
        accessor: "createdAt",
        Cell: ({ value }) =>
          value ? dayjs(value).format("DD-MM-YYYY") : "n/a",
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
      <div className="mt-2 mb-5">
        {" "}
        <h2 className="fw-bolder">Meal</h2>
        <span>
          <strong>Include the details of the Meal :</strong>{" "}
        </span>
        <button
          className=" rounded text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-50"
          onClick={() => setModal(true)}
          style={{ backgroundColor: "#001529" }}
        >
          <i className="bi bi-bookmark-plus-fill"></i>
          Add Meal
        </button>
      </div>
      <div className="card shadow-lg">
        <div className="card-body">
          <div className="mx-2 mt-3 border-none">
            <Card.Body>
              <Table columns={columns} data={data || []} />
            </Card.Body>
          </div>
        </div>
      </div>
      {modal && (
        <MealCreateUpdateModal
          modal={modal}
          toggle={toggle}
          defaultValues={defaultValues}
          setModal={setModal}
          setDefaultValues={setDefaultValues}
          DEFAULT_BORDER_VALUE={DEFAULT_BORDER_VALUE}
        />
      )}
      {/* <table>
        <tbody>
          {borderData.map((item) => (
            <tr key={item._id}>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </>
  );
};

export default Meal;
