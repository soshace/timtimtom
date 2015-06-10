/*******************************************************************************
** File: wp-currency-converter.js
** Description: Helper functions for the WP Currency Converter plugin
** @since 1.0
*******************************************************************************/

jQuery(document).ready(function() {
    var $cart_total_amount = jQuery('.cart_totals .amount');
    var cart_total_amount = $cart_total_amount.length ? $cart_total_amount.html().match(/[0-9]+\.[0-9]+/)[0] : '0.00';

	jQuery('#wpcc_converting').hide();
    updateCurrencyAmount(cart_total_amount);

    function updateCurrencyAmount(amount){
        jQuery('#wpcc_cart_currency_amount').html(amount);
    }
	
	jQuery('#wpcc_cart_currency_to').on('change', function() {
        var wpcc_cart_currency_amount = cart_total_amount;
		var wpcc_cart_currency_from = 'USD';
		var wpcc_cart_currency_to = jQuery('#wpcc_cart_currency_to').val();

		jQuery('#wpcc_converting').show();
		
		jQuery.post(
			wpccAjaxLink,
			{
				action: 'wpccAjaxConvert',
				wpcc_currency_amount: wpcc_cart_currency_amount,
				wpcc_currency_from: wpcc_cart_currency_from,
				wpcc_currency_to: wpcc_cart_currency_to
			},
			function(results) {
				var amountLabel = results.match(/Amount.+\)/),
                    amount = results.match(/[0-9]+(\.)?[0-9]+/);

                jQuery('#wpcc_converting').delay(400).hide();

                if(amountLabel instanceof Array && amountLabel.length){
                    jQuery('label[for="wpcc_cart_currency_amount"]').html(amountLabel[0]);
                    updateCurrencyAmount(amount[0]);
                    return;
                }

                jQuery('#wpcc_results').html(results).slideDown(400);
			}
		);
	});

    jQuery('.woocommerce-ordering').on('submit', function(event){
        event.preventDefault();
    });
	
});
