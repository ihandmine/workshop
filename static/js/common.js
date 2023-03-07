

	//点击缓冲返回顶部
var scrolltotop={   
    //startline: Integer. Number of pixels from top of doc scrollbar is scrolled before showing control   
    //scrollto: Keyword (Integer, or "Scroll_to_Element_ID"). How far to scroll document up when control is clicked on (0=top).   
    setting: {startline:100, scrollto: 0, scrollduration:1000, fadeduration:[500, 100]},   
    controlHTML: '<img src="/static/img/backtop.png" style="width:70px; height:57px" />', //HTML for control, which is auto wrapped in DIV w/ ID="topcontrol"
    controlattrs: {offsetx:22, offsety:72}, //offset of control relative to right/ bottom of window corner   
    anchorkeyword: '#top', //Enter href value of HTML anchors on the page that should also act as "Scroll Up" links   
  
    state: {isvisible:false, shouldvisible:false},   
  
    scrollup:function(){   
        if (!this.cssfixedsupport) //if control is positioned using JavaScript   
            this.$control.css({opacity:0}) //hide control immediately after clicking it   
        var dest=isNaN(this.setting.scrollto)? this.setting.scrollto : parseInt(this.setting.scrollto)   
        if (typeof dest=="string" && jQuery('#'+dest).length==1) //check element set by string exists   
            dest=jQuery('#'+dest).offset().top   
        else  
            dest=0   
        this.$body.animate({scrollTop: dest}, this.setting.scrollduration);   
    },   
  
    keepfixed:function(){   
        var $window=jQuery(window)   
        var controlx=$window.scrollLeft() + $window.width() - this.$control.width() - this.controlattrs.offsetx   
        var controly=$window.scrollTop() + $window.height() - this.$control.height() - this.controlattrs.offsety   
        this.$control.css({left:controlx+'px', top:controly+'px'})   
    },   
  
    togglecontrol:function(){   
        var scrolltop=jQuery(window).scrollTop()   
        if (!this.cssfixedsupport)   
            this.keepfixed()   
        this.state.shouldvisible=(scrolltop>=this.setting.startline)? true : false  
        if (this.state.shouldvisible && !this.state.isvisible){   
            this.$control.stop().animate({opacity:1}, this.setting.fadeduration[0])   
            this.state.isvisible=true  
        }   
        else if (this.state.shouldvisible==false && this.state.isvisible){   
            this.$control.stop().animate({opacity:0}, this.setting.fadeduration[1])   
            this.state.isvisible=false  
        }   
    },   
       
    init:function(){   
        jQuery(document).ready(function($){   
            var mainobj=scrolltotop   
            var iebrws=document.all   
            mainobj.cssfixedsupport=!iebrws || iebrws && document.compatMode=="CSS1Compat" && window.XMLHttpRequest //not IE or IE7+ browsers in standards mode   
            mainobj.$body=(window.opera)? (document.compatMode=="CSS1Compat"? $('html') : $('body')) : $('html,body')   
            mainobj.$control=$('<div class="back_top">'+mainobj.controlHTML+'</div>')   
                .css({position:mainobj.cssfixedsupport? 'fixed' : 'absolute', bottom:mainobj.controlattrs.offsety, right:mainobj.controlattrs.offsetx, opacity:0, cursor:'pointer'})   
                .attr({title:'回到顶部'})   
                .click(function(){mainobj.scrollup(); return false})   
                .appendTo('body')   
            if (document.all && !window.XMLHttpRequest && mainobj.$control.text()!='') //loose check for IE6 and below, plus whether control contains any text   
                mainobj.$control.css({width:mainobj.$control.width()}) //IE6- seems to require an explicit width on a DIV containing text   
            mainobj.togglecontrol()   
            $('a[href="' + mainobj.anchorkeyword +'"]').click(function(){   
                mainobj.scrollup()   
                return false  
            })   
            $(window).bind('scroll resize', function(e){   
                mainobj.togglecontrol()   
            })   
        })   
    }   
}   
  
scrolltotop.init()  


/*搜索框*/
jQuery.fn.extend({
	selectbox: function(options) {
		return this.each(function() {
			new jQuery.SelectBox(this, options);
		});
	}
});


/* pawel maziarz: work around for ie logging */
if (!window.console) {
	var console = {
		log: function(msg) { 
	 }
	}
}
/* */

