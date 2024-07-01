// RecentOrders.js
import React from 'react';
import { List, Datagrid, TextField, DateField, NumberField, ReferenceField, FunctionField } from 'react-admin';

const RecentOrders = props => (
  <List {...props} resource="paypal/recent-orders" title="Quản lý">
    <Datagrid>
      <TextField source="paymentId" label="Mã thanh toán" />
      <TextField source="currency" label="Loại tiền" />
      <ReferenceField label="Người dùng" source="idUser" reference="user" link={false}>
        <TextField source="name" />
      </ReferenceField>
      <FunctionField
  label="Số tiền"
  render={record => (
    <span>{record.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
  )}
/>

      <DateField source="paymentTime" label="Thời gian thanh toán" />
      <TextField source="order_code" label="Mã đơn hàng" />
    </Datagrid>
  </List>
);

export default RecentOrders;
