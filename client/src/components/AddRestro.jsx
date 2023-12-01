import { useState } from "react";
import InputRow from "./InputRow";
import Table from "./Table";
import { restroRegistration } from "../redux/restroSlice";
import { useDispatch, useSelector } from "react-redux";
import SelectInput from "./SelectInput";

const initialState = {
  restroName: "",
  restroManger: "",
  restroEmail: "",
  auditList: [],
};

const singlePlace = {
  device: "",
  type: "",
  condition1Name: "",
  condition1Option: "",
  condition2Name: "",
  condition2Option: "",
  condition3Name: "",
  condition3Option: "",
  location: "",
};

const AddRestro = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [auditForm, setAuditForm] = useState(singlePlace);
  const { restroName, restroManger, restroEmail } = formValue;
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleAud = (e) => {
    const { name, value } = e.target;
    setAuditForm({ ...auditForm, [name]: value });
  }; 

  const addAudit = (e) => {
    e.preventDefault();
    formValue.auditList.push(auditForm);
    setAuditForm(singlePlace);
  };

  const addRestro = (e) => {
    e.preventDefault();
    dispatch(restroRegistration(formValue));
    setFormValue(initialState);
  };

  const type = ["Select", "Hygiene", "Device", "Rodent Access Point"];

  return (
    <div>
      <h4>Add New Place</h4>
      <div>
        <div className="row">
          <div className="col-md-4">
            <InputRow
              label="Place Name"
              type="text"
              placeholder="Please provide place name"
              name="restroName"
              value={restroName}
              handleChange={handleChange}
              required={true}
              labelW="auto"
            />
          </div>
          <div className="col-md-4">
            <InputRow
              label="Manager Name"
              type="text"
              placeholder="Please provide manager name"
              name="restroManger"
              value={restroManger}
              handleChange={handleChange}
              required={true}
              labelW="auto"
            />
          </div>
          <div className="col-md-4">
            <InputRow
              label="Manager Email"
              type="text"
              placeholder="Please provide manager email"
              name="restroEmail"
              value={restroEmail}
              handleChange={handleChange}
              required={true}
              labelW="auto"
            />
          </div>
          <hr className="mt-2" />
          <div className="col-md-4">
            <InputRow
              label="Name"
              type="text"
              name="device"
              value={auditForm.device}
              handleChange={handleAud}
              required={true}
              labelW="auto"
            />
          </div>
          <div className="col-md-4">
            <InputRow
              label="Location"
              type="text"
              name="location"
              value={auditForm.location}
              handleChange={handleAud}
              labelW="auto"
            />
          </div>
          <div className="col-md-4">
            <SelectInput
              label="Type:"
              type="text"
              name="type"
              value={auditForm.type}
              handleChange={handleAud}
              required={true}
              labelW="2"
              data={type}
            />
          </div>
          <div className="col-md-6">
            <InputRow
              label={`Condition 1 Name`}
              type="text"
              name="condition1Name"
              value={auditForm.condition1Name}
              handleChange={handleAud}
              labelW="auto"
            />
          </div>
          <div className="col-md-6">
            <InputRow
              label="Condition 1 Option"
              type="text"
              name="condition1Option"
              value={auditForm.condition1Option}
              handleChange={handleAud}
              labelW="auto"
            />
          </div>
          <div className="col-md-6">
            <InputRow
              label="Condition 2 Name"
              type="text"
              name="condition2Name"
              value={auditForm.condition2Name}
              handleChange={handleAud}
              labelW="auto"
            />
          </div>
          <div className="col-md-6">
            <InputRow
              label="Condition 2 Option"
              type="text"
              name="condition2Option"
              value={auditForm.condition2Option}
              handleChange={handleAud}
              labelW="auto"
            />
          </div>
          <div className="col-md-6">
            <InputRow
              label="Condition 3 Name"
              type="text"
              name="condition3Name"
              value={auditForm.condition3Name}
              handleChange={handleAud}
              labelW="auto"
            />
          </div>
          <div className="col-md-6">
            <InputRow
              label="Condition 3 Option"
              type="text"
              name="condition3Option"
              value={auditForm.condition3Option}
              handleChange={handleAud}
              labelW="auto"
            />
          </div>
          <button className="btn btn-primary" onClick={addAudit}>
            Add
          </button>
        </div>
        <Table data={formValue.auditList} />
        <button className="btn btn-primary" onClick={addRestro}>
          Save Place
        </button>
      </div>
    </div>
  );
};
export default AddRestro;
