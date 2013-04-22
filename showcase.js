$(showcase); 

function showcase() {
	var show = $('.showcase');

	show.each(function() {
		var $this = $(this),
			$slides = $('.slides', $this),
			$slide = $('.slides-item', $this),
			$next = $('.nextbutton', $this),
			$back = $('.backbutton', $this),
			$thumbsbutton = $('.thumbsbutton', $this),
			$thumbnails = $('.thumbnails', $this),
			$style = $('<style>.slides-item {display: none;}</style>'),

			id = 0,
			thisslide = $($slide[id]),
			amount = $slide.length;

		imgAlign();
		thisslide.addClass('showing');
		$next.leftClick(nextSlide);
		$back.leftClick(prevSlide);
		$thumbsbutton.leftClick(thumbs);

		function nextSlide() {
			if (id < amount - 1) {
				thisslide.removeClass('showing');
				id++;
				thisslide = $($slide[id]);
				thisslide.addClass('showing');
				if (!$back.hasClass('hoverclass')) {
					$back.addClass('hoverclass');
				}
			}
			if (id == amount - 1) {
				$next.removeClass('hoverclass');
			}
		}

		function prevSlide() {
			if (id > 0) {
				thisslide.removeClass('showing');
				id--;
				thisslide = $($slide[id]);
				thisslide.addClass('showing');
				if (!$next.hasClass('hoverclass')) {
					$next.addClass('hoverclass');
				}
			}
			if (id == 0) {
				$back.removeClass('hoverclass');
			}
		}

		function thumbs() {
			$slides.add($back).add($next).add($thumbsbutton).hide();
			thisslide.removeClass('showing');
			$thumbnails.show();

			var thumbid = new Array(amount);
			for (var z = 0; z < amount; z++) {
				if ($($slide[z]).hasClass('h-align')) {
					thumbid.splice(z, 1, true);
				}
			}

			if (!$thumbnails.html().length) {
				for (var i = 0; i < amount; i++) {
					var $thumbs = $('<li class="thumbnails-item">'+'</li>');
						$thumbnails.append($thumbs),
						$curslide = $($slide[i]),
						textfinder = function(elt) {
							if (elt.find(':first-child').html() === undefined) {
								if (!$(elt[0]).is('img')) {
									var text = elt.parent().text();
									
									if (text.length > 60) {
										text = text.slice(0, 60) + '...';
									}
									text = '<h2 class="preview">' + text + '</h2>'
									$thumbs.append(text);
								} else {
									elt.clone().appendTo($thumbs);
								}
							} else {
								textfinder(elt.find(':first-child'));
							}
						}
						textfinder($curslide);

					$thumbs.each(function() {
						var $this = $(this),
							index = $this.index();

						if (thumbid[index]) {
							$this.addClass('h-align');
							var img = $this.find(':first-child'),
								imgheight = img.height(),
								thisheight = $this.height();

							img.css({'margin-top': (thisheight - imgheight)/2})
						}

						$this.on('click', function() {
							$thumbnails.hide();
							$slides.add($back).add($next).add($thumbsbutton).show();
							id = $this.index();
							thisslide = $($slide[id]);
							thisslide.addClass('showing');
							if (thisslide.index() == amount-1) {
								$next.removeClass('hoverclass');
								if (!$back.hasClass('hoverclass')) {
									$back.addClass('hoverclass');
								}
							} else if (thisslide.index() == 0) {
								$back.removeClass('hoverclass');
								if (!$next.hasClass('hoverclass')) {
									$next.addClass('hoverclass');
								}
							} else {
								$back.add($next).addClass('hoverclass');
							}
						});
					});
				}
			}
		}

		function imgAlign() {
			$this.imagesLoaded(function() {
				var $img = $('.slides-item img', $this);

				$img.each(function() {
					var $this = $(this);

					if ($this.width() > $slide.width()) {
						var i = $this.parent().index();
						$($slide[i]).addClass('h-align');
						$($slide[i]).css({'margin-top': ($slide.height() - this.height)/2});
					}
				});
				$style.appendTo('head');
			});
		}
	});
}