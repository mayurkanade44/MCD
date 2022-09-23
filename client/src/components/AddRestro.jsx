import { useState } from "react";
import InputRow from "./InputRow";
import Table from "./Table";
import { restroRegistration } from "../redux/restroSlice";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
  restroName: "",
  restroManger: "",
  restroEmail: "abc@xyz.com",
  auditList: [],
};

const singlePlace = {
  device: "",
  condition1: "",
  condition2: "",
  condition3: "",
  location: "",
};

const AddRestro = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [auditForm, setAuditForm] = useState(singlePlace);
  const { restroName, restroManger } = formValue;
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

  return (
    <div>
      <h4>Add New Place</h4>
      <form action="submit" onSubmit={addRestro}>
        <div className="row">
          <div className="col-md-6">
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
          <div className="col-md-6">
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
          <div className="col-md-5">
            <InputRow
              label="Device Name"
              type="text"
              name="device"
              value={auditForm.device}
              handleChange={handleAud}
              required={true}
              labelW="auto"
            />
          </div>
          <div className="col-md-5">
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
            <InputRow
              label="Condition 1"
              type="text"
              name="condition1"
              value={auditForm.condition1}
              handleChange={handleAud}
              labelW="auto"
            />
          </div>
          <div className="col-md-4">
            <InputRow
              label="Condition 2"
              type="text"
              name="condition2"
              value={auditForm.condition2}
              handleChange={handleAud}
              labelW="auto"
            />
          </div>
          <div className="col-md-4">
            <InputRow
              label="Condition 3"
              type="text"
              name="condition3"
              value={auditForm.condition3}
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
      </form>
    </div>
  );
};
export default AddRestro;
