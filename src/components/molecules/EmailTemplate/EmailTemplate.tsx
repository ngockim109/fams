import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, Input, Modal, Select } from "antd";
import "./EmailTemplate.scss"; // Import the styles
import { VscError } from "react-icons/vsc";
import ReactQuill from "react-quill";
import { useLocation } from "react-router";
import dayjs from "dayjs";
import { IReservedStudent } from "../../../interfaces/reserved-student.interface";
import Sizes from "../../../constants/Sizes";
import Colors from "../../../constants/Colors";
import { useEmailStore } from "../../../store/EmailStore";
import {
  useActivityLogStore,
  useSingleActivityLogStore,
} from "../../../store/ActivityLogStore";
import { IActivityLog } from "../../../interfaces/activity-log.interface";
import { errorNotify } from "../../atoms/Notify/Notify";
import { IUser } from "../../../interfaces/user.interface";
import formatDate from "../../../utils/DateFormatting";
import { IAccount } from "../../../interfaces/account.interface";
import { IEmail } from "../../../interfaces/email.interface";
import { validateEmail } from "../../../utils/Validations";
import { useStudentClassStore } from "../../../store/StudentClassStore";

interface EmailTemplateProps {
  data: IReservedStudent | IUser;
  open: boolean;
  handleOpenRemind: () => void;
  handleCloseRemind: () => void;
  modalTitle: string;
  type?: string;
  isIndividual?: boolean;
  setOpenRemind: React.Dispatch<React.SetStateAction<boolean>>;
  isCC?: boolean;
}

