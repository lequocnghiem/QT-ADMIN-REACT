// ProductColor.js

import * as React from 'react';
import { Resource, List, Datagrid, TextField, EditButton, DeleteButton, Edit, Create, SimpleForm, TextInput, FunctionField } from 'react-admin';
import { SketchPicker } from 'react-color';


 export const ProductColorList = (props) => {
    return (
        <List {...props}>
            <Datagrid>
                <TextField source="id" />
                <FunctionField
                label="Color"
                render={record => (
                    <span style={{ backgroundColor: record.color, padding: '5px 10px', borderRadius: '5px' }}>
                      
                    </span>
                )}
            />
                <EditButton />
                <DeleteButton />
            </Datagrid>
        </List>
    );
};

export const ProductColorEdit = (props) => {
    return (
        <Edit {...props}>
            <SimpleForm>
                <TextInput source="id" disabled />
                <TextInput source="color" />
            </SimpleForm>
        </Edit>
    );
};

export const ProductColorCreate = (props) => {
  



    return (
        <Create {...props}>
            <SimpleForm>     
            <TextInput source="color" />
            </SimpleForm>
        </Create>
    );
};

