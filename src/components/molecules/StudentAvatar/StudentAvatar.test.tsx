import { render, screen } from "@testing-library/react";
import StudentAvatar from "./StudentAvatar";
import MockStudent from "../../../test-data/Students/MockStudent";

describe("StudentAvatar Component", () => {
  const studentDetail = MockStudent[0];
  const studentDetailWithAvatar = MockStudent[1];
  test("should render user avatar with image", () => {
    render(
      <StudentAvatar
        isImage
        FullName={studentDetailWithAvatar?.FullName}
        Id={studentDetailWithAvatar?.StudentId}
        ImageUrl={studentDetailWithAvatar?.AvatarUrl}
      />
    );

    // Assert that user avatar is rendered
    const userAvatarElement = screen.getByTestId("user-avatar");
    expect(userAvatarElement).toBeInTheDocument();

    // Assert that student's name and ID are displayed
    expect(
      screen.getByText(studentDetailWithAvatar.FullName)
    ).toBeInTheDocument();
    expect(
      screen.getByText(studentDetailWithAvatar.StudentId)
    ).toBeInTheDocument();

    // Assert that avatar image is rendered
    const avatarImage = screen.getByTestId("avatar-image") as HTMLImageElement;
    expect(avatarImage).toBeInTheDocument();
    expect(avatarImage.src).toBe(studentDetailWithAvatar?.AvatarUrl);
  });

  test("should render student details", () => {
    render(
      <StudentAvatar
        isImage={
          studentDetail?.AvatarUrl !== null || studentDetail?.AvatarUrl !== ""
        }
        FullName={studentDetail.FullName}
        Id={studentDetail.StudentId}
        ImageUrl={studentDetail?.AvatarUrl}
      />
    );

    // Assert that student's name and ID are displayed
    const nameElement = screen.getByText(studentDetail.FullName);
    const idElement = screen.getByText(`${studentDetail.StudentId}`);
    expect(nameElement).toBeInTheDocument();
    expect(idElement).toBeInTheDocument();
  });

  test("should render user avatar without image", () => {
    render(
      <StudentAvatar
        isImage={
          studentDetail?.AvatarUrl !== null || studentDetail?.AvatarUrl !== ""
        }
        FullName={studentDetail.FullName}
        Id={studentDetail.StudentId}
        ImageUrl={studentDetail?.AvatarUrl}
      />
    );

    // Assert that user avatar is rendered
    const userAvatarElement = screen.getByTestId("user-avatar");
    expect(userAvatarElement).toBeInTheDocument();

    // Assert that student's name and ID are displayed
    expect(screen.getByText(studentDetail.FullName)).toBeInTheDocument();
    expect(screen.getByText(studentDetail.StudentId)).toBeInTheDocument();
  });

  test("should render user avatar initial", () => {
    render(
      <StudentAvatar
        isImage={
          studentDetail?.AvatarUrl !== null || studentDetail?.AvatarUrl !== ""
        }
        FullName={studentDetail.FullName}
        Id={studentDetail.StudentId}
        ImageUrl={studentDetail?.AvatarUrl}
      />
    );

    // Assert that avatar initials are rendered
    const avatarInitial = screen.getByText(
      studentDetail.FullName.slice(0, 2).toUpperCase()
    );
    expect(avatarInitial).toBeInTheDocument();
  });
});
