import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, removeUser } from '../actions/userActions';
import Loader from '../components/bootstrapHelpers/Loader';
import Message from '../components/bootstrapHelpers/Message';
import { useToasts } from 'react-toast-notifications';


const UserListScreen = ({ history }) => {
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const{ userInfo } = userLogin;

    const allUsers = useSelector(state => state.allUsers);
    const { users, loading, error } = allUsers;

    const removedUser = useSelector(state => state.removedUser);
    const { error:removedUserError } = removedUser;

    const { addToast } = useToasts();

    
    useEffect(()=>{
        if(!userInfo || !userInfo.isAdmin){
            history.push('/');
        }
       dispatch(getAllUsers());
    }, [dispatch, history, userInfo]);


    const deleteHandler = (id, userName)=>{
        if(window.confirm(`Confirm you want to delete ${userName}`)){
            dispatch(removeUser(id));
            dispatch(getAllUsers());
            if(!removedUserError){
            addToast(`${userName} has been deleted`, {
                appearance: 'success'
            });
            }
        }
    }




    return (
        <div>
            <h1>Users</h1>
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>EMAIL</th>
                            <th>ROLE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user =>(
                         <tr key={user._id}>
                             <td>{user._id}</td>
                             <td>{user.name}</td>
                             <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                             <td>
                                 {user.isAdmin ? (<i className="fas fa-user-shield">Admin</i>):
                                 (<i className="far fa-user">User</i>)
                                 }
                             </td>
                             <td className="p-1">
                                 <LinkContainer to={`/admin/user/edit/${user._id}`}>
                                     <Button className="btn-sm mr-4">
                                         <i className="fas fa-edit"></i>
                                     </Button>
                                 </LinkContainer>
                                 <Button variant="danger" className="btn-sm" onClick={()=> deleteHandler(user._id, user.name)}>
                                    <i className="fas fa-trash"></i>
                                 </Button>
                             </td>
                         </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}

export default UserListScreen
