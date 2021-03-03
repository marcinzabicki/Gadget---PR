import React, {useState} from "react";
import Pagination from "react-js-pagination";
    
    const DashboardTable = (props)=>{
        const [activePage, setActivePage] = useState(1);
       if(props === null || props.tableData.length <1){
           return null;
       }

        const eventsPerPage = 10;
        const displayPagination = props.tableData.length>eventsPerPage
        
      
        const handlePageChange = (pageNumber) => {
          setActivePage(pageNumber);
        };

        const last = activePage * eventsPerPage;
        const first = last - eventsPerPage;
        const currentEvents = props.tableData.slice(first,last);
        

       const headers =
       Object.keys(currentEvents[0]).map((k, i) => {
           return (
               <div className="header-item" key={i}>
                   {k[0].toUpperCase() + k.slice(1)}
               </div>
           )
       })

       const data = currentEvents.map((l, i)=>{
           return (
               <div key={i} className="logs-table-row" >
                   {Object.keys(currentEvents[0]).map((k,j)=>{
                       return(
                           <div className="log-item" key={j}>
                               {l[k]}
                           </div>
                       )
                   })}
               </div>
           )
       })

   return (
       <div className="log-table">
       <div className="logs-table-row logs-header">
            {headers}
       </div>
        {data}
        {displayPagination && (
            <Pagination
              activePage={activePage}
              itemsCountPerPage={eventsPerPage}
              totalItemsCount={props.tableData.length}
              pageRangeDisplayed={3}
              onChange={handlePageChange}
              prevPageText="<"
              nextPageText=">"
              firstPageText=".."
              lastPageText=".."
            />
          )}
    </div>
   )}

export default DashboardTable;