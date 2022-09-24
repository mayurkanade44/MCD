import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import RadioSelect from "../components/RadioSelect";
import { getRestroDetails } from "../redux/restroSlice";

const initialState = {
  device: "",
  condition1: "",
  condition2: "",
  condition3: "",
  location: "",
};

const Audit = () => {
  const { id } = useParams();
  const [formValue, setFormValue] = useState(initialState);
  const [finalForm, setFinalForm] = useState({
    restroName: "",
    restroManger: "",
    restroEmail: "abc@xyz.com",
    auditList: [],
  });
  const [question, setQuestion] = useState(0);
  const dispatch = useDispatch();
  const { singleRestro } = useSelector((store) => store.restaurant);

  useEffect(() => {
    dispatch(getRestroDetails(id));
    // eslint-disable-next-line
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const next = () => {
    if (question < singleRestro.auditList.length - 1) {
      setQuestion(question + 1);
      finalForm.auditList.push(formValue);
      setFormValue(initialState);
    } else {
      finalForm.auditList.push(formValue);
      console.log(finalForm);
    }
  };

  return (
    <div>
      <h1 className="text-center mt-3 mb-4 text-primary">MCD Audit Report</h1>
      <div className="row">
        {/* {singleRestro &&
          singleRestro.auditList &&
          singleRestro.auditList.map((item, index) => {
            return (
              <div key={index}>
                <div className="col-lg-12">
                  <h5>
                    {index + 1}. {item.device}
                  </h5>
                </div>
                <div className="col-md-6">
                  {item.condition1 &&
                    item.condition1
                      .split(",")
                      .map((cond, index) => (
                        <RadioSelect
                          cond={cond}
                          key={index}
                          name="condition1"
                          handleChange={handleChange}
                        />
                      ))}
                </div>
                <div className="col-md-6">
                  {item.condition2 &&
                    item.condition2
                      .split(",")
                      .map((cond, index) => (
                        <RadioSelect cond={cond} key={index} />
                      ))}
                </div>
                <div className="col-md-6">
                  {item.condition3 &&
                    item.condition3
                      .split(",")
                      .map((cond, index) => (
                        <RadioSelect cond={cond} key={index} />
                      ))}
                </div>
                {item.location && (
                  <div className="col-md-6">Location - {item.location}</div>
                )}
                <button className="btn btn-success btn-sm" onClick={next}>
                  Next
                </button>
              </div>
            );
          })} */}
        {singleRestro && singleRestro.auditList && (
          <div>
            <div className="col-lg-12">
              <h5>{singleRestro.auditList[question].device}</h5>
            </div>
            <div className="col-md-6">
              {singleRestro.auditList[question].condition1 &&
                singleRestro.auditList[question].condition1
                  .split(",")
                  .map((cond, index) => (
                    <RadioSelect
                      cond={cond}
                      key={index}
                      name="condition1"
                      value={formValue.condition1}
                      handleChange={handleChange}
                    />
                  ))}
            </div>
            <div className="col-md-6">
              {singleRestro.auditList[question].condition2 &&
                singleRestro.auditList[question].condition2
                  .split(",")
                  .map((cond, index) => (
                    <RadioSelect
                      cond={cond}
                      key={index}
                      name="condition2"
                      handleChange={handleChange}
                    />
                  ))}
            </div>
            <div className="col-md-6">
              {singleRestro.auditList[question].condition3 &&
                singleRestro.auditList[question].condition3
                  .split(",")
                  .map((cond, index) => (
                    <RadioSelect
                      cond={cond}
                      key={index}
                      name="condition3"
                      handleChange={handleChange}
                    />
                  ))}
            </div>
            {singleRestro.auditList[question].location && (
              <div className="col-md-6">
                Location - {singleRestro.auditList[question].location}
              </div>
            )}
            <button className="btn btn-success btn-sm" onClick={next}>
              {question === singleRestro.auditList.length - 1 ? "Save" : "Next"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Audit;
