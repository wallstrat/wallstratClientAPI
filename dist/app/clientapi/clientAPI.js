"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var dotenv = require("dotenv");
var express = require("express");
var morgan = require("morgan");
var wallstrat_1 = require("wallstrat");
var db_1 = require("../dbserver/db");
var clientAPI = express();
exports.clientAPI = clientAPI;
dotenv.load({ path: '.env' });
clientAPI.set('port', (process.env.PORT || 2929));
clientAPI.set('host', "0.0.0.0");
clientAPI.use(bodyParser.json());
clientAPI.use(bodyParser.urlencoded({ extended: true }));
clientAPI.use(morgan('dev'));
clientAPI.listen(clientAPI.get('port'), clientAPI.get('host'), function () {
    console.log('Client API listening on port  ', clientAPI.get('port'));
});
var exchangeCodes = ['gdax', 'bitstamp', 'gemini', 'hitbtc', 'huobi', 'kraken', 'kucoin',
    'luno', 'binance', 'okcoin', 'bitfinex', 'bitrex', 'coinone'];
// API Calls 
clientAPI.get('/v1/coins/:exchangecode', function (req, res) {
    // console.log("base url ", req.url)
    if (exchangeCodes.includes(req.params.exchangecode)) {
        var code = wallstrat_1.ExchangeCodes[(req.params.exchangecode).toUpperCase()];
        // const tokens = new Map(feed.getPrimeTokens(code).map<[string,string]>(e => [e.code, e.name]));
        // console.log("coins: " ,  tokens);
        try {
            res.send(db_1.feed.getTokens(code));
        }
        catch (e) {
            res.send([]);
        }
        // return tokens;
    }
    else {
    }
    // res.send("Alok");
});
clientAPI.get('/v1/products/:exchangecode', function (req, res) {
    if (exchangeCodes.includes(req.params.exchangecode)) {
        var code = wallstrat_1.ExchangeCodes[(req.params.exchangecode).toUpperCase()];
        //  const products = feed.getPrimeProductsPairs(code).reduce(function(map, e) {
        //   		for(let pr of e.symbols){
        //   			map[pr] = e.base_currency;
        //   		}
        //   		return map;
        // }, {});
        //  // console.log("products " ,  products);
        //  return products;
        try {
            res.send(db_1.feed.getProductsPairs(code));
        }
        catch (e) {
            res.send([]);
        }
    }
    else {
    }
});
clientAPI.get('/v1/orderbook/:exchangecode/:symbol', function (req, res) {
    if (exchangeCodes.includes(req.params.exchangecode)) {
        var query = {
            exchange: req.params.exchangecode,
            product_id: req.params.symbol
        };
        db_1.OrderBook.findOne(query, { order_book: 1 }, function (err, doc) {
            try {
                res.send(doc['order_book'][doc['order_book'].length - 1]);
            }
            catch (e) {
                res.send([]);
            }
            // return doc;
            // console.log("doc ", JSON.stringify(doc))
        });
    }
    else {
    }
});
clientAPI.get('/v1/trade/:exchangecode/:symbol', function (req, res) {
    if (exchangeCodes.includes(req.params.exchangecode)) {
        var query = {
            exchange: req.params.exchangecode,
            product_id: req.params.symbol
        };
        db_1.Trade.findOne(query, { trade: 1 }, function (err, doc) {
            try {
                res.send(doc['trade'][doc['trade'].length - 1]);
            }
            catch (e) {
                res.send([]);
            }
            // return doc;
            // console.log("doc ", JSON.stringify(doc))
        });
    }
});
clientAPI.get('/v1/bb/:exchangecode/:symbol', function (req, res) {
    if (exchangeCodes.includes(req.params.exchangecode)) {
        var query = {
            exchange: req.params.exchangecode,
            product_id: req.params.symbol
        };
        db_1.BestBidBestAsk.findOne(query, { bb: 1 }, function (err, doc) {
            try {
                res.send(doc['bb'][doc['bb'].length - 1]);
            }
            catch (e) {
                res.send([]);
            }
            // return doc;
            // console.log("doc ", JSON.stringify(doc))
        });
    }
    else {
    }
});
clientAPI.get('/v1/ticker/:exchangecode/:symbol', function (req, res) {
    if (exchangeCodes.includes(req.params.exchangecode)) {
        var query = {
            exchange: req.params.exchangecode,
            product_id: req.params.symbol
        };
        db_1.Ticker.findOne(query, { ticker: 1 }, function (err, doc) {
            // console.log("sending ticker ", JSON.stringify(doc['ticker'][doc['ticker'].length -1]))
            try {
                res.send(doc['ticker'][doc['ticker'].length - 1]);
            }
            catch (e) {
                res.send([]);
            }
            // return doc;
        });
    }
    else {
    }
});
clientAPI.get('/v1/ohlc/:exchangecode/:symbol', function (req, res) {
    if (exchangeCodes.includes(req.params.exchangecode)) {
        var query = {
            exchange: req.params.exchangecode,
            product_id: req.params.symbol,
            interval: req.query.interval,
            scale: req.query.scale
        };
        db_1.HistoricalData.findOne(query, { rates: 1 }, function (err, doc) {
            try {
                res.send(doc['rates'][doc['rates'].length - 1]);
            }
            catch (e) {
                res.send([]);
            }
            // return doc;
            // console.log("rates ", JSON.stringify(doc))
        });
    }
    else {
    }
});
//localhost:2929/api/pricechange/gdax/BTC-USD
clientAPI.get('/v1/pricechange/:exchangecode/:symbol', function (req, res) {
    if (exchangeCodes.includes(req.params.exchangecode)) {
        var query = {
            exchange: req.params.exchangecode,
            product_id: req.params.symbol
        };
        db_1.PriceChange.findOne(query, { change: 1 }, function (err, doc) {
            try {
                res.send(doc['change'][doc['change'].length - 1]);
            }
            catch (e) {
                res.send([]);
            }
            // return doc;
            // console.log("change ", JSON.stringify(doc))
        });
    }
    else {
    }
});
//# sourceMappingURL=clientAPI.js.map