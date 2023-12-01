const SelectInput = ({
  label,
  data,
  name,
  value,
  id,
  width,
  labelW,
  handleChange,
}) => {
  return (
    <div className="row mt-3">
      <div className={`col-${labelW}`}>
        <h5>{label}</h5>
      </div>
      <div className="col-md-8 mt-0">
        <select
          className="form-select"
          aria-label="Default select example"
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
          style={{ width: width }}
        >
          {data.map((data) => {
            return (
              <option value={data} key={data}>
                {data}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};
export default SelectInput;
