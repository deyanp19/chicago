
import style from './Witget.css';

export default function Witget({step}) {

    const one=<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-1-circle-fill" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM9.283 4.002H7.971L6.072 5.385v1.271l1.834-1.318h.065V12h1.312V4.002Z"/>
  </svg>
    const two=<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-2-circle-fill" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM6.646 6.24c0-.691.493-1.306 1.336-1.306.756 0 1.313.492 1.313 1.236 0 .697-.469 1.23-.902 1.705l-2.971 3.293V12h5.344v-1.107H7.268v-.077l1.974-2.22.096-.107c.688-.763 1.287-1.428 1.287-2.43 0-1.266-1.031-2.215-2.613-2.215-1.758 0-2.637 1.19-2.637 2.402v.065h1.271v-.07Z"/>
  </svg>
    const three=<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="purple" className="bi bi-3-circle" viewBox="0 0 16 16">
    <path d="M7.918 8.414h-.879V7.342h.838c.78 0 1.348-.522 1.342-1.237 0-.709-.563-1.195-1.348-1.195-.79 0-1.312.498-1.348 1.055H5.275c.036-1.137.95-2.115 2.625-2.121 1.594-.012 2.608.885 2.637 2.062.023 1.137-.885 1.776-1.482 1.875v.07c.703.07 1.71.64 1.734 1.917.024 1.459-1.277 2.396-2.93 2.396-1.705 0-2.707-.967-2.754-2.144H6.33c.059.597.68 1.06 1.541 1.066.973.006 1.6-.563 1.588-1.354-.006-.779-.621-1.318-1.541-1.318Z"/>
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8Z"/>
  </svg>

  const four=<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-4-circle" viewBox="0 0 16 16">
  <path d="M7.519 5.057c.22-.352.439-.703.657-1.055h1.933v5.332h1.008v1.107H10.11V12H8.85v-1.559H4.978V9.322c.77-1.427 1.656-2.847 2.542-4.265ZM6.225 9.281v.053H8.85V5.063h-.065c-.867 1.33-1.787 2.806-2.56 4.218Z"/>
  {/* <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8Z"/> */}
</svg>
    return (
        <div className="container-widget shadow rounded">

        <section className="py-5 m-4 ps-3">
             
          <ul className="timeline-with-icons">
            <li className="timeline-item mb-5 ">
              <span className="timeline-icon bg-white">
              {one}
              <i className="fa-solid fa-1"></i>
              </span>
        
              <h5 className="fw-bold text-primary ">Apply app</h5>
            
            </li>
        
            <li className="timeline-item mb-5">
        
              <span className="timeline-icon bg-white">
              {two}
              </span>
              <h5 className="fw-bold text-primary">Admin Portal</h5>
           
            </li>
        
            <li className="timeline-item mb-5">
        
              <span className="timeline-icon bg-white">
             {three}
              </span>
              <h5 className="fw-bold">Merchant Portal</h5>
          
            </li>
        
            <li className="timeline-item mb-5">
        
              <span className="timeline-icon bg-white">
              {four}
              <div className="dashed-circle"></div>

              </span>
              <h5 className="fw-bold">Curv POS</h5>
          
            </li>
          </ul>
        </section>
        </div>
      
    );
}