const { Option } = Select;
const EmailTemplate: React.FC<EmailTemplateProps> = ({
  data,
  open,
  handleOpenRemind,
  handleCloseRemind,
  modalTitle,
  type,
  isIndividual,
  setOpenRemind,
  isCC,
}) => {
  console.log(isIndividual);

  console.log(data.Email);
  const path = useLocation().pathname;
  const classId = path?.split("/")[2];
  const [typeTemplate, setTypeTemplate] = useState<IEmail | null>();
  const [previewModal, setPreviewModal] = useState<boolean>(false);
  const { email, getEmailByType } = useEmailStore();
  const [isChooseType, setIsChooseType] = useState<boolean>(false);
  const {
    postActivityLog,
    loadingActivityLog,
    postActivityLogForTrainer,
    postEmailScore,
  } = useSingleActivityLogStore();
  const { postActivityLogByClassID } = useActivityLogStore();
  const { fetchStudentClass, studentClass } = useStudentClassStore();
  const [receiver, setReceiver] = useState<string>(classId ?? data.Email);
  const [CC, setCC] = useState<string>("");
  const [isModalOpen, setModalOpen] = useState<boolean>(open ?? false);

  useEffect(() => {
    setModalOpen(open);
  }, [open]);
  const handleClose = () => {
    setModalOpen(false);
    setOpenRemind((prev) => !prev);
  };

  const [form] = Form.useForm();
  const userInfo = JSON.parse(
    localStorage.getItem("userInfo") ?? ""
  ) as IAccount | null;
  const hidePreviewModal = () => {
    setPreviewModal(false);
  };
  const showPreviewModal = () => {
    form.validateFields().then(() => {
      setPreviewModal(true);
    });
  };
  useEffect(() => {
    classId && fetchStudentClass(classId);
  }, [classId, fetchStudentClass]);
  const handleTemplateChange = (value: string) => {
    const chooseTemplate = email?.find((el) => el.Id === value);
    setTypeTemplate(chooseTemplate);
  };
  const handleReceiverChange = (value: string) => {
    setReceiver(value);
  };
  const handleChangeCC = (e: ChangeEvent<HTMLInputElement>) => {
    setCC(e.target.value);
  };

  const handleSendRemind = () => {
    console.log(11111111);

    form.validateFields().then((values: IActivityLog) => {
      console.log(values);
      const ReceiverArray = !Array.isArray(values.Receiver)
        ? [values.Receiver]
        : values.Receiver;
      const ArrayCC = CC !== "" ? CC.split(",") : [];

      console.log(ReceiverArray);

      const dataActivityLog: IActivityLog = {
        EmailType: values.EmailType,
        EmailTemplateId: values.EmailTemplateId ?? "",
        SenderId: userInfo?.uid ?? "",
        Receiver: values.Receiver,
        Id: "",
        SendDate: formatDate(dayjs(Date.now()).toString()),
        ReceiverType: values.ReceiverType,
        EmailTemplateName: "",
        CC: ArrayCC,
        To: ReceiverArray,
        UserEmail: [],
        StudentId: "",
        ClassId: classId,
        TemplateId: values.EmailTemplateId,
      };
      try {
        if (type === "Trainer") {
          dataActivityLog.UserEmail = dataActivityLog.To;
          postActivityLogForTrainer(dataActivityLog);
        } else if (
          classId &&
          type === "Student" &&
          typeTemplate?.Type === "Score"
        ) {
          studentClass?.forEach((student) => {
            dataActivityLog.StudentId = student.StudentId;
            postEmailScore(dataActivityLog);
          });
        } else {
          classId && !data.Email
            ? postActivityLogByClassID(dataActivityLog, classId)
            : postActivityLog(dataActivityLog);
        }

        setTimeout(() => {
          hidePreviewModal();
          handleCloseRemind();
        }, 200);
      } catch (error) {
        errorNotify("An error occurred while send email remind student");
        console.error("Error remind:", error);
      }
    });
  };

  const emailTemplateInitialValues = {
    Receiver: isIndividual ? data?.Email : classId,
    ReceiverType: type ?? "Student",
  };

  const applyTo: string = type === "Trainer" ? "Trainer" : "Student";
  const handleChooseType = async (value: string) => {
    setIsChooseType(true);
    await getEmailByType(value, applyTo);
  };

  const typeOptions = [
    {
      value: "Reservation",
      label: "Reservation",
    },
    {
      value: "Inform",
      label: "Inform",
    },
    {
      value: "Score",
      label: "Score",
    },
    {
      value: "Remind",
      label: "Remind",
    },
    {
      value: "Other",
      label: "Other",
    },
  ];
  return (
    <>
      <Modal
        title={<div className="modal-title">{modalTitle}</div>}
        open={isModalOpen}
        closeIcon={<VscError size={Sizes.LgMedium} color={Colors.White} />}
        onOk={handleClose}
        onCancel={handleClose}
        className="email-modal"
        cancelText="Send"
        okText="Preview"
        footer={[
          <div className="modal-footer" key="modalFooter">
            <Button
              key="preview"
              onClick={() => {
                showPreviewModal();
              }}
              className="btn-preview-btn"
            >
              Preview
            </Button>
            <Button
              onClick={handleSendRemind}
              className="btn-send-btn"
              loading={loadingActivityLog}
            >
              Send
            </Button>
          </div>,
        ]}
      >
        <Form
          name="RemindForm"
          initialValues={emailTemplateInitialValues}
          onFinish={handleSendRemind}
          form={form}
        >
          <div className="email-form">
            <Form.Item
              label="Category"
              name="EmailType"
              rules={[{ required: true }]}
            >
              <Select
                style={{ width: 300 }}
                placeholder="Select category"
                onChange={(value) => handleChooseType(value)}
                options={typeOptions}
              />
            </Form.Item>
            <Form.Item
              label="Apply to"
              name="ReceiverType"
              rules={[{ required: true }]}
            >
              <Select
                style={{ width: 300 }}
                placeholder="Select apply to"
                // onChange={handleApplyChange}
                disabled={isIndividual || type !== "Trainer"}
              >
                {type === "Trainer" ? (
                  <Option value="Trainer">Trainer</Option>
                ) : (
                  <Option value="Student">Student</Option>
                )}
                {/* {isIndividual ? (
                  <Option value="Student">Student</Option>
                ) : (
                  <Option value="Trainer">Trainer</Option>
                )} */}
              </Select>
            </Form.Item>
            <Form.Item
              label="Send to"
              name="Receiver"
              rules={[{ required: true }]}
            >
              <Select
                style={{ width: 300 }}
                placeholder="Select send to"
                onChange={handleReceiverChange}
                disabled={isIndividual || type !== "Trainer"}
              >
                {classId && <Option value={classId}>{classId}</Option>}
                {!isIndividual && (
                  <Option value={data?.Email}>{data?.Email}</Option>
                )}
              </Select>
            </Form.Item>

            <Form.Item
              label="Template name"
              name="EmailTemplateId"
              rules={[{ required: true }]}
            >
              <Select
                style={{ width: 300 }}
                onChange={handleTemplateChange}
                placeholder="Select template name"
                disabled={!isChooseType}
              >
                {email?.map((item) => (
                  <Option value={item.Id} key={item.Id}>
                    {item.Name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            {isCC && (
              <Form.Item
                label="CC"
                name="CC"
                rules={[
                  ({ getFieldValue }) => ({
                    validator: (_, value) => {
                      const fieldValue = getFieldValue("CC");
                      if (fieldValue) {
                        return validateEmail(value)
                          ? Promise.resolve()
                          : Promise.reject(
                              new Error("Please enter a valid email address!")
                            );
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <Input
                  placeholder="Type email cc"
                  style={{ width: "300px" }}
                  type="email"
                  onChange={(e) => handleChangeCC(e)}
                />
              </Form.Item>
            )}
          </div>
        </Form>
      </Modal>

      {/* Preview modal show the content of email will be sent */}
      <Modal
        title={<div className="modal-title">Email Preview</div>}
        open={previewModal}
        closeIcon={
          <VscError
            style={{
              color: Colors.White,
            }}
          />
        }
        onCancel={hidePreviewModal}
        width={900}
        className="email-modal"
        footer={[
          <div className="modal-footer" key="modalFooter">
            <Button
              onClick={() => {
                hidePreviewModal();
                handleOpenRemind();
              }}
              className="btn-preview-btn"
            >
              Back
            </Button>
            <Button
              key="Send"
              onClick={handleSendRemind}
              className="ant-btn-primary"
              loading={loadingActivityLog}
            >
              Send
            </Button>
          </div>,
        ]}
      >
        <div className="email-form">
          <div className="email-input">
            <p>Template name</p>
            <h4>{typeTemplate?.Name}</h4>
          </div>
          <div className="email-input">
            <p>From</p>
            <h4>{userInfo?.email}</h4>
          </div>
          <div className="email-input">
            <p>To</p>
            <h4>{receiver}</h4>
          </div>
          {isCC && (
            <div className="email-input">
              <p>Cc</p>
              <h4>{CC}</h4>
            </div>
          )}
          <div className="email-input">
            <p>Subject</p>
            <h4>Lorem ipsum</h4>
          </div>
          <div className="email-input">
            <p>Body</p>
            <div>
              {typeTemplate?.Type === "Score" ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: typeTemplate?.Content ?? "",
                  }}
                />
              ) : (
                <ReactQuill
                  value={typeTemplate?.Content}
                  readOnly
                  style={{ width: "100%", height: "fit-content" }}
                />
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

EmailTemplate.defaultProps = {
  isIndividual: false,
  type: "",
  isCC: false,
};

export default EmailTemplate;
