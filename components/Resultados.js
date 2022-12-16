import React,{useState,useEffect,useRef} from 'react'
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { Chart } from "react-google-charts";
import { useSession } from "next-auth/react"

  
  /*
  'Sureste monóxido de carbono', 'Sureste PM10'
  */
  
  const columns = [
    { field: '0', headerName: 'Año' , flex:1 },
    { field: '1', headerName: 'Días sucios' ,flex:1 },
    { field: '2', headerName: 'Días limpios' ,flex:1 },
  ];



  export const options = {
    title: "Comparación de días sucios y limpios desde 2010 a 2021",
    colors: ['red','green'],
    chartArea: { width: "50%" },
    isStacked: true,
    hAxis: {
      title: "Días",
      minValue: 0,
    },
    vAxis: {
      title: "Años",
    },
  };

export default function Resultados() {

    const [isLoading, setLoading] = useState(false)
    const [dataLakePostgres,setDataLakePostgres] = useState([]);
    const { data: session, status } = useSession()

    const firstUpdate = useRef(true);
    const [isClean, setClean] = useState(false)
    const [dataWareHouseCentro,setDataWareHouseCentro] = useState([]);
    const [dataWareHouseNoreste,setDataWareHouseNoreste] = useState([]);
    const [dataWareHouseNoroeste,setDataWareHouseNoroeste] = useState([]);
    const [dataWareHouseSureste,setDataWareHouseSureste] = useState([]);
    const [dataWareHouseSuroeste,setDataWareHouseSuroeste] = useState([]);


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
          console.log(typeof(result.data))
          return result.data;
        } catch (err) {
          console.log(err);
        }
    }

    async function getDataCentro() {
      try {
        const response = await fetch('http://127.0.0.1:8000/resultado/centro', {
          method: 'GET',
          headers: {
            accept: 'application/json',
            
          },
        });
    
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
    
        const result = await response.json();
        console.log(typeof(result.data))
        return result.data;
      } catch (err) {
        console.log(err);
      }
  }


  async function getDataNoreste() {
    try {
      const response = await fetch('http://127.0.0.1:8000/resultado/noreste', {
        method: 'GET',
        headers: {
          accept: 'application/json',
          
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log(typeof(result.data))
      return result.data;
    } catch (err) {
      console.log(err);
    }
}


async function getDataNoroeste() {
  try {
    const response = await fetch('http://127.0.0.1:8000/resultado/noroeste', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        
      },
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log(typeof(result.data))
    return result.data;
  } catch (err) {
    console.log(err);
  }
}


async function getDataSureste() {
  try {
    const response = await fetch('http://127.0.0.1:8000/resultado/sureste', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        
      },
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log(typeof(result.data))
    return result.data;
  } catch (err) {
    console.log(err);
  }
}


async function getDataSuroeste() {
  try {
    const response = await fetch('http://127.0.0.1:8000/resultado/suroeste', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        
      },
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log(typeof(result.data))
    return result.data;
  } catch (err) {
    console.log(err);
  }
}


async function getStatus() {
  try {
    const response = await fetch('http://127.0.0.1:8000/status/limpieza', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        
      },
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
    if(result.status_code===200 && result.data==="true"){
      return true;
    }else{
      return false;
    }

  } catch (err) {
    console.log(err);
  }
}

    

    useEffect(() => {
      if (firstUpdate.current) {
        firstUpdate.current = false;
        return;
      }

      setLoading(true)


      getDataPostgres()
          .then(data => setDataLakePostgres(data))
          .catch(err => console.log("Something went wrong"));

      getDataCentro()
        .then(data => {
          setDataWareHouseCentro(data)
          setLoading(false)
        })

        .catch(err => console.log("Something went wrong"));
        getDataNoreste()
        .then(data => {
          setDataWareHouseNoreste(data)
          setLoading(false)
        })
        .catch(err => console.log("Something went wrong"));


        getDataNoroeste()
        .then(data => {
          setDataWareHouseNoroeste(data)
          setLoading(false)
        })
        .catch(err => console.log("Something went wrong"));
        getDataSureste()
        .then(data => {
          setDataWareHouseSureste(data)
          setLoading(false)
        })
        .catch(err => console.log("Something went wrong"));

        getDataSuroeste()
        .then(data => {
          setDataWareHouseSuroeste(data)
          setLoading(false)
        })
        .catch(err => console.log("Something went wrong"));
        //const datos_postgres = getUser();
        
    }, [])


    useEffect(() => {
      getStatus()
        .then(data => setClean(data))
        .catch(err => console.log(err));
      //const datos_postgres = getUser();
      
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

    




    return isClean===true ? (
        <>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
             <h3 className="text-2xl font-semibold text-gray-900">Centro</h3>
        </div>
        <div style={{ height: 500, width: '100%' }}>
            <Chart
                chartType="BarChart"
                width="100%"
                height="400px"
                data={dataWareHouseCentro}
                options={options}
            />
        </div>

        <br/>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
             <h3 className="text-2xl font-semibold text-gray-900">Noreste </h3>
        </div>
        <div style={{ height: 500, width: '100%' }}>
            <Chart
                    chartType="BarChart"
                    width="100%"
                    height="400px"
                    data={dataWareHouseNoreste}
                    options={options}
                />
        </div>

        <br/>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
             <h3 className="text-2xl font-semibold text-gray-900">Noroeste</h3>
        </div>
        <div style={{ height: 500, width: '100%' }}>
                <Chart
                        chartType="BarChart"
                        width="100%"
                        height="400px"
                        data={dataWareHouseNoroeste}
                        options={options}
                    />
        </div>

        <br/>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
             <h3 className="text-2xl font-semibold text-gray-900">Sureste</h3>
        </div>
        <div style={{ height: 500, width: '100%' }}>
             <Chart
                chartType="BarChart"
                width="100%"
                height="400px"
                data={dataWareHouseSureste}
                options={options}
            />
        </div>

        <br/>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
             <h3 className="text-2xl font-semibold text-gray-900">Suroeste {session.name}</h3>
        </div>
        <div style={{ height: 500, width: '100%' }}>
            <Chart
                chartType="BarChart"
                width="100%"
                height="400px"
                data={dataWareHouseSuroeste}
                options={options}
            />
        </div>

        


        </>
    ) : (
      <>
      
        
        
        <a  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Resultado vacio, ir a proceso de limpieza</a>
       
      

      
      </>
    )
}
