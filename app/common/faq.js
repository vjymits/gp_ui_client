jQuery(function(){ 
     var totBox = jQuery('.faqExpandableContent').length; 
    jQuery.each(jQuery('.faqExpandableContent'),function(){ 
      var totDiv = jQuery(this).find('.toggle_m').length; 
      var expDiv =  jQuery(this).find('.zeroHeight').length; 
       var collDiv =  totDiv-expDiv; 
        if(totDiv == expDiv ){ 
            jQuery(this).find('.collapsetoggleGroup_m').hide(); 
            jQuery(this).find('.expandtoggleGroup_m').show(); 
        } 
        if(totDiv == collDiv ){  
             jQuery(this).find('a.collapsetoggleGroup_m').show(); 
             jQuery(this).find('.expandtoggleGroup_m').hide(); 
        } 
    }); 
    jQuery('.toggle_m').unbind().click(function(e){ e.preventDefault(); 
		if(jQuery(this).parent().next().hasClass('zeroHeight')) 
          { 
                jQuery(this).parent().next('.toggledata').removeClass('zeroHeight hide').slideDown();; 
                jQuery(this).removeClass('expandImg').addClass('collapseImg'); 
          } 
		  else 
          { 
              jQuery(this).parent().next('.toggledata').css("display"); 
              jQuery(this).parent().next('.toggledata').addClass('zeroHeight hide').slideUp(); 
              jQuery(this).removeClass('collapseImg').addClass('expandImg'); 
          } 
            var totItem = jQuery(this).parents('.faqExpandableContent').find('.toggle_m').length; 
			var totExp = jQuery(this).parents('.faqExpandableContent').find('div.zeroHeight').length; 
             var totCollap = totItem-totExp; 
        if(totItem==totExp){ 
				 jQuery(this).parents('.faqExpandableContent').find('.expandtoggleGroup_m').show(); 
				jQuery(this).parents('.faqExpandableContent').find('.collapsetoggleGroup_m').hide(); 
		} 
            if(totItem==totCollap){ 
				 jQuery(this).parents('.faqExpandableContent').find('.expandtoggleGroup_m').hide(); 
				jQuery(this).parents('.faqExpandableContent').find('.collapsetoggleGroup_m').show(); 
             } 
     }); 
          jQuery('.expandtoggleGroup_m').click(function(e){  e.preventDefault(); 
			var itemSet = jQuery(this).parents('.faqExpandableContent').find('.toggle_m'); 
             jQuery.each(itemSet,function(){ 
				jQuery(this).parent().next('.toggledata').removeClass('zeroHeight hide').slideDown(); 
                jQuery(this).removeClass('expandImg').addClass('collapseImg'); 
            }); 
            jQuery(this).hide(); 
            jQuery(this).parents('.faqExpandableContent').find('.collapsetoggleGroup_m').show(); 
        }); 
    	jQuery('.collapsetoggleGroup_m').unbind().click(function(e){ e.preventDefault(); 
		   var itemSet = jQuery(this).parents('.faqExpandableContent').find('.toggle_m'); 
            jQuery.each(itemSet,function(){ 
				jQuery(this).parent().next('.toggledata').addClass('zeroHeight hide').slideDown(); 
                 jQuery(this).removeClass('collapseImg').addClass('expandImg'); 
            }); 
            jQuery(this).hide(); 
            jQuery(this).parents('.faqExpandableContent').find('.expandtoggleGroup_m').show(); 
        }); 
    	
    	jQuery('.close').unbind().click(function(e){
            jQuery(".toggle_container").addClass('zeroHeight hide').slideUp();
            jQuery(".collapseImg").removeClass('collapseImg').addClass('expandImg');

			  jQuery('.faqExpandableContent').find('.collapsetoggleGroup_m').hide();
			  jQuery('.faqExpandableContent').find('.expandtoggleGroup_m').show();

        });
}) 