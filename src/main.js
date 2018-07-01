const getData = () =>{
		let laboratoria = fetch('https://raw.githubusercontent.com/Laboratoria/cdmx-2018-06-bc-core-am-data-dashboard/master/data/laboratoria.json')
		.then(result => result.json())
		.then(result =>{
			data.computeStudentsStats(result);
		})
}


getData();