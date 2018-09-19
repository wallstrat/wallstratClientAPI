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


clientAPI.listen(clientAPI.get('port'), clientAPI.get('host'), () => {
	console.log('Client API listening on port  ', clientAPI.get('port'));
});

let exchangeCodes: Array<String>= ['gdax', 'bitstamp', 'gemini', 'hitbtc', 'huobi', 'kraken', 'kucoin',
	'luno', 'binance', 'okcoin', 'bitfinex', 'bitrex', 'coinone'];

// API Calls 

clientAPI.get('/api/coins/:exchangecode', function(req, res) {
	
	// console.log("base url ", req.url)
	if(exchangeCodes.includes(req.params.exchangecode)){
		 let code : ExchangeCodes = ExchangeCodes[<string>(req.params.exchangecode).toUpperCase()];
		 // const tokens = new Map(feed.getPrimeTokens(code).map<[string,string]>(e => [e.code, e.name]));
		 // console.log("coins: " ,  tokens);
		 try{
		 	res.send(feed.getTokens(code));
		 }
		 catch(e){
		 	res.send([])
		 }
		 
		 // return tokens;
	}
	else{
		
	}
	// res.send("Alok");
	
});
clientAPI.get('/api/products/:exchangecode', function(req, res) {
    
	if(exchangeCodes.includes(req.params.exchangecode)){
		 let code : ExchangeCodes = ExchangeCodes[<string>(req.params.exchangecode).toUpperCase()];

		//  const products = feed.getPrimeProductsPairs(code).reduce(function(map, e) {
  //   		for(let pr of e.symbols){
  //   			map[pr] = e.base_currency;
  //   		}
  //   		return map;
		// }, {});

		//  // console.log("products " ,  products);
		//  return products;
		try{
			res.send(feed.getProductsPairs(code));
		 }
		 catch(e){
		 	res.send([]);
		 }
		 
	}
	else{
		
	}

});

clientAPI.get('/api/orderbook/:exchangecode/:symbol', function(req, res) {
	if(exchangeCodes.includes(req.params.exchangecode)){
		const query = {
			exchange:req.params.exchangecode,
	    	product_id:req.params.symbol
		}
		 OrderBook.findOne(query, {order_book:1}, function (err, doc) {

		 	try{
		 		res.send(doc['order_book'][doc['order_book'].length -1]);
		 }
		 catch(e){
		 	res.send([]);
		 }
		 	
		 	// return doc;
  			// console.log("doc ", JSON.stringify(doc))
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
		 Trade.findOne(query, {trade:1}, function (err, doc) {

		 	try{
		 		res.send(doc['trade'][doc['trade'].length -1]);
		 }
		 catch(e){
		 	res.send([]);
		 }
		 	
		 	// return doc;
  			// console.log("doc ", JSON.stringify(doc))
		})

	}
    
});
clientAPI.get('/api/bb/:exchangecode/:symbol', function(req, res) {
	if(exchangeCodes.includes(req.params.exchangecode)){
		const query = {
			exchange:req.params.exchangecode,
	    	product_id:req.params.symbol
		}
		 BestBidBestAsk.findOne(query,{bb:1} ,function (err, doc) {

		 	try{
		 		res.send(doc['bb'][doc['bb'].length -1]);
		 }
		 catch(e){
		 	res.send([]);
		 }
		 	
		 	// return doc;
  			// console.log("doc ", JSON.stringify(doc))
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
		Ticker.findOne(query, {ticker:1},function (err, doc) {
		 	// console.log("sending ticker ", JSON.stringify(doc['ticker'][doc['ticker'].length -1]))

		 	try{
		 		res.send(doc['ticker'][doc['ticker'].length -1]);
		 }
		 catch(e){
		 	res.send([]);
		 }
		 	
		 	// return doc;
		})

	}
	else{

	}
    
});
clientAPI.get('/api/ohlc/:exchangecode/:symbol', function(req, res) {
	
	if(exchangeCodes.includes(req.params.exchangecode)){
		const query = {
			exchange:req.params.exchangecode,
	    	product_id:req.params.symbol,
	    	interval:req.query.interval,
			scale:req.query.scale
		}
		HistoricalData.findOne(query, {rates:1},function (err, doc) {

			try{
				res.send(doc['rates'][doc['rates'].length -1])
		 }
		 catch(e){
		 	res.send([]);
		 }
			
		 	// return doc;
  			// console.log("rates ", JSON.stringify(doc))
		})

	}
	else{

	}  
});
//localhost:2929/api/pricechange/gdax/BTC-USD
clientAPI.get('/api/pricechange/:exchangecode/:symbol', function(req, res) {
    if(exchangeCodes.includes(req.params.exchangecode)){
		const query = {
			exchange:req.params.exchangecode,
	    	product_id:req.params.symbol
		}
		PriceChange.findOne(query, {change:1}, function (err, doc) {

			try{
				res.send(doc['change'][doc['change'].length -1]);
		 }
		 catch(e){
		 	res.send([]);
		 }
			
		 	// return doc;
  			// console.log("change ", JSON.stringify(doc))
		})

	}
	else{

	}
});


export { clientAPI };


