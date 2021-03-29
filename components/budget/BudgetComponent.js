import React, {useState, useEffect} from 'react';
import {Col, Row, Container} from 'reactstrap';
import AddItem from './AddItem';
import ListItems from './ListItems';
import styled from '@emotion/styled';
import axiosClient from '../../config/axios.js';

const BalanceLabel = styled.div`
    padding: 1rem 2.5rem;
    text-align: center;
    border-radius: 5rem;
    transition: all 1s ease;
`;

const BalanceSpent = styled(BalanceLabel)`
    color: red;
    border: 1px solid red;
    &:hover {
        background-color: red;
        color: black;
    }
`;

const BalanceEarned = styled(BalanceLabel)`
    color: #00e431;
    border: 1px solid #00e431;
    &:hover {
        background-color: #00e431;
        color: black;
    }
`;

const TotalBalance = styled(BalanceLabel)`
    color: #ff00dd;
    border: 1px solid #ff00dd;
    &:hover {
        background-color: #ff00dd;
        color: black;
    }
`;

const BudgetComponent = () => {

    const [listOfItemsDB, setListOfItemsDB] = useState([]);
    const [balance, setBalance] = useState({
        earned: 0,
        spent: 0,
        total: 0
    })

    useEffect(() => {
        const getFromDatabase = async () => {
            const userId = JSON.parse(localStorage.getItem('piggy'));
            await axiosClient.get(`/items/list/${userId.id}`)
                .then(resp => {
                    setListOfItemsDB(resp.data.items);
                    let ear = 0;
                    let spe = 0;
                    resp.data.items.map(item => {
                        if(item.kind == 1) {
                            ear = ear + item.amount;
                        } else if (item.kind == 0) {
                            spe = spe + item.amount;
                        }
                    })
                    setBalance({
                        total: ear - spe,
                        spent: spe,
                        earned: ear
                    })
                })
                .catch(error => {
                    console.log(error)
                })
        }
        setTimeout(() => {
            getFromDatabase();
        }, 500);
        // eslint-disable-next-line
    }, []);

    return (
        <div className="bg-black">
            <Container className="py-5">
                <Row>
                    <Col>
                        <BalanceEarned>${balance.earned}</BalanceEarned>
                    </Col>
                    <Col>
                        <BalanceSpent>${balance.spent}</BalanceSpent>
                    </Col>
                    <Col>
                        <TotalBalance>${balance.total}</TotalBalance>
                    </Col>
                </Row>
                <AddItem />
                <ListItems items={listOfItemsDB} />
            </Container>
        </div>
    );
}
 
export default BudgetComponent;