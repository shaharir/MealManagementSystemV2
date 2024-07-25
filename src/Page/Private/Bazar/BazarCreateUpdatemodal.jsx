/* eslint-disable react/prop-types */
import { Modal, Button, Form, Row, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";
import { DEFAULT_BORDER_VALUE } from "./Bazar";
import { useCreateBazarMutation } from "../../../Redux/service/auth/bazarService";
import { useGetBorderQuery } from "../../../Redux/service/auth/borderService";
import FormInput from "../../../Component/CustomInput/FormInput";

const BazarCreateUpdateModal = ({
  modal,
  toggle,
  editBazarData,
  defaultValues,
  setModal,
  setDefaultValues,
  setEditBazarData,
}) => {
  const { data: bordersResponse } = useGetBorderQuery();
  const data = bordersResponse?.data?.data || [];
  const [createBazar, { isSuccess: isCreateSuccess, isLoading }] =
    useCreateBazarMutation();

  const schemaResolver = yup.object().shape({
    marketDate: yup
      .date()
      .typeError("Market date must be a valid ISO 8601 date string")
      .required("Date is required"),
    totalPrice: yup
      .number()
      .typeError("Total price must be a number ")
      .required("Total price is required"),
    member: yup
      .string()
      .matches(/^[0-9a-fA-F]{24}$/, "Member must be a MongoDB ID")
      .required("Member is required"),
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
  }, [isCreateSuccess, setModal, setDefaultValues, setEditBazarData]);

  return (
    <>
      <Modal show={modal} onHide={toggle}>
        <Modal.Header closeButton>
          <Modal.Title>{"Add Bazar"}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mt-4">
          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Row>
              <FormInput
                name="marketDate"
                label="Bazar Date"
                type="date"
                containerClass="mb-3"
                errors={errors}
                control={control}
                required
                labelColor="text-dark"
              />
              <FormInput
                name="member"
                label="Member"
                type="select"
                containerClass="mb-3"
                errors={errors}
                control={control}
                data={data}
                required
              />
              <FormInput
                name="totalPrice"
                label="Total Price"
                type="number"
                placeholder="Enter Bazar Price"
                containerClass="mb-3"
                errors={errors}
                control={control}
                required
              />
            </Row>

            <Button
              type="submit"
              className="btn btn-primary w-100"
              disabled={isLoading}
            >
              {editBazarData ? "Update Bazar" : "Create Bazar"}
              {isLoading && <Spinner animation="border" size="sm" />}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BazarCreateUpdateModal;
