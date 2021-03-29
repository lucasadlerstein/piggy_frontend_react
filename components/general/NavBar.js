import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router'
import {Row, Col, Container} from 'reactstrap';
import Link from 'next/link';
import styled from '@emotion/styled';

const ButtonAuth = styled.a`
    color: white;
    border-bottom: 1px solid transparent;
    border-left: 1px solid white;
    padding-left: 1rem;
    margin: 0 1rem;
    transition: all .5s ease;
    &:hover {
        border-bottom: 1px solid white;
        border-left: 1px solid transparent;
        color: white;
        text-decoration: none;
        cursor: pointer;
    }
`;

const PersonInfo = styled.div`
    display: flex;
    justify-content: flex-end;
    p {
        color: white;
        width: fit-content;
        margin: 0;
    }
`;

const NavBar = () => {

    const router = useRouter()
    const [user, setUser] = useState({});

    useEffect( () => {
        if(localStorage.getItem('piggy')) {
            setUser(JSON.parse(localStorage.getItem('piggy')));
        } else {
            router.push('/login');
        }
        // eslint-disable-next-line
    }, [])

    function logOutFunction() {
        localStorage.removeItem('piggy');
        router.push('/login');
    }

    return (
        <div className="bg-black py-3">
            <Container>
                <Row>
                    <Col xs={6} lg={6}>
                        <img src="piggy.png" alt="Piggy Logo" height="100" />
                    </Col>
                    <Col xs={6} lg={6} className="my-auto text-right">
                        <PersonInfo>
                            <p>Hola {user.name}</p>
                            <ButtonAuth
                                onClick={() => logOutFunction()}
                            >Cerrar sesión</ButtonAuth>
                        </PersonInfo>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
 
export default NavBar;