// requires fbk.js

ui = {

	currentHandle: undefined,

	// reference to DOM objects. cached so we dont have to look them up every time.
	objCaseStudy: undefined,
	objCaseStudyText: undefined,
	objCaseStudyTitle: undefined,
	objCaseStudyImage: undefined,
	objCaseStudyYTObject: undefined,
	objCaseStudyYTMovie: undefined,
	objCaseStudyYTPlayer: undefined,
	objNav: undefined,
	objTabs: undefined,
	objNavLeft: undefined,
	objNavRight: undefined,
	rightArrow: undefined, // The right arrow control
	leftArrow: undefined, // The right arrow control

	// data array
	data:[],


	init: function(){ // called from main flipbook app

		this.objCaseStudyContainer = $('#casestudy-widget-container');
		this.objCaseStudy = $('#casestudy-widget');
		this.objCaseStudyText = $('#content-copy > p');
		this.objCaseStudyTitle = $('#content-copy > h4');
		this.objCaseStudyType = $('#casestudy-widget-wrapper > h5');
		this.objCaseStudyImage = $('#content-media > img');
		this.objCaseStudyYTObject = $('#ytplayerobject');
		this.objCaseStudyYTMovie = $('#ytmovie');
		this.objCaseStudyYTPlayer = $('#ytplayer');
		this.objNav = $('#casestudy-widget-nav');
		this.objNavLeft = $('#nav-left');
		this.objNavRight = $('#nav-right');
		this.objTabs = $('#casestudy-widget-tabs');

		// mouse
		$('#casestudy-widget-close').click(function(){
			ui.closeCaseStudy();
		});		

		this.objNavLeft.click(function(){
			ui.showCaseStudy();
		});
		this.objNavRight.click(function(){
			ui.showMoreInfo();
		});

		// touch
		document.getElementById('casestudy-widget-close').addEventListener( 'touchstart', function(e){
			ui.closeCaseStudy();
			e.preventDefault();
		});
		this.objNavLeft[0].addEventListener( 'touchstart', function(e){
			ui.showCaseStudy();
			e.preventDefault();
		});
		this.objNavRight[0].addEventListener( 'touchstart', function(e){
			ui.showMoreInfo();
			e.preventDefault();
		});

		this.initInfoBoxData();
		this.initCaseStudyData();
		this.objCaseStudyYTObject.hide();
	},
	
	initInfoBoxData:function(){

		//================================================= Village ===================

		this.data[ "VILLAGE_HOME" ] = new infoBoxData(
			"Explore a different platform on each page and learn how people use our products and how brands can harness them creatively.",
			"Start your journey"
		);

		//================================================= YouTube ===================

		this.data[ "YT_HOME" ] = new infoBoxData(
			"Unlock the full power of online video for your brand. Play with the tabs to explore advertising opportunities on YouTube, with the example of a music band.",
			"YouTube"
		);

		this.data[ "YT_MASTHEADLABEL" ] = new infoBoxData(
			"Own the YouTube Homepage with the Masthead. Engage users with interactive ads and give maximum visibility to your brand.",
			"Masthead"
		);
		
		this.data[ "YT_SKIPPABLE_AD" ] = new infoBoxData(
			"TrueView videos let great ads stand out since users can choose to skip or watch them.",
			"TrueView ads"
		);

		this.data[ "YT_BRAND" ] = new infoBoxData(
			"Create a bespoke and immersive home for your brand on YouTube.",
			"Brand Channels"
		);

		//================================================= Mobile ===================

		this.data[ "MOBILE_HOME" ] = new infoBoxData(
			"Small canvas, big opportunity. Find some inspiration to make the most of mobile.",
			"移动应用"
		);

		this.data[ "MOBILE_MULTISCREEN" ] = new infoBoxData(
			"Design the right experience for users multitasking across TV, mobile, tablet and desktop.",
			"通屏适应"
		);
		
		this.data[ "MOBILE_LOCATION" ] = new infoBoxData(
			"Use mobile’s GPS to stage locally-relevant experiences.",
			"自动定位"
		);

		this.data[ "MOBILE_SOCIAL" ] = new infoBoxData(
			"Mobile apps can influence behaviour to build habits like running - or meditating.",
			"现实生活"
		);

		//================================================= Maps ===================

		this.data[ "MAPS_HOME" ] = new infoBoxData(
			"Create beautiful experiences by customizing Google Maps for your brand.",
			"谷歌地图"
		);
		
		this.data[ "MAPS_STREET_VIEW" ] = new infoBoxData(
			"Street View is like visiting a place without being there. It lets you embed fully interactive panoramas on your site.",
			"谷歌街景"
		);

		//================================================= Search ===================

		this.data[ "SEARCH_HOME" ] = new infoBoxData(
			"Search is more than 3 lines of text. Pull the tab to discover examples of rich results and search ads extensions.",
			"谷歌搜索"
		);
		
		//================================================= Social ===================

		this.data[ "SOCIAL_HOME" ] = new infoBoxData(
			"Google+ introduces new ways of sharing, across all of Google.",
			"Google+"
		);
		
		// this.data[ "SOCIAL_PARTY_MODE" ] = new infoBoxData(
		// 	"Google+ introduces new ways of sharing, across all of Google.",
		// 	"Google+"
		// );

		this.data[ "SOCIAL_HANGOUTS" ] = new infoBoxData(
			"Google+ Hangouts is free video conferencing for up to 10 people.",
			"Google+ Hangouts"
		);
	},

	initCaseStudyData:function(){

		//================================================= YouTube ===================

		this.data[ "YT_MASTHEADLABEL_CASESTUDY" ] = new caseStudyData(
			"Masthead - YouTube Homepage takeover",
			"Using DoubleClick’s technology, Sony Pictures created an in-banner driving game within the YouTube masthead, controlledthrough smartphone. Something that Q himself would certainly get excited about.</br></br><a target='_blank' href='http://www.richmediagallery.com/galleryDetail/?id=35285'>Try it here</a></br><a target='_blank' href='http://www.creativesandbox.com/case-study/sony-pictures-releasing-uk-skyfall-motorbike-chase'>See the full case study on the gallery here</a>",
			"Skyfall Motorbike Chase",
			"img/007.jpg",
			"image",
			"When users come to the YouTube homepage, they're in a grazing mode and looking for content that will entertain, educate or inform. The masthead format delivers massive reach and high interaction rates because it has the potential to captivate the users without interrupting their experience.</br></br><a target='_blank' href='http://www.youtube.com/yt/advertise/homepage-ads.html'>More information on YouTube advertising site</a>",
			"",
			"http://www.youtube.com/v/UXcBk_RB1Ow?version=3&enablejsapi=1",
			"video"
		);
		
		this.data[ "YT_SKIPPABLE_AD_CASESTUDY" ] = new caseStudyData(
			"TrueView skippable ads",
			"In Chile, La Casa Eco & Sodimac created a pre-roll aiming to raise awareness of bad ecological habits by incorporating the ‘Skip This Ad' button as part of the creative. A really clever example that shows how technology can fuel creativity.",
			"La casa Eco & Sodimac",
			'http://www.youtube.com/v/f_RF7w8-Gn8?version=3&enablejsapi=1',
			"video",
			"TrueView lets viewers skip your ads. And you only pay if they choose to watch 30 seconds. Because TrueView puts users in control, you know that you’re reaching your most valuable audience. And best of all, when people choose, they remember.  They are then more likely to advocate, interact with, and generate sales for your brand.</br></br><a target='_blank' href='http://www.youtube.com/yt/advertise/trueview.html'>Get more information</a>",
			"",
			"http://www.youtube.com/v/tmCk8EaBMow?version=3&enablejsapi=1",
			"video"
		);

		this.data[ "YT_BRAND_CASESTUDY" ] = new caseStudyData(
			"Brand Channels - your YouTube home",
			"Activision used a YouTube Brand Channel to create an awesome interactive trailer. It uses the same assets as the TV spots, but tells the story in a much richer, non-linear way by allowing users to interact with the video.</br></br><a target='_blank' href='http://www.youtube.com/user/CALLOFDUTY/custom'>Link to the experience</a></br><a target='_blank' href='http://www.creativesandbox.com/case-study/activision-publishing-call-of-duty-black-ops-ii'>See the full case study on the gallery here</a>",
			"Call of Duty: Black Ops II",
			"img/callofduty.jpg",
			"image",
			"YouTube is the 2nd biggest search engine in the world and the world's 3rd largest site, so it's vital that you establish a rich presence on the site. Brand channels give you a wealth of options to create a bespoke and immersive home on YouTube that's truly representative of your brand.</br></br><a target='_blank' href='http://www.youtube.com/yt/advertise/channels.html'>More information on YouTube for advertisers</a>",
			"",
			"img/channels.jpg",
			"image"
		);

		//================================================= Mobile ===================

		this.data[ "MOBILE_HOME_CASESTUDY" ] = new caseStudyData(
			"Create beautiful Mobile Sites",
			"Lexus’ primary challenge in Europe is to get noticed. Most premium automotive sites look the same, so to stand out they created a truly premium desktop and mobile site, giving a sense of seamless luxury.</br></br><a target='_blank' href='http://www.creativesandbox.com/case-study/lexus-lexus-creating-amazing'>See the full case study on the gallery here.</a>",
			"Lexus Create Amazing",
			"img/lexus.jpg",
			"image",
			"Increasingly, users are accessing the web from a mobile, therefore it's critical that your presence on the web is optimized for mobile devices. Studies have shown that 2/3rds of users will not return to a site that is not optimized for mobile.</br></br><a target='_blank' href='http://howtogomo.com>howtogomo.com</a>'",
			"",
			"http://www.youtube.com/v/Ja7abx3OPOQ?version=3&enablejsapi=1",
			"video"
		);

		this.data[ "MOBILE_MULTISCREEN_CASESTUDY" ] = new caseStudyData(
			"Multi-screen",
			"Carling let all South African football fans “be the coach” by voting on their mobile phone while watching a football game on TV.</br></br><a target='_blank' href='http://www.creativesandbox.com/case-study/carling-black-label-be-the-coach-198111'>See full case study on the gallery here.</a>",
			"Carling - Be the Coach",
			"http://www.youtube.com/v/etmzOOtNCIk?version=3&enablejsapi=1",
			"video",
			"Since mobile devices are always on and always with us, consumers are increasingly multitasking with mobile even while engaged with other media. This is a great opportunity to design captivating experiences across devices.",
			"",
			"img/multiscreen.jpg",
			"image"
		);
		
		this.data[ "MOBILE_LOCATION_CASESTUDY" ] = new caseStudyData(
			"Location",
			"History can be experienced more intensely by seeing where it actually happened. The mobile application ‘Anne’s Amsterdam’ was developed as a truly immersive way of discovering what happened to Anne Frank.</br></br><a target='_blank' href='http://www.creativesandbox.com/case-study/95a6357c3d10a316b9ccdaac26220831a4e71b76'>See full case study on the gallery here.</a>",
			"Anne Frank House",
			"http://www.youtube.com/v/8WNLnDOVgpY?version=3&enablejsapi=1",
			"video",
			"When mobile creatives can tap into a device’s GPS and harness information about  consumers’ real-time locations, they can not only for drive them into stores, but also stage much more compelling brand experiences.",
			"",
			"img/location.jpg",
			"image"
		);

		this.data[ "MOBILE_SOCIAL_CASESTUDY" ] = new caseStudyData(
			"Real-life benefits",
			"Nike created the Nike+ GPS app to let any runner track their runs and performance via GPS, and turn solitary running into a social activity. When runners begin a run, they can let their friends on Facebook know via a post. Friends who see the post can ‘like’ or comment. When they do, runners receive an audible cheer through their headphones.</br></br><a target='_blank' href='http://www.creativesandbox.com/case-study/nike-nike-gps-android-app'>See full case study on the gallery here.</a>",
			"Nike+ GPS app",
			"http://www.youtube.com/v/46hEaFKa638?version=3&enablejsapi=1",
			"video",
			"Mobile is the first device that we reach for and the last one that we put down at night. Given their personal nature, mobile devices are a powerful tool to influence individual behaviours. Combined with social context and the right sharing mechanism, it can allow brands to build powerful communities.",
			"",
			"img/social.jpg",
			"image"
		);

		//================================================= Maps ===================

		this.data[ "MAPS_HOME_CASESTUDY" ] = new caseStudyData(
			"Google Maps",
			"To celebrate the idea that bridges ‘bring us together’, the Golden Gate National Park used the Google Maps API to let people add their own favorite bridges next to one another, and share the creation seamlessly across all social networks.</br></br><a target='_blank' href='http://www.creativesandbox.com/case-study/golden-gate-national-parks-conservancy-band-of-bridges'>See the full case study on the gallery here.</a>",
			"Band of Bridges",
			"img/band.jpg",
			"image",
			"With <a target='_blank' href='https://developers.google.com/maps/documentation/javascript/styling'>Styled Maps</a>, you can customize the base map layers to fit your needs. Change the base map colors to match your brand, draw attention to your data, or remove unwanted map features.</br></br><a target='_blank' href='https://developers.google.com/maps/customize'>Learn more</a>",
			"Customize the look and feel",
			"img/maps.jpg",
			"image"
		);
		
		this.data[ "MAPS_STREET_VIEW_CASESTUDY" ] = new caseStudyData(
			"Street View - Turn the world into your playground ",
			"Nature Valley ported the Street View 360 technology into some of the best, most beautiful trails in America’s National Parks, creating the original, unprecedented Trail View platform.</br></br><a target='_blank' href='http://www.creativesandbox.com/case-study/general-mills-nature-valley-trail-view'>See the full case study on the gallery here.</a>",
			"Nature Valley Trail View",
			"http://www.youtube.com/v/MqZ5DYE-MhQ?version=3&enablejsapi=1",
			"video",
			"With the <a target='_blank' href='https://developers.google.com/maps/documentation/javascript/'>Google Maps JavaScript API v3</a>, you can access our Street View global imagery database or add your own img (such as the inside of a building) to use in your apps. From the streets of Tokyo to the penguins of Antarctica, Street View is available on seven continents.",
			"Display your own Street View imagery",
			"img/streetview.jpg",
			"image"
		);

		//================================================= Search ===================

		this.data[ "SEARCH_HOME_CASESTUDY" ] = new caseStudyData(
			"Google Adwords",
			"Swedish agency Wisely used search creatively to drive new business. They proved that using search as a creative entrypoint to your digital experience can work wonders.</br></br><a target='_blank' href='http://www.creativesandbox.com/case-study/wisely-interactive-individual-marketing'>See the full case study on the gallery here.</a>",
			"Have you ever Googled yourself?",
			"http://www.youtube.com/v/uV_KlxNVmsA?version=3&enablejsapi=1",
			"video",
			"From a simple white box with ten blue links, search has dramatically evolved over the years. Google is building a massive knowledge graph of real-world things and their connections to bring you more meaningful results as well as rich extensions for your ads.</br></br><a target='_blank' href='http://www.google.com/insidesearch/features/search/knowledge.html'>More information here</a>",
			"",
			"http://www.youtube.com/v/mmQl6VGvX-c?version=3&enablejsapi=1",
			"video"
		);
		
		this.data[ "SEARCH_RICH_RESULTS_CASESTUDY" ] = new caseStudyData(
			"Rich Results",
			"Did you know you can immediately discover movie times and locations, or the weather forecast, by performing a simple search on Google? And have you tried voice search? These are just some of the various features that are gradually making search more like a personal assistant and delivering precisely what you want.</br></br><a target='_blank' href='http://www.google.com/insidesearch/features/'>Discover more here.</a>",
			"",
			"http://www.youtube.com/v/FyJZqHyKKIw?version=3&enablejsapi=1",
			"video",
			"",
			"",
			"",
			"",
			true
		);

		this.data[ "SEARCH_PRODUCT_LISTING_CASESTUDY" ] = new caseStudyData(
			"Product listing",
			"Product Listing Ads are search ads that include richer product information, such as product image, price and merchant name, without requiring additional keywords or ad text. They create a more engaging user experience while making it easy for you to promote your entire product line on Google search. And because Product Listing Ads are charged on a CPA basis, you only pay for conversions.</br></br><a target='_blank' href='http://www.google.com/ads/innovations/productlistingads.html'>Find more information on the Ad Innovation site.</a>",
			"",
			'http://www.youtube.com/v/ql-T12usumM?version=3&enablejsapi=1',
			"video",
			"",
			"",
			"",
			"",
			true
		);

		this.data[ "SEARCH_MEDIA_ADS_CASESTUDY" ] = new caseStudyData(
			"Media Ads",
			"When someone enters a search that is directly related to your video title, we automatically display your Video Ad at the top of the search results page. If people who search for your brand are primarily looking for video content, then Media Ads are right for you. It makes it easy to get your brand in front of the right audience on Google search.</br></br><a target='_blank' href='http://www.google.com/ads/innovations/mediaads.html'>Find more information on the Ad Innovation site.</a>",
			"",
			'http://www.youtube.com/v/W0SvjA6wSt8?version=3&enablejsapi=1',
			"video",
			"",
			"",
			"",
			"",
			true
		);

		this.data[ "SEARCH_SOCIAL_EXT_CASESTUDY" ] = new caseStudyData(
			"Social extensions",
			"Social extensions link your Google+ Page to your AdWords campaigns so that all your +1's – from your page, your website, ads and search – get tallied together. On average, search ads with social annotations receive a 5-10% uplift in click-through rate. Customers will be able to see the recommendations that your business has received, whether they're looking at an ad, a search result or your Google+ Page. This means that your +1’s will reach users across all of our products.</br></br><a target='_blank' href='http://www.google.com/ads/innovations/socialextensions.html'>Find more information on the Ad Innovation site.</a>",
			"",
			'http://www.youtube.com/v/dfbBYx-09vg?version=3&enablejsapi=1',
			"video",
			"",
			"",
			"",
			"",
			true
		);

		//================================================= Social ===================

		this.data[ "SOCIAL_HOME_CASESTUDY" ] = new caseStudyData(
			"Circles",
			"Circles make it easy to share the right things with the right people, just like in real life. Now you can share some things with close friends, others with your family, and almost nothing with your boss. Whether it’s restaurant directions on Google Maps or an entertaining YouTube video, circles make it easy to share no matter what you’re doing.",
			"Share like you mean it",
			'http://www.youtube.com/v/oRxKUXJj1WU?version=3&enablejsapi=1',
			"video",
			"",
			"",
			"",
			"",
			true
		);

		this.data[ "SOCIAL_INSTANT_UPLOAD" ] = new caseStudyData(
			"Instant Upload",
			"With instant Upload, photos and videos from your phone are automatically uploaded to your own private album on Google+, so you never lose a memory, even if you lose your phone.",
			"Never lose a memory anymore",
			'http://www.youtube.com/v/8aCYZ3gXfy8?version=3&enablejsapi=1',
			"video",
			"",
			"",
			"",
			"",
			true
		);
		
		this.data[ "SOCIAL_PARTY_MODE_CASESTUDY" ] = new caseStudyData(
			"Google+ events: Party Mode",
			"Google+ events lets you create beautiful event invites, and uses Party Mode to take Instant Upload to the next level. You can snap photos during a Google+ event and share them with everyone at the party in real time, right from your phone.",
			"Celebrate what matters, with the people who matter most",
			'http://www.youtube.com/v/uwMdqxJznMs?version=3&enablejsapi=1',
			"video",
			"",
			"",
			"",
			"",
			true
		);

		this.data[ "SOCIAL_HANGOUTS_CASESTUDY" ] = new caseStudyData(
			"Google+ Hangouts",
			"Truly innovative marketers get to know communities and find out how they can contribute. Verizon saw the vibrant music community on Google+, and the rising star, Daria, who made her career on Google+. They decided to contribute to the community by staging a Hangout concert for Daria on a roof in NYC, all streamed over Verizon 4G LTE.",
			"Verizon / Daria Musk concert",
			'http://www.youtube.com/v/RyrN2SsYXCM?version=3&enablejsapi=1',
			"video",
			"If you’re up to 10 people, videoconferencing is free with Google+ Hangouts. You can also livestream a conference to YouTube, or use the API to build fun webcam experiences.",
			"Catch-up face-to-face",
			'http://www.youtube.com/v/Y12DAZL7cyY?version=3&enablejsapi=1',
			"video"
		);
	},


	//================================================================================ Events ================================================================================

	getInfoBoxData: function( _handle ){ // called from main flipbook app
		// get data
		var infoboxdata = this.data[ _handle ];
		if( !infoboxdata ) return;
		return "<h5>" + infoboxdata.header + "</h5>" + "<p>" + infoboxdata.text + "</p>";
	},

	openCaseStudy: function( _handle, _type ){ // called from main flipbook app

		this.objCaseStudyContainer.css('display', 'table');

		// get data
		var casestudydata = this.data[ _handle ];
		if( !casestudydata ) return;

		// Cache handle
		this.currentHandle = _handle;

		// Check type
		var type;
		if(_type){
			type = _type;
		}else{
			type = 'casestudy';
			this.objNavRight.addClass("casestudy-nav-inactive");
			this.objNavLeft.removeClass("casestudy-nav-inactive");
		}

		// open case study
		this.objCaseStudyText.html( casestudydata[type + "_text"] );
		this.objCaseStudyTitle.html( casestudydata[type + "_header"] );
		this.objCaseStudyType.html( casestudydata.casestudy_category );

		// Reset the YT video
		this.objCaseStudyYTObject.hide();

		// Check for case study title
		if(casestudydata.isSingleTab){
			this.objNav.hide();
			this.objTabs.css("min-height", "320px");
		}else{
			this.objNav.show();
			this.objTabs.css("min-height", "380px");
		}

		// Check for video or image
		if(casestudydata[type + "_type"] == "video") {
			this.objCaseStudyYTMovie.attr("src", casestudydata[type + "_src"] );
			this.objCaseStudyYTPlayer.attr("src", casestudydata[type + "_src"] );
			this.objCaseStudy.removeClass('casestudy-image');
			this.objCaseStudy.addClass('casestudy-video');
			this.objCaseStudyImage.hide();
			this.objCaseStudyYTObject.show();
		}
		else {
			this.objCaseStudyImage.attr("src", casestudydata[type + "_src"] );
			this.objCaseStudy.addClass('casestudy-image');
			this.objCaseStudy.removeClass('casestudy-video');
			this.objCaseStudyYTObject.hide();
			this.objCaseStudyImage.show();
		}

		this.objCaseStudy.show();
	},

	closeCaseStudy: function( _handle ){ // called from button press

		this.objCaseStudyContainer.css('display', 'none');

		this.objCaseStudy.hide();

		// clean
		this.objCaseStudyText.html( '' );

		// resume
		flipbook.unpause();
	},

	showCaseStudy: function() { // called from ui
		this.objNavRight.addClass("casestudy-nav-inactive");
		this.objNavLeft.removeClass("casestudy-nav-inactive");
		this.openCaseStudy(this.currentHandle, "casestudy");
	},

	showMoreInfo: function() { // called from ui
		this.objNavRight.removeClass("casestudy-nav-inactive");
		this.objNavLeft.addClass("casestudy-nav-inactive");
		this.openCaseStudy(this.currentHandle, "more");
		
		// GA Tracking
		_gaq.push(['_trackEvent', 'overlays_moreinfo', this.currentHandle.toLowerCase() + "_moreinfo"]);
		_gaq.push(['b._trackEvent', 'overlays_moreinfo', this.currentHandle.toLowerCase() + "_moreinfo"]);
	}
}

//================================================================================ Classes ================================================================================

infoBoxData = function( _text, _header){
	this.text = _text;
	this.header = _header;
};

caseStudyData = function( _casestudy_category, _casestudy_text, _casestudy_header, _casestudy_src, _casestudy_type, _more_text, _more_header, _more_src, _more_type, _isSingleTab){

	this.casestudy_category = _casestudy_category;
	this.casestudy_text = _casestudy_text;
	this.casestudy_header = _casestudy_header;
	this.casestudy_src = _casestudy_src;
	this.casestudy_type = _casestudy_type;

	this.more_text = _more_text;
	this.more_header = _more_header;
	this.more_src = _more_src;
	this.more_type = _more_type;

	this.isSingleTab = _isSingleTab;
};


