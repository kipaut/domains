var length,
    countCells,
    countBones,
    bones = [],
    box,
    fifteen = {};

// пересоздаем
document.getElementById('newGame').onclick = function() {
    box.style.backgroundColor = "white";
    document.getElementsByTagName('div')[0].remove();
    createGame();
};

// вешаем на кнопки ивенты
window.addEventListener('keyup', function (e) {
    if (fifteen.go(fifteen.moves[{39: 'left', 37: 'right', 40: 'up', 38: 'down'}[e.keyCode]])) {
        draw();
        if (fifteen.isCompleted()) {
            fifteen.win();
        }
    }
});

createGame();

function createGame() {

    length = 4;

    if (document.getElementById('len').value > 1 && document.getElementById('len').value < 8) {
        length = Number(document.getElementById('len').value);
    }

    countCells = length * length;
    countBones = length * length - 1;
    bones = [];

    while (bones.length < countBones) {
        bones.push(bones.length + 1);
    }

    fifteen = {
        moves: {up: -length, down: length, left: -1, right: 1},
        order: bones.sort(function() {return 0.5 - Math.random()}).concat([0]),
        hole: countBones,

        isCompleted: function () {
            return !this.order.some(function (item, i) {
                return item > 0 && item - 1 !== i;
            });
        },

        go: function (move) {
            var index = this.hole + move;

            if (!this.order[index]) return false;

            if ((move == fifteen.moves.left || move == fifteen.moves.right) &&
                (Math.floor(this.hole / length) !== Math.floor(index / length))) {
                return false;
            }

            this.swap(index, this.hole);
            this.hole = index;
            return true;
        },

        swap: function (i1, i2) {
            var t = this.order[i1];
            this.order[i1] = this.order[i2];
            this.order[i2] = t;
        },

        solvable: function (a) {
            for (var kDisorder = 0, i = 1, len = a.length - 1; i < len; i++)
                for (var j = i - 1; j >= 0; j--) if (a[j] > a[i]) kDisorder++;
            return !(kDisorder % 2);
        },

        win: function () {
            box.style.backgroundColor = "gold";
        }
    };

    if (!fifteen.solvable(fifteen.order)) {
        fifteen.swap(0, 1);
    }

    // создаем блок для пятнашек
    var gameBlock = document.createElement('div');
    gameBlock.setAttribute("style", 'width: ' + (length * 114) + 'px');

    box = document.body.appendChild(gameBlock);

    // добавляем кости
    for (var i = 0; i < countCells; i++) {
        var bone = document.createElement('div');
        bone.setAttribute('class', 'bone');
        box.appendChild(bone);
    }

    // вешаем клики мышки
    for (var i = 0; i <  document.getElementsByClassName('bone').length; i++) {
        document.getElementsByClassName('bone')[i].onclick = function() {

            var order = fifteen.order.indexOf(Number(this.innerText));

            if (fifteen.hole == order - 1 ||
                fifteen.hole == order + 1 ||
                fifteen.hole == order - length ||
                fifteen.hole == order + length)
            {
                fifteen.go(order - fifteen.hole);
                draw();
                if (fifteen.isCompleted()) {
                    fifteen.win();
                }
            }
        };
    }

    draw();
}

function draw() {
    for (var i = 0, tile; tile = box.childNodes[i], i < countCells; i++) {
        tile.textContent = fifteen.order[i];
        tile.style.visibility = fifteen.order[i] ? 'visible' : 'hidden';
    }
}

