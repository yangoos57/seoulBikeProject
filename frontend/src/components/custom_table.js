import React, { useMemo } from "react";
import { useTable } from "react-table";

// function react_table(raw_data) {
function Custom_table({ raw_data }) {
  console.clear();

  // json 양식을 react-table 양식으로 변환하는 작업

  // object 값을 array로 변경하는 함수
  const test_array = [];
  Object.keys(raw_data).forEach((name) => {
    test_array.push(Object.keys(raw_data[name]).map((key) => raw_data[name][key]));
  });
  console.log("test_array : ", test_array);

  // Transpose하는 함수라고 보면 된다.
  // 아직 실력이 안되서 아래 asd는 수정하지 못했다.
  // 나중에 테이블 쓸 일 있으면 수정해서 쓰자.

  //데이터 생성
  const obj_result = [];
  for (let num = 0; num < test_array[0].length; num++) {
    let asd = {};
    asd["col0"] = test_array[0][num];
    asd["col1"] = test_array[1][num];
    obj_result.push(asd);
  }

  // column 생성
  const columnData = [];
  Object.keys(raw_data).forEach((name, index) =>
    columnData.push({ Header: name, accessor: "col" + index })
  );

  const columns = useMemo(() => columnData, []);
  const data = obj_result;

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <div>
      <table
        {...getTableProps()}
        className="table table-striped text-center"
        style={{ fontSize: 10 }}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Custom_table;
