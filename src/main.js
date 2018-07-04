const url = 'https://raw.githubusercontent.com/sanrey254/proyecto-2-data-dashboard/master/data/laboratoria.json';

const getDataMain = () =>{
		let laboratoria = fetch(url).then(result => result.json())
		.then(result =>{
		const students = data.computeStudentsStats(result);
		const campus =  data.computeCampus(result);
		const statusGeneration = data.computeGenerationsStats(result);		
		drawCampus(campus, students);
		drawMenu(campus);
	})	
}

const getDataSede = (sede) =>{
	let laboratoria = fetch(url).then(result => result.json())
		.then(result =>{
		const students = data.computeStudentsStats(result);
		const statusGeneration = data.computeGenerationsStats(result);	
		const campus =  data.computeCampus(result);	
		drawStudents(statusGeneration, sede);
		drawMenu(campus);
	})
}

const getDataGeneration = () => {
	let laboratoria = fetch(url).then(result => result.json())
		.then(result =>{
		const students = data.computeStudentsStats(result);
		drawGenerations(students);
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

const drawStudents = (generations, sede) =>{
	let y = 1;
	let years = [];
	let students = [];
	generations.forEach(elements =>{
		if(elements.campus === sede){	
			if(generations.indexOf(elements.generation) === -1){
				years.push(elements.generation);
				students.push(elements.count);
			}
		}
	})
	let i = 1;
	years.forEach(generation =>{
		document.getElementById(`generation${i++}`).innerHTML = `${firstLetter(generation)} <br> generación`;
	})

	document.getElementById(`students-generation${y++}`).innerHTML = students[0];
	document.getElementById(`students-generation${y++}`).innerHTML = students[1];
	document.getElementById(`students-generation${y++}`).innerHTML = students[2];
}

/************ Vista generaciones ***********/

const drawGenerations = (generations) =>{


}


const getLocation = () =>{
	const location = window.location.href;
	const position = location.indexOf('?');
	const generation = location.slice(position+1, location.length);
	console.log(generation);
}