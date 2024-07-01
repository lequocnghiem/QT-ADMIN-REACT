import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, Grid, makeStyles } from '@material-ui/core';
import SalesChart from './SalesChart';
import Summary from './Summary';
import RecentOrders from './RecentOrders';
import axios from 'axios';

const USD_TO_VND_EXCHANGE_RATE = 23000;

const useStyles = makeStyles({
  card: {
    background: '#f0f0f0',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  },
  cardHeader: {
    borderBottom: '1px solid #ddd',
    paddingBottom: '12px',
    marginBottom: '12px',
  },
});

const AdminPanel = () => {
  const classes = useStyles();

  const [summaryData, setSummaryData] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    totalCancelledOrders:0,
    totalRevenuerefund:0
  });

  useEffect(() => {
    // Call your API endpoint to fetch summary data
    axios.get('http://localhost:9011/api/paypal/summary')
      .then(response => {
        const { totalOrders, totalRevenue, totalProducts, totalCancelledOrders, totalRevenuerefund } = response.data;
        setSummaryData({
          totalOrders,
          totalRevenue: totalRevenue !== 0 ? (totalRevenue * USD_TO_VND_EXCHANGE_RATE).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : 0,
          totalProducts,
          totalCancelledOrders,
          totalRevenuerefund: totalRevenuerefund !== 0 ? (totalRevenuerefund * USD_TO_VND_EXCHANGE_RATE).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : 0
        });
      })
      .catch(error => {                                 
        console.error('Error fetching summary data:', error);
      });
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card className={classes.card}>
          <CardHeader title="Tổng quan" className={classes.cardHeader} />
          <CardContent>
            <Summary {...summaryData} />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card className={classes.card}>
          <CardHeader title="Biểu đồ bán hàng" className={classes.cardHeader} />
          <CardContent>
            <SalesChart />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card className={classes.card}>
          <CardHeader title="Đơn hàng gần đây" className={classes.cardHeader} />
          <CardContent>
            <RecentOrders />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AdminPanel;
