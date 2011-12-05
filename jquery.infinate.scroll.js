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
			$(window).scroll(this._scroll);
			this.$el.click(this.load_more);
			this.$container = $(this.$el.data('container'));
			this._url = this.$el.attr('href');
			this.offset = typeof this.offset == 'string' ? parseInt(this.$el.attr(this.offset), 10) : this.offset;

			if(this.extension)
			{
				var new_extension = this.extension;
				var extra = this.extra;
				this._url = this._url.replace(/(\.[a-z0-9]{1,4})?(\?.*)?$/, function(all, extension, query){return new_extension+(query ? query+'&' : '?')+extra;});	
			}
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
				$.get(this._url, this._content);
			}
		},

		// Handle ajax load
		_content: function( data )
		{
			if(this.offset)
				this._url = this._increment_offset(this.offset);

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

		// Modify url to add offset
		_increment_offset: function(offset){
			return this._url
				.replace(/(\&|\?)offset=(\d+)/, function(all, start, current_offset){
					return start+'offset='+( parseInt(current_offset, 10) + parseInt(offset, 10) );
				});
			
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
		extension: '',
		offset: false,
		loading_class: "loading",
		extra: ''
	};

}( window.jQuery || window.ender );