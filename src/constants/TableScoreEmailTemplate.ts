const EmailScoreTableTemplate = ` <style>
table {
  justify-content: center;
  display: flex;
  border-collapse: collapse;
}
th {
  background-color: rgb(241, 238, 66);
}
th,
tr {
  padding: 5px;
  border: 1px solid black;
}
</style>
<table>
<tr>
  <th rowspan="7">Quiz Module</th>
  <th>Quiz 1</th>
  <td>%Quiz_1%</td>
</tr>
<tr>
  <th>Quiz 2</th>
  <td>%Quiz_2%</td>
</tr>
<tr>
  <th>Quiz 3</th>
  <td>%Quiz_3%</td>
</tr>
<tr>
  <th>Quiz 4</th>
  <td>%Quiz_4%</td>
</tr>
<tr>
  <th>Quiz 5</th>
  <td>%Quiz_5%</td>
</tr>
<tr>
  <th>Quiz 6</th>
  <td>%Quiz_6%</td>
</tr>
<tr>
  <th>Average Quiz</th>
  <td>%AvgQuiz%</td>
</tr>
<tr>
  <th rowspan="4">Practice Module</th>
  <th>Practice 1</th>
  <td>%Practice_1%</td>
</tr>
<tr>
  <th>Practice 2</th>
  <td>%Practice_2%</td>
</tr>
<tr>
  <th>Practice 3</th>
  <td>%Practice_3%</td>
</tr>
<tr>
  <th>Average Practice</th>
  <td>%AvgPractice%</td>
</tr>

<tr>
  <th rowspan="7">Mock Module</th>
  <th>Quiz Final</th>
  <td>%QuizFinalMock%</td>
</tr>
<tr>
  <th>Audit</th>
  <td>%AuditMock%</td>
</tr>
<tr>
  <th>Practice Final</th>
  <td>%PracticeFinalMock%</td>
</tr>
<tr>
  <th>Final Module</th>
  <td>%FinalModuleMock%</td>
</tr>
<tr>
  <th>GPA Module</th>
  <td>%GPAModuleMock%</td>
</tr>
<tr>
  <th>Level Module</th>
  <td>%LevelModuleMock%</td>
</tr>
<tr>
  <th>Status</th>
  <td>%StatusMock%</td>
</tr>
<tr>
  <th colspan="2">Mock</th>
  <td>%Mock%</td>
</tr>
<tr>
  <th colspan="2">Final Module</th>
  <td>%FinalModule%</td>
</tr>
<tr>
  <th colspan="2">GPA Module</th>
  <td>%GPAModule%</td>
</tr>
<tr>
  <th colspan="2">Level Module</th>
  <td>%LevelModule%</td>
</tr>
<tr>
  <th colspan="2">Status</th>
  <td>%Status%</td>
</tr>
</table>`;
export default EmailScoreTableTemplate;
