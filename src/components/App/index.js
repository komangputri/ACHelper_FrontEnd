import React, { Component } from 'react';
import { getUser } from 'javascripts/firebase'
import axios from 'axios';
// import logo from 'components/App/logo.svg';
// import './style.css';
import { Button, Form, FormGroup, Label, Input, Card, CardBody, Row, Col, Container, FormFeedback } from 'reactstrap';

class App extends Component {
    constructor() {
        super();
        this.state = {
            data: '',
            loading: true,
            input: {
                email: '',
                password: ''
            }
        };
    }
    componentDidMount () {
        console.log(this.props.location.query);
        if (Object.keys(this.props.location.query).length === 0){
            this.setState({
                data: {
                    valid: false
                },
                loading: false
            })
        }else {
            const token = this.props.location.query.token;
            getUser(token).then( user => {
                const userObject = user.val();
                if (userObject !== null){
                    console.log(user.val());
                    console.log("Valid");
                    this.setState({
                        data: {
                            valid: true,
                            user: userObject[Object.keys(userObject)],
                            skypeId: Object.keys(userObject)
                        },
                        loading: false
                    })
                }else {
                    console.log('Tidak Valid');
                    this.setState({
                        data: {
                            valid: false
                        },
                        loading: false
                    })
                }
            }).catch( error => {
                console.log(error);
            });

        }
    }
    onChange = (e) => {
        // Because we named the inputs to match their corresponding values in state, it's
        // super easy to update the state
        const state = this.state.input;
        state[e.target.name] = e.target.value;
        this.setState(state);
    };

    onSubmit = (e) => {
        e.preventDefault();
        const { password, email } = this.state.input;
        axios.post('https://us-central1-achelper-f04aa.cloudfunctions.net/login', {
            skype: this.state.data.skypeId[0],
            verifyToken: this.state.data.user.verifyToken,
            email: email,
            password: password
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
            // window.location.reload()
        });
        // this.props.createSection(sectionName)
        // ref.value = ''
    };
    render() {
        let content;
        if (this.state.loading) {
            content = <div>Loading...</div>;
        } else {
            if (this.state.data.valid){
                const { email, password} = this.state.input;
                const isEnabled =
                    email.length > 0 &&
                    password.length > 0;
                content =   <Container>
                                <Row>
                                    <Col sm={{ size: 8, order: 2, offset: 2 }}>
                                        <Card>
                                            <CardBody>
                                                <Form onSubmit={this.onSubmit} inline>
                                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                        <Label for="email" className="mr-sm-2">Email</Label>
                                                        <Input type="email" name="email" id="email" placeholder="active collab email" value={email} onChange={this.onChange}/>
                                                        <FormFeedback>Oh no! Invalid</FormFeedback>
                                                    </FormGroup>
                                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                        <Label for="password" className="mr-sm-2">Password</Label>
                                                        <Input type="password" name="password" id="password" placeholder="active collab password" value={password} onChange={this.onChange}/>
                                                        <FormFeedback>Oh no! Invalid Password</FormFeedback>
                                                    </FormGroup>
                                                    <Button color="primary" disabled={!isEnabled}>Submit</Button>
                                                </Form>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </Container>;
            }else{
                content = <h1>Not Valid Data</h1>;
            }
        }
        return content;
    }
}

export default App;
