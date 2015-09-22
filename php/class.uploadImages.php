<?php 
/*  Copyright 2015 Upload Multiple Images Ajax  (email : manudg_1@msn.com)

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License, version 2, as 
    published by the Free Software Foundation.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/
class uploadImages{
	
	public $image_type;
	public $min_size;
	public $max_size;
	public $max_files;
	public $folder;
	public $error;
	
	function __construct(){
		$this->image_type = "jpg|jpeg|png|gif";
		$this->min_size = 24;
		$this->max_size = (1024*1024*3);
		$this->max_files = 10;
		$this->error = array();
	}
	
	public function countImages()
	{
		foreach ($_FILES as $file)
		{
			return count($file["name"]);	
		}
	}
	
	public function getImages()
	{
		$images = array();
		foreach ($_FILES as $file)
		{
			for ($x = 0; $x < count($file["name"]); $x++)
			{
				$images[] = array(
				"name" => $file["name"][$x], 
				"size"=> $file["size"][$x],
				"tmp_name" => $file["tmp_name"][$x],
				"type" => $file["type"][$x],
				"error" => $file["error"][$x]
				);
			}
		}
		return $images;
	}
	
	public function getParams()
	{
		return $_GET;
	}
	
	public function saveImage($tmp_name, $folder, $image_name)
	{
		if(move_uploaded_file($tmp_name, $folder.$image_name))
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	
	public function validateImages()
	{
		$images = $this->getImages();
		
		foreach ($images as $image)
		{
			$type = $image["type"];
			$image_type = explode("/", $type);
			$content_type = explode("|", $this->image_type);
			$size = $image["size"];
			
			if (count($images) > $this->max_files)
			{
				$this->error = array("error_type" => "ERROR_MAX_FILES");
				break;
			}
			else if (!array_search($image_type[1], $content_type))
			{
				$this->error = array(
				"error_type" => "ERROR_CONTENT_TYPE", 
				"image_name" => $image["name"], 
				"image_type" => $image["type"]
				);
				break;
			}
			else if ($size < $this->min_size)
			{
				$this->error = array(
				"error_type" => "ERROR_MIN_SIZE", 
				"image_name" => $image["name"], 
				"image_type" => $image["size"]
				);
				break;
			}
			else if ($size > $this->max_size)
			{
				$this->error = array(
				"error_type" => "ERROR_MAX_SIZE", 
				"image_name" => $image["name"], 
				"image_type" => $image["size"]
				);
				break;
			}	
			else
			{
				return true;	
			}			
		}
	}
}