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
    let pressTimer;

    function moveButton(direction, personn = false) {
        const k = (direction === 'up' || direction === 'down') ? 'top' : 'left';
        const t = parseInt(obs.css(k), 10);
        const offset = (direction === 'up' || direction === 'left') ? -3 : 3;
        obs.css(k, (t + offset) + 'px');

        if (personn) {
            const t = parseInt(person.css(k), 10);
            person.css(k, (t + offset) + 'px');
        }
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

// Привязка событий к кнопкам
    bindMoveButton(up, 'up');
    bindMoveButton(left, 'left');
    bindMoveButton(down, 'down');
    bindMoveButton(right, 'right');
    bindMoveButton(onvifUp, 'up', true);
    bindMoveButton(onvifLeft, 'left', true);
    bindMoveButton(onvifDown, 'down', true);
    bindMoveButton(onvifRight, 'right', true);


    //Смена фона
    $('#backgrounds').change(function () {
        if ($(this).val() === "1") {
            obs.attr('src', 'images/green_background.jpg')
        }
        if ($(this).val() === "2") {
            obs.attr('src', 'images/flower.jpg')
        }
    })


})