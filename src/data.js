window.data = {
  // Métodos 'getData' realizan la petición a través de fetch para traer la data.	
  	getDataMain: () =>{
    fetch(url).then(result => result.json())
      .then(result =>{
        const students = data.computeStudentsStats(result);
        const allCampus = data.computeCampus(result);
        drawGeneralStatistics(students, 'General', '');
        drawCampus(allCampus, students);
        drawMenu(allCampus);
      })
      .catch(error => {
        console.log('Error');
      });
  	},

  	getDataCampus: campus =>{
    fetch(url).then(result => result.json())
      .then(result =>{
        const students = data.computeStudentsStats(result);
        const statusGeneration = data.computeGenerationsStats(result);
        const allCampus = data.computeCampus(result);
        drawGeneralStatistics(students, campus, 'General');
        drawStudentsTable(students, campus);
        drawNumberOfStudents(statusGeneration, campus);
        getGenerationAndCampus(students);
        getDrawInformation(students);
        drawMenu(allCampus);
      })
      .catch(error => {
        console.log('Error');
      });
  	},
	
  	getDataSearch: () =>{
    fetch(url).then(result => result.json())
      .then(result => {
        const students = data.computeStudentsStats(result);
        const allCampus = data.computeCampus(result);
        drawSearchStudent(students);
        getDrawInformation(students);
        drawMenu(allCampus);
      })
      .catch(error => {
        console.log('Error');
      });
  	},

  // Método para convertir la primera letra de un string en mayuscula
  	firstLetterToUpperCase: string => {
    	return string.charAt(0).toUpperCase() + string.slice(1);
  	},
  
  // Método para crear el objeto subtopic del arreglo de objetos creado en computeStudentsStats
  	createSubtopics: subtopicsArray => {
    let subtopics = subtopicsArray;
    let properties = Object.values(subtopics);
    properties.forEach(elements => {
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
	  
  // Método para crear el objeto topics del arreglo de objetos creado en computeStudentsStats
  	createTopics: topicsArray =>{
    let topics = topicsArray;
    let properties = Object.values(topics);
    properties.forEach(elements => {
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
	
  // Método para crear el objeto stats del arreglo de objetos creado en computeStudentsStats
  createStats: progress =>{
    let stats = {
      status: '',
      completedPercentage: 0,
      topics: {}
    };
    if (progress.porcentajeCompletado >= 90) {
      stats.status = 'alto';
    } else if (progress.porcentajeCompletado < 90 && progress.porcentajeCompletado > 60) {
      stats.status = 'medio';
    } else if (progress.porcentajeCompletado <= 60) {
      stats.status = 'suficiente';
    }
    stats.completedPercentage = progress.porcentajeCompletado;
    stats.topics = data.createTopics(progress.temas);
    return stats;	
  },

  // Método para crear un arreglo con todas las sedes, utilizado para pintar el menú principal
  	computeCampus: laboratoria => {
    let campus = [];
    campus = Object.getOwnPropertyNames(laboratoria);
    return campus;
  	},
	
  // Método principal para crear un arreglo con un objeto para cada estudiante de todas las sedes	  
  computeStudentsStats: laboratoria => {
    let studentsArray = [];
    let allCampus = [];
    let allGenerations = [];
    let contI = 0;
    let contY = 0;
    allCampus = Object.getOwnPropertyNames(laboratoria);
    generations = Object.values(laboratoria);
    generations.forEach(elements => {
      contY = 0;
      let years = Object.values(elements.generacion);
      allGenerations = Object.getOwnPropertyNames(elements.generacion);
      years.forEach(students => {
        let student = students.estudiantes;
        student.forEach(personalInfo => {
          let stats = data.createStats(personalInfo.progreso);
          studentsArray.push({
            'campus': allCampus[contI],
            'generation': allGenerations[contY],
            'name': personalInfo.nombre,
            'email': personalInfo.correo,
            'turn': personalInfo.turno,
            'stats': stats
          });
        });
        contY++;
      });
      contI++;
    });
    return studentsArray;
  },
 
  // Método para crear un objeto con estadisticas generales para cada una de las generaciones 	
  computeGenerationsStats: laboratoria =>{
    let contI = 0;
    let contY = 0;
    let sumOfPercentajes = 0;
    generationArray = [];
    let allCampus = Object.getOwnPropertyNames(laboratoria);
    let generations = Object.values(laboratoria);
    generations.forEach(elements => {
      let years = Object.values(elements.generacion);
      let allGenerations = Object.getOwnPropertyNames(elements.generacion);
      contY = 0;
      years.forEach(students => {
        let allStudents = students.estudiantes;
        allStudents.forEach(personalInfo => {
          sumOfPercentajes += personalInfo.progreso.porcentajeCompletado;
        });
        let average = Math.round(sumOfPercentajes / students.estudiantes.length);
        generationArray.push({
          'campus': allCampus[contI],
          'generation': allGenerations[contY],
          'count': students.estudiantes.length,
          'average': average
        });
        contY++;
      });
      contI++;
    });
    return generationArray;
  },
  
  // Método que permite ordenar un arreglo de objetos por cuatro criterios distintos de forma ascendente y descendente (nombre y porcentaje)
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
        let result = data.filterStudentsByName(students, studentsNames[i]);
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
        let result = data.filterStudentsByName(students, studentsNames[i]);
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
	
    if (orderBy === 'percentaje' && orderDirection === 'ASC') {
      students.forEach(student => {
        studentsPercentaje.push(student.stats.completedPercentage);
      });
      studentsPercentaje.sort();
      for (let i = 0; i < studentsPercentaje.length; i++) {
        if (studentsPercentaje[i] !== studentsPercentaje[i - 1]) {
          result = data.filterStudentsByPercentaje(students, studentsPercentaje[i]);
          if (result.length === 1) {
            orderStudents.push(result[0]);
          } else {
            result.forEach(percentaje => {
              orderStudents.push(percentaje);
            });
          }
        }
      }
    }
	
    if (orderBy === 'percentaje' && orderDirection === 'DESC') {
      students.forEach(student => {
        studentsPercentaje.push(student.stats.completedPercentage);
      });
      studentsPercentaje.sort();
      studentsPercentaje.reverse();
      for (let i = 0; i < studentsPercentaje.length; i++) {
        if (studentsPercentaje[i] !== studentsPercentaje[i - 1]) {
          result = data.filterStudentsByPercentaje(students, studentsPercentaje[i]);
          if (result.length === 1) {
            orderStudents.push(result[0]);
          } else {
            result.forEach(percentaje => {
              orderStudents.push(percentaje);
            });
          }
        }
      }
    }
    return orderStudents;
  },
  
  // Método que permite realizar una busqueda por nombre en un arreglo de objetos.
  filterStudentsByName: (students, search) =>{
    const searchStudentData = [];
    students.forEach(student => {
      if (student.name.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
        searchStudentData.push(student);
      }
    });
    return searchStudentData;
  },
  
  // Método que permite realizar una busqueda por sede en un arreglo de objetos.
  filterStudentsByCampus: (students, campus) =>{
    const filterStudents = [];
    students.forEach(student => {
      if (student.campus === campus) {
        filterStudents.push(student);
      }
    });
    return filterStudents;
  },

  // Método que permite realizar una busqueda por porcentaje completado en un arreglo de objetos.
  filterStudentsByPercentaje: (students, percentaje) =>{
    const searchStudentPercentage = [];
    students.forEach(student => {
      if (student.stats.completedPercentage === percentaje) {
        searchStudentPercentage.push(student);
      }
    });
    return searchStudentPercentage;
  },
  
  // Método que permite realizar una busqueda por generación en un arreglo de objetos.
  filterStudentsByGeneration: (students, generation) =>{
	  const searchStudentsGeneration = [];
	  students.forEach(student => {
		  if (student.generation === generation) {
			  searchStudentsGeneration.push(student);
		  }
	  });
	  return searchStudentsGeneration;
  }
  
};
