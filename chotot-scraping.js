var rp = require('request-promise');
var MAX_PAGE = 20;	// Only scrapping a maximum of 20 pages.

main();

async function main() {
	let i = 1;	//The variable counts the number of pages, with the starting page number being 1 (not 0 as in a normal loop).
	let bool = true;
	while(bool == true && i <= MAX_PAGE) {
		bool = await run(i);	//Get the JSON data of page i.
		i++;	
		await sleep(1000);		// pause for 1000ms
	}
	
}

//Get the JSON data from page [page], convert it to JSON format.
async function run(page) {
	let rsHtml = await rp('https://gateway.chotot.com/v1/public/recommender/homepage?fingerprint=55e39f0f-bc10-4262-b21b-96dffc17b4b4&page=' + page);
	let rs = JSON.parse(rsHtml);
	console.log(rs);

	if(rs.data.length  < 20) return false;

	return true;
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
