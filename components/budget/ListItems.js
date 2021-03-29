import React from 'react';
import {Row, Col, Container } from 'reactstrap';
import styled from '@emotion/styled';
import IndividualItem from './IndividualItem';

const ListItems = ({items}) => {

    return (
        <div>
            {
                (items.length > 0 ? (
                    items.map(item => (
                        <IndividualItem key={item.id} id={item.id} concept={item.concept} amount={item.amount} kind={item.kind} date={item.date} category={item.category} />

                    ))
                ) : (
                    <p style={{color: 'white', textAlign: 'center'}}>No hay nada acá.<br/>Empezá cargando algo!</p>
                ) )
            }
        </div>
    );
}
 
export default ListItems;