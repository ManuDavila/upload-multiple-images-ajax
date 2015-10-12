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
(function($){
 __items__upload__ = new Array();
$.fn.uploadImagesPreview = function(form, options, callback){
	__errors__upload__ = '';
	var defaults = {
		image_type: "jpg|jpeg|png|gif",
		min_size: 24,
		max_size: (1024*1024*3),
		max_files: 10
	};
	if (options === undefined) {options = defaults;}
	if (options.image_type === undefined) {options.image_type = defaults.image_type;}
	if (options.min_size === undefined) {options.min_size = defaults.min_size;}
	if (options.max_size === undefined) {options.max_size = defaults.max_size;}
	if (options.max_files === undefined) {options.max_files = defaults.max_files;}
	if (callback === undefined){callback = function(){}}
	var self = this.selector;
	
	element = self.replace(new RegExp("#", "g"), "");
	element = element.replace(new RegExp("-", "g"), "");
	element = element.replace(/\[/g, "");
	element = element.replace(/\]/g, "");
	element = element.replace(new RegExp("=", "g"), "");
	element = element.replace(new RegExp(".", "g"), "");
	element = element.replace(new RegExp("'", "g"), "");
	element = element.replace(new RegExp('"', "g"), "");
	element = element.replace(new RegExp(" ", "g"), "");
	element = element.replace(new RegExp("@", "g"), "");
	element = element.replace(new RegExp(";", "g"), "");
	element = element.replace(new RegExp(":", "g"), "");
	if (eval("__items__upload__"+element) === undefined)
	{
		eval("__items__upload__"+element+" = new Array()");
	}
	
	var _file = $(form).find("input[type='file']").selector;
	for (x = 0; x < $(_file)[0].files.length; x++)
		{
			content_type = options.image_type.split("|");
			
			c_t = $(_file)[0].files[x]["type"];
			c_t = c_t.split("/");
			size = $(_file)[0].files[x]["size"];
			
			if (content_type.indexOf(c_t[1]) != -1)
			{	
				__errors__upload__  = '';
			
				if (size >= options.min_size)
				{
					__errors__upload__  = '';
					if (size <= options.max_size)
					{
						__errors__upload__  = '';
						
						eval("len___items__upload__"+element+"=0");
						for (i in eval("__items__upload__"+element))
						{
							eval("len___items__upload__"+element+"++");
						}
						
						if (eval("len___items__upload__"+element) < options.max_files) 
						{
							__errors_upload__ = '';
							random_class = Math.floor((Math.random() * 10000000000000000000) + 1);
							eval("__items__upload__"+element+"[random_class] = $(_file)[0].files.item(x)");
							function setup_reader(files, i, random_class) {
									var file = files[i];
									var reader = new FileReader();
									reader.onload = function(e){
										$(self).prepend("<div class='progress'><div class='progress-bar progress-bar-striped active' role='progressbar' aria-valuenow='100' aria-valuemin='0' aria-valuemax='100' style='width: 100%'></div></div><table style='display: none;' class='table table-condensed' image-upload-item='"+random_class+"'><tr><td><img src='"+e.target.result+"' class='img-responsive' /></td><td style='text-align:right;'><button type='button' class='btn btn-danger' image-upload-item='"+random_class+"' ><span class='glyphicon glyphicon-remove'></span></button></td></tr></table>");
										$(self).find("[image-upload-item='" + random_class + "']").fadeIn(1000, function(){$(".progress").fadeOut(1000, function(){$(this).remove();});});
										$(form + " .count-images").html($(self).countImages());
										$.event.trigger({type: "createImage", file: eval("__items__upload__"+element+"[random_class]")});
										$(self).find("button").on("click", function(){
												$(self).find("[image-upload-item='" + $(this).attr("image-upload-item") + "']").fadeOut(1000, function(){$(this).remove();});
												image = eval("__items__upload__"+element+"[$(this).attr('image-upload-item')]");
												eval("delete __items__upload__"+element+"[$(this).attr('image-upload-item')]");
												$(form + " .count-images").html($(self).countImages());
												try{
												$.event.trigger({type: "deleteImage", file: image});
												} catch(e){}
											});	
										};
									reader.readAsDataURL(file);
								}
								
							setup_reader($(_file)[0].files, x, random_class);
						}
						else
						{
							__errors__upload__ = 'ERROR_MAX_FILES';
						}
					}
					else
					{
						__errors__upload__  = 'ERROR_MAX_SIZE';
					}
				}
				else
				{
					__errors__upload__  = 'ERROR_MIN_SIZE';
				}
			}
			else
			{
				__errors__upload__ = 'ERROR_CONTENT_TYPE';
			}
		}
	
	callback();
	return eval("__items__upload__"+element);
};

$.fn.countImages = function(){
	var self = this.selector;
	self = self.replace(new RegExp("#", "g"), "");
	self = self.replace(new RegExp("-", "g"), "");
	self = self.replace(/\[/g, "");
	self = self.replace(/\]/g, "");
	self = self.replace(new RegExp("=", "g"), "");
	self = self.replace(new RegExp(".", "g"), "");
	self = self.replace(new RegExp("'", "g"), "");
	self = self.replace(new RegExp('"', "g"), "");
	self = self.replace(new RegExp(" ", "g"), "");
	self = self.replace(new RegExp("@", "g"), "");
	self = self.replace(new RegExp(";", "g"), "");
	self = self.replace(new RegExp(":", "g"), "");
	
	x = 0;
	for (var key in eval("__items__upload__"+self))
	{
		x++;
	}
	return x;
};

$.fileReader = function(){
	try {
		var reader = new FileReader();
		return true;
	}
	catch(e) {
		return false;
	}
};

$.fn.uploadImagesAjax = function(_url, options){
	var defaults = {
		params: {},
		type: 'POST',
		beforeSend: function(){},
		success: function(){},
		error: function(){},
		complete: function(){}
	};
	var self = this.selector;
	self = self.replace(new RegExp("#", "g"), "");
	self = self.replace(new RegExp("-", "g"), "");
	self = self.replace(/\[/g, "");
	self = self.replace(/\]/g, "");
	self = self.replace(new RegExp("=", "g"), "");
	self = self.replace(new RegExp(".", "g"), "");
	self = self.replace(new RegExp("'", "g"), "");
	self = self.replace(new RegExp('"', "g"), "");
	self = self.replace(new RegExp(" ", "g"), "");
	self = self.replace(new RegExp("@", "g"), "");
	self = self.replace(new RegExp(";", "g"), "");
	self = self.replace(new RegExp(":", "g"), "");
	
	if (options === undefined){options = defaults;}
	if (options.url === undefined){options.url = defaults.url;}
	if (options.params === undefined){options.params = defaults.params;}
	if (options.type === undefined){options.type = defaults.type;}
	if (options.beforeSend === undefined){options.beforeSend = defaults.beforeSend;}
	if (options.success === undefined){options.success = defaults.success;}
	if (options.error === undefined){options.error = defaults.error;}
	if (options.complete === undefined){options.complete = defaults.complete;}
	var formData = new FormData();

	for (var key in eval("__items__upload__"+self))
	{
		formData.append("files[]", eval("__items__upload__"+self+"[key]"));
	}
	
	_params = '';
	for (param in options.params)
	{
		_params = String(_params + encodeURIComponent(param) + "=" + encodeURIComponent(options.params[param]) + "&"); 
	}
	if (_params != '')
	{
		_params = "?" + _params;
		_params = _params.substring(0, _params.length-1);
	}
	
	$.ajax({
		url: _url+_params,
		type: "POST",
		data: formData,
		contentType: false,
		processData: false,
		beforeSend: options.beforeSend,
		success: options.success,
		error: options.error,
		complete: options.complete
	});
};

})(jQuery);