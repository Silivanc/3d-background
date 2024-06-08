$(document).ready(function () {
    let buttons = $('.studio-control-button img');

    buttons.on('mousedown', function (e) {
        $(e.target).addClass('down').removeClass('up');
    });

    buttons.on('mouseup', function (e) {
        $(e.target).addClass('up').removeClass('down');
    });

    //obs position
    let person = $('.person > img');
    let obs = $('.obs > img');
    let up = $('.studio-control-up');
    let down = $('.studio-control-down');
    let right = $('.studio-control-right');
    let left = $('.studio-control-left');
    let onvifUp = $('.background-onvif-up');
    let onvifLeft = $('.background-onvif-left');
    let onvifDown = $('.background-onvif-down');
    let onvifRight = $('.background-onvif-right');
    let plus = $('.background-onvif-plus');
    let minus = $('.background-onvif-minus');

    let pressTimer;

    function moveButton(direction, personn = false) {
        const k = (direction === 'up' || direction === 'down') ? 'top' : 'left';
        const t = parseInt(obs.css(k), 10);
        const offset = (direction === 'up' || direction === 'left') ? 3 : -3;

        if (personn) {
            const p = parseInt(person.css(k), 10);

            if (p <= 0 && direction === 'left')
                return

            if (p >= 170 && direction === 'up')
                return

            if (p >= 600 && direction === 'right')
                return

            if (p <= -20 && direction === 'down')
                return

            if (k === 'top')
                person.css(k, (p + offset) + 'px');
            else
                person.css(k, (p + offset) + 'px');
        }

        obs.css(k, (t + offset) + 'px');
    }

    function bindMoveButton(element, direction, personn = false) {
        const move = () => moveButton(direction, personn);

        element
            .click(move)
            .mouseup(() => {
                clearTimeout(pressTimer);
                return false;
            })
            .mousedown(() => {
                pressTimer = setInterval(move, 100);
                return false;
            })
            .mouseout(() => clearTimeout(pressTimer));
    }

    function zoomButton(element) {
        const zoom = () => {
            console.log(person.css('zoom'))
            const t = parseFloat(person.css('zoom'));
            const b = parseFloat(person.css('bottom'));
            const l = parseFloat(obs.css('left'));
            const offset = (element.is(plus)) ? 0.01 : -0.01;

            if(t >= 1.15 && element.is(plus))
                return

            if(t <= 0.95 && element.is(minus))
                return

            console.log(t + offset)

            person.css('zoom', (t + offset));
            person.css('bottom', (b - offset*350));
            obs.css('zoom', (t + offset));
            obs.css('left', (l - offset*325));
        }
        console.log(person.css('zoom'))
        element
            .click(zoom)
            .mouseup(() => {
                clearTimeout(pressTimer);
                return false;
            })
            .mousedown(() => {
                pressTimer = setInterval(zoom, 100);
                return false;
            })
            .mouseout(() => clearTimeout(pressTimer));


    }

// Привязка событий к кнопкам
    bindMoveButton(up, 'up');
    bindMoveButton(left, 'left');
    bindMoveButton(down, 'down');
    bindMoveButton(right, 'right');
    bindMoveButton(onvifUp, 'up', true);
    bindMoveButton(onvifLeft, 'left', true);
    bindMoveButton(onvifDown, 'down', true);
    bindMoveButton(onvifRight, 'right', true);

    // zoomButton(plus);
    // zoomButton(minus);

    //Смена фона
    $('#backgrounds').change(function () {
        if ($(this).val() === "1") {
            obs.attr('src', 'images/flower.jpg')
        }
        if ($(this).val() === "2") {
            obs.attr('src', 'images/eyes.jpg')
        }
        if ($(this).val() === "3") {
            obs.attr('src', 'images/spring.jpg')
        }
    })

})