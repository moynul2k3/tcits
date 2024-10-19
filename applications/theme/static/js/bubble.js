$(document).ready(function() {
    var canvas = $('canvas')[0]; // Get canvas DOM element
    canvas.height = $(canvas).innerHeight();
    canvas.width = $(canvas).innerWidth();
    var c = canvas.getContext('2d');
    

    $(window).on('resize', function() {
        canvas.height = $(canvas).innerHeight();
        canvas.width = $(canvas).innerWidth();
        initCanvas();
    });

    var mouse = {
        x: undefined,
        y: undefined
    };

    var cursor = $(".cursor");

    $(window).on('mousemove', function(event) {
        cursor.css({ left: event.clientX, top: event.clientY });
        mouse.x = event.clientX;
        mouse.y = event.clientY;
        drawCircles();
    });

    $(window).on('touchmove', function(event) {
        let touch = event.touches[0];
        mouse.x = touch.clientX;
        mouse.y = touch.clientY;
        drawCircles();
    });

    function Circle(x, y, radius, vx, vy, rgb, opacity, birth, life) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.minRadius = radius;
        this.vx = vx;
        this.vy = vy;
        this.birth = birth;
        this.life = life;
        this.opacity = opacity;

        this.draw = function() {
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            c.fillStyle = 'rgba(' + rgb + ',' + this.opacity + ')';
            c.fill();
        };

        this.update = function() {
            if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
                this.vx = -this.vx;
            }

            if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
                this.vy = -this.vy;
            }

            this.x += this.vx;
            this.y += this.vy;

            this.opacity = 1 - (((frame - this.birth) * 1) / this.life);

            if (frame > this.birth + this.life) {
                for (let i = 0; i < circleArray.length; i++) {
                    if (this.birth == circleArray[i].birth && this.life == circleArray[i].life) {
                        circleArray.splice(i, 1);
                        break;
                    }
                }
            } else {
                this.draw();
            }
        };
    }

    var circleArray = [];

    function initCanvas() {
        circleArray = [];
    }

    var colorArray = [
        '9, 201, 204',
        '9, 80, 100',
        '9, 201, 264'
    ];

    function drawCircles() {
        for (let i = 0; i < 6; i++) {
            let radius = Math.floor(Math.random() * 4) + 2;
            let vx = (Math.random() * 2) - 1;
            let vy = (Math.random() * 2) - 1;
            let spawnFrame = frame;
            let rgb = colorArray[Math.floor(Math.random() * colorArray.length)];
            let life = 100;
            circleArray.push(new Circle(mouse.x, mouse.y, radius, vx, vy, rgb, 1, spawnFrame, life));
        }
    }

    var frame = 0;

    function animate() {
        requestAnimationFrame(animate);
        frame += 1;
        c.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < circleArray.length; i++) {
            circleArray[i].update();
        }
    }

    initCanvas();
    animate();

    for (let i = 1; i < 600; i++) {
        (function(index) {
            setTimeout(function() {
                mouse.x = i * 10;
                mouse.y = canvas.height / 2;
                drawCircles();
            }, i * 7);
        })(i);
    }

    
    //Scroll back to top
    var progressPath = document.querySelector('.progress-wrap path');
    var pathLength = progressPath.getTotalLength();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
    progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';		
    var updateProgress = function () {
        var scroll = $(window).scrollTop();
        var height = $(document).height() - $(window).height();
        var progress = pathLength - (scroll * pathLength / height);
        progressPath.style.strokeDashoffset = progress;
    }
    updateProgress();
    $(window).scroll(updateProgress);	
    var offset = 50;
    var duration = 550;
    jQuery(window).on('scroll', function() {
        if (jQuery(this).scrollTop() > offset) {
            jQuery('.progress-wrap').addClass('active-progress');
        } else {
            jQuery('.progress-wrap').removeClass('active-progress');
        }
    });				
    jQuery('.progress-wrap').on('click', function(event) {
        event.preventDefault();
        jQuery('html, body').animate({scrollTop: 0}, duration);
        return false;
    })




    const $boxTop = $('.animate_box');
    const $boxLeft = $('.box_left');
    const $boxRight = $('.box_right');

    function checkBoxes() {
        const onScreen = $(window).scrollTop() + $(window).height();

        $boxTop.each(function() {
            const boxTop = $(this).offset().top;

            if (boxTop < onScreen) {
                $(this).addClass('slide-top').removeClass('slide-bottom');
            } else {
                $(this).removeClass('slide-top').addClass('slide-bottom');
            }
        });

        $boxLeft.each(function() {
            const boxTop = $(this).offset().top;

            if (boxTop < onScreen) {
                $(this).addClass('slide-left').removeClass('slide-right');
            } else {
                $(this).removeClass('slide-left').addClass('slide-right');
            }
        });

        
        $boxRight.each(function() {
            const boxTop = $(this).offset().top;

            if (boxTop < onScreen) {
                $(this).removeClass('slide-left').addClass('slide-right');
            } else {
                $(this).addClass('slide-left').removeClass('slide-right');
            }
        });
    }

    $(window).on('scroll', checkBoxes);
    checkBoxes(); 


    $(".ring_hidden").hover(
        function(){
            $('.cb-cursor').hide();
        },
        function(){
            $('.cb-cursor').show();
        }
    );
    $(".ring_show").hover(
        function(){
            $('.cb-cursor').show();
        },
        function(){
            $('.cb-cursor').hide();
        }
    );







  let i=2;

	
	$(document).ready(function(){
		var radius = 200;
		var fields = $('.itemDot');
		var container = $('.dotCircle');
		var width = container.width();
        radius = width/2.5;

		var height = container.height();
		var angle = 0, step = (2*Math.PI) / fields.length;
		fields.each(function() {
			var x = Math.round(width/2 + radius * Math.cos(angle) - $(this).width()/2);
			var y = Math.round(height/2 + radius * Math.sin(angle) - $(this).height()/2);
			if(window.console) {
				console.log($(this).text(), x, y);
			}
			
			$(this).css({
				left: x + 'px',
				top: y + 'px'
			});
			angle += step;
		});
		
		
		$('.itemDot').click(function(){
			
			var dataTab= $(this).data("tab");
			$('.itemDot').removeClass('active');
			$(this).addClass('active');
			$('.CirItem').removeClass('active');
			$( '.CirItem'+ dataTab).addClass('active');
			i=dataTab;
			
			$('.dotCircle').css({
				"transform":"rotate("+(360-(i-1)*36)+"deg)",
				"transition":"2s"
			});
			$('.itemDot').css({
				"transform":"rotate("+((i-1)*36)+"deg)",
				"transition":"1s"
			});
			
			
		});
		
		setInterval(function(){
			var dataTab= $('.itemDot.active').data("tab");
			if(dataTab>10||i>10){
                dataTab=1;
                i=1;
			}
			$('.itemDot').removeClass('active');
			$('[data-tab="'+i+'"]').addClass('active');
			$('.CirItem').removeClass('active');
			$( '.CirItem'+i).addClass('active');
			i++;
			
			
			$('.dotCircle').css({
				"transform":"rotate("+(360-(i-2)*36)+"deg)",
				"transition":"2s"
			});
			$('.itemDot').css({
				"transform":"rotate("+((i-2)*36)+"deg)",
				"transition":"1s"
			});
			
			}, 5000);
		
	});


});

