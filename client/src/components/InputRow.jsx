const InputRow = ({
  label,
  type,
  value,
  name,
  handleChange,
  placeholder,
  required,
  labelW,
}) => {
  return (
    <div className="row align-items-center my-2">
      <div className={`col-${labelW}`}>
        <label className="col-form-label">
          <h5>{label} :</h5>
        </label>
      </div>
      <div className="col" style={{padding:0}}>
        <input
          className="form-control"
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={handleChange}
          required={required}
          style={{height:33}}
        />
      </div>
    </div>
  );
};
export default InputRow;
