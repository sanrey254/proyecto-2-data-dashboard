const url = 'https://raw.githubusercontent.com/sanrey254/proyecto-2-data-dashboard/master/data/laboratoria.json';

/**  Vista Home/Inicio **/
const drawMenu = (campus) =>{
  let j = 1;
  campus.forEach(element =>{
    document.getElementById(`sedeM${j++}`).innerHTML = element;
  });
};

const drawCampus = (campus, students) =>{
  let contI = 1;
  let contY = 1;
  let studentsSantiago = 0;
  let studentsLima = 0;
  let studentsMexico = 0;

  campus.forEach(element =>{
    document.getElementById(`sede${contI++}`).innerHTML = element;
  });

  students.forEach(element =>{
    if (element.campus === 'Santiago') {
      studentsSantiago++;
    }
    if (element.campus === 'Lima') {
      studentsLima++;
    }
    if (element.campus === 'México') {
      studentsMexico++;
    }
  });
	
  document.getElementById(`students-sede${contY++}`).innerHTML = studentsLima;
  document.getElementById(`students-sede${contY++}`).innerHTML = studentsMexico;
  document.getElementById(`students-sede${contY++}`).innerHTML = studentsSantiago;
};


/** Dibujar estadisticas generales **/
const drawGeneralStatistics = (students, campus, generation) =>{
  const namesGroup = ['Total de estudiantes', 'ESTUDIANTES: arriba del 90%', 'ESTUDIANTES: en la media', 'ESTUDIANTES: debajo del 60%'];
  const studentsNumber = [0, 0, 0, 0];
  let filterStudents = [];
  let result = '';

  if (campus === 'General') {
    filterStudents = students;
  } else {
    if (generation === 'General') {
      filterStudents = data.filterStudentsByCampus(students, campus);
    } else {
      filterStudentsCampus = data.filterStudentsByCampus(students, campus);
      filterStudents = data.filterStudentsByGeneration(filterStudentsCampus, generation);
    }
  }
  
  studentsNumber[0] = filterStudents.length;
  filterStudents.forEach(student =>{
    if (student.stats.status === 'alto') {
      studentsNumber[1]++;
    }
    if (student.stats.status === 'medio') {
      studentsNumber[2]++;
    }
    if (student.stats.status === 'suficiente') {
      studentsNumber[3]++;
    }
  });
	
  for (let i = 0; i < 4; i++) {
    result += `<div class="statistics col-lg-3 col-12">
                  	<div class="statistic d-flex align-items-center bg-white has-shadow">
                    	<div class="icon bg-red"><i class="fa fa-line-chart"></i></div>
                    	<div class="text"><strong>${studentsNumber[i]}</strong><br><small>${namesGroup[i]}</small></div>
                 	</div>
                </div>`;
  }
  document.getElementById('general-statistic').innerHTML = result;
};

/**  Dibujar tablas de estudiantes **/
const drawTable = (object) =>{
  let result = '';
  object.forEach((student, i) =>{ 
    result += `<tr>
                  <th scope="row">${i + 1}</th>
                  <td><button class="no-button-sedes student-button" id="${student.campus}" name="${student.name}">${student.name}</button></td>
                  <td class="d-none d-md-block d-lg-block d-xl-block">${student.email}</td>
                  <td>${data.firstLetterToUpperCase(student.generation)}</td>
                  <td>${student.stats.completedPercentage} %</td>
                </tr>`;
  });
  document.getElementById('table-students-body').innerHTML = result;
};

/**  Vista sedes **/

const drawNumberOfStudents = (generations, campus) =>{
  let contY = 1;
  let years = [];
  let students = [];
  generations.forEach(elements =>{
    if (elements.campus === campus) {	
      if (generations.indexOf(elements.generation) === -1) {
        years.push(elements.generation);
        students.push(elements.count);
      }
    }
  });
  let contI = 1;
  years.forEach(generation =>{
    document.getElementById(`generation${contI++}`).innerHTML = `${data.firstLetterToUpperCase(generation)} <br> generación`;
  });

  document.getElementById(`students-generation${contY++}`).innerHTML = students[0];
  document.getElementById(`students-generation${contY++}`).innerHTML = students[1];
  document.getElementById(`students-generation${contY++}`).innerHTML = students[2];
};

