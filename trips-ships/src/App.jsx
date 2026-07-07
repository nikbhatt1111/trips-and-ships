import { BrowserRouter, Routes, Route } from "react-router-dom"
import BestTimeToVisitAntarctica from "./component/best-time-to-visit-antarctica"
import IsAntarcticaCruiseWorthIt from "./component/is-an-antarctica-cruise-worth-it"
import AntarcticaPackingGuide from "./component/antarctica-packing-guide"
import AntarcticaWildlifeGuide from "./component/antarctica-wildlife-guide"
import AntarcticaCruiseItineraries from "./component/antarctica-cruise-itineraries"
import AntarcticaLandingSites from "./component/antarctica-landing-sites"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default page */}
        <Route
          path="/"
          element={<BestTimeToVisitAntarctica />}
        />

        <Route
          path="/best-time-to-visit-antarctica"
          element={<BestTimeToVisitAntarctica />}
        />

        <Route
          path="/is-an-antarctica-cruise-worth-it"
          element={<IsAntarcticaCruiseWorthIt />}
        />

        <Route
          path="/antarctica-packing-guide"
          element={<AntarcticaPackingGuide />}
        />

        <Route
          path="/antarctica-wildlife-guide"
          element={<AntarcticaWildlifeGuide />}
        />

        <Route
          path="/antarctica-cruise-itineraries"
          element={<AntarcticaCruiseItineraries />}
        />

        <Route
          path="/antarctica-landing-sites"
          element={<AntarcticaLandingSites />}
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App

// import { useState } from 'react'
// import './App.css'
// import BestTimeToVisitAntarctica from './component/best-time-to-visit-antarctica'
// import IsAntarcticaCruiseWorthIt from './component/is-an-antarctica-cruise-worth-it'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <BestTimeToVisitAntarctica />
//       <IsAntarcticaCruiseWorthIt />
//     </>
//   )
// }

// export default App
