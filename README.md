Jquery Infinite Scroll
----------------------

Load more information as the user scrolls to the bottom of the page

	<ul id="container" >
		<li>Content 1</li>
		<li>Content 2</li>
		<li>Content 3</li>
	</ul>
	<a href="index.html" id="load-more" data-offset="3" data-contaienr="#container">Load More</a>

	<script type="text/javascript">
		$('#load-more').inifinitescroll();
	</script>

Now when you reaches the end of the screen, it will make an ajax request to the href of the link and append the result to the container. THen it will increment the offset query parameter so the next request loads another batch.

There are several options:

* __tollerance__ - defaults 300. The amount of pixels off the end of the screen that it starts loading more
* __extension__ - defaults to ''. This is added to the end of the url to load a different type of asset, for example '.json'
* __extra__ - defaults to ''. This will be added to the end of the url as a query parameter, for example '_ajax=true'
* __loading_class__ defaults to 'loading'. Add this Css class to the load more link
* __scroll__ - defaults to true. If you set this to false, will not trigger when the user reaches the end of the page, You will have to press the "load more" link.
* __offset__ - defaults to false. Set the amount to increment on each load for the load more link. For example if it starts with index.html?offset=4, and you set offset: 4, the next content to load will be index.html?offset=8 If you set it as a string it will look for an attribute named like that fo the offset value 

You can also overwrite some methods to add additional functionality:

* __start__ - called on the start of the load more event
* __finish__ - called when the new content is loaded. Has one parameter - the content data

If the content is an array of elemnts and you have a defined offset it will check if the count of the retterned elements is less than the offset, and if so will hide the load more button