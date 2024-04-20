

// https://www.jamstec.go.jp/sp2/column/04/
// https://ja.wikipedia.org/wiki/%E5%9C%B0%E7%90%83%E5%8F%B2%E5%B9%B4%E8%A1%A8
// https://ja.wikipedia.org/wiki/%E4%BA%BA%E9%A1%9E%E3%81%AE%E9%80%B2%E5%8C%96
const events = [
	{ name: "地球の誕生", yrs: 4_600_000_000, size: 1000 },
	{ name: "月の誕生", yrs: 4_500_000_000, size: 1000 },
	{ name: "海の誕生", yrs: 4_200_000_000, size: 1000 },
	{ name: "生命の誕生", yrs: 4_000_000_000, size: 1000 },
	{ name: "光合成をするシアノバクテリアが出現", yrs: 3_200_000_000, size: 1000 },
	{ name: "シアノバクテリアが大量発生(酸素が増加)", yrs: 2_700_000_000, size: 1000 },
	{ name: "真核生物の出現", yrs: 2_100_000_000, size: 1000 },
	{ name: "全球凍結", yrs: 600_000_000, size: 1000 },
	{ name: "カンブリア紀の生命大爆発", yrs: 543_000_000, size: 1000 },
	{ name: "両生類の上陸", yrs: 360_000_000, size: 1000 },
	{ name: "爬虫類の出現", yrs: 300_000_000, size: 1000 },
	{ name: "日本列島の付加体形成が開始", yrs: 300_000_000, size: 600 },
	{ name: "パンゲア大陸誕生", yrs: 250_000_000, size: 1000 },
	{ name: "パンゲア大陸が分裂開始", yrs: 200_000_000, size: 1000 },
	{ name: "生物大量絶滅(海洋無酸素)", yrs: 250_000_000, size: 600 },
	{ name: "哺乳類の誕生", yrs: 230_000_000, size: 400 },
	{ name: "鳥類の誕生(始祖鳥)", yrs: 150_000_000, size: 700 },
	{ name: "恐竜絶滅", yrs: 65_000_000, size: 700 },
	{ name: "霊長類が出現", yrs: 65_000_000, size: 500 },
	{ name: "日本列島の形成開始", yrs: 20_000_000, size: 380 },
	{ name: "人類誕生", yrs: 7_000_000, size: 250 },
	{ name: "日本海と太平洋が分離", yrs: 4_500_000, size: 80 },
	{ name: "アウストラロピテクスの誕生", yrs: 3_700_000, size: 50 },
	{ name: "ホモ・ハビリスの誕生", yrs: 2_400_000, size: 30 },
	{ name: "旧石器時代", yrs: 2_000_000, size: 20 },
	{ name: "ホモ・エレクトスの誕生", yrs: 1_500_000, size: 12 },
	{ name: "ネアンデルタール人の誕生", yrs: 400_000, size: 6 },
	{ name: "ヒト(ホモ・サピエンス)の誕生", yrs: 200_000, size: 2.5 },
	{ name: "ヒトが世界へ拡大", yrs: 100_000, size: 1.5 },
	{ name: "最終氷期の開始", yrs: 70000, size: 1 },
	{ name: "ヒトがユーラシア大陸に進出", yrs: 50000, size: 0.6 },
	{ name: "ネアンデルタール人が絶滅", yrs: 40000, size: 0.4 },
	{ name: "ヒトが日本定住", yrs: 38000, size: 0.2 },
	{ name: "姶良カルデラが噴火", yrs: 29000, size: 0.2 },
	{ name: "最終氷期のピーク", yrs: 20000, size: 0.15 },
	{ name: "日本列島が大陸から分離", yrs: 12000, size: 0.2 },
	{ name: "最終氷期の終了", yrs: 10000, size: 0.15 },
	{ name: "縄文時代", yrs: 7000, size: 0.1 },
	{ name: "弥生時代", yrs: 2300, size: 0.085 },
	{ name: "飛鳥時代", yrs: 1400, size: 0.055 },
	{ name: "奈良時代", yrs: 1300, size: 0.04 },
	{ name: "平安時代", yrs: 1200, size: 0.029 },
	{ name: "鎌倉時代", yrs: 840, size: 0.02 },
	{ name: "室町時代", yrs: 690, size: 0.014 },
	{ name: "江戸時代", yrs: 400, size: 0.01 },
	{ name: "明治", yrs: 140, size: 0.007 },
	{ name: "大正", yrs: 100, size: 0.005 },
	{ name: "昭和", yrs: 90, size: 0.0032 },
	{ name: "平成", yrs: 30, size: 0.002 },
	{ name: "令和", yrs: 5, size: 0.001 },
];



