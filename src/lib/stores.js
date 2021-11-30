// @ts-nocheck
import { writable } from 'svelte/store';

export const isConnected = writable(false);

export const mmWeb3 = writable(null);
export const mmAddress = writable(null);
export const mmNFTs = writable([]);
export const contractAddress = writable("0x080520C8B95e4bbfc55Aada2a362575433E56533");

export const mmConnect = async () => {
	try {
		if (typeof window.ethereum !== 'undefined') {
			console.log('MetaMask is installed!');
			mmNetwork();
			// eslint-disable-next-line no-undef
			const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
			mmAddress.set(accounts[0]);
			// eslint-disable-next-line no-undef
			mmWeb3.set(new Web3(Web3.givenProvider || "https://rpc.fuse.io"));
		} else {
			console.log('No MetaMask!');
		}

		const asdf = mmWeb3.subscribe(value => {
			console.log(value);
		});


	} catch(e) {
		console.log(e);
	}
}

export const mmNetwork = async () => {
	try {
		window.ethereum.request({
			method: 'wallet_addEthereumChain',
			params: [{
				chainId: '0x7a',
				chainName: 'FuseChain',
				nativeCurrency: {
					name: 'Fuse',
					symbol: 'FuseChain',
					decimals: 18
				},
				rpcUrls: ['https://rpc.fuse.io'],
				blockExplorerUrls: ['https://explorer.fuse.io']
			}]
		}).catch((error) => {
			console.log(error)
		});
	} catch (e) {
		console.log(e);
	}
}