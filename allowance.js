var kids = ['Bart', 'Maggie', 'Lisa'];

var show = function() {
	var allowances = get();
	var main = document.getElementById('main');
	var entry = document.getElementById('entry');
	Object.keys(allowances).forEach( kid => {
		var childDiv = main.appendChild(document.createElement('div'));
		childDiv.setAttribute('class','child');
		var href = childDiv.appendChild(document.createElement('a'));
		href.setAttribute('href','#'+kid);
		href.setAttribute('data-kid',kid);
		href.textContent=kid+ ":"+allowances[kid].total;
	});
	var showDetails = function(e) {
		var kidEl = e.target;
		var kid = kidEl.getAttribute('data-kid');
		main.classList.add('hidden');
		entry.querySelector('.kidName').innerText = kid;
		entry.classList.remove('hidden');
		var updateAllowance = function(e) {
			var target = e.target;
			var targetName = e.target.getAttribute('name');


			if (targetName === 'submit') {
				var amount = entry.querySelector('[name="amount"]').value;
				var description = entry.querySelector('[name="description"]').value;
				update(kid,amount,description);
			}
			if (targetName === 'submit' || targetName == 'cancel') {
				entry.removeEventListener('click',updateAllowance);
				entry.classList.add('hidden');
				main.classList.remove('hidden');
			}
			// other clicks, do nothing
		};
		entry.addEventListener('click', updateAllowance);
	};
	main.addEventListener('click',showDetails);
}

var update = function(kid,amount,description) {
	var allowances  = get();
	console.log(allowances, JSON.stringify(allowances));
	allowances[kid].transactions.push({amount: amount, date: Date.now(), description: description});
	allowances[kid].total = allowances[kid].total -0 + amount;
	console.log(allowances[kid]);
	localStorage.setItem('allowance',JSON.stringify(allowances));

}

var get = function() {
	currentAllowances = JSON.parse(localStorage.getItem('allowance') || "{}");
	//currentAllowances = {};
	
	console.log(currentAllowances,JSON.stringify(currentAllowances));
	kids.forEach(kid => {if (!currentAllowances[kid]) { currentAllowances[kid] = {total: 0, transactions:[]} ; } });
	console.log(currentAllowances);
	return currentAllowances;
};

show();
