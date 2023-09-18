import React from 'react';
import Disperse from '../components/Disperse';
import SideNav from '../components/SideNav';

const Main = () => {
	return (
		<div className="flex h-screen">
			<div className="w-72 bg-white">
				<SideNav />
			</div>
			<div className="h-max w-full bg-slate-100">
				<Disperse />
			</div>
		</div>
	)
}

export default Main;