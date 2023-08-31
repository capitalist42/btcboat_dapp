import React from 'react';
import { Outlet } from 'react-router-dom';
import Header  from '../app/components/Header';
import Footer from '../app/components/Footer';

export default function RootPageContainer(): JSX.Element {
    return (
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    )
}