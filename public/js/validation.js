var 
ausnahmeListe = [],
parseDate = function(value, userFormat) {
  var 
  userFormat = userFormat || 'dd.mm.yyyy',
  delimiter = /[^mdy]/.exec(userFormat)[0],
  theFormat = userFormat.split(delimiter),
  theDate = value.split(delimiter);	
  getDateOrNull = function (date, format) {
    var m, d, y, rw = null
    for (var i = 0, len = format.length; i < len; i++) {
      if (/m/.test(format[i])) m = date[i]
      if (/d/.test(format[i])) d = date[i]
      if (/y/.test(format[i])) y = date[i]
    }
    if ( m > 0 && m < 13 && y && y.length === 4 && d > 0 && d <= (new Date(y, m, 0)).getDate() ){
    	rw = new Date(y,m-1,d);
    }
    return rw;
  };	
  return getDateOrNull(theDate, theFormat);
},
formatDate = function(date){
	if( !(date instanceof Date) ){ return date; }
	
	var values = [ date.getDate(), date.getMonth() + 1 ];
	for( var id in values ) {
		values[ id ] = values[ id ].toString().replace( /^([0-9])$/, '0$1' );
	}
	return ( values[ 0 ]+'.'+values[ 1 ]+'.'+date.getFullYear() );		
},
isValidDate = function(value, userFormat) {
	return parseDate (value, userFormat) instanceof Date;
},
isValidNumber = function(value) {
	return new RegExp("^-{0,1}\\d*\\,{0,1}\\d+$").test(value);
},
isZukunft = function(value, userFormat){
	var sysdate = new Date(), today = new Date(sysdate.getFullYear(),sysdate.getMonth(),sysdate.getDate());
	return ( value.length==0 || parseDate(value) >= today ); 
},
isOnlyZukunft = function(value){
	var sysdate = new Date(), today = new Date(sysdate.getFullYear(),sysdate.getMonth(),sysdate.getDate());
	return ( value.length==0 || parseDate(value) > today );
},
getValAsNumber = function(val){
	return new Number(val.replace(/\./g,'').replace(',','.'));
},
checkDecimals = function(obj){
	var 
		isWaehrung = $.inArray($(obj).attr('name'), ausnahmeListe)!==-1,
		num = getValAsNumber($(obj).val()),
		t = num.toString().split('.')[1],
		maxDec = isWaehrung?2:3
	;
	return ($(obj).val().length==0 || num && ( !t || t.length <= maxDec ));
},
checkWholeNumber = function(obj){
	var num = getValAsNumber($(obj).val());
	return (num % 1) == 0;
};

(function( $, undefined ) {
	$.validator.setDefaults({
		ignore: ".ignore, .select2-input",
		focusInvalid: false,
		errorPlacement: function errorPlacement(error, element) {
			var $parent = $(element).parents(".error-placeholder");
			// Do not duplicate errors
			if ($parent.find(".jquery-validation-error").length) {
				return;
			}
			$parent.append(
				error.addClass("jquery-validation-error small form-text invalid-feedback")
			);
		},
		highlight: function(element) {
			var $el = $(element);
			var $parent = $el.parents(".error-placeholder");
			$el.addClass("is-invalid");
			// Select2 and Tagsinput
			if ($el.hasClass("select2-hidden-accessible") || $el.attr("data-role") === "tagsinput") {
				$el.parent().addClass("is-invalid");
			}
		},
		unhighlight: function(element) {
			$(element).parents(".error-placeholder").find(".is-invalid").removeClass("is-invalid");
		}
	});

	$.validator.prototype.checkForm = function() {
		this.prepareForm();
		for ( var i = 0, elements = (this.currentElements = this.elements()); elements[i]; i++ ) {
			if (this.findByName( elements[i].name ).length != undefined && this.findByName( elements[i].name ).length > 1) {
				for (var cnt = 0; cnt < this.findByName( elements[i].name ).length; cnt++) {
					this.check( this.findByName( elements[i].name )[cnt] );
				}
			}
			else {
				this.check( elements[i] );
			}
		}
		return this.valid();
	};

	$.validator.addMethod("isValidDate", function(value, element) {
		return ( value.length==0 || isValidDate(value) );
	},"Das Datum ist ung&uuml;ltig");
}( jQuery ) );