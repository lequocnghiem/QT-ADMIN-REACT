// ProductColor.js

import * as React from 'react';
import { Resource, List, Datagrid, TextField, EditButton, DeleteButton, Edit, Create, SimpleForm, TextInput, FunctionField } from 'react-admin';
import { SketchPicker } from 'react-color';


 export const ProductsizeList = (props) => {
    return (
        <List {...props}>
            <Datagrid>
                <TextField source="id" />
                <TextField source="size" />
                <EditButton />
                <DeleteButton/>
            </Datagrid>
        </List>
    );
};

export const ProductsizeEdit = (props) => {
    return (
        <Edit {...props}>
            <SimpleForm>
                <TextInput source="id" disabled />
                <TextInput source="size" />
            </SimpleForm>
        </Edit>
    );
};

export const ProductsizeCreate = (props) => {
  



    return (
        <Create {...props}>
            <SimpleForm>     
            <TextInput source="size" />
            </SimpleForm>
        </Create>
    );
};

