import React, { useEffect, useRef, useState } from "react";
import {
  List,
  Datagrid,
  TextField,
  Edit,
  SimpleForm,
  EditButton,
  TextInput,
  NumberInput,
  ReferenceInput,
  SelectInput,
  useNotify,
  useRedirect,
  Create,
  FunctionField,
  ImageField,
  ImageInput,
  NumberField,
  ReferenceField,
  DateTimeInput,
  useCreate,
  useMutation, 
  Filter,
  AutocompleteInput,
  Button,
  useListContext
} from "react-admin";
import { useHistory } from 'react-router-dom';

import { Dialog, DialogActions, DialogContent, DialogTitle, TextField as MuiTextField, Grid } from '@mui/material';
import axios from "axios";
import Typography from '@mui/material/Typography';


import PrintIcon from '@mui/icons-material/Print';
import { toast } from "react-toastify";


// export const ListOrder = (props) => (



  
//   <List {...props} >
//     <Datagrid style={{ overflowX: "auto" }}>
//       <TextField source="id" />
//       <ReferenceField label="Product" source="productId" reference="product" link={false}>
//       <TextField source="name" />
//       </ReferenceField>
//       <TextField source="currency" />
//       {/* <ReferenceField label="User" source="idUser" reference="user" link={false}>
//         <FunctionField render={(record) => `${record.name} - ${record.phone}`} />
//       </ReferenceField> */}
//       {/* <TextField source="shippingInfo" /> */}
//       <TextField source="quantity" />
//       <TextField source="color" />
//       <TextField source="size" />
//       <TextField source="amount" />
//       {/* <TextField source="status" />
//       <TextField source="paymentTime"/> */}
//       <EditButton />
//     </Datagrid>
//   </List>
// );