const drawStudentsTable = (students, campus) =>{
  const filterStudents = data.filterStudentsByCampus(students, campus);
  let result = '';
  drawTable(filterStudents);
  orderTable(filterStudents);
};

/**  Eventos para ordernar tablas **/
const orderTable = (filterStudentsForTable) =>{
  document.getElementById('name-asc').addEventListener('click', event =>{
    event.preventDefault();
    const orderStudents = data.sortStudents(filterStudentsForTable, 'name', 'ASC');
    drawTable(orderStudents);
  });

  document.getElementById('name-desc').addEventListener('click', event =>{
    event.preventDefault();
    const orderStudents = data.sortStudents(filterStudentsForTable, 'name', 'DESC');
    drawTable(orderStudents);
  });

  document.getElementById('percentaje-asc').addEventListener('click', event =>{
    event.preventDefault();
    const orderStudents = data.sortStudents(filterStudentsForTable, 'percentaje', 'ASC');
    drawTable(orderStudents);
  });

  document.getElementById('percentaje-desc').addEventListener('click', event =>{
    event.preventDefault();
    const orderStudents = data.sortStudents(filterStudentsForTable, 'percentaje', 'DESC');
    drawTable(orderStudents);
  });
};

/**  Vista generaciones **/

const drawGeneration = (students, campus, generation) =>{
  let studentGeneration = '';
  if (generation === 'generation1') {
    studentGeneration = 'cuarta';
  }
  if (generation === 'generation2') {
    studentGeneration = 'quinta';
  }
  if (generation === 'generation3') {
    studentGeneration = 'tercera';
  }
  const studentsOfCampus = data.filterStudentsByCampus(students, campus);
  const studentsOfGeneration = data.filterStudentsByGeneration(studentsOfCampus, studentGeneration);
  let result = '';
  drawGeneralStatistics(studentsOfGeneration, campus, studentGeneration);
  document.getElementById('table-students-body').innerHTML = result;
  drawTable(studentsOfGeneration);
  orderTable(studentsOfGeneration);
  getDrawInformation(studentsOfGeneration);
  document.getElementById('table-title').innerHTML = `<a href="sede${campus}.html">Estudiantes ${campus}</a>  &#62; &#62; ${data.firstLetterToUpperCase(studentGeneration)} generación`;
};


const getGenerationAndCampus = students =>{
  document.getElementById('btn-generation1').addEventListener('click', event =>{
    event.preventDefault();
    document.getElementById('btn-generation2').className = 'no-button-sedes';
    document.getElementById('btn-generation3').className = 'no-button-sedes';
    document.getElementById('btn-generation1').className = 'button-selected';
    const divCampus = document.getElementsByClassName('campus-name');
    const campus = divCampus[0].getAttribute('id');
    const divGeneration = document.getElementsByClassName('generation-number');
    const generation = divGeneration[0].getAttribute('id');
    drawGeneration(students, campus, generation);
  });

  document.getElementById('btn-generation2').addEventListener('click', event =>{
    event.preventDefault();
    document.getElementById('btn-generation1').className = 'no-button-sedes';
    document.getElementById('btn-generation3').className = 'no-button-sedes';
    document.getElementById('btn-generation2').className = 'button-selected';
    const divCampus = document.getElementsByClassName('campus-name');
    const campus = divCampus[1].getAttribute('id');
    const divGeneration = document.getElementsByClassName('generation-number');
    const generation = divGeneration[1].getAttribute('id');
    drawGeneration(students, campus, generation);
  });

  document.getElementById('btn-generation3').addEventListener('click', event =>{
    event.preventDefault();
    document.getElementById('btn-generation1').className = 'no-button-sedes';
    document.getElementById('btn-generation2').className = 'no-button-sedes';
    document.getElementById('btn-generation3').className = 'button-selected';
    const divCampus = document.getElementsByClassName('campus-name');
    const campus = divCampus[2].getAttribute('id');
    const divGeneration = document.getElementsByClassName('generation-number');
    const generation = divGeneration[2].getAttribute('id');
    drawGeneration(students, campus, generation);
  });
};

