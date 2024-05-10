export const getCompareCurrentTime = () => {
  const today = new Date();
  const hours = today.getHours().toString().padStart(2, "0");
  const minutes = today.getMinutes().toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const year = today.getFullYear();
  const outputDate = `${year}/${month}/${day} ${hours}:${minutes}`;

  return outputDate;
};

export const getCompareConvertDate = (value: number) => {
  const date = new Date(value * 1000);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  const outputDate = `${year}/${month}/${day} ${hours}:${minutes}`;

  return outputDate;
};
