window.data = {


	getDataMain: () =>{
	  fetch(url).then(result => result.json())
		.then(result =>{
		  const students = data.computeStudentsStats(result);
		  const campus = data.computeCampus(result);
		  const statusGeneration = data.computeGenerationsStats(result);
		  drawGeneralStatistics(students, 'General');		
		  drawCampus(campus, students);
		  drawMenu(campus);
		})	
		.catch(error =>{
		  console.log('Error');
		});
	},

	getDataSede: sede =>{
	  fetch(url).then(result => result.json())
		.then(result =>{
		  const students = data.computeStudentsStats(result);
		  const statusGeneration = data.computeGenerationsStats(result);	
		  const campus = data.computeCampus(result);	
		  data.sortStudents(students, 'percentaje', 'ASC');
		  drawGeneralStatistics(students, sede);
		  drawStudentsTable(students, sede);
		  drawNumberOfStudents(statusGeneration, sede);
		  getGenerationAndCampus(students);
		  drawMenu(campus);
		})
		.catch(error =>{
		  console.log('Error');
		});
	},
	
	getDataSearch: () =>{
	  fetch(url).then(result => result.json())
		.then(result =>{
		  const students = data.computeStudentsStats(result);
		  const campus = data.computeCampus(result);
		  drawSearchStudent(students);
		  drawMenu(campus);
		})
		.catch(error =>{
		  console.log('Error');
		});
	},
  
	firstLetterToUpperCase: string => {
		  return string.charAt(0).toUpperCase() + string.slice(1);
	},
  
	createSubtopics: subtemas => {
	  let subtopics = subtemas;
	  let propiedades = Object.values(subtopics);
	  propiedades.forEach(elements => {
		if (elements.completado === 1) {
		  elements.completedPercentage = 100;
		} else {
		  elements.completedPercentage = 0;
		}
		delete elements.completado;
		elements.type = elements.tipo;
		delete elements.tipo;
		elements.duration = elements.duracionSubtema;
		delete elements.duracionSubtema;
	  });
	  return subtopics;
	},
  
	createTopics: temas =>{
	  let topics = temas;
	  let propiedades = Object.values(topics);
	  propiedades.forEach(elements => {
		elements.completedPercentage = elements.porcentajeCompletado;
		elements.percentageDuration = Math.round((elements.duracionTemaCompletado * 100) / elements.duracionTema);
		elements.subtopics = data.createSubtopics(elements.subtemas);
		delete elements.duracionTema;
		delete elements.duracionTemaCompletado;
		delete elements.porcentajeCompletado;
		delete elements.subtemasCompletados;
		delete elements.subtemasTotales;
		delete elements.subtemas;	
	  });
	  return topics;
	},
  
	createStats: progress =>{
	  let stats = {
		status: '',
		completedPercentage: 0,
		topics: {}
	  };	
	  if (progress.porcentajeCompletado >= 90) {
		stats.status = 'top';
	  } else if (progress.porcentajeCompletado < 90 && progress.porcentajeCompletado > 60) {
		stats.status = 'media';
	  } else {
		stats.status = 'bottom';
	  }
	  stats.completedPercentage = progress.porcentajeCompletado;
  
	  stats.topics = data.createTopics(progress.temas);
	  return stats;	
	},
  
	computeCampus: laboratoria => {
	  let campus = [];
	  campus = Object.getOwnPropertyNames(laboratoria);
	  return campus;
	},
  
	computeStudentsStats: laboratoria => {
	  let studentsObject = [];
	  let sedes = [];
	  let nombres = [];
	  let generaciones = [];
	  let contI = 0;
	  let contY = 0;
	  let stats = {};
	  sedes = Object.getOwnPropertyNames(laboratoria);
	  generations = Object.values(laboratoria);
	  generations.forEach(elements =>{
		contY = 0;
		let years = Object.values(elements.generacion);
		generaciones = Object.getOwnPropertyNames(elements.generacion);		
		years.forEach(students =>{
		  let student = students.estudiantes;
		  student.forEach(personalInfo =>{
			let stats = data.createStats(personalInfo.progreso);
			studentsObject.push({'campus': sedes[contI],
			  'generation': generaciones[contY],
			  'name': personalInfo.nombre,
			  'email': personalInfo.correo,
			  'turn': personalInfo.turno,
			  'stats': stats});
		  });
		  contY++;
		});
		contI++;
	  });
	  // console.log(studentsObject);
	  return studentsObject;
	},
  
	computeGenerationsStats: laboratoria =>{
	  let i = 0;
	  let y = 0;
	  let suma = 0;
	  generationObject = [];
	  let sedes = Object.getOwnPropertyNames(laboratoria);
	  let generaciones = Object.values(laboratoria);
	  generaciones.forEach(elements =>{
		let years = Object.values(elements.generacion);
		let generations = Object.getOwnPropertyNames(elements.generacion);
		y = 0;
		years.forEach(students =>{
		  let estudiantes = students.estudiantes;
		  estudiantes.forEach(personalInfo =>{
			suma += personalInfo.progreso.porcentajeCompletado;
		  });
		  let average = Math.round(suma / students.estudiantes.length);
		  generationObject.push({'campus': sedes[i], 
			'generation': generations[y], 
			'count': students.estudiantes.length, 
			'average': average});
		  y++;
		});
			  
		i++;
	  });
	  return generationObject;
	},
  
	sortStudents: (students, orderBy, orderDirection) =>{
	  let studentsNames = [];
	  let orderStudents = [];
	  let studentsPercentaje = [];
	  if (orderBy === 'name' && orderDirection === 'ASC') {
		students.forEach(student =>{
		  studentsNames.push(student.name);
		});
		studentsNames.sort();
		for (let i = 0; i < studentsNames.length; i++) {
		  let result = data.filterStudents(students, studentsNames[i]);
		  if (result.length === 1) {
			orderStudents.push(result[0]);
		  } else {
			result.forEach(name => {
			  orderStudents.push(name);
			});
			i++;
		  }
		}
	  }
	  if (orderBy === 'name' && orderDirection === 'DESC') {
		students.forEach(student => {
		  studentsNames.push(student.name);
		});
		studentsNames.sort();
		studentsNames.reverse();
		for (let i = 0; i < studentsNames.length; i++) {
		  let result = data.filterStudents(students, studentsNames[i]);
		  if (result.length === 1) {
			orderStudents.push(result[0]);
		  } else {
			result.forEach(name =>{
			  orderStudents.push(name);
			});
			i++;
		  }
		}
	  }
  
	  if (orderBy === 'percentaje' && orderDirection === 'ASC') {
		students.forEach(student =>{
		  studentsPercentaje.push(student.stats.completedPercentage);
		});
		studentsPercentaje.sort();
		for (let i = 0; i < studentsPercentaje.length; i++) {
		  result = data.filterStudentsByPercentaje(students, studentsPercentaje[i]);
  		  if (result.length === 1) {
  			orderStudents.push(result[0]);
  		  } else {
  			result.forEach(percentaje =>{
  			  orderStudents.push(percentaje);
  			});
         	i += result.length;
  		  }
  		}

	  }
  
	  if (orderBy === 'percentaje' && orderDirection === 'DESC') {
  
	  }
    console.log(orderStudents);
	  return orderStudents;
	},
  
	filterStudents: (students, search) =>{
	  const searchStudentData = [];
	  students.forEach(student =>{
		if (student.name.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
		  searchStudentData.push(student);
		}
	  });
	  return searchStudentData;
	},
  
	filterStudentsBySede: (students, sede) =>{
	  const filterStudents = [];
	  students.forEach(student =>{
		if (student.campus === sede) {
		  filterStudents.push(student);
		}
	  });
	  return filterStudents;
	},
  
	filterStudentsByPercentaje: (students, percentaje) =>{
	  const searchStudentPercentage = [];
	  students.forEach(student =>{
		if (student.stats.completedPercentage === percentaje) {
		  searchStudentPercentage.push(student);
		}
	  });
	  return searchStudentPercentage;
	},
  
	filterStudentsByGeneration: (students, generation) =>{
	  const searchStudentsGeneration = [];
	  students.forEach(student =>{
		if (student.generation === generation) {
		  searchStudentsGeneration.push(student);
		}
	  });
	  return searchStudentsGeneration;
	}
  
  };


