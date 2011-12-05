/**
 * Jquery plugin to load data when the user reaches the end of the screen.
 *
 * @package		InfinateScroll
 * @author		Ivan K
 * @copyright 2011 Clippings
 * @license    http://creativecommons.org/licenses/by-sa/3.0/legalcode
 */
!function ( $ ) { 

	function InfiniteScroll( element, options ) {
		this.$el = $(element);
		if( ! this.$el.data('inifinitescroll' ))
		{
			this
				.proxy('_scroll')
				.proxy('load_more')
				.proxy('content')
				.proxy('_content');

			options = $.extend({}, $.fn.inifinitescroll.defaults, options );

			$.extend(this, options);
			this.$el.data('inifinitescroll', this);
			this.init();			
		}
	}

	InfiniteScroll.prototype = {

		init: function() {
			if(this.scroll)$(window).scroll(this._scroll);
			this.$el.click(this.load_more);
			this.$container = $(this.$el.data('container'));
			this._url = this.$el.attr('href');
			this.step = typeof this.step == 'string' ? parseInt(this.$el.attr(this.step), 10) : this.step;
		},

		// Handle Scroll event
		_scroll: function(){
			if($(window).scrollTop() >= $(document).height() - $(window).height() - this.tollerance){
				this.load_more();
			}
		},

		// Load more content, based on the current href of the load more link
		load_more: function( e ){

			if(e && e.type == 'click') e.preventDefault();
			if( ! this.$el.hasClass(this.loading_class))
			{
				this.$el.addClass(this.loading_class);
				this.start( e );
				$.get(this.url(), this._content);
			}
		},

		// Handle ajax load
		_content: function( data )
		{
			this.offset += this.step;
			this.$el.removeClass(this.loading_class);
			this.finish(data);
		},

		start: function(e){},

		// Append additional content. Extend this method to handle more custom stuff.
		finish: function( content )
		{
			if(this.offset && $(content).size() < this.offset)
				self.hide();

			this.$content.append(content);
		},

		// get the current url with query (and offset)
		url: function(){
			return this._url + (this._url.match(/\?/) ? '&' : '?') + this.query.replace('{offset}', this.offset);
		},

		// Bind a method so that it always gets the datepicker instance for
		// ``this``. Return ``this`` so chaining calls works.
		proxy: function(meth) {
			this[meth] = $.proxy(this[meth], this);
			return this;
		}
	};
	
	$.fn.inifinitescroll = function( options ) {
		return this.each(function() { new InfiniteScroll(this, options); });
	};

	$.fn.inifinitescroll.InfinateScroll = InfiniteScroll;
	$.fn.inifinitescroll.defaults = {
		tollerance: 300,
		scroll: true,
		step: 10,
		offset: 0,
		query: 'offset={offset}',
		loading_class: "loading"
	};

}( window.jQuery || window.ender );