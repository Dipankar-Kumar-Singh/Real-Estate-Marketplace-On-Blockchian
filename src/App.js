import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

// Components
import Navigation from './components/Navigation';
import Search from './components/Search';
import Home from './components/Home';

// ABIs
import RealEstate from './abis/RealEstate.json';
import Escrow from './abis/Escrow.json';

// Config
import config from './config.json';

function App() {
	const loadblockchianData = async () => {
		// metamask inject in browser -> window.ethereum
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		console.log(provider);

    const account = await window.ethereum.request({
      method: 'eth_requestAccounts'
    });

    console.log(account);
	};

	useEffect(() => {
		loadblockchianData();
	}, []);

	return (
		<div>
			<div className='cards__section'>
				<h3>Welcome to Millow</h3>
			</div>
		</div>
	);
}

export default App;
