import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../actions/userActions';
import Loader from '../components/bootstrapHelpers/Loader';
import Message from '../components/bootstrapHelpers/Message';



const UserListScreen = () => {
    const dispatch = useDispatch();
    const allUsers = useSelector(state => state.allUsers);
    const { users, loading, error } = allUsers;


    useEffect(()=>{
        if(users.length === 0){
            dispatch(getAllUsers())
        }
    }, []);


    const deleteHandler = (id)=>{
        console.log('whatever')
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
                                 <LinkContainer to={`/user/${user._id}/edit`}>
                                     <Button className="btn-sm mr-4">
                                         <i className="fas fa-edit"></i>
                                     </Button>
                                 </LinkContainer>
                                 <Button variant="danger" className="btn-sm" onClick={()=> deleteHandler(user._id)}>
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
