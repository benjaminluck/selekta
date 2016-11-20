<?php

class FileList
{
    public $fileList = [];

    public $skipFiles = [
    '..',
    '.',
    '.DS_Store',
    'index.php',
    '.com.greenworldsoft.syncfolderspro',
    'README.md',
    'list.json',
    '__readme.rtf',
  ];

    public $musicExt = [
    'mp3',
    'aiff',
    'aif',
    'm4a',
  ];

    public function describeMusicItem($it, $file)
    {
        $folder_array = explode('/', $it['relPath']);
        $file_array = explode(' ', $file);
        $it['songGroup'] = $folder_array[0];
        $it['key'] = $file_array[0];
        $it['bpm'] = $file_array[1];
        $it['bpmGroup'] = $folder_array[1];
        $stripe_location = array_search('-', $file_array);
        $it['artist'] = '';

        for ($a = 2; $a < $stripe_location; ++$a) {
            if ($file_array[$a] == '(V)' || $file_array[$a] == '(C)' || $file_array[$a] == '(VINYL)' || $file_array[$a] == '(CASS)') {
                $it['medium'] = $file_array[$a];
                continue;
            }
            $it['artist'] .= $file_array[$a];
            $it['artist'] .= ' ';
        }

        $it['title'] = '';
        if (isset($it['artist'])) {
            $it['artist'] = rtrim($it['artist']);
        }
        for ($b = $stripe_location + 1; $b < sizeof($file_array); ++$b) {
            $it['title'] .= $file_array[$b];
            $it['title'] .= ' ';
        }

        $it['title'] = rtrim(str_replace('.'.$it['ext'], '', $it['title']));

        return $it;
    }

    public function newItem($file, $inputDir, $startDir)
    {
        $it = [];
        $it['srcPath'] = $inputDir.$file; // full path
        $it['relPath'] = str_replace($startDir, '', $it['srcPath']); // path from starting directory
        $it['fileName'] = $file;
        $meta = pathinfo($it['srcPath']);
        $it['ext'] = $meta['extension'];

        return $it;
    }

    public function __construct()
    {
        // construct logic;
    }

    public function JSON()
    {
        return json_encode($this->fileList);
    }
}
