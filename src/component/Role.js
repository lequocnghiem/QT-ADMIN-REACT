import * as React from 'react';
import { 
    List, 
    Datagrid, 
    TextField, 
    EditButton, 
    DeleteButton, 
    Edit, 
    Create, 
    SimpleForm, 
    TextInput,
    useRedirect,
    useNotify
} from 'react-admin';

export const RoleList = (props) => {
    return (
        <List {...props}>
            <Datagrid>
                <TextField source="id" />
                <TextField source="name" />
                <EditButton />
                <DeleteButton  />
            </Datagrid>
        </List>
    );
};



export const RoleEdit = (props) => {
    return (
        <Edit {...props}>
            <SimpleForm>
                <TextInput source="id" disabled />
                <TextInput source="name" />
            </SimpleForm>
        </Edit>
    );
};

export const RoleCreate = (props) => {
    const notify = useNotify();
  const redirect = useRedirect();
  const onSuccess = (data) => {
    notify(`Post created successfully`);

    redirect("list", "user/role");
  };
    return (
        <Create {...props} mutationOptions={{ onSuccess }} redirect="user/role">
            <SimpleForm>
                <TextInput source="name" />
            </SimpleForm>
        </Create>
    );
};