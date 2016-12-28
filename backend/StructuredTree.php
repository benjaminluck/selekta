<?php

class StructuredTree extends FileList
{
    public $inputDir;
    public $startDir;

    public $list = [];
    public $tree;

    public function __construct($start)
    {
        parent::__construct($start);

        // construct logic;
        $this->inputDir = $start;
        $this->startDir = $start;
    }

    public function printList()
    {
        print_r($this->list);
    }

    public function JSON()
    {
        return json_encode($this->list);
    }

    public function Array()
    {
        return $this->list;
    }

    public function buildList($dir1 = null, $dir2 = null)
    {
        if (is_null($dir1)) {
            $dir1 = $this->inputDir;
        }
        if (is_null($dir2)) {
            $dir2 = $this->startDir;
        }

        chdir($dir1);
        $tree = [];
        $list = [];
        if (is_dir($dir2)) {
            if ($dhandler = opendir($dir2)) {
                $items = [];
                while (($file = readdir($dhandler)) !== false) {
                    if (!in_array($file, $this->skipFiles)) {
                        if (is_dir($file)) {
                            // logic if file being read is a directory
                            $items['/'.$file] = $this->buildList($dir1.$file.'/', $dir2.$file.'/');
                            chdir($dir1);
                        } else {
                            // logic if file is an actual file
                            $it = $this->newItem($file, $dir2, $this->startDir);
                            if(in_array($it['ext'], $this->musicExt)){ $it = $this->describeMusicItem($it, $file); }

                            $items[$file] = $it;

  //                          $this->list[$file] = $it;
                        }
                    }
                }
            }
        }
        $this->list = $items;
        return $items;
    }
}
