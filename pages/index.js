import React from 'react';
import Head from 'next/head';
import Layout from '../components/general/Layout';
import BudgetComponent from '../components/budget/BudgetComponent';

const Index = () => {
  
  return ( 
    <>
      <Head>
        <title>Piggy - Save Money</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <BudgetComponent />
      </Layout>
    </>
  );
}
 
export default Index;