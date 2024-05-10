import { useParams } from "react-router";
import { useEffect } from "react";
import { useSingleEmailStore } from "../../../store/EmailStore";
import ViewEmailDetail from "../../molecules/ViewEmailDetail/ViewEmailDetail";
import CustomBreadcrumb from "../../atoms/CustomBreadcrumb/CustomBreadcrumb";

const EmailDetail = () => {
  const { id } = useParams();
  const { aEmail, getEmailByID } = useSingleEmailStore();
  useEffect(() => {
    getEmailByID(id || "");
  }, [id, getEmailByID]);
  return (
    <>
      <div className="breadcrumb-frame-custom">
        <CustomBreadcrumb />
      </div>
      <ViewEmailDetail data={aEmail ?? null} />
    </>
  );
};

export default EmailDetail;
