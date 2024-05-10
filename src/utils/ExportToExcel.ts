import { TableColumnsType } from "antd";
import { ColumnGroupType, ColumnsType, ColumnType } from "antd/es/table";
import * as XLSX from "xlsx";
import { IScore } from "../interfaces/score.interface";
import { IStudent } from "../interfaces/student.interface";
import { IReservedStudent } from "../interfaces/reserved-student.interface";
import { IUser } from "../interfaces/user.interface";
import { IModuleAssignmentScore } from "../interfaces/module-assignment-score.interface";
import { IAssignmentScore } from "../interfaces/assignment-score.interface";
import { IStudentClass } from "../interfaces/student-class.interface";

export const exportStudentToExcel = (
  columns: TableColumnsType<IStudent>,
  data: IStudent[]
): boolean => {
  console.log(data);
  // get header without setting column
  const extractedHeader = [...columns.slice(0, -1)];
  // get key of header with type string
  const header = extractedHeader.map((col) => col.key as string);
  const fileExtension = ".xlsx";
  // get data from props data with key of header
  const extractedData = data.map((item: IStudent) =>
    extractedHeader.map((col) => {
      if (item[col.key as keyof IStudent] === -1) {
        return "-" as string;
      }
      return item[col.key as keyof IStudent] ?? "";
    })
  );

  const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([]);
  XLSX.utils.sheet_add_aoa(ws, [header, ...extractedData], { origin: "A1" });
  // set default width of each column
  ws["!cols"] = Array(extractedHeader.length).fill({ wch: 18 });
  // create the workbook with a single sheet named 'data'
  const wb: XLSX.WorkBook = { Sheets: { data: ws }, SheetNames: ["data"] };
  // save to file
  XLSX.writeFile(wb, `StudentsList${fileExtension}`);
  return true;
};
export const exportStudentClassToExcel = (
  columns: TableColumnsType<IStudentClass>,
  data: IStudentClass[]
): boolean => {
  console.log(data);
  // get header without setting column
  const extractedHeader = [...columns.slice(0, -1)];
  // get key of header with type string
  const header = extractedHeader.map((col) => col.key as string);
  const fileExtension = ".xlsx";
  // get data from props data with key of header
  const extractedData = data.map((item: IStudentClass) =>
    extractedHeader.map((col) => {
      if (item[col.key as keyof IStudentClass] === -1) {
        return "-" as string;
      }
      if ((col.key as keyof IStudentClass) === "Status") {
        if (item[col.key as keyof IStudentClass] === -1) {
          return "NOT YET";
        }
        return item[col.key as keyof IStudentClass] === 0 ? "FAIL" : "PASS";
      }
      return item[col.key as keyof IStudentClass] ?? "";
    })
  );

  const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([]);
  XLSX.utils.sheet_add_aoa(ws, [header, ...extractedData], { origin: "A1" });
  // set default width of each column
  ws["!cols"] = Array(extractedHeader.length).fill({ wch: 18 });
  // create the workbook with a single sheet named 'data'
  const wb: XLSX.WorkBook = { Sheets: { data: ws }, SheetNames: ["data"] };
  // save to file
  XLSX.writeFile(wb, `StudentCLassList${fileExtension}`);
  return true;
};
export const exportScoreToExcel = (
  columns: TableColumnsType<IScore>,
  data: IScore[]
) => {
  console.log(typeof columns, columns);

  // function to get all header of table
  const extractHeader = (
    col:
      | ColumnsType<IScore>
      | ColumnGroupType<IScore>
      | TableColumnsType<IScore>
      | ColumnType<IScore>
  ): string | string[] | NonNullable<unknown> => {
    if ((col as ColumnGroupType<IScore>).children) {
      return (col as ColumnGroupType<IScore>).children.map((child) =>
        extractHeader(child)
      );
    }
    return (col as ColumnType<IScore>).key as string;
  };

  const extractedHeader = columns.slice(0, -1).map((col) => extractHeader(col));
  console.log(extractedHeader);
  console.log(data);

  const fileExtension = ".xlsx";
  let indexModule = 0;
  const extractedData = data.map((item: IScore) =>
    extractedHeader.flatMap(
      (col: string | string[] | unknown): (string | number)[] | string => {
        const scores = item.Scores as IModuleAssignmentScore[];
        let indexAssignment = 0;
        const lengthModule = item.Scores.length;
        if (Array.isArray(col)) {
          const lengthAssignment = col.length;
          if (indexModule === lengthModule) indexModule = 0;
          const module = scores[indexModule]
            .AssignmentScore as IAssignmentScore[];
          if (indexAssignment === lengthAssignment) indexAssignment = 0;
          indexAssignment += 1;
          indexModule += 1;
          return col.map((child) => {
            const assignment = module.find((el) => el.AssignmentName === child);
            if (assignment?.AssignmentName.includes("Status")) {
              if (assignment.ScoreValue === -1) return "NOT YET";
              return assignment.ScoreValue !== 0 ? "PASS" : "FAIL";
            }
            return (
              (assignment?.ScoreValue && assignment?.ScoreValue === -1
                ? ("-" as string)
                : assignment?.ScoreValue) ?? ""
            );
          });
        }
        if (col === "StudentName")
          return (scores[0].StudentName ?? "") as string;
        return (
          (item[col as keyof IScore] && item[col as keyof IScore] === -1
            ? ("-" as string)
            : (item[col as keyof IScore] as string)) ?? ""
        );
      }
    )
  );

  const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([]);

  XLSX.utils.sheet_add_aoa(ws, [extractedHeader.flat(), ...extractedData], {
    origin: "A1",
  });

  const wb: XLSX.WorkBook = { Sheets: { data: ws }, SheetNames: ["data"] };
  XLSX.writeFile(wb, `ScoresList${fileExtension}`);

  return true;
};

