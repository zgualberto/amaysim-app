const http = require('http');
const cart_config = require('./cart_config.json');

http.createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json');
    if (request.method === 'POST' && request.url === '/cart') {
        let body = [];
        let ult_small_count = 0;
        let ult_medium_count = 0;
        let ult_large_count = 0;
        let ult_onegb_count = 0;

        let ult_small_amount = 0;
        let ult_medium_amount = 0;
        let ult_large_amount = 0;
        let ult_onegb_amount = 0;

        let ult_small_deductions = 0;
        let ult_medium_deductions = 0;
        let ult_large_deductions = 0;
        let ult_onegb_deductions = 0;

        let cart_items_final = [];
        let cart_items_total_price = 0;

        let price = 0;

        request.on('data', (chunk) => {
            body.push(chunk);

            /* READING POST DATA */
            const post = JSON.parse(Buffer.concat(body).toString());
            const cart = post.cart;
            const promo = post.promo;

            /* creating array of valid product codes */
            const valid_items_obj = cart_config.items;
            let valid_items_array = [];
            for (const key in valid_items_obj) {
                // skip loop if the property is from prototype
                if (!valid_items_obj.hasOwnProperty(key)) continue;
            
                var obj = valid_items_obj[key];
                valid_items_array.push(obj['product_code']);
            }

            /* CHECK CART */
            cart.forEach(item => {
                /* check product_code if its valid */
                if(typeof valid_items_array.indexOf(item) !== 'undefined'){
                    /* count ult_small items for possible discount */
                    if(item === 'ult_small') {
                        cart_items_final.push(cart_config.items.ult_small.product_name);
                        ult_small_amount += parseFloat(cart_config.items.ult_small.price);
                        ult_small_count++;
                    } else if (item === 'ult_medium') {
                        cart_items_final.push(cart_config.items.ult_medium.product_name);
                        ult_medium_amount += parseFloat(cart_config.items.ult_medium.price);
                        ult_medium_count++;
                    } else if (item === 'ult_large') {
                        cart_items_final.push(cart_config.items.ult_large.product_name);
                        ult_large_amount += parseFloat(cart_config.items.ult_large.price);
                        ult_large_count++;
                    } else if (item === '1gb') {
                        cart_items_final.push(cart_config.items.onegb.product_name);
                        ult_onegb_amount += parseFloat(cart_config.items.onegb.price);
                        ult_onegb_count++;
                    }
                    
                } else {
                    /* return error code if there is an invalid item in cart */
                    response.statusCode = 400;
                    body = {
                        "erro_code":"400",
                        "error_message":"Invalid cart item"
                    }
                    response.end(body);
                }
            });

            /* check if ult_small has bargain promos */
            if(parseInt(cart_config.items.ult_small.promo_count) > 0){
                /* if ult_small is more than 3, charge only 2 for each 3 */
                if(ult_small_count >= cart_config.items.ult_small.promo_count) {
                    ult_small_deductions = parseInt(ult_small_count / parseInt(cart_config.items.ult_small.promo_count));
                    ult_small_amount = ult_small_amount - (ult_small_deductions * parseFloat(cart_config.items.ult_small.price));
                }
            }

            /* add free 1gb for each ult_medium */
            if(parseInt(ult_medium_count) > 0){
                let i = ult_medium_count;
                while (i > 0) {
                    cart_items_final.push(cart_config.items.onegb.product_name);
                    i--;
                }
            }

            /* check if ult_large has bargain promos */
            if(parseInt(cart_config.items.ult_large.promo_count) > 0){
                /* if ult_large is more than 3, charge only 2 for each 3 */
                if(ult_large_count >= parseInt(cart_config.items.ult_large.promo_count)) {
                    ult_large_amount = 0;
                    let i = ult_large_count;
                    while (i > 0) {
                        ult_large_amount += parseFloat(cart_config.items.ult_large.discounted_price);
                        i--;
                    }
                }
            }

            cart_items_total_price = ult_small_amount + ult_medium_amount + ult_large_amount + ult_onegb_amount;
            if(post.promo === cart_config.promos.iloveamaysim.promo_code){
                cart_items_total_price = cart_items_total_price - (cart_items_total_price * parseFloat(cart_config.promos.iloveamaysim.discount));
            }
            
            body = {
                "cart_items":cart,
                "cart_items_total_price":Math.round(cart_items_total_price * 100) / 100,
                "cart_items_and_bundled":cart_items_final
            }
        }).on('end', () => {
            response.end(JSON.stringify(body));
        });
    } else {
        response.statusCode = 404;
        response.end();
    }
}).listen(8080);