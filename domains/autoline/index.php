<?php

use FileFinder\FileFinderImplementation;

spl_autoload_register();

# search for all .conf or .ini files in directories /etc/ and /var/log/
$fileList = (new FileFinderImplementation())
    ->isFile()
    ->inDir('/etc/')
    ->inDir('/var/log/')
    ->match('/.*\.conf$/')
    ->match('/.*\.ini$/');
$files = $fileList->getList();
foreach ($files as $file) {
    print $file . "\n";
}

# search for all files in /tmp
$fileList = (new FileFinderImplementation())
    ->isFile()
    ->inDir('/tmp');
$files = $fileList->getList();
foreach ($files as $file) {
    print $file . "\n";
}

# search for .doc files in /tmp
$fileList = (new FileFinderImplementation())
    ->isFile()
    ->inDir('/tmp')
    ->match('/.*\.doc$/');
$files = $fileList->getList();
foreach ($files as $file) {
    print $file . "\n";
}

# should throw an exception if no dirs were provided
$fileList = (new FileFinderImplementation())
    ->isFile()
    ->match('/.*\.ini$/');
$files = $fileList->getList(); # -> exception




//test

# search for all .conf or .ini files in directories /etc/ and /var/log/
//$fileList = (new FileFinderImplementation())
//    ->inDir('H:\FLAC\Sybreed - The Pulse Of Awakening (2009)');
//$files = $fileList->getList();
//foreach ($files as $file) {
//    print $file . "<br/>";
//}
//print "_________________________________________<br/>";


//# search for all files in /tmp
//$fileList = (new FileFinderImplementation())
//    ->isDir()
//    ->inDir('H:\FLAC\Sybreed - The Pulse Of Awakening (2009)');
//$files = $fileList->getList();
//foreach ($files as $file) {
//    print $file . "<br/>";
//}
//
//print "_________________________________________<br/>";
//
//
//# search for .doc files in /tmp
//$fileList = (new FileFinderImplementation())
//    ->inDir('H:\FLAC\Sybreed - The Pulse Of Awakening (2009)');
//$files = $fileList->getList();
//foreach ($files as $file) {
//    print $file . "<br/>";
//}
//
//print "_________________________________________<br/>";
//
//
//# should throw an exception if no dirs were provided
//$fileList = (new FileFinderImplementation())
//    ->isFile()
//    ->match('/.*\.ini$/');
//$files = $fileList->getList(); # -> exception
