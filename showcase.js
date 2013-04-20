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
					thumbid.splice(z, 1, $($slide[z]).index());
				}
			}

			if (!$thumbnails.html().length) {
				for (var i = 0; i < amount; i++) {
					var $thumbs = $('<li class="thumbnails-item">'+'</li>');
						$thumbnails.append($thumbs);
						if ($('img', $slide[i]).length) {
							$('img', $slide[i]).clone().appendTo($thumbs);
						} else {
							function textfinder(a) {
								if (a.find(':first-child').html() === undefined) {
									var text = a.parent().text();
									text = '<h2 class="preview">' + text + '</h2>'
									$thumbs.append(text);
								} else {
									textfinder(a.find(':first-child'));
								}
							}
							textfinder($($slide[i]));
						}

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
				var $img = $('.slides-item img');

				$img.each(function() {
					var $this = $(this);

					console.log($this.width())
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