(function(){
	 
	/**
	 * 切换图片
	 * code by zhaoyu at 2011.8.16
	 */
	if(typeof switchImage == 'undefined') switchImage = {};
	switchImage = function(){}
	switchImage.prototype = {
		t:'',
		n:'0',
		number:1,						//初始显示第几张图片
		banner: 'top , banner',				//外围容器id
		title_id: 'title_list',			//标题按钮列表id
		body_id: 'body_list',			//图片内容列表id
		current_class: 'on',			//标题按钮当前选中标题样式
		normal_class: 'off',			//标题按钮普通状态标题样式
		init: function(){
			//初始化数据
			var supper = this,i=0;
			supper.number--;
			supper.n = supper.number;
			$("#"+supper.title_id).css({"z-index":"999"});
			$("#"+supper.body_id).children().eq(supper.number).fadeIn(2000).siblings().hide();
			$("#"+supper.title_id).children().eq(supper.number).removeClass(supper.normal_class).addClass(supper.current_class).siblings().removeClass(supper.current_class).addClass(supper.normal_class);
			
			$("#"+supper.title_id).children().each(function(){
				$(this).attr("num",i);
				$(this).unbind().bind('click',function(){
					var num = $(this).attr("num");
					supper.n = num;
					$(this).removeClass(supper.normal_class).addClass(supper.current_class).siblings().removeClass(supper.current_class).addClass(supper.normal_class);
					$("#"+supper.body_id).children().filter(":visible").fadeOut(500).parent().children().eq(num).fadeIn(1000);
				});
				i++;
			});
			supper.t = setInterval(function(){supper.showAuto();},6000);
			$("#"+supper.banner).hover(function(){clearInterval(supper.t);}, function(){supper.t = setInterval(function(){supper.showAuto()}, 4000);});
		},
		showAuto: function(){
			this.n = this.n >=($("#"+this.title_id).children().length - 1) ? 0 : ++this.n;
			$("#"+this.title_id).children().eq(this.n).trigger('click');
		},
		reboot: function(){
			this.number--;
			this.n = this.number;
			$("#"+this.body_id).children().eq(this.number).fadeIn(2000).siblings().hide();
			$("#"+this.title_id).children().eq(this.number).removeClass(this.normal_class).addClass(this.current_class).siblings().removeClass(this.current_class).addClass(this.normal_class);
		}
	};
})();