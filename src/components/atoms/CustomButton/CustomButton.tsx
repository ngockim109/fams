/** This file is contain all button used in project */
import { Button } from "antd";
import React from "react";
import { FaTrashCan } from "react-icons/fa6";
import {
  MdOutlineKeyboardArrowDown,
  MdAddCircleOutline,
  MdMoreHoriz,
  MdOutlineMailOutline,
} from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import { RiDownloadCloud2Line } from "react-icons/ri";
import { CiExport } from "react-icons/ci";
import { IoMdFunnel, IoMdArrowBack } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./CustomButton.scss";
import Sizes from "../../../constants/Sizes";

type ClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => void;
interface ButtonProps {
  text: string | React.ReactNode;
  onClick?: ClickHandler;
}

interface MoreButtonProps {
  onClick?: ClickHandler;
}

interface SubmitButtonProps extends ButtonProps {
  loading?: boolean;
  formName?: string;
}

interface DownloadButtonProps {
  text?: string | React.ReactNode;
  href?: string;
  download?: string;
}

interface BackButtonProps {
  text?: string;
}

const defaultProps: Partial<ButtonProps> = {
  onClick: () => {},
};

const submitDefaultProps: Partial<SubmitButtonProps> = {
  loading: false,
  onClick: () => {},
  formName: "",
};

const downloadDefaultProps: Partial<DownloadButtonProps> = {
  text: "Download",
  href: "",
  download: "",
};

const backDefaultProps: Partial<BackButtonProps> = {
  text: "Back",
};

export const CommonButton = ({ onClick = () => {}, text }: ButtonProps) => (
  <Button
    type="text"
    onClick={onClick}
    style={{ width: "100%", height: "100%" }}
  >
    {text}
  </Button>
);

export const AddButton = ({ onClick, text }: ButtonProps) => (
  <Button className="btn btn--add" onClick={onClick}>
    <MdAddCircleOutline size={Sizes.LgMedium} />
    <strong>{text}</strong>
  </Button>
);

export const AddButtonWithCircle = ({ onClick, text }: ButtonProps) => (
  <Button className="btn btn--add-circle" onClick={onClick}>
    <FaPlusCircle size={Sizes.LgMedium} />
    <strong>{text}</strong>
  </Button>
);

export const DefaultDeleteButton = ({ onClick, text }: ButtonProps) => (
  <Button type="text" danger className="btn--delete-default" onClick={onClick}>
    {text}
  </Button>
);

export const DeleteButton = ({ onClick, text }: ButtonProps) => (
  <Button className="btn btn--delete" onClick={onClick}>
    <FaTrashCan size={Sizes.LgMedium} />
    <strong>{text}</strong>
  </Button>
);

export const ActionButton = ({ onClick, text }: ButtonProps) => (
  <Button className="btn btn--grey" onClick={onClick}>
    <strong>{text}</strong>
    <MdOutlineKeyboardArrowDown size={Sizes.LgMedium} />
  </Button>
);

export const ImportButton = ({ onClick, text }: ButtonProps) => (
  <Button
    className="btn btn--import"
    icon={<RiDownloadCloud2Line size={Sizes.LgMedium} />}
    type="primary"
    onClick={onClick}
  >
    {text}
  </Button>
);

export const ExportButton = ({ onClick, text }: ButtonProps) => (
  <Button
    className="btn btn--export"
    icon={<CiExport size={Sizes.LgMedium} />}
    type="primary"
    danger
    onClick={onClick}
  >
    {text}
  </Button>
);

export const FilterButton = ({ onClick, text }: ButtonProps) => (
  <Button
    className="btn btn--filter"
    icon={<IoMdFunnel size={Sizes.LgMedium} />}
    type="primary"
    onClick={onClick}
  >
    {text}
  </Button>
);

export const SubmitButton = ({
  loading,
  text,
  formName,
  onClick,
}: SubmitButtonProps) => (
  <Button
    loading={loading}
    className="btn btn--filter"
    type="primary"
    onClick={onClick}
    key="Submit"
    htmlType="submit"
    form={formName}
  >
    {text}
  </Button>
);

export const CancelButton = ({ onClick, text }: ButtonProps) => (
  <Button
    key="Cancel"
    htmlType="reset"
    type="text"
    danger
    onClick={onClick}
    className="btn btn--cancel"
  >
    <strong>{text}</strong>
  </Button>
);

export const MoreButton = ({ onClick }: MoreButtonProps) => (
  <Button onClick={onClick}>
    <MdMoreHoriz />
  </Button>
);

export const DownloadButton = ({
  text,
  href,
  download,
}: DownloadButtonProps) => (
  <Button type="primary" href={href} download={download}>
    {text}
  </Button>
);

export const BackButton = ({ text }: BackButtonProps) => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <Button
      className="btn btn--back"
      onClick={handleBack}
      icon={<IoMdArrowBack size={Sizes.LgMedium} />}
      type="text"
    >
      {text}
    </Button>
  );
};

export const SendEmailButton = ({ onClick, text }: ButtonProps) => (
  <Button className="btn btn--send-email" onClick={onClick}>
    <MdOutlineMailOutline size={Sizes.LgMedium} />
    <strong>{text}</strong>
  </Button>
);

export const SendMailButton = ({ onClick = () => {}, text }: ButtonProps) => (
  <Button type="text" onClick={onClick} className="btn--send-mail">
    <div className="btn--send-mail__content">
      <div className="btn--send-mail__content--icon">
        <IoSend />
      </div>

      <div className="btn--send-mail__content--text">
        <span>{text}</span>
      </div>
    </div>
  </Button>
);
AddButton.defaultProps = defaultProps;
DeleteButton.defaultProps = defaultProps;
DefaultDeleteButton.defaultProps = defaultProps;
ActionButton.defaultProps = defaultProps;
ImportButton.defaultProps = defaultProps;
ExportButton.defaultProps = defaultProps;
FilterButton.defaultProps = defaultProps;
CancelButton.defaultProps = defaultProps;
CommonButton.defaultProps = defaultProps;
MoreButton.defaultProps = defaultProps;
AddButtonWithCircle.defaultProps = defaultProps;
SubmitButton.defaultProps = submitDefaultProps;
DownloadButton.defaultProps = downloadDefaultProps;
BackButton.defaultProps = backDefaultProps;
SendEmailButton.defaultProps = defaultProps;
SendMailButton.defaultProps = defaultProps;
