"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wallstrat_1 = require("wallstrat");
var db_1 = require("./db");
function syncOrderBook() {
    for (var _i = 0, _a = (db_1.feed.getProductsPairs(wallstrat_1.ExchangeCodes.GEMINI)); _i < _a.length; _i++) {
        var pr = _a[_i];
        var _loop_1 = function (symbol) {
            // book
            db_1.feed.getOrderBook(wallstrat_1.ExchangeCodes.GEMINI, { productID: symbol, level: 10 }).then(function (book) {
                var query = {
                    exchange: 'gemini',
                    product_id: symbol
                };
                var orderBook = {
                    $push: {
                        order_book: {
                            $each: [book],
                            $slice: db_1.data_limit // last three thousands updates 
                        }
                    },
                    exchange: 'gemini',
                    product_id: symbol,
                    level: 2
                };
                var option = { upsert: true, new: true };
                if (book) {
                    db_1.OrderBook.updateOne(query, orderBook, option, function (error, success) {
                        // console.log("error ", error) 
                        //console.log("success ", success) 
                    });
                }
            });
        };
        for (var _b = 0, _c = pr.symbols; _b < _c.length; _b++) {
            var symbol = _c[_b];
            _loop_1(symbol);
        }
    }
    setTimeout(syncOrderBook, 60000 * 30); // 0.5 hour 
}
function syncBestBidBestAsk() {
    for (var _i = 0, _a = (db_1.feed.getProductsPairs(wallstrat_1.ExchangeCodes.GEMINI)); _i < _a.length; _i++) {
        var pr = _a[_i];
        var _loop_2 = function (symbol) {
            // best bid best ask
            db_1.feed.getBestBidBestAsk(wallstrat_1.ExchangeCodes.OKCOIN, { productID: symbol }).then(function (best_bid_best_ask) {
                var query = {
                    exchange: 'gemini',
                    product_id: symbol
                };
                var best_bid_ask = {
                    $push: {
                        bb: {
                            $each: [best_bid_best_ask],
                            $slice: db_1.data_limit // last three thousands updates 
                        }
                    },
                    exchange: 'gemini',
                    product_id: symbol
                };
                var option = { upsert: true, new: true };
                if (best_bid_best_ask) {
                    db_1.BestBidBestAsk.updateOne(query, best_bid_ask, option, function (error, success) {
                        // console.log("error ", error) 
                        //console.log("success ", success) 
                    });
                }
            });
        };
        for (var _b = 0, _c = pr.symbols; _b < _c.length; _b++) {
            var symbol = _c[_b];
            _loop_2(symbol);
        }
    }
    setTimeout(syncBestBidBestAsk, 60000 * 30); // 0.5 hour 
}
function syncTicker() {
    for (var _i = 0, _a = (db_1.feed.getProductsPairs(wallstrat_1.ExchangeCodes.GEMINI)); _i < _a.length; _i++) {
        var pr = _a[_i];
        var _loop_3 = function (symbol) {
            // ticker 
            db_1.feed.getTicker(wallstrat_1.ExchangeCodes.GEMINI, { productID: symbol }).then(function (tick) {
                var query = {
                    exchange: 'gemini',
                    product_id: symbol
                };
                var ticker_ = {
                    $push: {
                        ticker: {
                            $each: [tick],
                            $slice: db_1.data_limit // last three thousands updates 
                        }
                    },
                    exchange: 'gemini',
                    product_id: symbol
                };
                var option = { upsert: true, new: true };
                if (tick) {
                    db_1.Ticker.updateOne(query, ticker_, option, function (error, success) {
                        // console.log("error ", error) 
                        //console.log("success ", success) 
                    });
                }
            });
        };
        for (var _b = 0, _c = pr.symbols; _b < _c.length; _b++) {
            var symbol = _c[_b];
            _loop_3(symbol);
        }
    }
    setTimeout(syncTicker, 60000 * 30); // 0.5 hour 
}
function syncTrades() {
    for (var _i = 0, _a = (db_1.feed.getProductsPairs(wallstrat_1.ExchangeCodes.GEMINI)); _i < _a.length; _i++) {
        var pr = _a[_i];
        var _loop_4 = function (symbol) {
            // Trades 
            db_1.feed.getAllTrades(wallstrat_1.ExchangeCodes.GEMINI, { productID: symbol }).then(function (trades) {
                var query = {
                    exchange: 'gemini',
                    product_id: symbol
                };
                var trades_ = {
                    $push: {
                        trade: {
                            $each: [trades],
                            $slice: db_1.data_limit // last three thousands updates 
                        }
                    },
                    exchange: 'gemini',
                    product_id: symbol
                };
                var option = { upsert: true, new: true };
                if (trades) {
                    db_1.Trade.updateOne(query, trades_, option, function (error, success) {
                        // console.log("error ", error) 
                        //console.log("success ", success) 
                    });
                }
            });
        };
        for (var _b = 0, _c = pr.symbols; _b < _c.length; _b++) {
            var symbol = _c[_b];
            _loop_4(symbol);
        }
    }
    setTimeout(syncTrades, 60000 * 30); // 0.5 hour 
}
function syncOHLC() {
}
function syncPriceChange() {
}
exports.syncOrderBook = syncOrderBook; // module.exports.syncOrder = syncOrder; -- both are equivalent
exports.syncBestBidBestAsk = syncBestBidBestAsk;
exports.syncTicker = syncTicker;
exports.syncTrades = syncTrades;
exports.syncOHLC = syncOHLC;
exports.syncPriceChange = syncPriceChange;
//# sourceMappingURL=dbgemini.js.map