const RadioSelect = ({ cond, name, handleChange, value }) => {
  return (
    <div className="form-check form-check-inline">
      <input
        className="form-check-input"
        type="radio"
        name={name}
        value={cond}
        onChange={handleChange}
      />
      <label className="form-check-label" htmlFor="inlineRadio1">
        {cond}
      </label>
    </div>
  );
};
export default RadioSelect;
