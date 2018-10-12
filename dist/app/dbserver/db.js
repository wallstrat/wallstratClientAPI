"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var wallstrat_1 = require("wallstrat");
// process.env.UV_THREADPOOL_SIZE = Math.ceil(Math.max(4, require('os').cpus().length * 1.5));
process.env.UV_THREADPOOL_SIZE = String(13); // in linux 
// in windows set UV_THREADPOOL_SIZE=13 & node app.js
var sync = require('./sync');
var dbConnectionString = "mongodb://hemantm:Test%40123@cluster0-shard-00-00-gxwu9.mongodb.net:27017,cluster0-shard-00-01-gxwu9.mongodb.net:27017,cluster0-shard-00-02-gxwu9.mongodb.net:27017/crypto_marketdata?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";
// var dbConnectionString = "mongodb://localhost:1717/crypto_marketdata";
mongoose.connect(dbConnectionString, { useNewUrlParser: true, keepAlive: true })
    .then(function () {
    console.log('Connected to Mongo!');
}).catch(function (err) { return console.error('Connection Error ', err); });
exports.data_limit = -2;
/** Feed Handler */
exports.feed = new wallstrat_1.MarketPublicFeed();
/**Token*/
var tokensSchema = new mongoose.Schema({
    tokens: { type: mongoose.Schema.Types.Mixed, required: true },
    exchange: { type: String, required: true, trim: true }
}, { timestamps: true });
exports.Tokens = mongoose.model('Tokens', tokensSchema);
/** Product pairs */
var productsPairsSchema = new mongoose.Schema({
    product_pairs: { type: mongoose.Schema.Types.Mixed, required: true },
    exchange: { type: String, required: true, trim: true },
}, { timestamps: true });
exports.ProductsPairs = mongoose.model('ProductsPairs', productsPairsSchema);
/** Token Info*/
var tokenInfoSchema = new mongoose.Schema({
    token_info: { type: mongoose.Schema.Types.Mixed, required: true },
    exchange: { type: String, required: true, trim: true },
}, { timestamps: true });
exports.TokenInfo = mongoose.model('TokenInfo', tokenInfoSchema);
/** Product pair info*/
var productsPairInfoSchema = new mongoose.Schema({
    product_pair_info: { type: Object, required: true },
    exchange: { type: String, required: true, trim: true },
}, { timestamps: true });
exports.ProductsPairsInfo = mongoose.model('ProductsPairsInfo', productsPairInfoSchema);
/** Order Book */
var orderBookSchema = new mongoose.Schema({
    order_book: [{ type: mongoose.Schema.Types.Mixed, required: true }],
    exchange: { type: String, required: [true, 'exchange code is required'], trim: true },
    product_id: { type: String, required: true, trim: true },
    level: Number
}, { timestamps: true });
exports.OrderBook = mongoose.model('OrderBook', orderBookSchema);
/**Best Bid, Best Ask*/
var bestBidBestAskSchema = new mongoose.Schema({
    bb: [{ type: mongoose.Schema.Types.Mixed, required: true }],
    exchange: { type: String, required: true, trim: true },
    product_id: { type: String, required: true, trim: true }
}, { timestamps: true });
exports.BestBidBestAsk = mongoose.model('BestBidBestAsk', bestBidBestAskSchema);
/**Ticker*/
var tickerSchema = new mongoose.Schema({
    ticker: [{ type: mongoose.Schema.Types.Mixed, required: true }],
    exchange: { type: String, required: true, trim: true },
    product_id: { type: String, required: true, trim: true }
}, { timestamps: true });
exports.Ticker = mongoose.model('Ticker', tickerSchema);
/**Trades */
var tradeSchema = new mongoose.Schema({
    trade: [{ type: mongoose.Schema.Types.Mixed, required: true }],
    exchange: { type: String, required: true, trim: true },
    product_id: { type: String, required: true, trim: true }
}, { timestamps: true });
exports.Trade = mongoose.model('Trade', tradeSchema);
/**Historical */
var historicalDataSchema = new mongoose.Schema({
    rates: [{ type: mongoose.Schema.Types.Mixed, required: true }],
    exchange: { type: String, required: true, trim: true },
    product_id: { type: String, required: true, trim: true },
    interval: String,
    scale: String,
    records: Number
}, { timestamps: true });
exports.HistoricalData = mongoose.model('HistoricalData', historicalDataSchema);
/**Change */
var priceChangeSchema = new mongoose.Schema({
    change: [{ type: mongoose.Schema.Types.Mixed, required: true }],
    exchange: { type: String, required: true, trim: true },
    product_id: { type: String, required: true, trim: true },
    interval: String
}, { timestamps: true });
exports.PriceChange = mongoose.model('priceChange', priceChangeSchema);
/** Sync Order, bb, ticker, trade, ohlc, pricechange to db*/
sync.syncOrders();
sync.syncBestBidAsk();
sync.syncTicker();
sync.syncTrade();
sync.syncOHLC();
sync.syncPriceChange();
//# sourceMappingURL=db.js.map