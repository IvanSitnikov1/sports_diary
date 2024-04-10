import {useState} from 'react';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {Form, Button, Container} from 'react-bootstrap';

import {AuthService} from '../services/auth.service';
import {setTokenToLocalStorage} from '../helpers/localstorage.helper';
import {login} from '../store/user/userSlice';

export const Auth = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLogin, setIsLogin] = useState(true)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const loginHandler = async (e) => {
        try {
            e.preventDefault()
            const data = await AuthService.login({
                username: email,
                password: password,
            })
            if (data) {
                setTokenToLocalStorage('token', data.access)
                dispatch(login({
                    username: email,
                    password: password,
                 }))
                navigate('/')
            }
        } catch (err) {
            console.log(err.response?.data)
        }
    }

    const registrationHandler = async (e) => {
        try {
            e.preventDefault()
            const data = await AuthService.registration({
                username: email,
                password: password,
            })
            if(data) {
                setIsLogin(!isLogin)
            }
        } catch (err) {
            const error = err.response?.data.message
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Container style={{width: '30vw'}}>
                <h2 className="text-center">
                    {isLogin ? 'Login' : 'Registration'}
                </h2>
                <Form
                    onSubmit={isLogin ? loginHandler : registrationHandler}
                    className="text-center"
                >
                    <Form.Group controlId="formBasicEmail" className="mt-3">
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword" className="mt-3">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="success" type="submit" className="mt-3">Submit</Button>
                </Form>

                <div className="text-center">
                    {isLogin ? (
                        <Button variant="light" onClick={() => setIsLogin(!isLogin)} className="mt-3">
                            You don't have an account?
                        </Button>
                    ) : (
                        <Button variant="light" onClick={() => setIsLogin(!isLogin)} className="mt-3">
                            Already have an account?
                        </Button>
                    )}
                </div>
            </Container>
        </div>
    )
}