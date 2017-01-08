function containsDuplicate(array) {
	var	length = array.length
	var obj = {}

	for (var i in array) {
		obj[JSON.stringify(array[i])] = array[i]
	}

	var simplifiedLength = 0
	for (var i in obj) {
		simplifiedLength++
	}

	return length!=simplifiedLength
}
