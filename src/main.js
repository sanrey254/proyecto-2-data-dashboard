const getDataMain = () =>{
		let laboratoria = fetch('https://raw.githubusercontent.com/sanrey254/proyecto-2-data-dashboard/master/data/laboratoria.json')
		.then(result => result.json())
		.then(result =>{
			const students = data.computeStudentsStats(result);
			const campus =  data.computeCampus(result);
			drawCampus(campus, students);
			drawMenu(campus);
		})
}

getDataMain();

/************ Vista Home/Inicio ***********/
const drawMenu = (campus) =>{
	let j = 1;
	campus.forEach(element =>{
		document.getElementById(`sede${j++}`).innerHTML = element;
	})
}

const drawCampus = (campus, students) =>{
	let i  = 1;
	let y = 1;
	let studentsSantiago = 0;
	let studentsLima = 0;
	let studentsMexico = 0;

	campus.forEach(element =>{
		document.getElementById(`sedeM${i++}`).innerHTML = element;
	})

	students.forEach(element =>{
		if(element.campus === 'Santiago'){
			studentsSantiago++
		}
		if(element.campus === 'Lima'){
			studentsLima++;
		}
		if (element.campus === 'México'){
			studentsMexico++;
		}
	})
	
	document.getElementById(`students-sede${y++}`).innerHTML = studentsLima;
	document.getElementById(`students-sede${y++}`).innerHTML = studentsMexico;
	document.getElementById(`students-sede${y++}`).innerHTML = studentsSantiago;
}

/************ Vista sedes ***********/

const drawStudentsLima(students =>{
	campus.forEach(element =>{
		document.getElementById(`sedeM${i++}`).innerHTML = element;
	})

	students.forEach(element =>{
		if(element.campus === 'Santiago'){
			studentsSantiago++
		}
		if(element.campus === 'Lima'){
			studentsLima++;
		}
		if (element.campus === 'México'){
			studentsMexico++;
		}
	})
	
	document.getElementById(`students-generation${y++}`).innerHTML = studentsLima;
	document.getElementById(`students-generation${y++}`).innerHTML = studentsMexico;
	document.getElementById(`students-generation${y++}`).innerHTML = studentsSantiago;

})


