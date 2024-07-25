/* eslint-disable react/prop-types */
import { Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { Controller } from "react-hook-form";

const FormInput = ({
  name,
  label,
  type = "text",
  placeholder,
  containerClass = "",
  control,
  errors,
  data,
  required,
  labelColor = "",
  defaultValues,
}) => {
  const comp =
    type === "textarea" ? "textarea" : type === "select" ? "select" : "input";

  switch (type) {
    case "password":
    case "text":
    case "date":
    case "number":
      return (
        <FormGroup className={containerClass}>
          <FormLabel className={labelColor}>
            {label} {required && <span className="text-danger">*</span>}
          </FormLabel>
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <FormControl
                {...field}
                type={type}
                placeholder={placeholder}
                isInvalid={!!errors[name]}
                as={comp}
                defaultValues={defaultValues}
              />
            )}
          />
          {errors[name] && (
            <Form.Control.Feedback type="invalid">
              {errors[name].message}
            </Form.Control.Feedback>
          )}
        </FormGroup>
      );
    case "select":
      return (
        <FormGroup className={containerClass}>
          <FormLabel className={labelColor}>
            {label} {required && <span className="text-danger">*</span>}
          </FormLabel>
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <Form.Select
                {...field}
                className={`form-control ${errors[name] ? "is-invalid" : ""}`}
                aria-label={`Select ${label.toLowerCase()}`}
                required={required}
                as={comp}
                isInvalid={!!errors[name]}
              >
                <option value="">Select {label.toLowerCase()}</option>
                {data &&
                  data.map((member) => (
                    <option key={member._id} value={member._id}>
                      {member.name}
                    </option>
                  ))}
              </Form.Select>
            )}
          />
          {errors[name] && (
            <Form.Control.Feedback type="invalid">
              {errors[name].message}
            </Form.Control.Feedback>
          )}
        </FormGroup>
      );
    default:
      return null;
  }
};

export default FormInput;
