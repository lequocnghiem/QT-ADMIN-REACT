

import * as React from 'react';
import { Create, SimpleForm, TextInput, ReferenceInput, SelectInput, TextField, Datagrid, List, DeleteButton, EditButton, ReferenceField, FunctionField, NumberInput, Loading, useDataProvider, FormDataConsumer, SelectArrayInput, useNotify, useRedirect, Edit } from 'react-admin';
import dataProvider from './customDataProvider';


export const ProductInventoryCreate = (props) => {
    const [productSizes, setProductSizes] = React.useState([]);
    const [productColors, setProductColors] = React.useState([]);
    const [productId, setProductId] = React.useState(null); // Lưu trữ productId được chọn

    React.useEffect(() => {
        // Hàm gọi API để lấy danh sách sizes và colors dựa trên productId
        const fetchSizesAndColors = async (productId) => {
            try {
                // Thay thế 'myApiEndpoint' với endpoint API thực tế của bạn
                const response = await dataProvider.getOne('product', { id: productId });
                const { sizes, colors } = response.data;
                setProductSizes(sizes);
                setProductColors(colors);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách sizes và colors:', error);
            }
        };

        // Nếu productId đã được chọn, gọi API để lấy sizes và colors
        if (productId) {
            fetchSizesAndColors(productId);
        }
    }, [productId]); // useEffect sẽ chạy lại khi productId thay đổi
    console.log(productColors,productSizes)
    console.log(productId)

    return (
        <Create {...props}>
             <SimpleForm transform={data => {
               
                const transformedData = {
                    productId: productId, 
                    colorId: data.colorId,
                    sizeId: data.sizeId,
                    quantity: data.quantity
                };
                // Remove any undefined fields
                Object.keys(transformedData).forEach(key => {
                    if (transformedData[key] === undefined || transformedData[key] === null) {
                        delete transformedData[key];
                    }
                });
                return transformedData;
            }}>
                <ReferenceInput
                    source="productId"
                    reference="product"
                    label="Sản phẩm"
                   
                >
                    <SelectInput optionText="name" />
                </ReferenceInput>

                <FormDataConsumer>
                    {({ formData, ...rest }) => {
                        // Accessing formData here
                        if (formData.product == productId || formData.product !== productId) {
                            setProductId(formData.productId); // Cập nhật productId khi có sự thay đổi
                        }
                        return null;
                    }}
                </FormDataConsumer>

                {/* ReferenceInput cho sizes */}
                <SelectInput
          label="Colors"
          source="colorId"
          choices={productColors.map(color => ({ id: color.id, color: color.color }))}
          optionText={choice => (
            <div style={{ width: '20px', height: '20px', backgroundColor: choice.color }}></div>
          )}
          optionValue="id"
        />
    {/* Your other form fields */}
    <SelectInput
                    label="sizes"
                    source="sizeId"
                    choices={productSizes.map(size => ({ id: size.id, name: size.size }))}
                    optionText="name"
                    optionValue="id"
                />
             
            

                <NumberInput source="quantity" label="Số lượng" />
            </SimpleForm>
        </Create>
    );
};





export const ProductInventoryEdit = (props) => {

    const [productSizes, setProductSizes] = React.useState([]);
    const [productColors, setProductColors] = React.useState([]);
    const [productId, setProductId] = React.useState(null); // Lưu trữ productId được chọn
    const [colorid, setcolorid] = React.useState(null); // Lưu trữ productId được chọn
    React.useEffect(() => {
        // Hàm gọi API để lấy danh sách sizes và colors dựa trên productId
        const fetchSizesAndColors = async (productId) => {
            try {
                // Thay thế 'myApiEndpoint' với endpoint API thực tế của bạn
                const response = await dataProvider.getOne('product', { id: productId });
                const { sizes, colors } = response.data;
                setProductSizes(sizes);
                setProductColors(colors);


                   // Nếu màu sắc đang được chọn không có trong danh sách mới, reset chọn màu sắc
                  
            } catch (error) {
                console.error('Lỗi khi lấy danh sách sizes và colors:', error);
            }
        };

        // Nếu productId đã được chọn, gọi API để lấy sizes và colors
        if (productId) {
            fetchSizesAndColors(productId);
        }
    }, [productId]); // useEffect sẽ chạy lại khi productId thay đổi

    return (
        <Edit {...props}>
        
            <SimpleForm>
                <ReferenceInput
                    source="product.id"
                    reference="product"
                    label="Sản phẩm"
                    
                >
                    <SelectInput optionText="name" />
                </ReferenceInput>

                <FormDataConsumer>
                    {({ formData, ...rest }) => {
                        // Accessing formData here
                        if (formData.product.id) {
                            setProductId(formData.product.id)
                        }
                        return null;
                    }}
                </FormDataConsumer>


          
 <FormDataConsumer>
                    {({ formData, ...rest }) => {
                        // Accessing formData here
                        if (formData.color.id) {
                            setcolorid(formData.color.id)
                        }
                        return null;
                    }}
                </FormDataConsumer>

                <SelectInput
          label="Color"
          source="color.id"
         
          choices={productColors.map(color => ({ id: color.id, color: color.color }))}
          optionText={choice => (
            <div style={{ width: '20px', height: '20px', backgroundColor: choice.color }}></div>
          )}
          optionValue="id"
        />
             

             <SelectInput
                    label="sizes"
                    source="size.id"
                    choices={productSizes.map(size => ({ id: size.id, name: size.size }))}
                    optionText="name"
                    optionValue="id"
                />






                <NumberInput source="quantity" label="Số lượng" />

            </SimpleForm>
        
        </Edit>
    );
};






export const ProductInventoryList = (props) => {
    return (
        <List {...props}>
            <Datagrid>
                <TextField source="id" />
                <TextField source="product.name" label="Product Name" />
                
                <FunctionField
                label="Color"
                render={record => (
                    <span style={{ backgroundColor: record.color.color, padding: '5px 10px', borderRadius: '5px' }}>
                      
                    </span>
                )}
            />
                <TextField source="size.size" label="Size" />
                <TextField source="quantity" />
                <EditButton />
                <DeleteButton />
            </Datagrid>
        </List>
    );
};