import React from 'react';
import Hero from './Hero.jsx';
import Developers from './Developers.jsx';
import ApiDevelopment from './ApiDevelopment.jsx';
import DashboardManagement from './DashboardManagement.jsx';
import TrustedByDevelopers from './TrustedByDevelopers.jsx';
import TryIt from './TryIt.jsx';
import ReadyToCharge from './ReadyToCharge.jsx';
import DocumentationSupport from './DocumentationSupport.jsx';
import Integrate from './Integrate.jsx';

const Home = () => {
	return (
		<>
			<Hero />
			<Developers />
			<ApiDevelopment />
			<DashboardManagement />
			<TrustedByDevelopers />
			<TryIt />
			<ReadyToCharge />
			<DocumentationSupport />
			<Integrate />
		</>
	);
};

export default Home;
