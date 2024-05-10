/** This component is designed to display a status tag based on a boolean status value.
 * It supports all states
 * Additionally, it allows customization of width through the optional prop 'customWidth'.
 * Usage:
 * <StatusTag status={boolean|string|null} content={string} customWidth="optionalCustomWidth" />
 * content = "-" (for default value).
 */

import React from "react";
import FontWeights from "../../../constants/FontWeight";
import Colors from "../../../constants/Colors";
import Sizes from "../../../constants/Sizes";
import SizesResponsive from "../../../constants/SizesResponsive";

interface StatusProps {
  status: number | boolean | string | null;
  content?: string;
  customWidth?: string; // Prop for custom width
  isBorder?: boolean;
}

const StatusTag: React.FC<StatusProps> = ({
  status,
  content,
  customWidth,
  isBorder,
}) => {
  let backgroundColor: string | undefined;
  let fontWeight: number;
  let textColor: string;
  let border: string | undefined;

  switch (status) {
    // For Status tag
    case true:
    case 1:
    case "Active":
    case "Passed":
    case "Done":
    case "Excellent":
    case "Received":
    case "Finish":
      backgroundColor = Colors.DarkGreen;
      fontWeight = FontWeights.SemiBold;
      textColor = Colors.LightWhite;
      break;
    case false:
    case 0:
    case "Not passed":
    case "Fail":
      backgroundColor = Colors.Red;
      fontWeight = FontWeights.SemiBold;
      textColor = Colors.LightWhite;
      break;

    case "Inactive":
      backgroundColor = Colors.Fourth;
      fontWeight = FontWeights.Normal;
      textColor = Colors.LightWhite;
      break;

    case "Disable":
    case "Not yet":
      backgroundColor = Colors.SlateGray;
      fontWeight = FontWeights.Normal;
      textColor = Colors.LightWhite;
      break;

    case "In class":
    case "Score":
      backgroundColor = Colors.LightGreen;
      fontWeight = FontWeights.Normal;
      textColor = Colors.LightWhite;
      break;

    case "Reserve":
    case "Reservation":
    case "Waiting":
    case "Average":
    case "Is suspended":
      backgroundColor = Colors.Yellow;
      fontWeight = FontWeights.Normal;
      textColor = Colors.LightWhite;
      break;

    case "Drop out":
      backgroundColor = Colors.BrightRed;
      fontWeight = FontWeights.Normal;
      textColor = Colors.LightWhite;
      break;

    case "Opening":
      backgroundColor = Colors.LightGreen;
      fontWeight = FontWeights.Medium;
      textColor = Colors.LightWhite;
      break;

    case "Planning":
      backgroundColor = Colors.LightDark;
      fontWeight = FontWeights.Medium;
      textColor = Colors.LightWhite;
      break;

    case "Scheduled":
      backgroundColor = Colors.Yellow;
      fontWeight = FontWeights.Medium;
      textColor = Colors.LightWhite;
      border = Colors.LightWhite;
      break;

    case "Completed":
      backgroundColor = Colors.Red;
      fontWeight = FontWeights.Medium;
      textColor = Colors.LightWhite;
      border = Colors.LightWhite;
      break;

    case "Closed":
    case "Poor":
    case "Remind":
      backgroundColor = Colors.LightOrange;
      fontWeight = FontWeights.Medium;
      textColor = Colors.LightWhite;
      border = Colors.LightWhite;
      break;

    // For User tag
    case "Admin":
      backgroundColor = Colors.LimeGreen;
      fontWeight = FontWeights.Medium;
      textColor = Colors.LightWhite;
      break;

    case "Trainer":
    case "Other":
      backgroundColor = Colors.Third;
      fontWeight = FontWeights.Medium;
      textColor = Colors.LightWhite;
      break;

    case "Good":
    case "Inform":
    case "Student":
      backgroundColor = Colors.LightBlue;
      fontWeight = FontWeights.Medium;
      textColor = Colors.LightWhite;
      break;

    case "Very good":
      backgroundColor = Colors.Blue;
      fontWeight = FontWeights.Medium;
      textColor = Colors.LightWhite;
      break;

    default:
      backgroundColor = undefined;
      fontWeight = FontWeights.SemiBold;
      textColor = Colors.Black;
      border = `1px solid ${Colors.Black}`;
      break;
  }

  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor,
    color: textColor,
    fontWeight,
    borderRadius: Sizes.Medium,
    width: customWidth, // Use customWidth if provided, otherwise use MdLarge
    height: Sizes.XsLarge,
    border: isBorder ? border : undefined,
  };

  return <div style={style}>{content}</div>;
};

StatusTag.defaultProps = {
  customWidth: SizesResponsive.XXLarge, // Default value for customWidth if not provided
  isBorder: false,
  content: "-",
};

export default StatusTag;
