var rp = require('request-promise');
var MAX_PAGE = 20;	// Chỉ lấy tối đa 20 page

main();

async function main() {
	let i = 1;	//Biến đếm số trang, số trang bắt đầu là 1 (chứ không phải 0 như vòng lặp bình thường hay dùng)
	let bool = true;
	while(bool == true && i <= MAX_PAGE) {
		bool = await run(i);	//Lấy json data của trang 1
		i++;	
		await sleep(1000);		// cho dừng 1000ms
	}
	
}

//Lấy json data của trang thứ [page], chuyển về dạng json
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