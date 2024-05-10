import { useEffect, useState } from "react";
import { IReservedStudent } from "../../../interfaces/reserved-student.interface";
import { useSingleClassStore } from "../../../store/ClassStore";
import ReservingInformation from "../../atoms/ReservingInformation/ReservingInformation";
import ModalReservation from "../../atoms/TerminalReservation/TerminalReservation";

interface ReserveInformationTabsProps {
  reserveStudent: IReservedStudent;
}
const ReserveInformationTabs = ({
  reserveStudent,
}: ReserveInformationTabsProps) => {
  console.log(reserveStudent);
  const { getClassByID } = useSingleClassStore();
  const [isShow, setIsShow] = useState<boolean>(false);

  useEffect(() => {
    getClassByID(reserveStudent?.ClassId);
  }, [reserveStudent?.ClassId, getClassByID]);

  return (
    <div className="root-reserve-modal">
      <hr className="divider-hr" />
      <div className="wrapper-update">
        <ModalReservation
          isShow={isShow}
          setIsShow={setIsShow}
          data={reserveStudent}
          handleDataChange={() => {}}
        >
          <div className="update-status">Update status</div>
        </ModalReservation>
      </div>
      <div className="reserving-title">Reserving information</div>
      <ReservingInformation data={reserveStudent} />
    </div>
  );
};

export default ReserveInformationTabs;
