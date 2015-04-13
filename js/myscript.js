$(function() { 
// good practice to put scripts in this function literal / closure to ensure that the scripts run only after the page is finished loading; it also protects any variables in this script from becoming global variables

	"use strict"; 
	// tells the browser to be more careful with our script and is considered good practice 

	var topoffset = 50; // variable for menu height
	var slideqty = $('#featured .item').length;
	var wheight = $(window).height(); // gets the height of the window 

	$('.fullheight').css('height', wheight); // applies css property height to variable wheight

	// Replace IMG inside carousels w/ backgroud image

	$('#featured .item img').each(function() { 
	// loops through the img elements in the carousel and performs a function
		var imgSrc = $(this).attr('src'); 
	// sets a variable to store the 'src' attribute of each img element
		$(this).parent().css({'background-image': 'url(' + imgSrc + ')'}); 
	// since we're in the img element, we can use $(this).parent to target the div.item elements and set their background-image property to the img src
		$(this).remove(); 
	// removes the img elements so that only the background image remains
	});

	$(window).resize(function() {
		wheight = $(window).height(); // gets the height of the window
		$('.fullheight').css('height', wheight); // sets to window 
	});

	//Activate Scrollspy
	$('body').scrollspy({
		target: 'header .navbar',
		offset: topoffset
	});

	// Add .inbody class when scrolling past #featured 

	var hash = $(this).find('li.active a').attr('href'); 
	// uses `this` to look for the current page section, executes a find function looking for the list item link element, then look for attribute `href`
	if(hash !== '#featured') {
		$('header nav').addClass('inbody'); 
	// if the `href` is not `#featured`, then a class is added so that a different style can be applied
	} else {
		$('header nav').removeClass('inbody');
	} 
	// duplicating this script outside of the scrollspy event function ensures that if a visitor reloads or navigates to a specific page section, the .inbody class is still applied; the scrollspy event only fires on scroll, which doesn't cover reloads, etc.

	$('.navbar-fixed-top').on('activate.bs.scrollspy', function() {
		var hash = $(this).find('li.active a').attr('href'); 
	// uses `this` to look for the current page section, executes a find function looking for the list item link element, then look for attribute `href`
		if(hash !== '#featured') {
			$('header nav').addClass('inbody'); 
	// if the `href` is not `#featured`, then a class is added so that a different style can be applied
		} else {
			$('header nav').removeClass('inbody');
		}
	}); 
	// This event fires whenever a new item becomes activated by the scrollspy; this means that our script needs to go inside so that the callback executes it when the event is fired 

  //Use smooth scrolling when clicking on navigation
  $('.navbar a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') === 
      this.pathname.replace(/^\//,'') && 
      location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top-topoffset+2
        }, 500);
        return false;
      } //target.length
    } //click function
  }); //smooth scrolling

  //Automaticall generate carousel indicators based on the # of items
  for (var i=0; i < slideqty; i++) {
  	var insertText = '<li data-target="#featured" data-slide-to="' + i + '"></li>';
  	$('#featured ol').append(insertText);
  }
	
	$('.carousel').carousel({
		interval: false
	}); // setting the interval to false means you can advance the carousel only manually

});