import React from 'react';
import styled from '@emotion/styled';
import {Col, Row} from 'reactstrap';
import {useRouter} from 'next/router';
import axiosClient from '../../config/axios.js';

const Item = styled(Row)`
    border-bottom: 1px solid white;
    padding: 1.5rem 0;
    color: #d6d6d6;
    @media (max-width: 992px){
        text-align: center;
        div {
            margin: .5rem 0;
        }
    }
`;

const ActionButtons = styled.div`
    display: flex;
    justify-content: flex-end;
    button {
        background-color: transparent;
        border: none;
        border-radius: 100%;
        width: 100%;
        transition: all .3s ease;
        &:hover {
            transform: rotate(45deg);
        }
        img {
            height: 3rem;
        }
    }
`;

const IndividualItem = ({concept, amount, date, kind, category, id}) => {

    const router = useRouter();
  
    async function deleteItem(id) {
        console.log(id)
        await axiosClient.delete(`/items/delete/${id}`)
            .then(resp => {
                window.location.href = '/';
            })
    }

    function editItem(id) {
        // router.push(`/?ie=${id}`);
        window.location.href = `/?ie=${id}`;
    }
  
    return (
        <Item>
            <Col xs={12} md={12} lg={2} style={{fontWeight: 'bold'}}>
                {concept}
            </Col>
            <Col xs={12} md={12} lg={2}>
                {date}
            </Col>
            <Col xs={4} md={4} lg={2}>
                {category}
            </Col>
            <Col xs={4} md={4} lg={2}>
                ${amount}
            </Col>
            <Col xs={4} md={4} lg={2}>
                {kind == '1' ? <p style={{color: '#00e431'}}>Ingreso</p> : <p style={{color: 'red'}}>Egreso</p>}
            </Col>
            <Col xs={4} md={4} lg={2} className="mx-auto">
                <ActionButtons>
                    <button
                        onClick={() => editItem(id)}
                    >
                        <img src="edit-icon.png" alt="Editar entrada"/>
                    </button>
                    <button
                        onClick={() => deleteItem(id) }
                    >
                        <img src="delete-icon.png" alt="Eliminar entrada"/>
                    </button>
                </ActionButtons>
            </Col>


        </Item>
    );
}
 
export default IndividualItem;