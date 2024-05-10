/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { ref, uploadBytes } from "firebase/storage";
import { GetProp, Modal, Upload, UploadFile, UploadProps } from "antd";
import ImgCrop from "antd-img-crop";
import { VscError } from "react-icons/vsc";
import { storage } from "../../../services/firebase/firebaseConfig";
import { getUserInfo } from "../../../utils/JWTAuth";
import FormFooter from "../../molecules/FormFooter/FormFooter";
import { errorNotify, successNotify } from "../Notify/Notify";
import Sizes from "../../../constants/Sizes";
import Colors from "../../../constants/Colors";
import "./UploadImage.scss";

interface UploadImageProps {
  isModalOpen: boolean;
  handleCancel: () => void;
}

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const UploadImage: React.FC<UploadImageProps> = ({
  isModalOpen,
  handleCancel,
}) => {
  const [imgUpload, setImgUpload] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);

  const userId = getUserInfo().uid;
  const uploadImg = () => {
    if (imgUpload === null) return;
    setLoading(true);
    const imgRef = ref(storage, `images/${userId}`);
    const imgFile = imgUpload[0].originFileObj as File;
    uploadBytes(imgRef, imgFile)
      .then(() => {
        successNotify(`${imgFile.name} file uploaded successfully.`);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        errorNotify(`${imgFile.name} file upload failed.`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onChange: UploadProps["onChange"] = ({ fileList: newFile }) => {
    setImgUpload(newFile);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    Modal.info({
      title: "Preview",
      content: (
        <img
          src={src}
          alt="Preview"
          style={{ width: "100%", paddingRight: "2rem" }}
        />
      ),
    });
  };

  return (
    <Modal
      title={<div className="modal-header-custom centered">Change Avatar</div>}
      open={isModalOpen}
      onCancel={handleCancel}
      closeIcon={<VscError size={Sizes.LgMedium} color={Colors.White} />}
      footer={
        <div className="centered">
          <FormFooter
            handleCancel={handleCancel}
            formName="ImportFile"
            text="Upload Image"
            handleOk={uploadImg}
            loading={loading}
          />
        </div>
      }
    >
      <div className="modal-content-custom">
        <ImgCrop
          showReset
          rotationSlider
          zoomSlider
          modalClassName="modal-content-custom__modal"
        >
          <Upload
            accept="image/*"
            listType="picture-circle"
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            fileList={imgUpload}
            onChange={onChange}
            onPreview={onPreview}
            className="modal-upload-container"
          >
            {imgUpload.length < 1 && "+ Upload"}
          </Upload>
        </ImgCrop>
      </div>
    </Modal>
  );
};

export default UploadImage;
