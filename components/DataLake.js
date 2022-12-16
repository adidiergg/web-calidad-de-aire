import React,{useState,useEffect,useRef} from 'react'
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';


  
  const columns = [
    { field: '0', headerName: 'Fecha' },
    { field: '1', headerName: 'Hora' },
    { field: '2', headerName: 'Noroeste Ozono'},
    { field: '3', headerName: 'Noroeste dióxido de azufre'},
    { field: '4', headerName: 'Noroeste dióxido de nitrógeno'},
    { field: '5', headerName: 'Noroeste monóxido de carbono'},
    { field: '6', headerName: 'Noroeste PM10'},
    { field: '7', headerName: 'Noreste Ozono'},
    { field: '8', headerName: 'Noreste dióxido de azufre'},
    { field: '9', headerName: 'Noreste dióxido de nitrógeno'},
    { field: '10', headerName: 'Noreste monóxido de carbono'},
    { field: '11', headerName: 'Noreste PM10'},
    { field: '12', headerName: 'Centro Ozono'},
    { field: '13', headerName: 'Centro dióxido de azufre'},
    { field: '14', headerName: 'Centro dióxido de nitrógeno'},
    { field: '15', headerName: 'Centro monóxido de carbono'},
    { field: '16', headerName: 'Centro PM10'},
    { field: '17', headerName: 'Suroeste Ozono'},
    { field: '18', headerName: 'Suroeste dióxido de azufre'},
    { field: '19', headerName: 'Suroeste dióxido de nitrógeno'},
    { field: '20', headerName: 'Suroeste monóxido de carbono'},
    { field: '21', headerName: 'Suroeste PM10'},
    { field: '22', headerName: 'Sureste Ozono'},
    { field: '23', headerName: 'Sureste dióxido de azufre'},
    { field: '24', headerName: 'Sureste dióxido de nitrógeno'},
    { field: '25', headerName: 'Sureste monóxido de carbono'},
    { field: '26', headerName: 'Sureste PM10'},
  
  
  ];


export default function DataLake() {

    const [isLoading, setLoading] = useState(false)
    const [dataLakePostgres,setDataLakePostgres] = useState([]);
    const [dataLakeMaria,setDataLakeMaria] = useState([]);
    const firstUpdate = useRef(true);

    

    async function getDataPostgres() {
        try {
          const response = await fetch('http://127.0.0.1:8000/data-lake-postgres', {
            method: 'GET',
            headers: {
              accept: 'application/json',
              
            },
          });
      
          if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
          }
      
          const result = await response.json();
          
          if(result.status_code===200){
            return result.data;
          }else{
            
            return []
          }

          


        } catch (err) {
          console.log(err);
          
          return []
        }
    }


    async function getDataMaria() {
      try {
        const response = await fetch('http://127.0.0.1:8000/data-lake-maria', {
          method: 'GET',
          headers: {
            accept: 'application/json',
            
          },
        });
        console.log("--------------------------")
        console.log(response)
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
    
        const result = await response.json();

        if(result.status_code===200){
          return result.data;
        }else{
          return []
        }


      } catch (err) {
        console.log(err);
        
        return []
      }
  }

    

    useEffect(() => {
        if (firstUpdate.current) {
          firstUpdate.current = false;
          return;
        }

        setLoading(true)
        getDataPostgres()
          .then(data => {
            setDataLakePostgres(data)
            setLoading(false)
          })
          .catch(err => console.log("Something went wrong"));

        getDataMaria()
          .then(data => {
            setDataLakeMaria(data)
            setLoading(false)
          })
          .catch(err => console.log("Something went wrong"));
       
        
    }, [])

    if(isLoading===true){
      return(
        <div class="text-center">
          <div role="status">
              <svg class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span class="sr-only">Loading...</span>
          </div>
        </div>

      );
    }




    return (
        <>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
             <h3 className="text-2xl font-semibold text-gray-900">Postgres - (2010-2015) </h3>
        </div>
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid rows={dataLakePostgres} columns={columns} />
        </div>

        <br/>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
             <h3 className="text-2xl font-semibold text-gray-900">MariaDB - (2015-2021) </h3>
        </div>
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid rows={dataLakeMaria} columns={columns} />
        </div>

       


        </>
    )
}
