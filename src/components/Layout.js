import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import React from 'react'
import Header from './Header';

const Layout = () => {
	return (
		<main className="App">
			<Header />
			<Outlet />
			<Footer />
		</main>
	)
}

export default Layout
