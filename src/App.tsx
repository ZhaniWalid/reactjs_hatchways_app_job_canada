import { useEffect, useState } from 'react';
import { hatchwaysGetAllStudentsAPI } from './HatchwaysAPI/axiosHatchwaysAPI';
import AlignItemsList from './Components/ItemsList/hatchwaysStudentsCmpLst';
import './App.css';

function App() {
  const [hatchwaysApiStudents, setHatchwaysApiStudents]: any = useState([]);

  useEffect(() => {
    hatchwaysGetAllStudentsAPI.then((response: any) => {
      const studentsData: any[] = response.data.students;
      //setHatchwaysApiStudents(studentsData);

      // The Array Object(s) we got in the response (const studentsData = response.data.students)
      // from the 'Hatchways API' inside, contains these properties: 
      // { city, company, email, firstName, grades, id, lastName, pic, skill }
      // So in order to add a new property that contains the 'Tags' for each 'Student' (studTags: [])
      // I did like this line below... Link of how to do it:
      //      https://stackoverflow.com/questions/38922998/add-property-to-an-array-of-objects
      const newStdtsFormData = studentsData.map((studObj: any) => 
            ({ ...studObj, studTags: [] })
      );
      setHatchwaysApiStudents(newStdtsFormData);
    });
  }, []);

  useEffect(() => {
    console.log('hatchwaysApiStudents - useState on useEffect [./App.tsx]: ', hatchwaysApiStudents);
  });

  return (
    <div className='App'>
      <AlignItemsList hatchwaysApiStudents={hatchwaysApiStudents} />
    </div>
  );
}

export default App;
