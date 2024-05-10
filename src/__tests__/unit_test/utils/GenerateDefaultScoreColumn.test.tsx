import generateDefaultScoreColumn from "../../../utils/GenerateDefaultScoreColumn";

describe("generateDefaultScoreColumn function", () => {
  it("returns columns for IScore when isStudentScore is false", () => {
    const isStudentScore = false;
    const columns = generateDefaultScoreColumn(isStudentScore);

    expect(columns).toHaveLength(1);
    expect(columns[0]).toHaveProperty("title", "Student ID");
  });

  it("returns columns for IStudentScore when isStudentScore is true", () => {
    const isStudentScore = true;
    const columns = generateDefaultScoreColumn(isStudentScore);

    expect(columns).toHaveLength(1);
    expect(columns[0]).toHaveProperty("title", "Class ID");
  });
});
