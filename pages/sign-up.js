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

const Right = styled.div`
    @media (min-width: 768px){
        background-image: url('tree.jpg');
        height: 100vh;
        width: 50%;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;

    }
`;

const Left = styled.div`
    background-color: #000000;
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


const SignUp = () => {

    const router = useRouter()
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: ''
    })


    const handleChange = e => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        })
    }

    async function signUpFunction(e) {
        e.preventDefault();
        
        if(newUser.name === '') {
            swalMessage('Ups', 'El nombre es obligatorio', 'error', 3000);
        } else if (newUser.email === '') {
            swalMessage('Ups', 'El email es obligatorio', 'error', 3000);
        } else if (newUser.password === '') {
            swalMessage('Ups', 'La contraseña es obligatoria', 'error', 3000);
        } else {
            // First validation is ok
            const post = await axiosClient.post('/auth/signup', newUser);
            if(post.data.transaction === 'done') {
                msgSwal.fire({ 
                    title: '¡Que alegría!',
                    text: `${post.data.user.name}, ¡tu cuenta fue creada!`,
                    icon: 'success',
                    timer: 8000
                }).then(res => {
                router.push('/login')
                });   
            } else {
                swalMessage('Ups', 'No pudimos crear tu cuenta', 'error', 3000);
            }
        }
    }

    const msgSwal = withReactContent(Swal);
    function swalMessage(title, text, icon, timer) {
        msgSwal.fire({ title, text, icon, timer });
    }

    return (
        <All>
            <Left>
                <Form
                    method="POST"
                    onSubmit={(e) => signUpFunction(e)}
                >
                    <input type="text" name="name" value={newUser.name} onChange={handleChange} placeholder="Nombre" />
                    <input type="email" name="email" value={newUser.email} onChange={handleChange} placeholder="Email" />
                    <input type="password" name="password" value={newUser.password} onChange={handleChange} placeholder="Contraseña" />
                    <button
                        onClick={(e) => signUpFunction(e)}
                    >Registrarme</button>
                    <Link href="/login"> 
                        <a>Ya tengo cuenta, quiero iniciar sesión.</a>
                    </Link>
                </Form>
            </Left>
            <Right></Right>
        </All>
    );
}
 
export default SignUp;