jQuery.SelectBox = function(selectobj, options) {
	
	var opt = options || {};
	opt.inputClass = opt.inputClass || "selectbox";
	opt.containerClass = opt.containerClass || "selectbox-wrapper";
	opt.hoverClass = opt.hoverClass || "current";
	opt.currentClass = opt.selectedClass || "selected"
	opt.debug = opt.debug || false;
	
	var elm_id = selectobj.id;
	var active = 0;
	var inFocus = false;
	var hasfocus = 0;
	//jquery object for select element
	var $select = $(selectobj);
	// jquery container object
	var $container = setupContainer(opt);
	//jquery input object 
	var $input = setupInput(opt);
	// hide select and append newly created elements
	$select.hide().before($input).before($container);
	
	
	init();
	
	$input
	.click(function(){
    if (!inFocus) {
		  $container.toggle();
		}
	})
	.focus(function(){
	   if ($container.not(':visible')) {
	       inFocus = true;
	       $container.show();
	   }
	})
	.keydown(function(event) {	   
		switch(event.keyCode) {
			case 38: // up
				event.preventDefault();
				moveSelect(-1);
				break;
			case 40: // down
				event.preventDefault();
				moveSelect(1);
				break;
			//case 9:  // tab 
			case 13: // return
				event.preventDefault(); // seems not working in mac !
				$('li.'+opt.hoverClass).trigger('click');
				break;
			case 27: //escape
			  hideMe();
			  break;
		}
	})
	.blur(function() {
		if ($container.is(':visible') && hasfocus > 0 ) {
			if(opt.debug) console.log('container visible and has focus')
		} else {
		  // Workaround for ie scroll - thanks to Bernd Matzner
		  if($.browser.msie || $.browser.safari){ // check for safari too - workaround for webkit
        if(jQuery($input).attr("id").indexOf('_container')==-1){
          hideMe();
        } else {
          $input.focus();
        }
      } else {
        hideMe();
      }
		}
	});


	function hideMe() { 
		hasfocus = 0;
		$container.hide(); 
	}
	
	function init() {
		$container.append(getSelectOptions($input.attr('id'))).hide();
		var width = $input.css('width');

    }
	
	function setupContainer(options) {
		var container = document.createElement("div");
		$container = $(container);
		$container.attr('id', elm_id+'_container');
		$container.addClass(options.containerClass);
		
		return $container;
	}
	
	function setupInput(options) {
		var input = document.createElement("input");
		var $input = $(input);
		$input.attr("id", elm_id+"_input");
		$input.attr("type", "text");
		$input.addClass(options.inputClass);
		$input.attr("autocomplete", "off");
		$input.attr("readonly", "readonly");
		$input.attr("tabIndex", $select.attr("tabindex")); // "I" capital is important for ie
		
		return $input;	
	}
	
	function moveSelect(step) {
		var lis = $("li", $container);
		if (!lis || lis.length == 0) return false;
		active += step;
    //loop through list
		if (active < 0) {
			active = lis.size();
		} else if (active > lis.size()) {
			active = 0;
		}
    scroll(lis, active);
		lis.removeClass(opt.hoverClass);

		$(lis[active]).addClass(opt.hoverClass);
	}
	
	function scroll(list, active) {
      var el = $(list[active]).get(0);
      var list = $container.get(0);
      
      if (el.offsetTop + el.offsetHeight > list.scrollTop + list.clientHeight) {
        list.scrollTop = el.offsetTop + el.offsetHeight - list.clientHeight;      
      } else if(el.offsetTop < list.scrollTop) {
        list.scrollTop = el.offsetTop;
      }
	}
	
	function setCurrent() {	
		var li = $("li."+opt.currentClass, $container).get(0);
		var ar = (''+li.id).split('_');
		if(ar.length-1 >= 3)
		{
			for(var i=3;i<=ar.length-1;i++)
			{
				ar[2]+='_'+ar[i];
			}
		}
		var el = ar[2];
		$select.val(el);
		$input.val($(li).html());
		return true;
	}
	
	// select value
	function getCurrentSelected() {
		return $select.val();
	}
	
	// input value
	function getCurrentValue() {
		return $input.val();
	}
	
	function getSelectOptions(parentid) {
		var select_options = new Array();
		var ul = document.createElement('ul');
		$select.children('option').each(function() {
			var li = document.createElement('li');
			li.setAttribute('id', parentid + '_' + $(this).val());
			li.innerHTML = $(this).html();
			if ($(this).is(':selected')) {
				$input.val($(this).html());
				$(li).addClass(opt.currentClass);
			}
			ul.appendChild(li);
			$(li)
			.mouseover(function(event) {
				hasfocus = 1;
				if (opt.debug) console.log('over on : '+this.id);
				jQuery(event.target, $container).addClass(opt.hoverClass);
			})
			.mouseout(function(event) {
				hasfocus = -1;
				if (opt.debug) console.log('out on : '+this.id);
				jQuery(event.target, $container).removeClass(opt.hoverClass);
			})
			.click(function(event) {
			  var fl = $('li.'+opt.hoverClass, $container).get(0);
				if (opt.debug) console.log('click on :'+this.id);
				$('#' + elm_id + '_container' + ' li.'+opt.currentClass).removeClass(opt.currentClass); 
				$(this).addClass(opt.currentClass);
				setCurrent();
				$select.change();
				$select.get(0).blur();
				hideMe();
			});
		});
		return ul;
	}
	
	
	
};
function setForm(v){
	var act = v; document.forms['search_frm'].action = act;
	$('#key').val($('#ct option:selected').text());
}

