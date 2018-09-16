import * as mongoose from 'mongoose';
import { ExchangeCodes} from 'wallstrat';


import {
	
	Tokens, ProductsPairs, TokenInfo, ProductsPairsInfo, OrderBook,
	BestBidBestAsk, Ticker, Trade, HistoricalData, PriceChange, feed, data_limit

} from './db';



function syncOrderBook(){
	for(let pr of (feed.getProductsPairs(ExchangeCodes.COINONE)) ){
		for(let symbol of pr.symbols){
			// book
			feed.getOrderBook(ExchangeCodes.COINONE, {productID:symbol}).then(book=>{
				
				const query = {
					exchange:'coinone',
					product_id:symbol
				}
				const orderBook = {
					$push:{
						order_book:{
							$each: [book], // data here  [ ] = default 
							$slice: data_limit // last three thousands updates 
						}
					},
					exchange:'coinone',
					product_id:symbol,
					level:2
				};
				const option = { upsert: true, new: true };
				if(book){
					OrderBook.updateOne(
   					query,
   					orderBook,
   					option,
   					function(error, success){
     					// console.log("error ", error) 
     					//console.log("success ", success) 
   					}
				)
				}
				
				
			});

		}
	}
	setTimeout(syncOrderBook, 60000*30); // 0.5 hour 
}

function syncBestBidBestAsk(){
	for(let pr of (feed.getProductsPairs(ExchangeCodes.COINONE)) ){
		for(let symbol of pr.symbols){
			// best bid best ask
			feed.getBestBidBestAsk(ExchangeCodes.COINONE, {productID:symbol}).then(best_bid_best_ask=>{

				const query = {
					exchange:'coinone',
					product_id:symbol
				}
				const best_bid_ask = {
					$push:{
						bb:{
							$each: [best_bid_best_ask], // data here  [ ] = default 
							$slice: data_limit // last three thousands updates 
						}
					},
					exchange:'coinone',
					product_id:symbol
				};
				const option = { upsert: true, new: true };
				if(best_bid_best_ask){
					BestBidBestAsk.updateOne(
   					query,
   					best_bid_ask,
   					option,
   					function(error, success){
     					// console.log("error ", error) 
     					//console.log("success ", success) 
   					}
				)
				}
				
				

			});
		}
	}
	setTimeout(syncBestBidBestAsk, 60000*30); // 0.5 hour 
}
function syncTicker(){
	for(let pr of (feed.getProductsPairs(ExchangeCodes.COINONE)) ){
		for(let symbol of pr.symbols){
			// ticker 
			feed.getTicker(ExchangeCodes.COINONE, {productID:symbol}).then(tick=>{

				const query = {
					exchange:'coinone',
					product_id:symbol
				}
				const ticker_ = {
					$push:{
						ticker:{
							$each: [tick], // data here  [ ] = default 
							$slice: data_limit // last three thousands updates 
						}
					},
					exchange:'coinone',
					product_id:symbol
				};
				const option = { upsert: true, new: true };
				if(tick){
					Ticker.updateOne(
   					query,
   					ticker_,
   					option,
   					function(error, success){
     					// console.log("error ", error) 
     					//console.log("success ", success) 
   					}
				)
				}
				
				

			});
		}
	}
	setTimeout(syncTicker, 60000*30); // 0.5 hour 
}
function syncTrades(){
	for(let pr of (feed.getProductsPairs(ExchangeCodes.COINONE)) ){
		for(let symbol of pr.symbols){
			// Trades 
			feed.getAllTrades(ExchangeCodes.COINONE, {productID:symbol, period:'hour'}).then(trades=>{

				const query = {
					exchange:'coinone',
					product_id:symbol
				}
				const trades_ = {
					$push:{
						trade:{
							$each: [trades], // data here  [ ] = default 
							$slice: data_limit // last three thousands updates 
						}
					},
					exchange:'coinone',
					product_id:symbol
				};
				const option = { upsert: true, new: true };
				if(trades){
					Trade.updateOne(
   					query,
   					trades_,
   					option,
   					function(error, success){
     					// console.log("error ", error) 
     					//console.log("success ", success) 
   					}
				)
				}
				
				

			});
		}
	}
	setTimeout(syncTrades, 60000*30); // 0.5 hour 
}
function syncOHLC(){

	
}
function syncPriceChange(){
	
}

exports.syncOrderBook = syncOrderBook;   // module.exports.syncOrder = syncOrder; -- both are equivalent
exports.syncBestBidBestAsk = syncBestBidBestAsk;  
exports.syncTicker = syncTicker; 
exports.syncTrades = syncTrades; 
exports.syncOHLC = syncOHLC;
exports.syncPriceChange = syncPriceChange;  