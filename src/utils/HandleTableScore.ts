const HandleTableScore = (moduleScores: string[]) => {
  const tableScore = `<table style="justify-content: center; display: flex; border-collapse: collapse;">
 ${
   moduleScores.includes("Quiz Module")
     ? `<tr>
    <th rowspan="6" style="background-color: rgb(241, 238, 66); padding: 5px; border: 1px solid black;">Quiz Module</th>
    <th style="padding: 5px; border: 1px solid black;">Quiz 1</th>
    <td style="padding: 5px; border: 1px solid black;">%Quiz 1%</td>
  </tr>
  <tr>
    <th style="padding: 5px; border: 1px solid black;">Quiz 2</th>
    <td style="padding: 5px; border: 1px solid black;">%Quiz 2%</td>
  </tr>
  <tr>
    <th style="padding: 5px; border: 1px solid black;">Quiz 3</th>
    <td style="padding: 5px; border: 1px solid black;">%Quiz 3%</td>
  </tr>
  <tr>
    <th style="padding: 5px; border: 1px solid black;">Quiz 4</th>
    <td style="padding: 5px; border: 1px solid black;">%Quiz 4%</td>
  </tr>
  <tr>
    <th style="padding: 5px; border: 1px solid black;">Quiz 5</th>
    <td style="padding: 5px; border: 1px solid black;">%Quiz 5%</td>
  </tr>
  <tr>
    <th style="padding: 5px; border: 1px solid black;">Average Quiz</th>
    <td style="padding: 5px; border: 1px solid black;">%Quiz Avg%</td>
  </tr>`
     : ``
 }
  ${
    moduleScores.includes("Assignment Module")
      ? `<tr>
    <th rowspan="4" style="background-color: rgb(241, 238, 66); padding: 5px; border: 1px solid black;">Practice Module</th>
    <th style="padding: 5px; border: 1px solid black;">Practice 1</th>
    <td style="padding: 5px; border: 1px solid black;">%Practice 1%</td>
  </tr>
  <tr>
    <th style="padding: 5px; border: 1px solid black;">Practice 2</th>
    <td style="padding: 5px; border: 1px solid black;">%Practice 2%</td>
  </tr>
  <tr>
    <th style="padding: 5px; border: 1px solid black;">Practice 3</th>
    <td style="padding: 5px; border: 1px solid black;">%Practice 3%</td>
  </tr>
  <tr>
    <th style="padding: 5px; border: 1px solid black;">Average Practice</th>
    <td style="padding: 5px; border: 1px solid black;">%ASM Avg%</td>
  </tr>`
      : ``
  }
 ${
   moduleScores.includes("Mock Module")
     ? `<tr>
  <th rowspan="5" style="background-color: rgb(241, 238, 66); padding: 5px; border: 1px solid black;">Mock Module</th>
  <th style="padding: 5px; border: 1px solid black;">Mock</th>
  <td style="padding: 5px; border: 1px solid black;">%Mock%</td>
</tr>
<tr>
  <th style="padding: 5px; border: 1px solid black;">Final Module</th>
  <td style="padding: 5px; border: 1px solid black;">%Mock Final Module%</td>
</tr>
<tr>
  <th style="padding: 5px; border: 1px solid black;">GPA Module</th>
  <td style="padding: 5px; border: 1px solid black;">%Mock GPA Module%</td>
</tr>
<tr>
  <th style="padding: 5px; border: 1px solid black;">Level Module</th>
  <td style="padding: 5px; border: 1px solid black;">%Mock Level Module%</td>
</tr>
<tr>
  <th style="padding: 5px; border: 1px solid black;">Status</th>
  <td style="padding: 5px; border: 1px solid black;">%Mock Status%</td>
</tr>`
     : ``
 }
${
  moduleScores.includes("Quiz Final")
    ? `<tr>
<th colspan="2" style="background-color: rgb(241, 238, 66); padding: 5px; border: 1px solid black;">Quiz Final</th>
<td style="padding: 5px; border: 1px solid black;">%Quiz%</td>
</tr>`
    : ``
}
${
  moduleScores.includes("Audit")
    ? `<tr>
<th colspan="2" style="background-color: rgb(241, 238, 66); padding: 5px; border: 1px solid black;">Audit</th>
<td style="padding: 5px; border: 1px solid black;">%Audit%</td>
</tr>`
    : ``
}
${
  moduleScores.includes("Practice Final")
    ? `<tr>
<th colspan="2" style="background-color: rgb(241, 238, 66); padding: 5px; border: 1px solid black;">Practice Final</th>
<td style="padding: 5px; border: 1px solid black;">%Practice Final%</td>
</tr>`
    : ``
}
${
  moduleScores.includes("Final Module")
    ? `<tr>
<th colspan="2" style="background-color: rgb(241, 238, 66); padding: 5px; border: 1px solid black;">Final Module</th>
<td style="padding: 5px; border: 1px solid black;">%Final Module%</td>
</tr>`
    : ``
}
${
  moduleScores.includes("GPA Module")
    ? `<tr>
<th colspan="2" style="background-color: rgb(241, 238, 66); padding: 5px; border: 1px solid black;">GPA Module</th>
<td style="padding: 5px; border: 1px solid black;">%GPA Module%</td>
</tr>`
    : ``
}
${
  moduleScores.includes("Level Module")
    ? `<tr>
<th colspan="2" style="background-color: rgb(241, 238, 66); padding: 5px; border: 1px solid black;">Level Module</th>
<td style="padding: 5px; border: 1px solid black;">%Level Module%</td>
</tr>`
    : ``
}
${
  moduleScores.includes("Status")
    ? `<tr>
<th colspan="2" style="background-color: rgb(241, 238, 66); padding: 5px; border: 1px solid black;">Status</th>
<td style="padding: 5px; border: 1px solid black;">%Final Status%</td>
</tr>`
    : ``
}
</table>`;
  return tableScore;
};
export default HandleTableScore;
