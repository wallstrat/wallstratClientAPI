// import * as gdaxdb from './dbgdax';
var gdaxdb = require('./dbgdax');
var geminidb = require('./dbgemini');
var hitbtcdb = require('./dbhitbtc');
var huobidb = require('./dbhuobi');
var krakendb = require('./dbkraken');
// var kucoindb = require('./dbkucoin');
// var lunodb = require('./dbluno');
var binancedb = require('./dbbinance');
var okcoindb = require('./dbokcoin');
var bitfinexdb = require('./dbbitfinex');
var bitrexdb = require('./dbbitrex');
var coinonedb = require('./dbcoinone');
var bitstampdb = require('./dbbitstamp');


exports.syncOrders = function(){
    
    gdaxdb.syncOrderBook();
    geminidb.syncOrderBook();
    hitbtcdb.syncOrderBook();
    krakendb.syncOrderBook();
    // kucoindb.syncOrderBook();
    // lunodb.syncOrderBook();
    binancedb.syncOrderBook();
    okcoindb.syncOrderBook();
    bitfinexdb.syncOrderBook();
    bitrexdb.syncOrderBook();
    coinonedb.syncOrderBook();
    bitstampdb.syncOrderBook();

}
exports.syncBestBidAsk = function(){

    gdaxdb.syncBestBidBestAsk();
    geminidb.syncBestBidBestAsk();
    hitbtcdb.syncBestBidBestAsk();
    krakendb.syncBestBidBestAsk();
    // kucoindb.syncBestBidBestAsk();
    // lunodb.syncBestBidBestAsk();
    binancedb.syncBestBidBestAsk();
    okcoindb.syncBestBidBestAsk();
    bitfinexdb.syncBestBidBestAsk();
    bitrexdb.syncBestBidBestAsk();
    coinonedb.syncBestBidBestAsk();
    bitstampdb.syncBestBidBestAsk();
   
}
exports.syncTicker = function(){

    gdaxdb.syncTicker();
    geminidb.syncTicker();
    hitbtcdb.syncTicker();
    krakendb.syncTicker();
    // kucoindb.syncTicker();
    // lunodb.syncTicker();
    binancedb.syncTicker();
    okcoindb.syncTicker();
    bitfinexdb.syncTicker();
    bitrexdb.syncTicker();
    coinonedb.syncTicker();
    bitstampdb.syncTicker();
   
}
exports.syncTrade = function(){

    gdaxdb.syncTrades();
    geminidb.syncTrades();
    hitbtcdb.syncTrades();
    krakendb.syncTrades();
    // kucoindb.syncTrades();
    // lunodb.syncTrades();
    binancedb.syncTrades();
    okcoindb.syncTrades();
    bitfinexdb.syncTrades();
    bitrexdb.syncTrades();
    coinonedb.syncTrades();
    bitstampdb.syncTrades();
   
}
exports.syncOHLC = function(){

    gdaxdb.syncOHLC();
    // geminidb.syncOHLC();
    // hitbtcdb.syncOHLC();
    // krakendb.syncOHLC();
    
    // kucoindb.syncOHLC();
    // lunodb.syncOHLC();
    
    // binancedb.syncOHLC();
    // okcoindb.syncOHLC();
    // bitfinexdb.syncOHLC();
    // bitrexdb.syncOHLC();
    // coinonedb.syncOHLC();
    // bitstampdb.syncOHLC();

}
exports.syncPriceChange = function(){

    gdaxdb.syncPriceChange();
    geminidb.syncPriceChange();
    hitbtcdb.syncPriceChange();
    krakendb.syncPriceChange();
    // kucoindb.syncPriceChange();
    // lunodb.syncPriceChange();
    binancedb.syncPriceChange();
    okcoindb.syncPriceChange();
    bitfinexdb.syncPriceChange();
    bitrexdb.syncPriceChange();
    coinonedb.syncPriceChange();
    bitstampdb.syncPriceChange();

}
