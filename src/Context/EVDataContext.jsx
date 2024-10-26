import {createContext, useEffect, useState } from "react";
import Papa from 'papaparse';
import Data from "../datasets/Electric_Vehicle_Population_Data.csv"

const EvDataContext = createContext();


const EvDataProvider = ({children}) =>{
    const [evData,setEvData] = useState([]);

    const [loading, setLoading] = useState(true);

    const fetchCsvData = async() =>{

        try {
            const response = await fetch(Data);
            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");

            let csvData = '';

            // Getting the data in chunks and then decode
            while (true){
                const {done, value} = await reader.read();
                if(done) break;
                csvData += decoder.decode(value, {stream:true});
            }

            const parsedData = Papa.parse(csvData,{
                header: true, 
                skipEmptyLines: true  
            }).data;

           console.log("Data",parsedData)
            setEvData(parsedData)
            setLoading(false);
        } catch (error) {
            console.error("Error parsing CSV: ",error)
            
        }
    }
    useEffect(()=>{
        fetchCsvData();
    },[])


    return(
        <EvDataContext.Provider value={{evData,loading}}>
            {children}
        </EvDataContext.Provider>
    )
}

export {EvDataContext, EvDataProvider};