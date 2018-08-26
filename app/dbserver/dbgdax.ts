import * as mongoose from 'mongoose';
import { ExchangeCodes} from 'wallstrat';


import {
	
	Tokens, ProductsPairs, TokenInfo, ProductsPairsInfo, OrderBook,
	BestBidBestAsk, Ticker, Trade, HistoricalData, PriceChange, feed

} from './db';



function syncOrderBook(){
	for(let pr of (feed.getProductsPairs(ExchangeCodes.GDAX)) ){
		for(let symbol of pr.symbols){
			// book
			feed.getOrderBook(ExchangeCodes.GDAX, {productID:symbol, level:2}).then(book=>{
				
				const query = {
					exchange:'gdax',
					product_id:symbol
				}
				const orderBook = {
					$push:{
						order_book:{
							$each: [book], // data here  [ ] = default 
							$slice: -3000 // last three thousands updates 
						}
					},
					exchange:'gdax',
					product_id:symbol,
					level:2
				};
				const option = { upsert: true, new: true };
				OrderBook.updateOne(
   					query,
   					orderBook,
   					option,
   					function(error, success){
     					// console.log("error ", error) 
     					console.log("success ", success) 
   					}
				)
				// OrderBook.findOne(query, function (err, doc) {
  		// 			// console.log("doc ", JSON.stringify(doc))
				// })
			});

		}
	}
	setTimeout(syncOrderBook, 60000*30); // 0.5 hour 
}

