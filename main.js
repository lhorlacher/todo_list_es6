let listArray = [ {name: "Do laundry", priority: 1, complete: true }, { name: "Eat Lunch", priority: 2, complete: false }, { name: "Code a bunch", priority: 1, complete: false } ]
let completedListArray = []

function loopList(listArray) {
	let $list = $('#list_ul')
	let $completedList = $('#completed_list_ul')
	$list.empty()
	$completedList.empty()
	for (let item of listArray) {
		let completed = item.complete ? 'Completed!' : ''
		if(item.complete === true) {
			$completedList.prepend(
			`<li id="${item.name}">
			<i class='small material-icons'>done</i>
				<h5>${item.name} | Priority: ${item.priority}</h5>
					<a class="edit btn-floating"><i class='tiny material-icons'>mode_edit</i></a>
					<a class="delete btn-floating"><i class='tiny material-icons'>delete</i></a>

			</li>`
			)
		} else {
			$list.prepend(
				`<li id="${item.name}"> 
					<h5>${item.name} | Priority: ${item.priority}</h5>
						<a class="complete btn-floating"><i class='tiny material-icons'>done</i></a>
						<a class="edit btn-floating"><i class='tiny material-icons'>mode_edit</i></a>
						<a class="delete btn-floating"><i class='tiny material-icons'>delete</i></a>

				</li>`
			)
		}
	}
}

$('#new_form').submit(function(e) {
	e.preventDefault()
	let $name_ob = $('#new_name')
	let $prior_ob = $('#new_priority')
	let $complete_ob = $('#new_complete')
	listArray.unshift({ name: $name_ob.val(), priority: $prior_ob.val(), complete: $complete_ob.is(':checked') })
	loopList(listArray)
	$name_ob.val('')
	$prior_ob.val('')
	$complete_ob.prop('checked', false)
});

$('#edit_form').submit(function(e) {
	e.preventDefault()
	let $name_ob = $('#edit_name')
	let $prior_ob = $('#edit_priority')
	let $complete_ob = $('#edit_complete')
	let array_pos = $('#array_pos').val()
	console.log(array_pos)
	listArray[array_pos] = { name: $name_ob.val(), priority: $prior_ob.val(), complete: $complete_ob.is(':checked') }
	loopList(listArray)
	$name_ob.val('')
	$prior_ob.val('')
	$complete_ob.prop('checked', false)
	$('#edit_form_div').slideUp(function() {
		$('#new_form_div').slideDown()
	});
	
})

$(document).on('click', '.complete', function() {
	let index = findArrayPosition($(this), listArray);
	listArray[index]['complete'] = true;
	loopList(listArray)
});

$(document).on('click', '.edit', function () {
	let index = findArrayPosition($(this), listArray);
	console.log(index)
	$('#edit_name').val(listArray[index]['name']);
	$('#edit_priority').val(listArray[index]['priority']);
	$('#edit_complete').prop('checked', listArray[index]['complete']);
	$('#array_pos').val(index)
	$('#new_form_div').slideUp(function() {
		$('#edit_form_div').slideDown()
	});

});

$(document).on('click', '.delete', function() {
	let index = findArrayPosition($(this), listArray);
	listArray.splice(index, 1)
	loopList(listArray)
})

function findArrayPosition(item, array) {
	console.log(item)
	console.log(array)
	let name = item.parent().attr('id')
	console.log(name)
	for( var i = 0; i < array.length; i++)
		if (name === array[i].name) {
			return i;
		}
}

loopList(listArray)



//ALL DONE IN es6
//have for for user to add todo item
//todo item shows up in list
//if user clicks item it gets marked complete or not complete
//have a visual indicator of complete

//BONUS
//ability to delete todos
//filter todos by complete / imcomplete / all
//edit todo name
