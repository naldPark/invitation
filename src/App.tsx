import { Cover } from "./component/cover"
import "./App.scss"
import { Gallery } from "./component/gallery"

function App() {
  return (
    <div className="background">
      <div className="card-view">
        <Cover />
        <Gallery />
      </div>
    </div>
  )
}

export default App
