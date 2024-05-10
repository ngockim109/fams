import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./ToolBar.scss";

interface ToolBarProps {
  bodyValue: string;
  onChangeBodyValue: (value: string) => void;
}

const ToolBar: React.FC<ToolBarProps> = ({ bodyValue, onChangeBodyValue }) => {
  const toolbarOptions = [
    [{ font: [] }],
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ align: [] }],

    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    ["clean"],
  ];
  const modules = {
    toolbar: toolbarOptions,
  };

  return (
    <ReactQuill
      data-testid="quill-editor"
      theme="snow"
      modules={modules}
      placeholder="Write something..."
      value={bodyValue}
      onChange={onChangeBodyValue}
    />
  );
};

export default ToolBar;