const min = -4600000000;
const scale = 0.001;

//億、万の文字化
const okuman = function(y){
	if(y >= 100000000){
		return Math.floor(y / 100000000) + "億年前";
	}
	if(y >= 10000){
		return Math.floor(y / 10000) + "万年前";
	}
	if(y == 0){
		return "現在";
	}
	return y + "年前";
};

export default function (width, height, bbox) {

	//描画用canvas
	const cv = document.createElement("canvas");
	cv.width = width;
	cv.height = height;
	const ctx = cv.getContext("2d");

	//座標変換
	ctx.translate(width * 0.5, height * 0.5);
	ctx.scale(width / (bbox[2] - bbox[0]), -height / (bbox[3] - bbox[1]));
	ctx.translate(-(bbox[2] + bbox[0]) * 0.5, -(bbox[3] + bbox[1]) * 0.5);

	//解像度
	const level = (bbox[2] - bbox[0]) / width;

	
	//目盛の表示
	const drawScale = function(ctx,x,size){
		ctx.save();
		ctx.translate(x, 0);
		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo(-0.5 * size, - 30 * size);
		ctx.lineTo(0.5 * size, - 30 * size);
		ctx.fill();

		ctx.scale(1, -1);
		ctx.fillText(okuman(-x / scale), 2 * size, 30 * size);
		ctx.restore();
	};

	ctx.fillStyle = "white";
	ctx.strokeStyle = "white";

	// 1000年単位の目盛
	if (level < 0.1) {
		ctx.font = "0.1px sans-serif";
		for (let i = 0; i <= 10; i++) drawScale(ctx,-i * 1000 * scale,0.01);
	}

	// 1万年単位の目盛
	if (level < 1) {
		ctx.font = "1px sans-serif";
		for (let i = 0; i <= 10; i++) drawScale(ctx,-i * 10000 * scale,0.1);
	}

	// 10万年単位の目盛
	if (level < 10) {
		ctx.font = "10px sans-serif";
		for (let i = 0; i <= 10; i++) drawScale(ctx,-i * 100000 * scale,1);
	}

	// 100万年単位の目盛
	if (level < 100) {
		ctx.font = "100px sans-serif";
		for (let i = 0; i <= 10; i++) drawScale(ctx,-i * 1000000 * scale,10);
	}

	// 1000万年単位の目盛
	if (level < 1000) {
		ctx.font = "1000px sans-serif";
		for (let i = 0; i <= 10; i++) drawScale(ctx,-i * 10000000 * scale,100);
	}

	// 1億年単位の目盛
	if (level < 10000) {
		ctx.font = "10000px sans-serif";
		for (let i = 0; i <= 46; i++) drawScale(ctx,-i * 100000000 * scale,1000);
	}

	//イベントの表示
	ctx.fillStyle = "white";
	ctx.strokeStyle = "white";
	events.forEach(e => {
		ctx.font = (5 * e.size).toFixed(2) + "px sans-serif";

		ctx.save();
		ctx.translate(-e.yrs * scale, 0);
		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo(-0.5 * e.size, 30 * e.size);
		ctx.lineTo(0.5 * e.size, 30 * e.size);
		ctx.fill();

		ctx.scale(1, -1);
		ctx.fillText(e.name, 2 * e.size, (-30 + 5) * e.size);
		ctx.restore();
	});

	//線を表示
	{
		ctx.lineWidth = level;	//1px相当

		ctx.strokeStyle = "rgba(255,255,0,0.8)";
		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo(min * scale, 0);
		ctx.stroke();
	}

	return cv;
}