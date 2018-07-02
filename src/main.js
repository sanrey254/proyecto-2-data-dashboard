const getData = () =>{
		let laboratoria = fetch('https://raw.githubusercontent.com/sanrey254/proyecto-2-data-dashboard/master/data/laboratoria.json').then(result => result.json())
		.then(result =>{
		const students = data.computeStudentsStats(result);
		const campus =  data.computeCampus(result);
		drawCampus(campus, students);
		drawMenu(campus);
		//drawStudentsLima(students);
	})	
}

const firstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/************ Vista Home/Inicio ***********/
const drawMenu = (campus) =>{
	let j = 1;
	campus.forEach(element =>{
		document.getElementById(`sedeM${j++}`).innerHTML = element;
	})
}

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

const drawStudentsLima = students =>{
	let generations = [];
	let studentsGeneration1 = 0;
	let studentsGeneration2 = 0;
	let studentsGeneration3 = 0;
	let y = 1;
	students.forEach(elements =>{
		if(elements.campus === 'Lima'){	
			if(generations.indexOf(elements.generation) === -1){
				generations.push(elements.generation);
			}
		}
	})
	let i = 1;
	generations.forEach(generation =>{
		document.getElementById(`generation${i++}`).innerHTML = `${firstLetter(generation)} <br> generación`;
	})

	students.forEach(students =>{
		if(students.campus === 'Lima'){
			if(students.generation === generations[0]){
				studentsGeneration1++;
			}
			if(students.generation === generations[1]){
				studentsGeneration2++;
			}
			if(students.generation === generations[2]){
				studentsGeneration3++;
			}
		}
	})

	document.getElementById(`students-generation${y++}`).innerHTML = studentsGeneration1;
	document.getElementById(`students-generation${y++}`).innerHTML = studentsGeneration2;
	document.getElementById(`students-generation${y++}`).innerHTML = studentsGeneration3;
}


getData();

