
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


export const ListChitiet = (props) => {

  const [open, setOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [name, setname] = useState(null);
  const [price, setprice] = useState(0);
  const [quanity, setquanity] = useState(null);
  const [idoder, setidorder] = useState();
  const [formData, setFormData] = useState({
    idOrder:"",
    from_name: "Lê Quốc Nghiêm",
    from_phone: "0975804203",
    from_address: "20 Tăng nhơn phú ,Phước long B, Thành phố thủ đức, Hồ Chí Minh , Vietnam",
    from_district_name: "Quận 9",
    from_ward_name: "Phường Phước Long B",
    from_province_name: "HCM",
    to_name: "",
    to_phone: "",
    to_ward_code: "20308",
    to_address: "",
    weight: 1000,  // Mặc định
    length: 1,    // Mặc định
    width: 19,     // Mặc định
    height: 10,    // Mặc định
    items: [{
        name: "",
        quantity: "",
        price: "",
        weight: 1000
    }]
});


const handleClose = () => {
    setOpen(false);
};

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
          ...formData,
          [name]: value
      });
  };



  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...formData.items];
    updatedItems[index] = {
        ...updatedItems[index],
        [name]: value
    };
    setFormData({
        ...formData,
        items: updatedItems
    });
};


const handleClickOpen =  async (userId,paymentId,idorder) => { // Nhận idUser từ tham số
  setSelectedUserId(userId); // Lưu idUser vào state
  // setname(name);
  // setprice(price*23000);
  // setquanity(quantity);
  // setidorder(idorder)

console.log(paymentId)
  try {
    const response = await axios.get(`http://localhost:9011/api/getPaypalByPaymentId/${paymentId}`);
    const products = response.data;

    const updatedItems = products.map(product => ({
      name: product.productname,
      quantity: product.quantity,
      price: (product.amount*2300),
      weight: 1200
    }));

    setFormData(prevFormData => ({
      ...prevFormData,
      idOrder: idorder,
      items: updatedItems
    }));

    
  setOpen(true);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách sản phẩm:', error);
    // Xử lý lỗi nếu cần thiết
  }
};

console.log(formData)

const handlePrint = (orderCode) => {
  const token = '45e0175b-2d97-11ef-8e53-0a00184fe694'; // Thay thế bằng token thực tế của bạn
    axios.post(
      'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/a5/gen-token',
      {
        order_codes: [orderCode]
      },
      {
        headers: {
          'Token': token,
          'Content-Type': 'application/json'
        }
      }
    )
    .then(response => {
      const printToken = response.data.data.token;
      if (printToken) {
        window.open(`https://dev-online-gateway.ghn.vn/a5/public-api/printA5?token=${printToken}`, '_blank');
      } else {
        console.error('Print token is null');
      }
    })
    .catch(error => {
      console.error('Error generating print token:', error);
    });
  };



  const handleCancelOrder = async (orderCode) => {
    try {
      const response = await axios.post(
        'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/switch-status/cancel',
        { order_codes: [orderCode] },
        {
          headers: {
            'Content-Type': 'application/json',
            'ShopId': '192607',
            'Token': '45e0175b-2d97-11ef-8e53-0a00184fe694'
          }
        }
      );
    window.location.reload()
      
  
    } catch (error) {
      toast.error('Hủy đơn hàng thất bại!');
   
    }
  };


