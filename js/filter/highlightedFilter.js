//create filter.
//as soon as user start typing this guy will invoked
angular.module("typing").filter('highlightedFilter', function ($sce) {

	return function (textArray, search) {

		var htmlTxtArray = textArray.slice();

		if (search && search.text) {

			search.typeWords = [];
			search.incorrectWords =[];
			var phraseArray = search.text.split(" ");
			var targetText = "";
			var highlightedCSS = "";

			phraseArray.forEach(function (val, index) {

				targetText = htmlTxtArray[index];

				if (targetText) {
					if (val === targetText) {
						highlightedCSS = "correct";
						search.typeWords.push(targetText);
					} else {
						highlightedCSS = "wrong";
						search.incorrectWords.push(targetText);
					}
					htmlTxtArray[index] = targetText.replace(new RegExp('(' + targetText + ')', ''), '<span class="' + highlightedCSS + '">$1</span>');
				}
			});

			search.wpm = (search.typeWords.length / search.totalTime);
		}

		return $sce.trustAsHtml(htmlTxtArray.join(" "));
	}
});