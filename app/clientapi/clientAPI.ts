import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import * as path from 'path';

import {ExchangeCodes} from 'wallstrat';

import {
	
	Tokens, ProductsPairs, TokenInfo, ProductsPairsInfo, OrderBook,
	BestBidBestAsk, Ticker, Trade, HistoricalData, PriceChange, feed

} from '../dbserver/db';


const clientAPI = express();
dotenv.load({ path: '.env' });
clientAPI.set('port', (process.env.PORT || 2929));
clientAPI.set('host', "0.0.0.0");
clientAPI.use(bodyParser.json());
clientAPI.use(bodyParser.urlencoded({ extended: true }));

clientAPI.use(morgan('dev'));


clientAPI.listen(clientAPI.get('port'),clientAPI.get('host'), () => {
	console.log('Client API listening on port ' + clientAPI.get('port'));
});

let exchangeCodes: Array<String>= ['gdax', 'bitstamp', 'gemini', 'hitbtc', 'huobi', 'kraken', 'kucoin',
	'luno', 'binance', 'okcoin', 'bitfinex', 'bitrex', 'coinone'];

// API Calls 

clientAPI.get('/api/coins/:exchangecode', function(req, res) {
    
	// if(exchangeCodes.includes(req.params.exchangecode)){
	// 	 let code : ExchangeCodes = <ExchangeCodes>ExchangeCodes[(req.params.exchangecode).toUpperCase()];
	// 	 return new Map(JSON.parse(feed.getPrimeTokens(code)).map(e => [e.code, e.name]));
	// }
	// else{
		
	// }
});
clientAPI.get('/api/products/:exchangecode', function(req, res) {
    
	// if(exchangeCodes.includes(req.params.exchangecode)){
	// 	let code : ExchangeCodes = <ExchangeCodes>ExchangeCodes[(req.params.exchangecode).toUpperCase()];
	// 	const products = JSON.parse(feed.getPrimeProductsPairs(code)).reduce(function(map, e) {
 //    		for(let pr of e.symbols){
 //    			map[pr] = e.base_currency;
 //    		}
 //    		return map;
	// 	}, {});
	// 	return products;

	// }
	// else{
		
	// }
});

clientAPI.get('/api/orderbook/:exchangecode/:symbol', function(req, res) {
	if(exchangeCodes.includes(req.params.exchangecode)){
		const query = {
			exchange:req.params.exchangecode,
	    	product_id:req.params.symbol
		}
		 OrderBook.findOne(query, function (err, doc) {
  			console.log("doc ", JSON.stringify(doc))
		})

	}
	else{

	}
	
   
});
clientAPI.get('/api/trade/:exchangecode/:symbol', function(req, res) {
	if(exchangeCodes.includes(req.params.exchangecode)){
		const query = {
			exchange:req.params.exchangecode,
	    	product_id:req.params.symbol
		}
		 Trade.findOne(query, function (err, doc) {
  			console.log("doc ", JSON.stringify(doc))
		})

	}
    
});
clientAPI.get('/api/bb/:exchangecode/:symbol', function(req, res) {
	if(exchangeCodes.includes(req.params.exchangecode)){
		const query = {
			exchange:req.params.exchangecode,
	    	product_id:req.params.symbol
		}
		 BestBidBestAsk.findOne(query, function (err, doc) {
  			console.log("doc ", JSON.stringify(doc))
		})

	}
	else{

	}
    
});
clientAPI.get('/api/ticker/:exchangecode/:symbol', function(req, res) {
	if(exchangeCodes.includes(req.params.exchangecode)){
		const query = {
			exchange:req.params.exchangecode,
	    	product_id:req.params.symbol
		}
		 Ticker.findOne(query, function (err, doc) {
  			console.log("doc ", JSON.stringify(doc))
		})

	}
	else{

	}
    
});
clientAPI.get('/api/ohlc/:exchangecode/:symbol', function(req, res) {
	if(exchangeCodes.includes(req.params.exchangecode)){
		const query = {
			exchange:req.params.exchangecode,
	    	product_id:req.params.symbol
		}
		 HistoricalData.findOne(query, function (err, doc) {
  			console.log("doc ", JSON.stringify(doc))
		})

	}
	else{

	}
    
});
clientAPI.get('/api/pricechange/:exchangecode/:symbol', function(req, res) {
    if(exchangeCodes.includes(req.params.exchangecode)){
		const query = {
			exchange:req.params.exchangecode,
	    	product_id:req.params.symbol
		}
		 PriceChange.findOne(query, function (err, doc) {
  			console.log("doc ", JSON.stringify(doc))
		})

	}
	else{

	}
});


export { clientAPI };


