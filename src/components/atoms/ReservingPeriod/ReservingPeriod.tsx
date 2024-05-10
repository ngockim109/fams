/** This function is response for choosing reserved period.
 * This range must not exceed 6 months.
 */
import { DatePicker, Form } from "antd";
import { Dayjs } from "dayjs";
import React, { useState } from "react";

type RangeValue = [Dayjs | null, Dayjs | null] | null;
const ReservingPeriod: React.FC = () => {
  const { RangePicker } = DatePicker;
  const [dates, setDates] = useState<RangeValue>(null);
  const [value, setValue] = useState<RangeValue>(null);
  const disabledDate = (current: Dayjs) => {
    if (!dates || !dates[0] || !dates[1]) {
      return false;
    }

    const tooLate = current.diff(dates[0], "months") >= 6;
    const tooEarly = dates[1].diff(current, "months") >= 6;

    return tooEarly || tooLate;
  };
  const onOpenChange = (open: boolean) => {
    if (open) {
      setDates([null, null]);
    } else {
      setDates(null);
    }
  };
  return (
    <Form.Item
      label="Reserving period"
      name="ReservingPeriod"
      rules={[
        {
          required: true,
          message: "Please select a period",
        },
        {
          validator: (_, date) => {
            if (!date || date[0] === null || date[1] === null) {
              return Promise.reject(new Error("Please select a period"));
            }

            const startDate = date[0];
            const endDate = date[1];

            // Check if the date range is not exceed 6 months
            if (endDate.diff(startDate, "months") <= 6) {
              return Promise.resolve();
            }
            return Promise.reject(
              new Error("Reserving period is not exceed 6 months.")
            );
          },
        },
      ]}
    >
      <RangePicker
        value={dates || value}
        disabledDate={disabledDate}
        onCalendarChange={(val: React.SetStateAction<RangeValue>) => {
          setDates(val);
        }}
        onChange={(val: React.SetStateAction<RangeValue>) => {
          setValue(val);
        }}
        onOpenChange={onOpenChange}
        changeOnBlur
        disabled
        format="DD/MM/YYYY"
        style={{ width: "100%" }}
      />
    </Form.Item>
  );
};

export default ReservingPeriod;
