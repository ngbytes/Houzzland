/*---------------------------------------------------------------
# Package - Sboost Framework  
# ---------------------------------------------------------------
# Author - olwebdesign http://www.olwebdesign.com
# Copyright (C) 2008 - 2015 olwebdesign.com. All Rights Reserved. 
# Websites: http://www.olwebdesign.com
-----------------------------------------------------------------*/
window.addEvent("domready",function(){
	var spToppanel = {
		initialize: function () {	
			this.open = false;
			this.wrapper =document.getElement('.mx-cpanel-wrap').setStyle('display', 'block');			
			this.container =document.id('mx-cpanel');
			this.box = this.container.inject(new Element('div', {'id': 'cpanel_container'}).inject(this.container.getParent()));
			this.handle = document.id('cpanel-handler');
			this.box = new Fx.Slide(this.box,{transition: Fx.Transitions.Expo.easeOut});
			this.box.hide();			
			this.handle.addEvent('click', this.toggle.bind(this));
		},

		show: function () {
			this.box.slideIn();
			this.open = true;
		},

		hide: function () {
			this.box.slideOut();
			this.open = false;
		},

		toggle: function () {
			if (this.open) {
				this.hide();
			} else {
				this.show();
			}
		}
	};
spToppanel.initialize();
})