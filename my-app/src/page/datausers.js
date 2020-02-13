import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class DataUsers extends React.Component{
  state = {
    users : [],
    id: "",
    nama : "",
    username : "",
    password : "",
    isUpdate : false
  }

  kosong = () =>{
    this.setState({
      id : "",
      nama : "",
      username : "",
      password : "",
      isUpdate : false
    })
  }

    componentDidMount(){
       this.getUserAPI();
       //console.log(this.state);
    }

    handleChange = (e) => {
      this.setState({ [e.target.name] : e.target.value });
    }

    handleSubmit = () => {

      const dataUser = {
        nama : this.state.nama,
        username : this.state.username,
        password : this.state.password,
      };
      axios.post(`http://localhost/test_api/tambah.php`,{dataUser})
      .then(res => {
        if(res.status === 200){
          this.getUserAPI();
          this.kosong();
        }else{
          console.log("Gagal Input!!");
        }
      })
    }

  getUserAPI = () => {
     axios.get(`http://localhost/test_api/tampil.php`)
      .then(res => {
        const users = res.data;
        this.setState({ users });
      });
  }

    handleEdit = (data) => {
      this.setState({
        id : data.iduser, 
        nama : data.nama,
        username : data.username,
        password : data.password,
        isUpdate : true
      })
      //console.log(data.iduser);
    } 

    handleUpdate = () => {
      const dataUser = {
        id : this.state.id, 
        nama : this.state.nama,
        username : this.state.username,
        password : this.state.password,
      };

      axios.put(`http://localhost/test_api/edit.php`,{dataUser})
      .then(res => {
        if(res.status === 200){
          this.getUserAPI();
          this.kosong();
        }else{
          console.log("Gagal Input!!");
        }
      })
    }

    handleDelete = (id) => {
      axios.delete(`http://localhost/test_api/delete.php?iduser=${id}`)
            .then(res => {
              if(res.status === 200){
                this.getUserAPI();
              }else{
                alert('Gagal Delete!!');
              }
            })
    }

    render(){
      const isUpdate = this.state.isUpdate;
      let button;
      if(isUpdate){
        button =  <div><Button variant='warning' onClick={this.handleUpdate}>Edit</Button> <Button variant='success' onClick={this.kosong}>Batal</Button></div>;
      }else{
        button = <Button variant='primary' onClick={this.handleSubmit}>Submit</Button>;
      }

        return(
            <Container className="mt-3">
                <Row>
                    <Col xs={6} lg={6} md={6} >
                          <Card>
                            <Card.Body>
                              <Form>
                                <Form.Group controlId="formBasicEmail">
                                  <Form.Label>Nama</Form.Label>
                                  <Form.Control name="nama" onChange={this.handleChange} type="text" placeholder="Nama" value={this.state.nama} />
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                  <Form.Label>Username</Form.Label>
                                  <Form.Control name="username" type="text" onChange={this.handleChange} placeholder="Username" value={this.state.username}/>
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                  <Form.Label>Password</Form.Label>
                                  <Form.Control name="password" type="text" onChange={this.handleChange} placeholder="Password" value={this.state.password}/>
                                </Form.Group>
                                
                                  {button}
                                
                              </Form>
                            </Card.Body>
                          </Card>
                        </Col>
                    <Col xs={12} lg={12} md={12} >
                        <Table striped bordered hover className="mt-2" >
                            <thead>
                                <tr>
                                    <th>Id User</th>
                                    <th>Nama</th>
                                    <th>Username</th>
                                    <th>Password</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                  this.state.users.map((user) => 
                                    <tr key={user.iduser}>
                                      <td >{ user.iduser }</td>
                                      <td >{ user.nama }</td>
                                      <td >{ user.username }</td>
                                      <td >{ user.password }</td>
                                      <td> 
                                          <Button variant="warning" className="mr-2" onClick={() =>{ this.handleEdit(user)}} >Edit</Button> 
                                          <Button variant="danger" onClick={()=>{ this.handleDelete(user.iduser) }}  >Hapus</Button>
                                      </td>
                                  </tr>
                                  ) 
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        )
    }
}
