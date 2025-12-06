import React from 'react';
import HeroBanner from './HeroBanner';
import Container from '../../components/Shared/Container';

const Home = () => {
    return (
        <Container>
            <h1>this is home page</h1>
             <HeroBanner></HeroBanner>
        </Container>
    );
};

export default Home;