/**  Vista Consultas **/
const drawSearchStudent = students =>{
  document.getElementById('btn-seach').addEventListener('click', (event) =>{
    event.preventDefault();
    const searchNameStudent = document.getElementById('name-student').value;
    if (searchNameStudent !== '' && searchNameStudent !== ' ') {
      const studentResult = data.filterStudentsByName(students, searchNameStudent);
      const headerSearchCard = `<div class="card-header d-flex align-items-center">
									  <h2 class="h3">Resultados de la consulta</h2>
									  <div class="badge badge-rounded bg-pinkLab">${studentResult.length} coincidencias</div>
									</div><div class="card-body no-padding" id="body-student-card"></div>`;
      document.getElementById('header-student-card').innerHTML = headerSearchCard;
      let bodySearchCard = '';
      document.getElementById('body-student-card').innerHTML = '';
      if (studentResult.length !== 0) {
        studentResult.forEach(result =>{
          bodySearchCard += `<div class="item d-flex align-items-center">
					                  <div class="text">
					                    <p><span class='tags-search'>Nombre:</span><button id="${result.campus}" name="${result.name}" class="no-button-sedes student-button">${result.name}</button></p><p><span class='tags-search'>Sede:</span> ${result.campus} - ${data.firstLetterToUpperCase(result.generation)} generación </p><p><span class='tags-search'>Correo:</span> ${result.email}</p><p><span class='tags-search'>Progreso:</span> ${result.stats.completedPercentage}% completitud</p>
					                  </div>
					               </div>`;
        });
        document.getElementById('body-student-card').innerHTML = bodySearchCard;
        getDrawInformation(studentResult);
      }
    }
  });
};

/**  Vista Información por estudiante **/

const getDrawInformation = students =>{
  const buttonSelected = document.getElementsByClassName('student-button');
  for (let i = 0; i < buttonSelected.length; i++) {
    buttonSelected[i].addEventListener('click', event =>{
      const campusStudent = buttonSelected[i].getAttribute('id');
      const nameStudent = buttonSelected[i].getAttribute('name');
      document.getElementById('div1').style.display = 'none';
      document.getElementById('div2').style.display = 'none';
      document.getElementById('div3').style.display = 'none';
      document.getElementById('individual-information').style.display = 'block';
      drawStudentInformation(students, nameStudent, campusStudent);
    });
  }
};

const drawStudentInformation = (students, name, campus) =>{
  document.getElementById('titile-page').innerHTML = `<a href="consultas.html">Consulta >> </a>  ${name}`;
  const informationByCampus = data.filterStudentsByCampus(students, campus);
  const informationByStudent = data.filterStudentsByName(informationByCampus, name);
  const topicsStudent = informationByStudent[0].stats.topics;
  const nameTopics = Object.keys(topicsStudent);
  nameTopics.forEach((topic, i) =>{
    document.getElementById(`topic${i + 1}`).innerHTML = topic.replace('-', ' ');
  });

  document.getElementById('percentaje-general').innerHTML = `${informationByStudent[0].stats.completedPercentage}%`;
  document.getElementById('student-personal-information').innerHTML = `<strong>${informationByStudent[0].name}</strong><p class="pt-3">${informationByStudent[0].campus} - ${data.firstLetterToUpperCase(informationByStudent[0].generation)} generación</p><p class="pt-3">${informationByStudent[0].email}</p><p class="pt-3">Turno ${informationByStudent[0].turn}</p>`;
  document.getElementById('general-clasification').innerHTML = data.firstLetterToUpperCase(informationByStudent[0].stats.status);
  const topicsValues = Object.values(topicsStudent);
  topicsValues.forEach((value, i) =>{
    document.getElementById(`topic-percentaje${i + 1}`).innerHTML = `${value.completedPercentage}%`;
  });
};