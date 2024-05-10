import { render, screen } from "@testing-library/react";
import AvatarImage from "./AvatarImage";

describe("AvatarImage component", () => {
  test("renders AvatarImage with image", () => {
    const imageUrl = "public/assets/images/avatar.png";
    const fullName = "John Doe";
    render(<AvatarImage ImageUrl={imageUrl} FullName={fullName} isImage />);

    const imageElement = screen.getByAltText(fullName);

    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", imageUrl);
  });

  test("renders AvatarImage with initial", () => {
    const fullName = "John Doe";
    render(<AvatarImage FullName={fullName} isImage={false} ImageUrl="" />);

    const initialElement = screen.getByText(/JO/);

    expect(initialElement).toBeInTheDocument();
  });
});
