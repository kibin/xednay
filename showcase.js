$(function() {
	showcase();
});

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
			$thumbitem = $('.thumbnails-item', $this),

			id = 0,
			thisslide = $($slide[id]),
			amount = $slide.length;

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
			}
		}

		function prevSlide() {
			if (id > 0) {
				thisslide.removeClass('showing');
				id--;
				thisslide = $($slide[id]);
				thisslide.addClass('showing');
			}
		}

		function thumbs() {
			$slides.add($back).add($next).add($thumbsbutton).hide();
			thisslide.removeClass('showing');
			$thumbnails.show();
			if (!$thumbnails.html().length) {
				for (var i = 0; i < amount; i++) {
					var	$thumbs = $('<li class="thumbnails-item">'+'</li>');
						$thumbnails.append($thumbs);
						if ($('img', $slide[i]).length == true) {
							$($('img', $slide[i])[0]).clone().appendTo($thumbs);
						} else {
							textfinder($($($slide[i])[0]));

							function textfinder(a) {
								if (a.find(':first-child').html() === undefined) {
									var text = a.parent().text();
									text = '<h2 class="preview">' + text + '</h2>'
									$thumbs.append(text);
								} else {
									textfinder(a.find(':first-child'));
								}
							}
						}
					

					$thumbs.each(function() {
						var $this = $(this);

						$this.on('click', function() {
							$thumbnails.hide();
							$slides.add($back).add($next).add($thumbsbutton).show();
							id = $this.index();
							thisslide = $($slide[id]);
							thisslide.addClass('showing');
						});
					});
				}
			}
		}
	});
}