import React, { Component, Fragment } from 'react'
import {GetUsers, EditUser, DeleteUser} from '../API/GetData.js'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faSave } from '@fortawesome/free-solid-svg-icons'
import Form from 'react-bootstrap/Form'

export class UsersSetting extends Component {
    constructor() {
        super()
        this.state = ({
            usersData: [],
            activeBtn: ''
        })
    }
    componentDidMount() {
       this.handleUsersFilter('all')
    }

    handleUsersFilter = request => {
        GetUsers()
        .then(response => {
            if (request === 'all') {
                this.setState({
                    usersData: response.data,
                    activeBtn: 'all'
                })
            } else if (request === 'confirmedUsers') {
                this.setState({
                    usersData: response.data.filter(x => x.confirmed === true),
                    activeBtn: 'confirmedUsers'
                })
            } else if (request === 'newUsers') {
                this.setState({
                    usersData: response.data.filter(x => x.confirmed !== true),
                    activeBtn: 'newUsers'
                })
            }
            
        })
        .catch(err => {

        });
    }

    handleUserSettings = (event) => {
        const index = event.target.value;
        const id = event.target.id;
        const {value, name} = event.target;
        const usersData = this.state.usersData;
console.log(event.target.id)
        if (name === 'confirm') {
            const user = usersData[index];
            user.confirmed = !user.confirmed;
            usersData[index] = user;
            this.setState({
                usersData: usersData
            })
        } else if (name === 'type') {
            const user = usersData[id];
            user.type = value;
            usersData[id] = user;
            this.setState({
                usersData: usersData
            })
        }
    }

    handleSaveUser = id => {
        const userData = this.state.usersData;
        function findWithAttr(array, attr, value) {
            for(var i = 0; i < array.length; i += 1) {
                if(array[i][attr] === value) {
                    return i;
                }
            }
            return -1;
        }
        const userIndex = findWithAttr(userData, '_id', id)
        EditUser(id, userData[userIndex]);
        
    }

    handleRemoveUser = id => {
        DeleteUser(id)
    }

    handleSaveAll = () => {
        const userData = this.state.usersData;
        for(var i = 0; i < userData.length; i += 1) {
            EditUser(userData[i]._id, userData[i]);
        }
    }

    render() {
        const newUsersCount = this.state.usersData.filter(x => x.confirmed !== true).length
        localStorage.setItem('newUserRequests', newUsersCount)
        return (
            <Fragment>
                <ButtonGroup className="m-t-b-20">
                    <Button variant={this.state.activeBtn === "all" ? 'dark' : 'secondary'} onClick={() => this.handleUsersFilter('all')}>All Users</Button>
                    <Button variant={this.state.activeBtn === "newUsers" ? 'dark' : 'secondary'} onClick={() => this.handleUsersFilter('newUsers')}>New Users</Button>
                    <Button variant={this.state.activeBtn === "confirmedUsers" ? 'dark' : 'secondary'} onClick={() => this.handleUsersFilter('confirmedUsers')}>Confirmed Users</Button>
                </ButtonGroup>
                <Table striped bordered responsive hover size="sm" className="text-center">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Passwod</th>
                            <th>Type</th>
                            <th>confirmed</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                    this.state.usersData.map((user, index) => 
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.password}</td>
                                <td>
                                    <select className="form-control" name="type" onChange={this.handleUserSettings} id={index} defaultValue={user.type}>
                                        <option value="admin">admin</option>
                                        <option value="user">user</option>
                                        <option value="visitor">visitor</option>
                                    </select>
                                </td>
                                <td>
                                <Form.Check 
                                    type="switch"
                                    id={index}
                                    label=""
                                    name="confirm"
                                    value={index}
                                    className="m-a-5"
                                    onChange={this.handleUserSettings} checked={user.confirmed}
                                />
                                    
                                </td>
                                <td>
                                    <Button variant="success" className="m-a-5" size="sm" onClick={() => this.handleSaveUser(user._id)}><FontAwesomeIcon icon={faSave} /></Button>
                                    <Button variant="danger" className="m-a-5" size="sm" onClick={() => this.handleRemoveUser(user._id)}><FontAwesomeIcon icon={faTrashAlt} /></Button>
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </Table>
                <Button variant="success" onClick={() => this.handleSaveAll()}><FontAwesomeIcon icon={faSave} /> Save All</Button>
            </Fragment>
        )
    }
}

export default UsersSetting;
