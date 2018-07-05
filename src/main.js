const url = 'https://raw.githubusercontent.com/sanrey254/proyecto-2-data-dashboard/master/data/laboratoria.json';

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

const drawGeneralStatistics = (students, sede) =>{
	const namesGroup = ['Total de estudiantes', 'PROGRESO: arriba del 90%', 'PROGRESO: en la media', 'PROGRESO: debajo del 60%']
	const studentsNumber = [0,0,0,0];
	let filterStudents = [];
	let result = '';
	if(sede === 'General'){
		filterStudents = students;
	}else{
		filterStudents = data.filterStudentsBySede(students, sede);
	}
	studentsNumber[0] = filterStudents.length;
	filterStudents.forEach(student =>{
		if(student.stats.status === 'top'){
			studentsNumber[1]++;
		}
		if(student.stats.status === 'media'){
			studentsNumber[2]++;
		}
		if(student.stats.status === 'bottom'){
			studentsNumber[3]++;
		}
	})
	
	for(let i = 0; i < 4; i++){
		result+= `<div class="statistics col-lg-3 col-12">
                  	<div class="statistic d-flex align-items-center bg-white has-shadow">
                    	<div class="icon bg-red"><i class="fa fa-line-chart"></i></div>
                    	<div class="text"><strong>${studentsNumber[i]}</strong><br><small>${namesGroup[i]}</small></div>
                 	</div>
                </div>`
	}

	document.getElementById('general-statistic').innerHTML = result;
}
/************ Vista sedes ***********/

const drawNumberOfStudents = (generations, sede) =>{
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
		document.getElementById(`generation${i++}`).innerHTML = `${data.firstLetterToUpperCase(generation)} <br> generación`;
	})

	document.getElementById(`students-generation${y++}`).innerHTML = students[0];
	document.getElementById(`students-generation${y++}`).innerHTML = students[1];
	document.getElementById(`students-generation${y++}`).innerHTML = students[2];
}

const drawStudentsTable = (students, sede) =>{
	const filterStudents = data.filterStudentsBySede(students, sede);
	let result = '';
	filterStudents.forEach((student, i) =>{
		result += `<tr>
                      <th scope="row">${i+1}</th>
                      <td>${student.name}</td>
                      <td>${student.email}</td>
                      <td>${data.firstLetterToUpperCase(student.generation)}</td>
                      <td>${student.stats.completedPercentage} %</td>
                    </tr>`;
	})
	document.getElementById('table-students-body').innerHTML = result;
}
/************ Vista generaciones ***********/
const getLocation = () =>{
	const location = window.location.href;
	const position = location.indexOf('?');
	const generation = location.slice(position+1, location.length);
	//console.log(generation);
}


/************ Vista Consultas ***********/
const drawSearchStudent = (students) =>{
	document.getElementById('btn-seach').addEventListener('click', (event) =>{
		event.preventDefault();
		const searchNameStudent = document.getElementById('name-student').value;
		if(searchNameStudent != ''){

			const studentResult = data.filterStudents(students, searchNameStudent);
			const headerSearchCard = `<div class="card-header d-flex align-items-center">
									  <h2 class="h3">Resultados de la consulta</h2>
									  <div class="badge badge-rounded bg-pinkLab">${studentResult.length} coincidencias</div>
									</div><div class="card-body no-padding" id="body-student-card"></div>`;
			document.getElementById('header-student-card').innerHTML = headerSearchCard;
			let bodySearchCard = '';
			document.getElementById('body-student-card').innerHTML = '';
			if(studentResult.length != 0){
				studentResult.forEach(result =>{
				bodySearchCard += `<div class="item d-flex align-items-center">
					                  <div class="text">
					                    <p><span class='tags-search'>Nombre:</span> ${result.name}</p><p><span class='tags-search'>Sede:</span> ${result.campus} - ${data.firstLetterToUpperCase(result.generation)} generación </p><p><span class='tags-search'>Correo:</span> ${result.email}</p><p><span class='tags-search'>Progreso:</span> ${result.stats.completedPercentage}% completitud</p>
					                  </div>
					               </div>`;
				})
				document.getElementById('body-student-card').innerHTML = bodySearchCard;
			}
		}
		
	})
}

