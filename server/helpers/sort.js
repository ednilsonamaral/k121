let Sort = function () {
  this.set = function (list) {
  	var names = []

  	for (var i = 0; i < list.length; i++) {
  		for (var j = (list.length - 1); j >= 0 ; j--) {
  			if (list[i].friend === null && names.indexOf(list[j].name) === -1 && list[j].name !== list[i].name) {
  				list[i].friend = list[j].name
  				names.push(list[i].friend)
  			}
  		}
  	}

  	return list
  }
}

Sort.prototype.shuffle = function (arr) {
	let index = arr.length;
  let tmp;
  let rand;

	while (0 !== index) {
		rand = Math.floor(Math.random() * index)
		index -= 1
		tmp = arr[index]
		arr[index] = arr[rand]
		arr[rand] = tmp
	}

	return this.set(arr)
}

module.exports = Sort
