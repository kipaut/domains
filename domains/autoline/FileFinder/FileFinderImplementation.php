<?php
namespace FileFinder;

use Exception;

class FileFinderImplementation implements FileFinder {

    /**
     * @var bool
     */
    private $isFile = true;

    /**
     * @var bool
     */
    private $isDir = true;

    /**
     * @var array
     */
    private $dir = [];

    /**
     * @var array
     */
    private $regularExpression = [];

    /**
     * @var array
     */
    private $list = [];

    /**
     * @var array
     */
    private $listDir = [];

    /**
     * Find only files
     * @return FileFinder
     */
    public function isFile()
    {
        $this->isDir = false;
        $this->isFile = true;

        return $this;
    }

    /**
     * Find only directories
     * @return FileFinder
     */
    public function isDir()
    {
        $this->isFile = false;
        $this->isDir = true;

        return $this;
    }

    /**
     * Search in directory $dir
     * @param string $dir
     * @return FileFinder
     * @throws Exception
     */
    public function inDir($dir)
    {
        if (in_array($dir, $this->dir)) {
            return $this;
        } else if (file_exists($dir)) {
            $this->dir[] = $dir;
        } else {
            throw new Exception("Directory '$dir' does not exist. Please, check the path you want scan.", 0);
        }

        return $this;
    }

    /**
     * Filter by regular expression on path
     * @param string $regularExpression
     * @return FileFinder
     * @throws Exception
     */
    public function match($regularExpression)
    {
        if (!empty($regularExpression)) {
            $this->regularExpression[] = $regularExpression;
        } else {
            throw new Exception("Regular expression '$regularExpression' does not exist.", 0);
        }

        return $this;
    }

    /**
     * Returns array of all found files/dirs (full path)
     * @return string[]
     * @throws Exception
     */
    public function getList()
    {
        if (empty($this->dir)) {
            throw new Exception("Directory is not available.", 0);
        }

        while(!empty($this->dir)) {
            $currentDir = array_pop($this->dir);

            foreach(scandir($currentDir) as $name) {
                if (strcmp($name, '.') != 0 && strcmp($name, '..') != 0) {
                    $currentName = $currentDir.DIRECTORY_SEPARATOR.$name;

                    if (is_dir($currentName) && !in_array($currentName, $this->dir)) {
                        $this->dir[] = $currentName;

                        if ($this->isDir) {
                            $this->listDir[] = $currentName;
                        }
                    }

                    if (is_file($currentName) && $this->isFile) {
                        if (!empty($this->regularExpression)) {
                            foreach ($this->regularExpression as $regExp) {
                                if (preg_match($regExp, $currentName)) {
                                    $this->list[] = $currentName;
                                }
                            }
                        } else {
                            $this->list[] = $currentName;
                        }
                    }
                }
            }
        }

        if ($this->isDir && !$this->isFile) {
            return $this->listDir;
        }

        if (!$this->isDir && $this->isFile) {
            return $this->list;
        }

        return array_merge($this->listDir, $this->list);
    }
}