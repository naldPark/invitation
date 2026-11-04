import { Cover } from "./component/cover"
import "./App.scss"
import { BGEffect } from "./component/bgEffect"
import { Gallery } from "./component/gallery"

function App() {
  return (
    <div className="background">
      <BGEffect />
      <div className="card-view">
        <Cover />
        <Gallery />
      </div>
    </div>
  )
}

export default App
