<?php
namespace Cat;

use Animal\Animal;

class Cat extends Animal
{
    /**
     * @return string
     */
    public function meow()
    {
        return "Cat {$this->getName()} is saying meow";
    }
}