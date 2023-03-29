$(function(){$("#area").change(function(){
	$.get("/cf-gettown.html",{aid:$('#area').val()},
			function(data){
				$('#town option').remove();
				$('#town').append(data);
			}
	);
});
	$("#tj").click(function(){
		var semUrl = window.location.href;
		var name=$("#name").val();
		var tel=$("#tel").val();
		var area=$("#area").val();
		var town=$("#town").val();
        var demandType=$("#demandType").val();
		if (name=='' || name=='请输入您的称呼')
		{
			$("#name").focus();
			alert("请输入您的称呼");
			return false;

		}
		if (tel=='' || tel=='请输入您的手机号码')
		{
			$("#tel").focus();
			alert("请输入您的手机号码");
			return false;

		}
		if(!$("#tel").val().match(/^(0\d{2,3}-\d{7,8})|(1[3456789]\d{9})$/)){
			alert('号码格式不正确');
			$('#tel').focus();
			return false;
		}
		if (area=='0')
		{
			$("#area").focus();
			alert("请选择区");
			return false;

		}

		$.get("/cf-demand.html",{name:name,tel:tel,area:area,town:town,semUrl:semUrl,demandType:demandType},
				function(data){
					alert(data);
					$("#tel").val("");
					$("#name").val("");

				}
		);


	});


	$("#bt1").click(function(){
		var semUrl = window.location.href;
		var title1=$("#title1").val();
		var mj1=$("#mj1").val();
		var name1=$("#name1").val();
		var tel1=$("#tel1").val();
		var qu1=$("#qu1").val();
		var town1=$("#town1").val();
		var city1=$("#city1").val();
        var demandType=$("#demandType").val();
		if (title1=='')
		{
			$("#title1").focus();
			alert("请输入标题");
			return false;

		}
		if (mj1=='')
		{
			$("#mj1").focus();
			alert("请输入面积");
			return false;

		}

		if (name1=='' || name1=='请输入您的称呼')
		{
			$("#name1").focus();
			alert("请输入您的称呼");
			return false;

		}
		if (city1=='0')
		{
			$("#city1").focus();
			alert("请选择城市");
			return false;

		}
		if (qu1=='0')
		{
			$("#qu1").focus();
			alert("请选择区");
			return false;

		}
		if (tel1=='' || tel1=='请输入您的手机号码')
		{
			$("#tel1").focus();
			alert("请输入您的手机号码");
			return false;

		}
		if(!$("#tel1").val().match(/^(0\d{2,3}-\d{7,8})|(1[3456789]\d{9})$/)){
			alert('号码格式不正确');
			$('#tel1').focus();
			return false;
		}
		$.post("/cf-sdemand.html",{title:title1,mj:mj1,name:name1,tel:tel1,city:city1,area:qu1,town:town1,semUrl:semUrl,demandType:demandType},
				function(data){
					alert(data);
					$("#tel1").val("");
					$("#name1").val("");

				}
		);


	})
	$("#city1").change(function(){
		$.get("/cf-getarea.html",{cid:$('#city1').val()},
				function(data){
					$('#qu1 option').remove();
					$('#qu1').append(data);
				}
		);
	})

	$("#qu1").change(function(){
		$.get("/cf-gettown.html",{aid:$('#qu1').val()},
				function(data){
					$('#town1 option').remove();
					$('#town1').append(data);
				}
		);
	})


	$("#bt2").click(function(){
		var title2=$("#title2").val();
		var mj2=$("#mj2").val();
		var name2=$("#name2").val();
		var tel2=$("#tel2").val();
		var qu2=$("#qu2").val();
		var town2=$("#town2").val();
		var city2=$("#city2").val();
        var demandType=$("#demandType").val();
		if (title2=='')
		{
			$("#title2").focus();
			alert("请输入标题");
			return false;

		}
		if (mj2=='')
		{
			$("#mj2").focus();
			alert("请输入面积");
			return false;

		}

		if (name2=='' || name2=='请输入您的称呼')
		{
			$("#name2").focus();
			alert("请输入您的称呼");
			return false;

		}
		if (city2=='0')
		{
			$("#city2").focus();
			alert("请选择城市");
			return false;

		}
		if (qu2=='0')
		{
			$("#qu2").focus();
			alert("请选择区");
			return false;

		}
		if (tel2=='' || tel2=='请输入您的手机号码')
		{
			$("#tel2").focus();
			alert("请输入您的手机号码");
			return false;

		}
		if(!$("#tel2").val().match(/^(0\d{2,3}-\d{7,8})|(1[3456789]\d{9})$/)){
			alert('号码格式不正确');
			$('#tel2').focus();
			return false;
		}
		$.post("/cf-yzwt.html",{title:title2,mj:mj2,name:name2,tel:tel2,city:city2,area:qu2,town:town2,demandType:demandType},
				function(data){
					alert(data);
					$("#name2").val("");
					$("#name2").val("");

				}
		);


	})
	$("#city2").change(function(){
		$.get("/cf-getarea.html",{cid:$('#city2').val()},
				function(data){
					$('#qu2 option').remove();
					$('#qu2').append(data);
				}
		);
	})

	$("#qu2").change(function(){
		$.get("/cf-gettown.html",{aid:$('#qu2').val()},
				function(data){
					$('#town2 option').remove();
					$('#town2').append(data);
				}
		);
	})


})
