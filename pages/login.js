import React, {useState} from 'react';
import {Row, Col, Container} from 'reactstrap';
import styled from '@emotion/styled';
import Link from 'next/link';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axiosClient from '../config/axios.js';
import { useRouter } from 'next/router'

const All = styled.div`
    @media (min-width: 768px){
        display: flex;    
    }
`;

const Left = styled.div`
    @media (min-width: 768px){
        background-image: url('boat.jpg');
        height: 100vh;
        width: 50%;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }
`;

const Right = styled.div`
    background-color: black;
    height: 100vh;
    position: relative;
    @media (min-width: 768px){
        width: 50%;
    }
`;

const Form = styled.form`
    text-align: center;
    max-width: 30rem;
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);

    input {
        background-color: transparent;
        border: none;
        border-bottom: 1px solid white;
        color: white;
        width: 100%;
        margin: 2rem 0;
        &:focus {
            outline: none;
        }
    }
    button {
        background-color: white;
        border: none;
        color: black;
        padding: .5rem 3rem;
        display: block;
        width: 100%;
        margin-top: 2rem;
        transition: all .5s ease;
        &:hover {
            background-color: #cccccc;
        }
    }
    a {
        color: #4e4e4e;
        margin-top: 2rem;
        text-align: center;
        font-size: 1.4rem;
    }
`;

const Login = () => {

    const router = useRouter()
    const [user, setUser] = useState({
        email: '',
        password: ''
    })


    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    async function loginFunction(e) {
        e.preventDefault();
        
        if (user.email === '') {
            swalMessage('Ups', 'El email es obligatorio', 'error', 3000);
        } else if (user.password === '') {
            swalMessage('Ups', 'La contraseña es obligatoria', 'error', 3000);
        } else {
            // First validation is ok
            const post = await axiosClient.post('/auth/login', user);
            if(post.data.transaction === 'done') {
                localStorage.setItem('piggy', JSON.stringify(post.data.user));
                router.push('/');
            } else {
                swalMessage('Ups', 'Los datos ingresados no son correctos.', 'error', 3000);
            }
        }
    } 

    async function forgotPassword() {
        if (user.email === '') {
            swalMessage('Ups', 'El email es obligatorio', 'error', 3000);
        } else {
            const post = await axiosClient.post('/auth/lost-password', user);
            if(post.data.message === 'sent') {
                swalMessage('No te preocupes', 'Te enviamos por email una nueva contraseña.', 'success', 10000);
            }
        }
    }

    const msgSwal = withReactContent(Swal);
    function swalMessage(title, text, icon, timer) {
        msgSwal.fire({ title, text, icon, timer });
    }

    return (
        <All>
            <Left></Left>
            <Right>
                <Form
                    onSubmit={(e) => loginFunction(e)}
                >
                    <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" />
                    <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Contraseña" />
                    <button
                        onClick={(e) => loginFunction(e)}
                    >Iniciar sesión</button>
                    <Link href="/sign-up"> 
                        <a>No tengo cuenta, quiero registrarme.</a>
                    </Link>
                    <br/>
                    <a
                        style={{cursor: 'pointer'}}
                        onClick={() => forgotPassword()}
                    >Olvidé mi contraseña</a>

                </Form>

            </Right>
        </All>
    );
}
 
export default Login;