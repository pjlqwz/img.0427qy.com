function oncard(mid,cid){
		var runcard=setInterval(function(){
			//便签按钮
			$("#in_contcard").children().removeClass("concardb").addClass("concarda");
			$(mid).removeClass("concarda").addClass("concardb");
			
			//下面选项卡的内容
			$("#"+cid).parent().children().removeClass("in_condata");
			$("#"+cid).parent().children().addClass("in_condatanone");
			$("#"+cid).removeClass("in_condatanone");
			$("#"+cid).addClass("in_condata");
		},200);
		$(mid).mouseout(function(){
			clearInterval(runcard);
		});
	}
	function noncard(mid,cid){
		var runcard=setInterval(function(){
			//便签按钮
			$("#in_newscard").children().removeClass("concardb").addClass("concarda");
			$(mid).removeClass("concarda").addClass("concardb");
			
			//下面选项卡的内容
			$("#"+cid).parent().children().removeClass("in_newdatamaxdiv");
			$("#"+cid).parent().children().addClass("in_newdatamaxdivnone");
			$("#"+cid).removeClass("in_newdatamaxdivnone");
			$("#"+cid).addClass("in_newdatamaxdiv");
		},200);
		$(mid).mouseout(function(){
			clearInterval(runcard);
		});
	}