<?php 
require "php/class.uploadImages.php";

$uploadImages = new uploadImages();

/* Images are required */
if ($uploadImages->countImages() > 0)
{
	
	/* Default validation:
		$uploadImages->image_type = "jpg|jpeg|png|gif";
		$uploadImages->min_size = "";
		$uploadImages->min_size = 24;
		$uploadImages->max_size = (1024*1024*3);
		$uploadImages->max_files = 10;
	*/
	
	/* Validate */
	if ($uploadImages->validateImages())
	{
		print("<h3 class='text-info'>IMAGES</h3>");
		/* images array */
		$images = $uploadImages->getImages();
		foreach ($images as $image)
		{
			/* save the image */
			if ($uploadImages->saveImage($image["tmp_name"], "images/", $image["name"]))
			{
				print ("<p class='text-success'>· <strong>" . $image["name"] . "</strong> saved in images folder</p>");
			}
			else
			{
				print("<p class='text-danger'>· " . $image["name"] . " error to saved</p>");
			}
		}
		/* GET EXTRA PARAMETERS */
		print("<h3 class='text-info'>EXTRA PARAMETERS</h3>");
		print_r($uploadImages->getParams());
	}
	else /* Show errors array */
	{
		print_r($uploadImages->error);
	}
}
else
{
	print("<p class='text-danger'>images required</p>");
}