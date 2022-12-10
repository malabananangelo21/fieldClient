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
        <Grid item xs={12} md={2}>
          <Card
            onClick={() => param.onSelectStatus("Field Findings")}
            style={{
              padding: 10,
              backgroundColor: "#7f8c8d",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            <Typography style={{ fontWeight: "bold", fontSize: 26 }}>
              {param.formatNumber(param.fieldFindings)}
            </Typography>
            <Typography style={{ fontWeight: "bold", fontSize: 11 }}>
              FIELD FINDINGS
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={2}>
          <Card
            onClick={() => param.onSelectStatus("Negative Consumption")}
            style={{
              padding: 10,
              backgroundColor: "#34495e",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            <Typography style={{ fontWeight: "bold", fontSize: 26 }}>
              {param.formatNumber(param.negativeConsumption)}
            </Typography>
            <Typography style={{ fontWeight: "bold", fontSize: 11 }}>
              NEGATIVE CONSUMPTIONS
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={2}>
          <Card
            onClick={() => param.onSelectStatus("Valid")}
            style={{
              padding: 10,
              backgroundColor: "#2ecc71",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            <Typography style={{ fontWeight: "bold", fontSize: 26 }}>
              {param.formatNumber(param.valid)}
            </Typography>
            <Typography style={{ fontWeight: "bold", fontSize: 11 }}>
              VALID
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={2}>
          <Card
            onClick={() => param.onSelectStatus("Invalid")}
            style={{
              padding: 10,
              backgroundColor: "#c0392b",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            <Typography style={{ fontWeight: "bold", fontSize: 26 }}>
              {param.formatNumber(param.invalid)}
            </Typography>
            <Typography style={{ fontWeight: "bold", fontSize: 11 }}>
              INVALID
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={2}>
          <Card
            onClick={() => param.onSelectStatus("16")}
            style={{
              padding: 10,
              backgroundColor: "#ecf0f1",
              color: "#000",
              cursor: "pointer",
            }}
          >
            <Typography style={{ fontWeight: "bold", fontSize: 26 }}>
              {param.formatNumber(param.meter_type_sixteen)}
            </Typography>
            <Typography style={{ fontWeight: "bold", fontSize: 11 }}>
              METER TYPE 16
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default React.memo(CardStatus);
