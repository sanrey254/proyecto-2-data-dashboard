const getData = () =>{
		let laboratoria = fetch('https://raw.githubusercontent.com/Laboratoria/cdmx-2018-06-bc-core-am-data-dashboard/master/data/laboratoria.json')
		.then(result => result.json())
		.then(result =>{
			const students = data.computeStudentsStats(result);
			const campus =  data.computeCampus(result);
			drawCampus(campus, students);
		})
}


getData();
/************ Vista Home/Inicio ***********/

const drawCampus = (campus, students) =>{
	let i  = 1;
	let y = 1;
	let studentsSantiago = 0;
	let studentsLima = 0;
	let studentsMexico = 0;

	campus.forEach(element =>{
		document.getElementById(`sede${i++}`).innerHTML = element;
	})

	students.forEach(element =>{
		if(element.campus === 'santiago'){
			studentsSantiago++
		}
		if(element.campus === 'lima'){
			studentsLima++;
		}
		if (element.campus === 'mexico'){
			studentsMexico++;
		}
	})

	console.log(studentsLima);

	document.getElementById(`students-sede${y++}`).innerHTML = studentsLima;
	document.getElementById(`students-sede${y++}`).innerHTML = studentsMexico;
	document.getElementById(`students-sede${y++}`).innerHTML = studentsSantiago;
}