const RenderConfirmButton = (record) => {
  const [status, setStatus] = useState(null);
  
  useEffect(() => {
    if (record.order_code) {
      axios.get(`http://localhost:9011/api/shipping-order/${record.order_code}`)
        .then(response => {
          setStatus(response.data.data.status);
         
        })
        .catch(error => {
          console.error('Error fetching status:', error);
          setStatus(null); // Xử lý lỗi nếu cần thiết
        });
    }
  }, [record.order_code]);




const getStatusText = (status) => {
  switch (status.toUpperCase()) {
    case "READY_TO_PICK":
      return <Typography style={{ color: 'green' ,fontSize:'15px'}}>Chờ lấy hàng</Typography>;
    case "PICKING":
      return <Typography style={{ color: 'green' ,fontSize:'15px'}}>Đang lấy hàng</Typography>;
    case "MONEY_COLLECT_PICKING":
      return <Typography style={{ color: 'green',fontSize:'15px' }}>Tương tác với người gửi</Typography>;
    case "PICKED":
      return <Typography style={{ color: 'green',fontSize:'15px' }}>Lấy hàng thành công</Typography>;
    case "DELIVERING":
      return <Typography style={{ color: 'green',fontSize:'15px' }}>Đang giao</Typography>;
    case "DELIVERED":
      return <Typography style={{ color: 'green',fontSize:'15px' }}>Giao hàng thành công</Typography>;
    case "DELIVERY_FAIL":
      return <Typography style={{ color: 'green',fontSize:'15px' }}>Giao hàng không thành công</Typography>;
      case "CANCEL":
      return <Typography style={{ color: 'green',fontSize:'15px' }}>Đơn hàng đã hủy</Typography>;
    default:
      return <Typography style={{ color: 'green' ,fontSize:'15px'}}>Đang tải...</Typography>;
  }
};

  

  return (
    <>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      
      <Button
        onClick={
          record.order_code
            ? undefined // Không gán onClick khi có order_code để ngăn không cho click
            : () =>
                handleClickOpen(
                  record.idUser,
                  record.paymentId,
                  record.id
                )
        }
        disabled={record.order_code ? true : false} // Vô hiệu hóa nút khi có order_code
        color="primary"
      >
        {record.order_code ? (status ? getStatusText(status) : "Đang tải...") : "Xác nhận đơn hàng"}
      </Button>
  
      {record.order_code != null && (
        <PrintIcon style={{ color: 'blue', cursor: 'pointer', marginLeft: '10px' }} onClick={() => handlePrint(record.order_code)} />
      )}
         {status == "ready_to_pick" || status == "picking" ? (
        <Button
          variant="outlined"
          style={{ color: 'red', borderColor: 'red', marginLeft: '30px' }}
          onClick={() => handleCancelOrder(record.order_code)}
        >
          Hủy đơn hàng
        </Button>

        
      ) : null}

{status == "DELIVERED" ? (
        <Button
          variant="outlined"
          style={{ color: 'red', borderColor: 'red', marginLeft: '30px' }}
          onClick={() => handleCancelOrder(record.order_code)}
        >
          Trả Hàng
        </Button>

        
      ) : null}
    </div>
  </>
  
  );
};





  useEffect(() => {
    if (open && selectedUserId) {
        axios.get(`http://localhost:9011/api/user/${selectedUserId}`)
            .then(response => {
                const userData = response.data;
                setFormData(prevFormData => ({
                  ...prevFormData,
                  // idOrder:idoder,
                  to_name: userData.name,
                  to_phone: userData.phone,
                  to_address: userData.address,
                  // items: prevFormData.items.map(item => ({
                  //     ...item,
                  //     name: name, 
                  //     price: price,
                  //     quantity:quanity
                  // }))
              }));
             
                console.log(userData)
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }
  }, [open, selectedUserId]);

  
  const handleCreateOrder = () => {
    console.log(formData);
  
    axios.post('http://localhost:9011/api/shipping-order', formData)
    .then(response => {
        console.log('Tạo mã vận đơn thành công:', response.data);
        handleClose(); // Đóng form sau khi tạo đơn hàng thành công
        window.location.reload()
    })
    .catch(error => {
        console.error('Error creating order:', error);
        // Xử lý lỗi nếu cần thiết
    });
  };

  return (

<>
  
    <List {...props} >
      <Datagrid style={{ overflowX: "auto" }}>
        <TextField source="paymentId" />
        {/* <ReferenceField label="Product" source="productId" reference="products" link={false}>
        <TextField source="name" />
        </ReferenceField> */}
        <TextField source="currency" />
        <ReferenceField label="User" source="idUser" reference="user" link={false}>
          <FunctionField render={(record) => `${record.name} - ${record.phone}`} />
        </ReferenceField>
        {/* <TextField source="shippingInfo" /> */}
      
        <TextField source="amount" />

        <TextField source="paymentTime"/>
        <TextField label="Mã vận đơn"  source="order_code" />
        <FunctionField render={RenderConfirmButton} />
      </Datagrid>
    </List>
    <Dialog open={open} onClose={handleClose}>
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
          </Dialog>

</>
);

};
