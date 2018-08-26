import * as mongoose from 'mongoose';
import { ExchangeCodes} from 'wallstrat';


import {
	
	Tokens, ProductsPairs, TokenInfo, ProductsPairsInfo, OrderBook,
	BestBidBestAsk, Ticker, Trade, HistoricalData, PriceChange, feed

} from './db';



function syncOrderBook(){
	for(let pr of (feed.getProductsPairs(ExchangeCodes.BITREX)) ){
		for(let symbol of pr.symbols){
			// book
			feed.getOrderBook(ExchangeCodes.BITREX, {productID:symbol, side:'both'}).then(book=>{
				
				const query = {
					exchange:'bitrex',
					product_id:symbol
				}
				const orderBook = {
					$push:{
						order_book:{
							$each: [book], // data here  [ ] = default 
							$slice: -3000 // last three thousands updates 
						}
					},
					exchange:'bitrex',
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
				
			});

		}
	}
	setTimeout(syncOrderBook, 60000*30); // 0.5 hour 
}

function syncBestBidBestAsk(){
	for(let pr of (feed.getProductsPairs(ExchangeCodes.BITREX)) ){
		for(let symbol of pr.symbols){
			// best bid best ask
			feed.getBestBidBestAsk(ExchangeCodes.BITREX, {productID:symbol}).then(best_bid_best_ask=>{

				const query = {
					exchange:'bitrex',
					product_id:symbol
				}
				const best_bid_ask = {
					$push:{
						bb:{
							$each: [best_bid_best_ask], // data here  [ ] = default 
							$slice: -3000 // last three thousands updates 
						}
					},
					exchange:'bitrex',
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
				

			});
		}
	}
	setTimeout(syncBestBidBestAsk, 60000*30); // 0.5 hour 
}
function syncTicker(){
	for(let pr of (feed.getProductsPairs(ExchangeCodes.BITREX)) ){
		for(let symbol of pr.symbols){
			// ticker 
			feed.getTicker(ExchangeCodes.BITREX, {productID:symbol}).then(tick=>{

				const query = {
					exchange:'bitrex',
					product_id:symbol
				}
				const ticker_ = {
					$push:{
						ticker:{
							$each: [tick], // data here  [ ] = default 
							$slice: -3000 // last three thousands updates 
						}
					},
					exchange:'bitrex',
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
				

			});
		}
	}
	setTimeout(syncTicker, 60000*30); // 0.5 hour 
}
function syncTrades(){
	for(let pr of (feed.getProductsPairs(ExchangeCodes.BITREX)) ){
		for(let symbol of pr.symbols){
			// Trades 
			feed.getAllTrades(ExchangeCodes.BITREX, {productID:symbol}).then(trades=>{

				const query = {
					exchange:'bitrex',
					product_id:symbol
				}
				const trades_ = {
					$push:{
						trade:{
							$each: [trades], // data here  [ ] = default 
							$slice: -3000 // last three thousands updates 
						}
					},
					exchange:'bitrex',
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
				

			});
		}
	}
	setTimeout(syncTrades, 60000*30); // 0.5 hour 
}
function syncOHLC(){

	for(let pr of (feed.getProductsPairs(ExchangeCodes.BITREX)) ){
		for(let symbol of pr.symbols){
			
			feed.getHistoricRates(ExchangeCodes.BITREX, {productID:symbol}).then(past_rates=>{

				const query = {
					exchange:'bitrex',
					product_id:symbol
				}
				const rates_ = {
					$push:{
						rates:{
							$each: [past_rates], // data here  [ ] = default 
							$slice: -3000 // last three thousands updates 
						}
					},
					exchange:'bitrex',
					product_id:symbol

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
	
}

exports.syncOrderBook = syncOrderBook;   // module.exports.syncOrder = syncOrder; -- both are equivalent
exports.syncBestBidBestAsk = syncBestBidBestAsk;  
exports.syncTicker = syncTicker; 
exports.syncTrades = syncTrades; 
exports.syncOHLC = syncOHLC;
exports.syncPriceChange = syncPriceChange;  