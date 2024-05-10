export const getCourseStatus = (
  status: number | boolean | undefined
): string => {
  if (status === true || status === 1) {
    return "Passed";
  }
  if (status === false || status === 0) {
    return "Failed";
  }
  return "-";
};

export const getUserStatus = (status: boolean | undefined): string => {
  if (status === true) {
    return "Active";
  }
  if (status === false) {
    return "Inactive";
  }
  return "-";
};
