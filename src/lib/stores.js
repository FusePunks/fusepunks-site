// @ts-nocheck
import { writable } from 'svelte/store';

export const isConnected = writable(false);

export const mmWeb3 = writable(null);
export const mmAddress = writable(null);
export const mmNFTs = writable([]);
export const contractAddress = writable("0xf697F0fe68f9D1e5AdcaDF723b232eBd601e59b0");

export const mmConnect = async () => {
	if (typeof window.ethereum !== 'undefined') {
		console.log('MetaMask is installed!');
		mmNetwork();
		// eslint-disable-next-line no-undef
		const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
		mmAddress.set(accounts[0]);
	} else {
		console.log('No MetaMask!');
	}

	// eslint-disable-next-line no-undef
	mmWeb3.set(new Web3(Web3.givenProvider || "https://rpc.fuse.io"));
}

export const mmNetwork = async () => {
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
}