function syncBestBidBestAsk(){
	for(let pr of (feed.getProductsPairs(ExchangeCodes.GDAX)) ){
		for(let symbol of pr.symbols){
			// best bid best ask
			feed.getBestBidBestAsk(ExchangeCodes.GDAX, {productID:symbol}).then(best_bid_best_ask=>{

				const query = {
					exchange:'gdax',
					product_id:symbol
				}
				const best_bid_ask = {
					$push:{
						bb:{
							$each: [best_bid_best_ask], // data here  [ ] = default 
							$slice: -3000 // last three thousands updates 
						}
					},
					exchange:'gdax',
					product_id:symbol
				};
				const option = { upsert: true, new: true };
				BestBidBestAsk.updateOne(
   					query,
   					best_bid_ask,
   					option,
   					function(error, success){
     					// console.log("error ", error) 
     					console.log("success ", success) 
   					}
				)
				// BestBidBestAsk.findOne(query, function (err, doc) {
  		// 			// console.log("doc ", JSON.stringify(doc))
				// })

			});
		}
	}
	setTimeout(syncBestBidBestAsk, 60000*30); // 0.5 hour 
}
function syncTicker(){
	for(let pr of (feed.getProductsPairs(ExchangeCodes.GDAX)) ){
		for(let symbol of pr.symbols){
			// ticker 
			feed.getTicker(ExchangeCodes.GDAX, {productID:symbol}).then(tick=>{

				const query = {
					exchange:'gdax',
					product_id:symbol
				}
				const ticker_ = {
					$push:{
						ticker:{
							$each: [tick], // data here  [ ] = default 
							$slice: -3000 // last three thousands updates 
						}
					},
					exchange:'gdax',
					product_id:symbol
				};
				const option = { upsert: true, new: true };
				Ticker.updateOne(
   					query,
   					ticker_,
   					option,
   					function(error, success){
     					// console.log("error ", error) 
     					console.log("success ", success) 
   					}
				)
				// Ticker.findOne(query, function (err, doc) {
  		// 			// console.log("doc ", JSON.stringify(doc))
				// })

			});
		}
	}
	setTimeout(syncTicker, 60000*30); // 0.5 hour 
}
function syncTrades(){
	for(let pr of (feed.getProductsPairs(ExchangeCodes.GDAX)) ){
		for(let symbol of pr.symbols){
			// Trades 
			feed.getAllTrades(ExchangeCodes.GDAX, {productID:symbol}).then(trades=>{

				const query = {
					exchange:'gdax',
					product_id:symbol
				}
				const trades_ = {
					$push:{
						trade:{
							$each: [trades], // data here  [ ] = default 
							$slice: -3000 // last three thousands updates 
						}
					},
					exchange:'gdax',
					product_id:symbol
				};
				const option = { upsert: true, new: true };
				Trade.updateOne(
   					query,
   					trades_,
   					option,
   					function(error, success){
     					// console.log("error ", error) 
     					console.log("success ", success) 
   					}
				)
				// Trade.findOne(query, function (err, doc) {
  		// 			// console.log("doc ", JSON.stringify(doc))
				// })

			});
		}
	}
	setTimeout(syncTrades, 60000*30); // 0.5 hour 
}
function syncOHLC(){

	let sTScale_day:Date = new Date(), eTScale_day:Date = new Date();
	sTScale_day.setMonth(eTScale_day.getMonth() - 6); // interval - 6 monts 

	let sTScale_hour:Date = new Date(), eTScale_hour:Date = new Date();
	sTScale_hour.setDate(eTScale_hour.getDate() - 7); // interval - 7 days

	let sTScale_minute:Date = new Date(), eTScale_minute:Date = new Date();
	sTScale_minute.setHours(eTScale_minute.getHours() - 4); // interval - 4 hours 

	for(let pr of (feed.getProductsPairs(ExchangeCodes.GDAX)) ){
		for(let symbol of pr.symbols){

			//historical - timescale - 1d, over six months data
			
			feed.getHistoricRates(ExchangeCodes.GDAX, {productID:symbol, startTime:sTScale_day.toISOString(), endTime:eTScale_day.toISOString(),timeScale:86400}).then(past_rates=>{

				const query = {
					exchange:'gdax',
					product_id:symbol
				}
				const rates_ = {
					$push:{
						rates:{
							$each: [past_rates], // data here  [ ] = default 
							$slice: -3000 // last three thousands updates 
						}
					},
					exchange:'gdax',
					product_id:symbol,
					interval:'6M',
					scale:'1D'

				};
				const option = { upsert: true, new: true };
				HistoricalData.updateOne(
   					query,
   					rates_,
   					option,
   					function(error, success){
     					// console.log("error ", error) 
     					console.log("success ", success) 
   					}
				)
				// HistoricalData.findOne(query, function (err, doc) {
  		// 			// console.log("doc ", JSON.stringify(doc))
				// })

			});

			//historical - timescale - 1H, over seven days data
			feed.getHistoricRates(ExchangeCodes.GDAX, {productID:symbol, startTime:sTScale_hour.toISOString(), endTime:eTScale_hour.toISOString(),timeScale:3600}).then(past_rates=>{

				const query = {
					exchange:'gdax',
					product_id:symbol
				}
				const rates_ = {
					$push:{
						rates:{
							$each: [past_rates], // data here  [ ] = default 
							$slice: -3000 // last three thousands updates 
						}
					},
					exchange:'gdax',
					product_id:symbol,
					interval:'7D',
					scale:'1H'

				};
				const option = { upsert: true, new: true };
				HistoricalData.updateOne(
   					query,
   					rates_,
   					option,
   					function(error, success){
     					// console.log("error ", error) 
     					console.log("success ", success) 
   					}
				)
				

			});
			//historical - timescale - 1 minutes, over 4 hours data
			feed.getHistoricRates(ExchangeCodes.GDAX, {productID:symbol, startTime:sTScale_minute.toISOString(), endTime:eTScale_minute.toISOString(),timeScale:60}).then(past_rates=>{

				const query = {
					exchange:'gdax',
					product_id:symbol
				}
				const rates_ = {
					$push:{
						rates:{
							$each: [past_rates], // data here  [ ] = default 
							$slice: -3000 // last three thousands updates 
						}
					},
					exchange:'gdax',
					product_id:symbol,
					interval:'4H',
					scale:'1m'

				};
				const option = { upsert: true, new: true };
				HistoricalData.updateOne(
   					query,
   					rates_,
   					option,
   					function(error, success){
     					// console.log("error ", error) 
     					console.log("success ", success) 
   					}
				)

			});

		}
	}
	setTimeout(syncOHLC, 60000*30); // 0.5 hour 
}
function syncPriceChange(){
	
	let sTChange:Date = new Date(), eTChange:Date = new Date();
	eTChange.setHours(eTChange.getHours() - 1); 
	sTChange.setDate(sTChange.getDate() - 1);

	for(let pr of (feed.getProductsPairs(ExchangeCodes.GDAX)) ){
		for(let symbol of pr.symbols){
			feed.getChange(ExchangeCodes.GDAX, {productID:symbol, startTime: sTChange.toISOString(), endTime: eTChange.toISOString(),timeScale:21600}).then(change=>{

				const query = {
					exchange:'gdax',
					product_id:symbol
				}
				const best_bid_ask = {
					$push:{
						change:{
							$each: [change], // data here  [ ] = default 
							$slice: -3000 // last three thousands updates 
						}
					},
					exchange:'gdax',
					product_id:symbol
				};
				const option = { upsert: true, new: true };
				PriceChange.updateOne(
   					query,
   					best_bid_ask,
   					option,
   					function(error, success){
     					// console.log("error ", error) 
     					console.log("success ", success) 
   					}
				)
				// PriceChange.findOne(query, function (err, doc) {
  		// 			// console.log("doc ", JSON.stringify(doc))
				// })

			});
		}
	}
	setTimeout(syncPriceChange, 60000*30); // 0.5 hour 	
}

exports.syncOrderBook = syncOrderBook;   // module.exports.syncOrder = syncOrder; -- both are equivalent
exports.syncBestBidBestAsk = syncBestBidBestAsk;  
exports.syncTicker = syncTicker; 
exports.syncTrades = syncTrades; 
exports.syncOHLC = syncOHLC;
exports.syncPriceChange = syncPriceChange;  