import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import RadioSelect from "../components/RadioSelect";
import SelectInput from "../components/SelectInput";
import { uploadImage, postAudit, clearImage } from "../redux/auditSlice";
import { getRestroDetails } from "../redux/restroSlice";

const initialState = {
  device: "",
  condition1Option: "",
  condition2Option: "",
  condition3Option: "",
  location: "",
};

const Audit = () => {
  const { id } = useParams();
  const { loading, imageLink } = useSelector((store) => store.audit);
  const [formValue, setFormValue] = useState(initialState);
  const [img, setImg] = useState("");
  const [finalForm, setFinalForm] = useState({
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
      formValue.image = imageLink;
      if (formValue.condition2Name) {
        formValue.condition2Option =
          formValue.condition2Name + formValue.condition2Option;
      }
      finalForm.auditList.push(formValue);
      setFormValue(initialState);
      setQuestion(question + 1);
      clearImage();
    } else {
      formValue.image = imageLink;
      finalForm.auditList.push(formValue);
      finalForm.restroName = singleRestro.restroName;
      finalForm.restroManger = singleRestro.restroManger;
      finalForm.restroEmail = singleRestro.restroEmail;
      finalForm.restaurant = id;
      dispatch(postAudit(finalForm));
      clearImage();
    }
  };

  const handleImage = (e) => {
    const imageFile = e.target.files[0];
    const myForm = new FormData();
    myForm.append("image", imageFile);
    dispatch(uploadImage(myForm));
  };

  return (
    <div>
      <h1 className="text-center mt-3 mb-4 text-primary">MCD Audit Report</h1>
      <div className="row">
        {singleRestro && singleRestro.auditList && (
          <div>
            <div className="col-lg-12">
              <h4 className="text-center">
                {(formValue.device = singleRestro.auditList[question].device)}
              </h4>
            </div>
            <div className="col-md-6 my-2">
              {singleRestro.auditList[question].condition1Name && (
                <h6>{singleRestro.auditList[question].condition1Name}</h6>
              )}
              {singleRestro.auditList[question].condition1Option && (
                <SelectInput
                  type="text"
                  name="condition1Option"
                  value={formValue.condition1Option}
                  handleChange={handleChange}
                  required={true}
                  labelW=""
                  data={[
                    "Select",
                    ...singleRestro.auditList[question].condition1Option.split(
                      ","
                    ),
                  ]}
                />
              )}
            </div>
            <div className="col-md-6 my-2">
              {singleRestro.auditList[question].condition2Name && (
                <h6>{singleRestro.auditList[question].condition2Name}</h6>
              )}
              {singleRestro.auditList[question].condition2Option && (
                <SelectInput
                  type="text"
                  name="condition2Option"
                  value={formValue.condition2Option}
                  handleChange={handleChange}
                  required={true}
                  labelW=""
                  data={[
                    "Select",
                    ...singleRestro.auditList[question].condition2Option.split(
                      ","
                    ),
                  ]}
                />
              )}
            </div>
            <div className="col-md-6 my-2">
              {singleRestro.auditList[question].condition3Name && (
                <h6>{singleRestro.auditList[question].condition3Name}</h6>
              )}
              {singleRestro.auditList[question].condition3Option && (
                <SelectInput
                  type="text"
                  name="condition3Option"
                  value={formValue.condition3Option}
                  handleChange={handleChange}
                  required={true}
                  labelW=""
                  data={[
                    "Select",
                    ...singleRestro.auditList[question].condition3Option.split(
                      ","
                    ),
                  ]}
                />
              )}
            </div>
            {/* <div className="col-md-6 my-2">
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
            </div> */}

            {singleRestro.auditList[question].location && (
              <div className="col-md-6 my-2">
                Location - {singleRestro.auditList[question].location}
              </div>
            )}
            <div className="col-md-6 my-2">
              <input type="file" accept="image/*" onChange={handleImage} />
            </div>
            <button className="btn btn-success btn-sm my-2" onClick={next}>
              {question === singleRestro.auditList.length - 1 ? "Save" : "Next"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Audit;