export const exportReserveStudentToExcel = (
  columns: TableColumnsType<IReservedStudent>,
  data: IReservedStudent[]
): boolean => {
  // get header without setting column
  const extractedHeader = [...columns.slice(0, -1)];
  // get key of header with type string
  const header = extractedHeader.map((col) => col.key as string);
  const fileExtension = ".xlsx";
  // get data from props data with key of header
  const extractedData = data.map((item: IReservedStudent) =>
    extractedHeader.map((col) => {
      if (col.key === "Gender" && item[col.key as keyof IReservedStudent]) {
        return "Male";
      }
      if (col.key === "Gender" && !item[col.key as keyof IReservedStudent]) {
        return "Female";
      }
      return item[col.key as keyof IReservedStudent] ?? "";
    })
  );

  const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([]);
  XLSX.utils.sheet_add_aoa(ws, [header, ...extractedData], { origin: "A1" });
  // set default width of each column
  ws["!cols"] = Array(extractedHeader.length).fill({ wch: 18 });
  // create the workbook with a single sheet named 'data'
  const wb: XLSX.WorkBook = { Sheets: { data: ws }, SheetNames: ["data"] };
  // save to file
  XLSX.writeFile(wb, `StudentsReserveList${fileExtension}`);
  return true;
};

export const exportUserToExcel = (
  columns: TableColumnsType<IUser>,
  data: IUser[]
): boolean => {
  // get header without setting column
  const extractedHeader = [...columns.slice(0, -1)];
  // get key of header with type string
  const header = extractedHeader.map((col) => col.key as string);
  const fileExtension = ".xlsx";
  // get data from props data with key of header
  const extractedData = data.map((item: IUser) =>
    extractedHeader.map((col) => {
      if (col.key === "Gender" && item[col.key as keyof IUser]) {
        return "Male";
      }
      if (col.key === "Gender" && !item[col.key as keyof IUser]) {
        return "Female";
      }
      return item[col.key as keyof IUser] ?? "";
    })
  );

  const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([]);
  XLSX.utils.sheet_add_aoa(ws, [header, ...extractedData], { origin: "A1" });
  // set default width of each column
  ws["!cols"] = Array(extractedHeader.length).fill({ wch: 18 });
  // create the workbook with a single sheet named 'data'
  const wb: XLSX.WorkBook = { Sheets: { data: ws }, SheetNames: ["data"] };
  // save to file
  XLSX.writeFile(wb, `UsersList${fileExtension}`);
  return true;
};
