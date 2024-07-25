/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../Redux/service/auth/authService";
import FormInput from "../../Component/CustomInput/FormInput";

export const DEFAULT_VALUE = {
  mobile: "01710303309",
  password: "MMS12345",
};

const AddUser = () => {
  const navigate = useNavigate();
  const [login, { data, isLoading }] = useLoginMutation();

  const schemaResolver = yup.object().shape({
    mobile: yup.string().required("Mobile is required"),
    password: yup.string().required("Password is required"),
  });

  const methods = useForm({
    mode: "all",
    defaultValues: DEFAULT_VALUE,
    resolver: yupResolver(schemaResolver),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const onSubmit = (formData) => {
    login(formData);
  };

  useEffect(() => {
    if (data?.data?.token) {
      localStorage.setItem("token", data?.data?.token);
      navigate("/");
    }
  }, [data]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center ">
        <div className="col-md-6 col-lg-4 ">
          <div className="card shadow-lg border-0 text-white">
            <div className="card-body p-5">
              <Card.Header
                className=" text-white text-center"
                style={{ backgroundColor: "#001529" }}
              >
                <h4>LogIn Form</h4>
              </Card.Header>
              <Card className="shadow-sm border-0 rounded">
                <Card.Body>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                      <Col md={12}>
                        <FormInput
                          name="mobile"
                          label="Mobile"
                          type="text"
                          placeholder="Enter mobile"
                          containerClass="mb-3"
                          errors={errors}
                          control={control}
                        />
                      </Col>

                      <Col md={12}>
                        <FormInput
                          name="password"
                          label="Password"
                          type="password"
                          placeholder="Enter password"
                          containerClass="mb-3"
                          errors={errors}
                          control={control}
                        />
                      </Col>
                    </Row>
                    <div className="d-flex justify-content-center">
                      <Button variant="primary" type="submit" className="px-5">
                        {isLoading ? (
                          <Spinner animation="border" size="sm" />
                        ) : (
                          "Submit"
                        )}
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
