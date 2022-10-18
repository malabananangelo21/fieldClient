import React from "react";
import LineGraph from "./charts/lineChart";
import Typography from "@material-ui/core/Typography";
import { getData } from "../../../api/api";
import moment from "moment";
const IndexMonthlyReport = (props) => {
  const { b_id, activeType } = props;
  const [state, setState] = React.useState({
    dataList: [],
  });
  React.useEffect(() => {
    getReport();
  }, [activeType]);
  const getReport = () => {
    const startOfMonth = moment().startOf("month").format("YYYY-MM-DD");
    const endOfMonth = moment().endOf("month").format("YYYY-MM-DD");
    let data = {
      firstDay: startOfMonth,
      currentDay: endOfMonth,
      jo_type: activeType,
      branch_id: b_id,
    };
    getData("tracking/summary_report_accom_monthly", data).then((res) => {
      setState((prev) => ({
        ...prev,
        dataList: res.new_accom,
      }));
    });
  };
  return (
    <>
      <Typography style={{ fontWeight: "bold" }}>
        {moment(new Date()).format("MMMM")} Monthly Report
      </Typography>
      <LineGraph dataList={state.dataList} />
    </>
  );
};

export default React.memo(IndexMonthlyReport);
