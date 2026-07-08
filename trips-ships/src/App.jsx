import { BrowserRouter, Routes, Route } from "react-router-dom"
import BestTimeToVisitAntarctica from "./component/best-time-to-visit-antarctica"
import IsAntarcticaCruiseWorthIt from "./component/is-an-antarctica-cruise-worth-it"
import AntarcticaPackingGuide from "./component/antarctica-packing-guide"
import AntarcticaWildlifeGuide from "./component/antarctica-wildlife-guide"
import AntarcticaCruiseItineraries from "./component/antarctica-cruise-itineraries"
import AntarcticaLandingSites from "./component/antarctica-landing-sites"
import ZodiacLandingsExplained from "./component/zodiac-landings"
import AntarcticaCruiseFAQ from "./component/antarctica-cruise-faq"
import AntarcticaPhotographyGuide from "./component/antarctica-photography-guide"
import AntarcticaFirstTimeTravelers from "./component/first-time-antarctica-cruise"
import HXCabinsGuide from "./component/hx-cabins"
import HXShipsGuide from "./component/hx-expeditions-ships"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default page */}
        <Route
          path="/"
          element={<BestTimeToVisitAntarctica />}
        />

        {/* Page 1 */}
        <Route
          path="/best-time-to-visit-antarctica"
          element={<BestTimeToVisitAntarctica />}
        />

        {/* Page 2 */}
        <Route
          path="/is-an-antarctica-cruise-worth-it"
          element={<IsAntarcticaCruiseWorthIt />}
        />

        {/* Page 3 */}
        <Route
          path="/antarctica-packing-guide"
          element={<AntarcticaPackingGuide />}
        />

        {/* Page 4 */}
        <Route
          path="/antarctica-wildlife-guide"
          element={<AntarcticaWildlifeGuide />}
        />

        {/* Page 5 */}
        <Route
          path="/antarctica-cruise-itineraries"
          element={<AntarcticaCruiseItineraries />}
        />

        {/* Page 6 */}
        <Route
          path="/antarctica-landing-sites"
          element={<AntarcticaLandingSites />}
        />

        {/* Page 7 */}
        <Route
          path="/zodiac-landings"
          element={<ZodiacLandingsExplained />}
        />

        {/* Page 8 */}
        <Route
          path="/antarctica-cruise-faq"
          element={<AntarcticaCruiseFAQ />}
        />

        {/* Page 9 */}
        <Route
          path="/antarctica-photography-guide"
          element={<AntarcticaPhotographyGuide />}
        />

        {/* Page 10 */}
        <Route
          path="/first-time-antarctica-cruise"
          element={<AntarcticaFirstTimeTravelers />}
        />

        {/* Page 11 */}
        <Route
          path="/hx-expeditions-ships"
          element={<HXShipsGuide />}
        />

        {/* Page 12 */}
        <Route
          path="/hx-cabins"
          element={<HXCabinsGuide />}
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
