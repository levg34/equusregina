function containsDuplicate(array) {
	var	length = array.length
	var obj = {}

	for (var i in array) {
		obj[JSON.stringify(array[i])] = array[i]
	}

	var tot = 0
	for (var i in obj) {
		tot++
	}

	console.log(obj)

	return length!=tot
}
