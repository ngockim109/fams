export const handleStringShown = (text: string) =>
  text === null || text === undefined || text === "" ? "-" : text;

export const handleNumberShown = (num: number) =>
  num === null || num === undefined || num < 0 ? (
    <div className="centered">-</div>
  ) : (
    num
  );

// The function handlePascalCaseAndBackspace takes a string input and returns a modified version of it,
// where consecutive uppercase letters are separated by spaces.
export const handlePascalCaseAndBackspace = (input: string): string => {
  let output = "";
  let prevCharIsUppercase = false;

  for (let i = 0; i < input?.length; i += 1) {
    const currentChar = input[i];
    const nextChar = input[i + 1];

    if (
      currentChar === nextChar?.toUpperCase() &&
      currentChar === currentChar.toUpperCase()
    ) {
      output += `${currentChar} `;
      prevCharIsUppercase = true;
    } else if (
      prevCharIsUppercase &&
      currentChar === currentChar.toUpperCase()
    ) {
      output += ` ${currentChar}`;
      prevCharIsUppercase = true;
    } else if (i === 0) {
      output += currentChar.toUpperCase();
      prevCharIsUppercase = currentChar === currentChar.toUpperCase();
    } else {
      output += currentChar;
      prevCharIsUppercase = currentChar === currentChar.toUpperCase();
    }
  }

  return output;
};

export const handleFirstLetterUpperCaseAndBackspace = (
  input: string
): string => {
  let output = "";

  for (let i = 0; i < input?.length; i += 1) {
    if (i > 0 && input[i] === input[i].toUpperCase()) {
      output += " ";
    }
    output += input[i].toLowerCase();
  }
  output = output.charAt(0).toUpperCase() + output.slice(1);
  return output;
};
