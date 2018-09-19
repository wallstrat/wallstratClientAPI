import * as mongoose from 'mongoose';

import { MarketPublicFeed, ExchangeCodes} from 'wallstrat';



// process.env.UV_THREADPOOL_SIZE = Math.ceil(Math.max(4, require('os').cpus().length * 1.5));
process.env.UV_THREADPOOL_SIZE = String(13); // in linux 
// in windows set UV_THREADPOOL_SIZE=13 & node app.js


var sync = require('./sync');

mongoose.connect("mongodb://localhost:1717/crypto_marketdata", { useNewUrlParser: true, keepAlive: true })
.then(() => {
	console.log('Connected to Mongo!')
	
}).catch(err => console.error('Connection Error ', err));

/** Feed Handler */
export const feed = new MarketPublicFeed()








/**Token*/
const tokensSchema = new mongoose.Schema({
    tokens:{ type: mongoose.Schema.Types.Mixed, required: true },
    exchange:{ type: String, required: true, trim: true }
},
{ timestamps: true }
);

export const Tokens = mongoose.model('Tokens', tokensSchema);

/** Product pairs */
const productsPairsSchema = new mongoose.Schema({
    product_pairs:{ type: mongoose.Schema.Types.Mixed, required: true},
    exchange:{ type: String, required: true, trim: true },
},
{ timestamps: true }
);

export const ProductsPairs = mongoose.model('ProductsPairs', productsPairsSchema);

/** Token Info*/
const tokenInfoSchema = new mongoose.Schema({
    token_info:{ type: mongoose.Schema.Types.Mixed, required: true},
    exchange:{ type: String, required: true, trim: true },
},
{ timestamps: true });

export const TokenInfo = mongoose.model('TokenInfo', tokenInfoSchema);

/** Product pair info*/
const productsPairInfoSchema = new mongoose.Schema({
    product_pair_info:{ type: Object, required: true},
    exchange:{ type: String, required: true, trim: true },
},
{ timestamps: true }
);

export const ProductsPairsInfo = mongoose.model('ProductsPairsInfo', productsPairInfoSchema);


/** Order Book */

const orderBookSchema = new mongoose.Schema({
	order_book:[{ type: mongoose.Schema.Types.Mixed, required: true}],
    exchange:{ type: String, required: [true, 'exchange code is required'], trim: true },
    product_id:{ type: String, required: true, trim: true },
    level:Number
},
{ timestamps: true }
);

export const OrderBook = mongoose.model('OrderBook', orderBookSchema);


/**Best Bid, Best Ask*/

const bestBidBestAskSchema = new mongoose.Schema({
	bb:[{ type: mongoose.Schema.Types.Mixed, required: true}],
    exchange:{ type: String, required: true, trim: true },
    product_id:{ type: String, required: true, trim: true }
},
{ timestamps: true }
);

export const BestBidBestAsk = mongoose.model('BestBidBestAsk', bestBidBestAskSchema);

/**Ticker*/

const tickerSchema = new mongoose.Schema({
	ticker:[{ type: mongoose.Schema.Types.Mixed, required: true}],
    exchange:{ type: String, required: true, trim: true },
    product_id:{ type: String, required: true, trim: true }
},
{ timestamps: true }
);


export const Ticker = mongoose.model('Ticker', tickerSchema);

/**Trades */
const tradeSchema = new mongoose.Schema({
    trade:[{ type: mongoose.Schema.Types.Mixed, required: true}],
    exchange:{ type: String, required: true, trim: true },
    product_id:{ type: String, required: true, trim: true }
},
{ timestamps: true }
);


export const Trade = mongoose.model('Trade', tradeSchema);

/**Historical */
const historicalDataSchema = new mongoose.Schema({
	rates:[{ type: mongoose.Schema.Types.Mixed, required: true}],
    exchange:{ type: String, required: true, trim: true },
    product_id:{ type: String, required: true, trim: true },
    interval:String,
    scale:String,
    records:Number
},
{ timestamps: true }
);

export const HistoricalData = mongoose.model('HistoricalData', historicalDataSchema);

/**Change */
const priceChangeSchema = new mongoose.Schema({
    change:[{ type: mongoose.Schema.Types.Mixed, required: true}],
    exchange:{ type: String, required: true, trim: true },
    product_id:{ type: String, required: true, trim: true },
    interval:String
},
{ timestamps: true }
);

export const PriceChange = mongoose.model('priceChange', priceChangeSchema);



/** Sync Order, bb, ticker, trade, ohlc, pricechange to db*/ 
// sync.syncOrders();
// sync.syncBestBidAsk();
// sync.syncTicker();
// sync.syncTrade();
// sync.syncOHLC();
// sync.syncPriceChange();

