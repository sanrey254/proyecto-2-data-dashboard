window.data = {
	createSubtopics: (subtemas) => {
		let subtopics = subtemas;
		let propiedades = Object.values(subtopics);
		propiedades.forEach(elements => {
			if(elements.completado === 1){
				elements.completedPercentage = 100;
			}else{
				elements.completedPercentage = 0;
			}
			delete elements.completado;
			elements.type = elements.tipo;
			delete elements.tipo;
			elements.duration = elements.duracionSubtema;
			delete elements.duracionSubtema;
		})
		return subtopics;
	},

	createTopics: (temas) =>{
		let topics = temas;
		let propiedades = Object.values(topics);
		propiedades.forEach(elements => {
			elements.completedPercentage = elements.porcentajeCompletado;
			elements.percentageDuration = Math.round((elements.duracionTemaCompletado * 100)/elements.duracionTema);
			elements.subtopics = data.createSubtopics(elements.subtemas);
			delete elements.duracionTema;
			delete elements.duracionTemaCompletado;
			delete elements.porcentajeCompletado;
			delete elements.subtemasCompletados;
			delete elements.subtemasTotales;
			delete elements.subtemas;	
		})
		return topics;
	},

	createStats: (progress) =>{
		let stats = {
			status: '',
			completedPercentage: 0,
			topics: {}
		};	
		if(progress.porcentajeCompletado >= 90){
			stats.status = 'top';
		}else if(progress.porcentajeCompletado < 90 && progress.porcentajeCompletado > 60){
			stats.status = 'media';
		}else{
			stats.status = 'bottom';
		}
		stats.completedPercentage = progress.porcentajeCompletado;

		stats.topics = data.createTopics(progress.temas);
		return stats;	
	},

	computeCampus: (laboratoria) => {
		let campus = [];
		campus = Object.getOwnPropertyNames(laboratoria);
		return campus
	},

	computeStudentsStats: (laboratoria) => {
		let studentsObject = [];
		let sedes = [];
		let nombres = [];
		let generaciones = [];
		let i = 0;
		let y;
		let stats = {};
		
		sedes = Object.getOwnPropertyNames(laboratoria);
		generations = Object.values(laboratoria);
		generations.forEach(elements =>{
			y = 0;
			let years = Object.values(elements.generacion);
			generaciones = Object.getOwnPropertyNames(elements.generacion);		
			years.forEach(students =>{
				let student = students.estudiantes;
				student.forEach(personalInfo =>{
					let stats = data.createStats(personalInfo.progreso);
					studentsObject.push({'campus': sedes[i], 'generation': generaciones[y], 'name': personalInfo.nombre, 'email': personalInfo.correo, 'turn': personalInfo.turno, 'stats': stats});
				})
				y++;
			})
			i++;
		})	
		return studentsObject;
	},

	computeGenerationsStats: (laboratoria) =>{
		

	},

	sortStudents: (students, orderBy, orderDirection) =>{

	},

	filterStudents: (students, search) =>{

	}
}
