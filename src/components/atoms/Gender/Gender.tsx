/** This component is use for rendering an icon representing a person's gender.
 * If gender is true, it will render male icon with lighter black color,
 * otherwise it will render female icon with red color.
 * Usage:
 * <Gender gender={true|false} />
 */

import React from "react";
import { GrUserFemale, GrUser } from "react-icons/gr";
import Colors from "../../../constants/Colors";
import FontSizes from "../../../constants/FontSizes";

interface GenderProps {
  gender: boolean;
  customFontSize?: string;
}

const Gender: React.FC<GenderProps> = ({ gender, customFontSize }) => (
  <div>
    {(gender !== undefined || gender !== null) && gender ? (
      <GrUser
        data-testid="male-icon"
        style={{
          color: Colors.Grey,
          width: "100%",
          alignItems: "center",
          fontSize: customFontSize,
        }}
      />
    ) : (
      <GrUserFemale
        data-testid="female-icon"
        style={{
          color: Colors.Grey,
          width: "100%",
          alignItems: "center",
          fontSize: customFontSize,
        }}
      />
    )}
  </div>
);

Gender.defaultProps = {
  customFontSize: FontSizes.LgLarge,
};

export default Gender;
