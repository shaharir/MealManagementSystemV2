/* eslint-disable react/prop-types */
import { Modal, Button, Form, Row, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";
import { DEFAULT_BORDER_VALUE } from "./Deposit";
import FormInput from "../../../Component/CustomInput/FormInput";
import { useCreateDepositMutation } from "../../../Redux/service/auth/depositService";
import { useGetBorderQuery } from "../../../Redux/service/auth/borderService";

const DepositCreateUpdateModal = ({
  modal,
  toggle,
  defaultValues,
  setModal,
  setDefaultValues,
}) => {
  const { data: bordersResponse } = useGetBorderQuery();
  const data = bordersResponse?.data?.data || [];
  const [createBazar, { isSuccess: isCreateSuccess, isLoading }] =
    useCreateDepositMutation();
  const schemaResolver = yup.object().shape({
    depositDate: yup
      .date()
      .typeError("Market date must be a valid ISO 8601 date string")
      .required("Date is required"),
    depositAmount: yup
      .number()
      .typeError("DepositAmount must be a number ")
      .required("DepositAmount is required"),

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
  }, [isCreateSuccess, setModal, setDefaultValues]);

  return (
    <>
      <Modal show={modal} onHide={toggle}>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bolder">{"Deposit"}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mt-4">
          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Row>
              <FormInput
                name="depositAmount"
                label="Deposit Amount"
                type="number"
                placeholder="Enter Amount"
                containerClass="mb-3"
                errors={errors}
                control={control}
                required
                labelColor="text-dark"
              />

              <FormInput
                name="depositDate"
                label="Deposit Date"
                type="date"
                containerClass="mb-3"
                errors={errors}
                control={control}
                required
              />
              <FormInput
                name="member"
                label="Member"
                type="select"
                containerClass="mb-3"
                errors={errors}
                control={control}
                required
                data={data}
              />
            </Row>

            <Button
              type="submit"
              className="btn btn-primary w-100"
              disabled={isLoading}
            >
              {"Create Deposit"}
              {isLoading && <Spinner animation="border" size="sm" />}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DepositCreateUpdateModal;
