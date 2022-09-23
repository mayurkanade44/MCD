const RadioSelect = ({ cond }) => {
  return (
    <div className="form-check form-check-inline">
      <input
        className="form-check-input"
        type="checkbox"
        id="inlineCheckbox1"
        value={cond}
      />
      <label className="form-check-label">{cond}</label>
    </div>
  );
};
export default RadioSelect;
