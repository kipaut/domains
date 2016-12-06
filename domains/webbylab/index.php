<?php

use Cat\Cat;

spl_autoload_register();

$cat = new Cat('garfield');
var_dump(
    $cat->getName(),
    $cat->meow(),
    $cat->getName() === 'garfield',
    $cat->meow() === 'Cat garfield is saying meow'
);

