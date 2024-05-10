/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import { VscError } from "react-icons/vsc";
import FileUpload from "../../atoms/FileUpload/FileUpload";
import FormFooter from "../FormFooter/FormFooter";
import Sizes from "../../../constants/Sizes";
import Colors from "../../../constants/Colors";

interface InputExcelModalProps {
  isModalOpen: boolean;
  handleCancel: () => void;
  excelUpload: (file: File, id?: string) => void;
  importId: string;
  href: string;
  fileDownload: string;
}

const InputExcelModal = ({
  isModalOpen,
  handleCancel,
  excelUpload,
  importId,
  href,
  fileDownload,
}: InputExcelModalProps) => (
  <Modal
    title={<div className="modal-header-custom centered">Import file</div>}
    open={isModalOpen}
    onCancel={handleCancel}
    footer={
      <div className="centered">
        <FormFooter
          handleCancel={handleCancel}
          formName="ImportFile"
          text="Download Template"
          isDownload
          href={href}
          download={fileDownload}
        />
      </div>
    }
    className="custom-modal-content"
    closeIcon={<VscError size={Sizes.LgMedium} color={Colors.White} />}
  >
    <div className="modal-content-custom">
      <FileUpload excelUpload={excelUpload} importId={importId} />
    </div>
  </Modal>
);

export default InputExcelModal;
