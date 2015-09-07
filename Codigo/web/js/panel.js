
window.addEvent("load",function(){
	// FLOATING PANEL
	if($('float_panel') && $('float_panel').hasClass('animate')){
		var panel = $('float_panel');
		var topAnim = new Fx.Style(panel,'top',{duration:100,wait:false,transition:Fx.Transitions.Cubic.easeOut});
		var limit = panel.getParent().getCoordinates().top;
		var bottomLimit = panel.getParent().getSize().size.y - panel.getSize().size.y - 0;
		window.addEvent("scroll",function(){
			var pos = window.getScrollTop();
			if(pos <= limit) topAnim.start(20);
			else if(pos <= bottomLimit) topAnim.start(pos-limit+0);
			else topAnim.start(bottomLimit);
		});
	}

});
