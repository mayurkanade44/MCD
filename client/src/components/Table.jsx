const Table = ({ data }) => {
  return (
    <table className="table table-bordered my-3">
      <thead>
        <tr>
          <th>Number</th>
          <th>Location</th>
          <th>Condition 1</th>
          <th>Condition 2</th>
          <th>Condition 3</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          return (
            <tr>
              <th>{item.device}</th>
              <td>{item.location}</td>
              <td>{item.condition1}</td>
              <td>{item.condition2}</td>
              <td>{item.condition3}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
export default Table;
