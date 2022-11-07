import { Grid, Card, Typography } from "@material-ui/core";
import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
const CardStatus = (props) => {
  const { ...param } = props;
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} md={2}>
          <Card
            onClick={() => param.onSelectStatus("")}
            style={{
              padding: 10,
              backgroundColor: "#3498db",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            <Typography style={{ fontWeight: "bold", fontSize: 26 }}>
              {param.formatNumber(param.totalCount)}
            </Typography>
            <Typography style={{ fontWeight: "bold", fontSize: 11 }}>
              TOTAL
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={2}>
          <Card
            onClick={() => param.onSelectStatus("Normal Consumption")}
            style={{
              padding: 10,
              backgroundColor: "#27ae60",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            <Typography style={{ fontWeight: "bold", fontSize: 26 }}>
              {param.formatNumber(param.normalCount)}
            </Typography>

            <Typography style={{ fontWeight: "bold", fontSize: 11 }}>
              NORMAL CONSUMPTION
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={2}>
          <Card
            onClick={() => param.onSelectStatus("High Consumption")}
            style={{
              padding: 10,
              backgroundColor: "#9b59b6",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            <Typography style={{ fontWeight: "bold", fontSize: 26 }}>
              {param.formatNumber(param.highCount)}
            </Typography>
            <Typography style={{ fontWeight: "bold", fontSize: 11 }}>
              HIGH CONSUMPTION
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={2}>
          <Card
            onClick={() => param.onSelectStatus("Low Consumption")}
            style={{
              padding: 10,
              backgroundColor: "#f39c12",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            <Typography style={{ fontWeight: "bold", fontSize: 26 }}>
              {param.formatNumber(param.lowCount)}
            </Typography>
            <Typography style={{ fontWeight: "bold", fontSize: 11 }}>
              LOW CONSUMPTION
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={2}>
          <Card
            onClick={() => param.onSelectStatus("Invalid Average")}
            style={{
              padding: 10,
              backgroundColor: "#e74c3c",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            <Typography style={{ fontWeight: "bold", fontSize: 26 }}>
              {param.formatNumber(param.invalidCount)}
            </Typography>
            <Typography style={{ fontWeight: "bold", fontSize: 11 }}>
              INVALID AVERAGE
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default React.memo(CardStatus);
