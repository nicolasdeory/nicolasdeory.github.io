function decryptEmail(encoded) {

    var address = atob(encoded);
    window.location.href = "mailto:" + address;

}



sections = ["", "Work & Projects"];

$(document).ready(() => {

    
    sectionIndex = parseInt($("#grid-container #section-index").text());
    transitionDirection = "";

    function checkSections(sectionIndex) {
        if (sectionIndex >= sections.length - 1) {
            $("#nav-right").fadeTo(150, 0);
            $("#nav-right").css("pointer-events", "none");
            $("#nav-left").delay(100).fadeTo(250, 1);
            $("#nav-left").css("pointer-events", "auto");
        } else if(sectionIndex == 0) {
            $("#nav-left").fadeTo(150, 0);
            $("#nav-left").css("pointer-events", "none");
            $("#nav-right").delay(100).fadeTo(250, 1);
            $("#nav-right").css("pointer-events", "auto");
        }else {
            $("#nav-right").delay(100).fadeTo(250, 1);
            $("#nav-right").css("pointer-events", "auto");
            $("#nav-left").delay(100).fadeTo(250, 1);
            $("#nav-left").css("pointer-events", "auto");
        }
    
        $("#nav-right").off("click");
        $("#nav-left").off("click");

        switch(sectionIndex) {
            case 0:
                    $("#nav-right").click(function() {
                        transitionDirection = "right";
                        smoothState.load("/posts.html");
                    });
                break;
            case 1:
                    $("#nav-left").click(function() {
                        transitionDirection = "left";
                        smoothState.load("/");
                    });
                break;
        }
    }

    var smoothState = $("#grid-container").smoothState({
        debug: true,
        prefetch: true,
        onStart: {
            duration: 0,
            render: function($container) {
                smoothState.restartCSSAnimations();
                $(".section-header").fadeTo(50, 0);
            }
        },
        onProgress: {
            duration: 0,
            render: function($container) {
                $("#page-loading-spinner").fadeTo(100,1);
            }
        },
        onReady: {
            duration: 500,
            render: function($container, $newContent) {
                goingRight = transitionDirection == "right";
                
                $("#page-loading-spinner").fadeTo(50, 0);
                
                $container.addClass(`is-sliding-${goingRight ? "left" : "right"}`);
                $("#game-background").after("<div id='grid-container-2' class='grid-container'></div>");
                $("#grid-container-2").append($newContent);
                // SO FOR SOME REASON GRID-CONTAINER-2 GETS CREATED TWICE/THRICE SO IT MESSES UP THE SECTIONINDEX (111 instead of 1, because there are 3 grid-container-2)...

                sectionIndex = parseInt($("#grid-container-2 #section-index").text());
                checkSections(sectionIndex);
                $("#grid-container-2 .main-grid").css("transform", `translateX(${goingRight ? "100vw" : "-100vw"})`);
                
        
                $("#grid-container-2 .main-grid").css("transition","transform 0.35s ease-in-out");
                $(".square").each(function(index) {$(this).css("opacity","1")});

                setTimeout(function() {
                    $("#grid-container-2 .main-grid").css("transform", "");
                    $(".section-header").text(sections[sectionIndex]);
                    $(".section-header").fadeTo(150, 1);
                }, 50);

            }
        },
        onAfter: function($container, $newContent) {
            $("#grid-container").html($newContent);
            $("#grid-container").removeClass("is-sliding-left");
            $("#grid-container").removeClass("is-sliding-right");
            $("#grid-container .main-grid").css("transition", "");
            $("#grid-container-2").remove();
        }
    }).data('smoothState');

    checkSections(sectionIndex);

    $(".section-header").delay(100).fadeTo(150, 1);


    $(".fadeable").each(function(index) {
        $(this).delay(100+index*40).fadeTo(700,1);
    });

    const WIDTH = $(window).width();
    const HEIGHT = document.body.scrollHeight; 

    $(window).resize(() => {
        game.canvas.width = $(window).width();
        var height = document.body.scrollHeight; 
        game.scene.scenes[0].cameras.main.setBounds(0,0,$(window).width(), height);
        game.scene.scenes[0].cameras.main.setViewport(0,0,$(window).width(), height);

    });


    /* ANIMATED BACKGROUND */
    
    var config =  {
        width: WIDTH,
        height: HEIGHT,
        parent: "game-background",
        backgroundColor: 0x111111,
        antialias: true,
        scale: {
            parent: 'game-background',
            mode: Phaser.Scale.RESIZE,
        },
        scene: { preload: preload, create: create, update: update }
    }
    var game = new Phaser.Game(config);

    function preload() {
        this.load.text('particle-effect', 'img/shapes/particles.json');
        this.load.atlas('shapeSprites', 'img/shapes/spritesheet.png','img/shapes/sprites.json');
    }
    var screenRect = new Phaser.Geom.Rectangle(-50, -50, 1990, 1080);
    function create() {
        var particles = this.add.particles('shapeSprites');
        shapeEmitter = particles.createEmitter({
            frame: ["circle","line","triangle","circlesmall","wobbly","arc","cross","square"],
            quantity: 1,
            scale: 0.05,
            lifespan: 200000,
            on: false,
            emitZone: {
                source: new Phaser.Geom.Rectangle(-1920/2, -1080/2, 1920, 1080)
            },
            deathZone: {
                source: screenRect,
                type: 'onLeave'
            },
            alpha: { onUpdate: function(p,k,t,v) { return t > 0.05 ? 1 : t*20 } },
            rotate: { min: 0, max: 2000 },
            speedX: { onEmit: () => Math.random() >= 0.5 ? 10 : -10 },
            speedY: { onEmit: () => Math.random() >= 0.5 ? 19 : -10 },
            maxSpeed: 10,
            angle: { min: 0, max: 2000 },
            maxVelocityX: 10,
            maxVelocityY: 10,
            tint: [0xbbbbbb]
        });

        shapeEmitter.setPosition(1920 / 2, 1080 / 2);
        
        for (let i = 0; i < 80; i++) {
           shapeEmitter.emitParticle();         
        }

    }

    function update() {
        if(shapeEmitter.getParticleCount()-shapeEmitter.getDeadParticleCount() < 80) {
            shapeEmitter.emitParticle();
        }
    }


});