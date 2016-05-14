<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use DB;

class ParsePositions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'positions:parse';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Parse positions from csv file to database';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $path = storage_path('app/positions') . '/';
        $files = scandir($path);
        foreach($files as $file) {
            if(preg_match('/\.csv|\.txt$/i', $file)) {
                $positions = [];
                $fh = fopen($path . $file, 'r');
                if($fh) {
                    $first = true;
                    while(($line = fgets($fh)) !== false) {
                        if(!$first) {
                            $parts = explode(',', $line);
                            if(count($parts)) {
                                $positions[] = [
                                    'timestamp' => strtotime($parts[0]),
                                    'lat' => $parts[1],
                                    'long' => $parts[2],
                                ];
                            }
                        } else {
                            $first = false;
                        }
                    }
                    fclose($fh);

                    if(count($positions) > 0) {
                        $result = DB::table('positions')->insert($positions);
                        if($result) {
                            rename($path . $file, $path . 'done/' . $file);
                        }
                    }
                } else {
                    $this->error('Could not open file: ' . $file);
                } 
            }
        }
    }
}
