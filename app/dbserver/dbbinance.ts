import * as mongoose from 'mongoose';
import { ExchangeCodes} from 'wallstrat';


import {
	
	Tokens, ProductsPairs, TokenInfo, ProductsPairsInfo, OrderBook,
	BestBidBestAsk, Ticker, Trade, HistoricalData, PriceChange, feed, data_limit

} from './db';



function syncOrderBook(){
	for(let pr of (feed.getProductsPairs(ExchangeCodes.BINANCE)) ){
		for(let symbol of pr.symbols){
			// book
			feed.getOrderBook(ExchangeCodes.BINANCE, {productID:symbol, level:10}).then(book=>{
				
				const query = {
					exchange:'binance',
					product_id:symbol
				}
				const orderBook = {
					$push:{
						order_book:{
							$each: [book], // data here  [ ] = default 
							$slice: data_limit // last three thousands updates 
						}
					},
					exchange:'binance',
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
	for(let pr of (feed.getProductsPairs(ExchangeCodes.BINANCE)) ){
		for(let symbol of pr.symbols){
			// best bid best ask
			feed.getBestBidBestAsk(ExchangeCodes.BINANCE, {productID:symbol}).then(best_bid_best_ask=>{

				const query = {
					exchange:'binance',
					product_id:symbol
				}
				const best_bid_ask = {
					$push:{
						bb:{
							$each: [best_bid_best_ask], // data here  [ ] = default 
							$slice: data_limit // last three thousands updates 
						}
					},
					exchange:'binance',
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
	for(let pr of (feed.getProductsPairs(ExchangeCodes.BINANCE)) ){
		for(let symbol of pr.symbols){
			// ticker 
			feed.getTicker(ExchangeCodes.BINANCE, {productID:symbol}).then(tick=>{

				const query = {
					exchange:'binance',
					product_id:symbol
				}
				const ticker_ = {
					$push:{
						ticker:{
							$each: [tick], // data here  [ ] = default 
							$slice: data_limit // last three thousands updates 
						}
					},
					exchange:'binance',
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
	for(let pr of (feed.getProductsPairs(ExchangeCodes.BINANCE)) ){
		for(let symbol of pr.symbols){
			// Trades 
			feed.getAllTrades(ExchangeCodes.BINANCE, {productID:symbol, level:50}).then(trades=>{

				const query = {
					exchange:'binance',
					product_id:symbol
				}
				const trades_ = {
					$push:{
						trade:{
							$each: [trades], // data here  [ ] = default 
							$slice: data_limit // last three thousands updates 
						}
					},
					exchange:'binance',
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

	enum Scale {
  		day='1d',
  		hour='1h',
  		minute='1m'
	}

	let sTScale_day:Date = new Date(), eTScale_day:Date = new Date();
	sTScale_day.setMonth(eTScale_day.getMonth() - 6); // interval - 6 monts 

	let sTScale_hour:Date = new Date(), eTScale_hour:Date = new Date();
	sTScale_hour.setDate(eTScale_hour.getDate() - 7); // interval - 7 days

	let sTScale_minute:Date = new Date(), eTScale_minute:Date = new Date();
	sTScale_minute.setHours(eTScale_minute.getHours() - 4); // interval - 4 hours 

	for(let pr of (feed.getProductsPairs(ExchangeCodes.BINANCE)) ){
		for(let symbol of pr.symbols){

			//historical - timescale - 1d, over six months data
			
			feed.getHistoricRates(ExchangeCodes.BINANCE, {productID:symbol, startTime:sTScale_day.toISOString(), endTime:eTScale_day.toISOString(),timeScale:Scale.day, level:500}).then(past_rates=>{

				const query = {
					exchange:'binance',
					product_id:symbol
				}
				const rates_ = {
					$push:{
						rates:{
							$each: [past_rates], // data here  [ ] = default 
							$slice: data_limit // last three thousands updates 
						}
					},
					exchange:'binance',
					product_id:symbol,
					interval:'6M',
					scale:'1D'

				};
				const option = { upsert: true, new: true };
				if(past_rates){
					HistoricalData.updateOne(
   					query,
   					rates_,
   					option,
   					function(error, success){
     					// console.log("error ", error) 
     					//console.log("success ", success) 
   					}
				)
				}
				
				

			});

			//historical - timescale - 1H, over seven days data
			feed.getHistoricRates(ExchangeCodes.BINANCE, {productID:symbol, startTime:sTScale_hour.toISOString(), endTime:eTScale_hour.toISOString(),timeScale:Scale.hour, level:500}).then(past_rates=>{

				const query = {
					exchange:'binance',
					product_id:symbol
				}
				const rates_ = {
					$push:{
						rates:{
							$each: [past_rates], // data here  [ ] = default 
							$slice: data_limit // last three thousands updates 
						}
					},
					exchange:'binance',
					product_id:symbol,
					interval:'7D',
					scale:'1H'

				};
				const option = { upsert: true, new: true };
				if(past_rates){
					HistoricalData.updateOne(
   					query,
   					rates_,
   					option,
   					function(error, success){
     					// console.log("error ", error) 
     					//console.log("success ", success) 
   					}
				)
				}
				
				

			});
			//historical - timescale - 1 minutes, over 4 hours data
			feed.getHistoricRates(ExchangeCodes.BINANCE, {productID:symbol, startTime:sTScale_minute.toISOString(), endTime:eTScale_minute.toISOString(),timeScale:Scale.minute, level:500}).then(past_rates=>{

				const query = {
					exchange:'binance',
					product_id:symbol
				}
				const rates_ = {
					$push:{
						rates:{
							$each: [past_rates], // data here  [ ] = default 
							$slice: data_limit // last three thousands updates 
						}
					},
					exchange:'binance',
					product_id:symbol,
					interval:'4H',
					scale:'1m'

				};
				const option = { upsert: true, new: true };
				if(past_rates){
					HistoricalData.updateOne(
   					query,
   					rates_,
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