export const ListOrder = (props) => {
 









  return (
      <>
          <List {...props}>
              <Datagrid style={{ overflowX: "auto" }}>
                  <TextField source="id" />
                  <ReferenceField label="Product" source="productId" reference="product" link={false}>
                      <TextField source="name" />
                  </ReferenceField>

                  <ReferenceField label="User" source="idUser" reference="user" link={false}>
      <FunctionField render={(record) => `${record.name} - ${record.phone}`} />
     </ReferenceField>
                  <TextField source="currency" />
                  <TextField source="quantity" />
                  <TextField source="color" />
                  <TextField source="size" />
                  <TextField source="amount" />
                 
                  
                
                  <EditButton />
              </Datagrid>
          </List>
          {/* <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Xác nhận đơn hàng</DialogTitle>
              <DialogContent>
                  <Grid container spacing={2}>
                      <Grid item xs={12}>
                          <MuiTextField
                              fullWidth
                              name="from_name"
                              label="Tên người gửi"
                              value={formData.from_name}
                              onChange={handleChange}
                          />
                      </Grid>
                      <Grid item xs={12}>
                          <MuiTextField
                              fullWidth
                              name="from_phone"
                              label="Số điện thoại người gửi"
                              value={formData.from_phone}
                              onChange={handleChange}
                          />
                      </Grid>
                      <Grid item xs={12}>
                          <MuiTextField
                              fullWidth
                              name="from_address"
                              label="Địa chỉ người gửi"
                              value={formData.from_address}
                              onChange={handleChange}
                          />
                      </Grid>
                      <Grid item xs={12}>
                          <MuiTextField
                              fullWidth
                              name="from_district_name"
                              label="Quận người gửi"
                              value={formData.from_district_name}
                              onChange={handleChange}
                          />
                      </Grid>
                      <Grid item xs={12}>
                          <MuiTextField
                              fullWidth
                              name="from_ward_name"
                              label="Phường người gửi"
                              value={formData.from_ward_name}
                              onChange={handleChange}
                          />
                      </Grid>
                      <Grid item xs={12}>
                          <MuiTextField
                              fullWidth
                              name="from_province_name"
                              label="Tỉnh người gửi"
                              value={formData.from_province_name}
                              onChange={handleChange}
                          />
                      </Grid>
                      <Grid item xs={12}>
                          <MuiTextField
                              fullWidth
                              name="to_name"
                              label="Tên người nhận"
                              value={formData.to_name}
                              onChange={handleChange}
                          />
                      </Grid>
                      <Grid item xs={12}>
                          <MuiTextField
                              fullWidth
                              name="to_phone"
                              label="số điện thoại người nhận"
                              value={formData.to_phone}
                              onChange={handleChange}
                          />
                      </Grid>
                      <Grid item xs={12}>
                          <MuiTextField
                              fullWidth
                              name="to_ward_code"
                              label="mã bưu nhận"
                              value={formData.to_ward_code}
                              onChange={handleChange}
                          />
                      </Grid>
                      <Grid item xs={12}>
                          <MuiTextField
                              fullWidth
                              name="to_address"
                              label="địa chỉ người nhận"
                              value={formData.to_address}
                              onChange={handleChange}
                          />
                      </Grid>
                      <Grid item xs={12}>
                          <MuiTextField
                              fullWidth
                              name="weight"
                              label="Cân nặng"
                              value={formData.weight}
                              onChange={handleChange}
                          />
                      </Grid>
                      <Grid item xs={4}>
                          <MuiTextField
                              fullWidth
                              name="length"
                              label="Chiều dài"
                              value={formData.length}
                              onChange={handleChange}
                          />
                      </Grid>
                      <Grid item xs={4}>
                          <MuiTextField
                              fullWidth
                              name="width"
                              label="Chiều rộng"
                              value={formData.width}
                              onChange={handleChange}
                          />
                      </Grid>
                      <Grid item xs={4}>
                          <MuiTextField
                              fullWidth
                              name="height"
                              label="Chiều cao"
                              value={formData.height}
                              onChange={handleChange}
                          />
                      </Grid>
                   
                      {formData.items.map((item, index) => (
                            <React.Fragment key={index}>
                                <Grid item xs={12}>
                                    <MuiTextField
                                        fullWidth
                                        name="name"
                                        label="Tên sản phẩm"
                                        value={item.name}
                                        onChange={(e) => handleItemChange(index, e)}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <MuiTextField
                                        fullWidth
                                        name="quantity"
                                        label="Số lượng sản phẩm"
                                        value={item.quantity}
                                        onChange={(e) => handleItemChange(index, e)}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <MuiTextField
                                        fullWidth
                                        name="price"
                                        label="Giá sản phẩm"
                                        value={item.price}
                                        onChange={(e) => handleItemChange(index, e)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <MuiTextField
                                        fullWidth
                                        name="weight"
                                        label="Cân nặng sản phẩm"
                                        value={item.weight}
                                        onChange={(e) => handleItemChange(index, e)}
                                    />
                                </Grid>
                            </React.Fragment>
                        ))}
                  </Grid>
              </DialogContent>
              <DialogActions>
                  <Button onClick={handleClose}>Hủy</Button>
                  <Button onClick={handleCreateOrder} color="primary">Tạo đơn hàng</Button>
              </DialogActions>
          </Dialog> */}
      </>
  );
};





export const OrderCreate = (props) => {
  
  const notify = useNotify();
  const redirect = useRedirect();
  const create = useCreate();

  const transformData = (data) => {
    return [data];
  };



  const onSuccess = (data) => {
   
   
    const redirectUrl = data.approvalUrl;
  
    window.location.href = redirectUrl;
  };



  return (
    <Create {...props} mutationOptions={{ onSuccess }}  transform={transformData} >
      <SimpleForm>
        <ReferenceInput label="Product" source="idProduct" reference="product">
          <SelectInput optionText="name" />
        </ReferenceInput>
        <NumberInput source="amount" />
        <SelectInput source="method" choices={[{ id: 'paypal', name: 'paypal' }]} />
        <ReferenceInput label="User" source="idUser" reference="user">
          <SelectInput optionText="name" />
        </ReferenceInput>
        <TextInput source="intent"/>
         <TextInput source="description" />
         <NumberInput source="quantity" />
        <SelectInput source="currency" choices={[{ id: 'USD', name: 'USD' }]} />
      
      
         <SelectInput source="status" choices={[
          { id: 'VERIFIED', name: 'VERIFIED' },
          { id: 'UNVERIFIED', name: 'UNVERIFIED' },
        ]} />
      </SimpleForm>
    </Create>
  );




};
