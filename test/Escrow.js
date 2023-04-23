const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
	return ethers.utils.parseUnits(n.toString(), 'ether');
};

describe('Escrow', () => {
	let buyer, seller, inspector, lender; // accounts
	let realEstate, escrow; // contracts ;

	beforeEach(async () => {
		// setup accounts
		const signers = await ethers.getSigners();
		[buyer, seller, inspector, lender] = signers; // list of 20

        // Deploy Real Estate
        const RealEstate = await ethers.getContractFactory('RealEstate')
        realEstate = await RealEstate.deploy()

		console.log('RealEstate address:', realEstate.address);

		// Mint
		const URL_RealEstate =
			'https://ipfs.io/ipfs/QmTudSYeM7mz3PkYEWXWqPjomRPHogcMFSq7XAvsvsgAPS';
		let transaction = await realEstate.mint(URL_RealEstate);
		await transaction.wait();

		const Escrow = await ethers.getContractFactory('Escrow');
		escrow = await Escrow.deploy(
			realEstate.address,
			seller.address,
			inspector.address,
			lender.address
		);
        
           // Approve Property
        transaction = await realEstate.connect(seller).approve(escrow.address, 1)
        await transaction.wait()

        // List Property
        transaction = await escrow.connect(seller).list(1, buyer.address, tokens(10), tokens(5))
        await transaction.wait()
	}); 

	describe('Deployment', () => {
        it('Returns NFT address', async () => {
            const result = await escrow.nftAddress()
            expect(result).to.be.equal(realEstate.address)
        })

		it('Returns seller', async () => {
			const result = await escrow.seller();
			expect(result).to.equal(seller.address);
		});

		it('Returns inspector', async () => {
            const result = await escrow.inspector();
            expect(result).to.equal(inspector.address);
        });

		it('Returns lender', async () => {
            const result = await escrow.lender();
            expect(result).to.equal(lender.address);
        });
	});

    describe('Listing', () => {
		it('Update ownership', async () => {
            expect(await realEstate.ownerOf(1)).to.be.equal(escrow.address)
		});
	});

});
