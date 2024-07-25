/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useGetBorderQuery } from "../../../Redux/service/auth/borderService";
import { useCreateMealMutation } from "../../../Redux/service/auth/mealService";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { DEFAULT_BORDER_VALUE } from "./Meal";
import { Button, Form, Modal, Row, Spinner } from "react-bootstrap";
import FormInput from "../../../Component/CustomInput/FormInput";

const MealCreateUpdateModal = ({
  modal,
  toggle,
  defaultValues,
  setModal,
  setDefaultValues,
}) => {
  const { data: bordersResponse } = useGetBorderQuery();
  const data = bordersResponse?.data?.data || [];
  const [createBazar, { isSuccess: isCreateSuccess, isLoading }] =
    useCreateMealMutation();
  console.log(data);
  const schemaResolver = yup.object().shape({
    createdAt: yup
      .date()
      .typeError("Market date must be a valid ISO 8601 date string")
      .required("Date is required"),
    meals: yup
      .array()
      .of(
        yup.object().shape({
          mealQuantity: yup
            .number()
            .typeError("mealQuantity must be a number")
            .required("mealQuantity is required"),
        })
      )
      .required("meals is required"),
  });

  const methods = useForm({
    resolver: yupResolver(schemaResolver),
    defaultValues,
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = methods;

  const onSubmit = (formData) => {
    console.log(formData);
    createBazar({ postBody: formData });
  };

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  useEffect(() => {
    if (isCreateSuccess) {
      setModal(false);
      setDefaultValues(DEFAULT_BORDER_VALUE);
    }
  }, [isCreateSuccess, setModal, setDefaultValues]);

  return (
    <>
      <Modal show={modal} onHide={toggle}>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bolder">Meal</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mt-4">
          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Row className="mb-2">
              <div className="col-6">
                {" "}
                <FormInput
                  name="createdAt"
                  label="Date"
                  type="date"
                  containerClass="mb-3"
                  errors={errors}
                  control={control}
                  required
                />
              </div>
            </Row>
            <Row>
              <table>
                <tbody>
                  {data.map((item) =>
                    item.status === "ACTIVE" ? (
                      <tr key={item.id}>
                        <td style={{ fontWeight: "bolder" }}>{item.name}</td>
                        <td>
                          <FormInput
                            name="mealQuantity"
                            label="Quantity"
                            type="number"
                            containerClass="mb-3"
                            errors={errors}
                            control={control}
                            required
                          />
                        </td>
                      </tr>
                    ) : null
                  )}
                </tbody>
              </table>
            </Row>
            <Button
              type="submit"
              className="btn btn-primary w-100"
              disabled={isLoading}
            >
              Create Meal
              {isLoading && <Spinner animation="border" size="sm" />}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MealCreateUpdateModal;
