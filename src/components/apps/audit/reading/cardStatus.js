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
              {param.formatNumber(param.totalCardCount)}
            </Typography>
            <Typography style={{ fontWeight: "bold", fontSize: 11 }}>
              TOTAL
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={2}>
          <Card
            onClick={() => param.onSelectStatus("Discrepancy")}
            style={{
              padding: 10,
              backgroundColor: "#9b59b6",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            {param.loadingProgress == false ? (
              <Typography style={{ fontWeight: "bold", fontSize: 26 }}>
                {param.formatNumber(param.discrepancyCount)}
              </Typography>
            ) : (
              <CircularProgress color="white" />
            )}
            <Typography style={{ fontWeight: "bold", fontSize: 11 }}>
              DISCREPANCY
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={2}>
          <Card
            onClick={() => param.onSelectStatus("Valid")}
            style={{
              padding: 10,
              backgroundColor: "#27ae60",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            <Typography style={{ fontWeight: "bold", fontSize: 26 }}>
              {param.formatNumber(param.validCount)}
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
              backgroundColor: "#e74c3c",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            <Typography style={{ fontWeight: "bold", fontSize: 26 }}>
              {param.formatNumber(param.invalidCount)}
            </Typography>
            <Typography style={{ fontWeight: "bold", fontSize: 11 }}>
              INVALID
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default React.memo(CardStatus);
