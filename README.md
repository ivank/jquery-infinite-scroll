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
* __loading_class__ defaults to 'loading'. Add this Css class to the load more link
* __scroll__ - defaults to true. If you set this to false, will not trigger when the user reaches the end of the page, You will have to press the "load more" link.
* __offset__ - defaults to 0. The starting offset of the collection.
* __step__ - defaults to 10. The amount of items for each iteration. Increments offsets for each load more with this parameter. If the amount returned is smaller than that of __step__ then hide the load more button.
* __query__ - defaults to 'offset={offset}' the additional query used on the url, {offset} is replaced with the current offset. You can add other query parameters here.

You can also overwrite some methods to add additional functionality:

* __start__ - called on the start of the load more event
* __finish__ - called when the new content is loaded. Has one parameter - the content data

If the content is an array of elemnts and you have a defined offset it will check if the count of the retterned elements is less than the offset, and if so will hide the load more button