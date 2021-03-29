import React, {useState, useEffect} from 'react';
import {Row, Col} from 'reactstrap';
import styled from '@emotion/styled';
import axiosClient from '../../config/axios.js';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {useRouter} from 'next/router';

const AddItemBox = styled.form`
    border: 1px solid white;
    padding: 2rem 5rem;
    border-radius: 5rem;
    margin: 3rem 0 5rem;
`;

const TextField = styled.input`
    border: none;
    background-color: #202020;
    color: white;
    padding: 1rem 2rem;
    width: 100%;
    margin: .5rem;
    &:focus {
        outline: none;
    }

    @media (max-width: 992px){
        border-radius: 5rem;
        margin-bottom: 1rem;
    }
`;

const Select = styled.select`
    border: none;
    background-color: #202020;
    color: white;
    padding: 1rem 2rem;
    width: 100%;
    margin: .5rem;
    &:focus {
        outline: none;
    }

    @media (max-width: 992px){
        border-radius: 5rem;
        margin-bottom: 1rem;
    }
`;

const SubmitButton = styled(TextField)`
    transition: all 1s ease;
    width: 100%;
    &:hover {
        background-color: white;
        color: black;
    }
`;

const AddItem = () => {

    const router = useRouter();

    useEffect(() => {
        setEntireUser(JSON.parse(localStorage.getItem('piggy')));
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const ie = urlParams.get('ie');


        if (ie !== null) {
            // Editing
            setEditing(true);
            takeOneFromDB(ie);
        }
        async function takeOneFromDB(id) {
            await axiosClient.get(`items/one/${id}`)
                .then(it => {
                    setNewItem(it.data.item)
                })
                .catch(err => {
                    console.log(err)
                })
        }
        // eslint-disable-next-line
    }, [])

    const [entireUser, setEntireUser] = useState({})
    const [editing, setEditing] = useState(false);
    const [newItem, setNewItem] = useState({
        concept: '',
        amount: '',
        date: Date.now(),
        kind: '1',
        category: 'Trabajo'
    });

    

    const categoriesSpend = ['Comida', 'Viajes', 'Ocio', 'Gustos', 'Regalos', 'Impuestos', 'Otros']
    const categoriesEarn = ['Trabajo', 'Deuda', 'Changa', 'Otros']

    const handleChange = e => {
        setNewItem({
            ...newItem,
            [e.target.name]: e.target.value
        })
    }

    const saveTransaction = async e => {
        e.preventDefault();
        if(newItem.concept === '') {
            swalMessage('Ups', 'El concepto es obligatorio.', 'error', 3000);
        } else if(newItem.amount === '') {
            swalMessage('Ups', 'El monto es obligatorio.', 'error', 3000);
        } else if(newItem.kind === '') {
            swalMessage('Ups', 'El tipo de gasto es obligatorio.', 'error', 3000);
        }
        if(editing) {
            await axiosClient.put(`/items/edit/${entireUser.id}`, newItem)
                .then(resp => {
                    // router.push('/');
                    window.location.href = '/';
                })
                .catch(error => {
                    console.log(error)
                })
        } else {
            await axiosClient.post(`/items/new/${entireUser.id}`, newItem)
                .then(resp => {
                    window.location.href = '/';
                })
        }
        
    }

    const msgSwal = withReactContent(Swal);
    function swalMessage(title, text, icon, timer) {
        msgSwal.fire({ title, text, icon, timer });
    }

    return (
        <AddItemBox onSubmit={(e) => saveTransaction(e)}>
            <Row>
                <Col xs={12} sm={6} lg={2}>
                    <TextField style={{borderBottomLeftRadius: '5rem', borderTopLeftRadius: '5rem'}} type="text" name="concept" value={newItem.concept} onChange={handleChange} placeholder="Concepto" />
                </Col>
                <Col xs={12} sm={6} lg={2}>
                    <TextField type="number" name="amount" value={newItem.amount} onChange={handleChange} placeholder="Monto" />
                </Col>
                <Col xs={12} sm={6} lg={3}>
                    <TextField type="date" name="date" value={newItem.date} onChange={handleChange} placeholder="Fecha" />
                </Col>
                <Col xs={12} sm={6} lg={2}>
                    <Select value={newItem.kind} name="kind" disabled={editing === true ? true : false} onChange={handleChange}>
                        <option value="1">Ingreso</option>
                        <option value="0">Egreso</option>
                    </Select>
                </Col>
                <Col xs={12} sm={6} lg={2}>
                    <Select value={newItem.category} name="category" onChange={handleChange}>
                        {
                            (newItem.kind == 1) ? (
                                categoriesEarn.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))
                            ) : (
                                categoriesSpend.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))
                            )
                        }
                    </Select>
                </Col>
                <Col xs={12} sm={6} lg={1}>
                    <SubmitButton onSubmit={(e) => saveTransaction(e)} style={{borderBottomRightRadius: '5rem', borderTopRightRadius: '5rem'}} type="submit" value="➔" />
                </Col>
            </Row>
        </AddItemBox>
    );
}
 
export default AddItem;