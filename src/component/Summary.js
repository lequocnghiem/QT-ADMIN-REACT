import React from 'react';
import { Card, CardContent, Typography, Grid, makeStyles } from '@material-ui/core';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AssignmentReturnIcon from '@material-ui/icons/AssignmentReturn';
import CancelIcon  from '@material-ui/icons/Cancel';
const useStyles = makeStyles({
  card: {
    background: '#ffffff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  cardContent: {
    width: '100%',
    padding: '24px',
  },
  icon: {
    fontSize: '48px',
    marginBottom: '12px',
    color: '#8884d8', // Màu sắc tùy chọn
  },
});

const Summary = ({ totalOrders, totalRevenue, totalProducts,totalCancelledOrders ,totalRevenuerefund}) => {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4}>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <MonetizationOnIcon className={classes.icon} />
            <Typography variant="h5" component="h2">
              Tổng doanh thu
            </Typography>
            <Typography variant="h4">
              {totalRevenue}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <ShoppingCartIcon className={classes.icon} />
            <Typography variant="h5" component="h2">
              Tổng đơn hàng
            </Typography>
            <Typography variant="h4">
              {totalOrders}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <ListAltIcon className={classes.icon} />
            <Typography variant="h5" component="h2">
              Tổng sản phẩm
            </Typography>
            <Typography variant="h4">
              {totalProducts}
            </Typography>
          </CardContent>
        </Card>
      </Grid>


      <Grid item xs={12} sm={3}>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <AssignmentReturnIcon className={classes.icon} />
            <Typography variant="h5" component="h2">
              Đơn hàng đã hoàn tiền
            </Typography>
            <Typography variant="h4">
              {totalCancelledOrders}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={4}>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <CancelIcon  className={classes.icon} />
            <Typography variant="h5" component="h2">
              Tổng số tiền đã hoàn
            </Typography>
            <Typography variant="h4">
              {totalRevenuerefund.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

    </Grid>
  );
};

export default Summary;
