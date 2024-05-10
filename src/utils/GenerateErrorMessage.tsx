export const generateErrorMessage = (action: string, obj: string) =>
  `Failed to ${action} ${obj}. Please try again later.`;

export const generateSuccessMessage = (action: string, obj: string) =>
  `${obj} ${action} successfully!`;
