import { createRoot } from "react-dom/client"
import Pet from "./Pet"

const App = () => {
//   return React.createElement("div", {}, [
//     React.createElement("h1", {}, "Pet Rescue App"),
//     React.createElement(Pet, {
//       name: "Bob",
//       animal: "Dog",
//       breed: "Border Collie",
//     }),
//     React.createElement(Pet, {
//       name: "Bib",
//       animal: "Dog",
//       breed: "Poddle",
//     }),
//   ])

return (
    <div>
        <h1>Pet Rescue App</h1>
        <Pet name="Bob" animal="Pig" breed="Boar" ></Pet>
        <Pet name="Bib" animal="Dog" breed="Poddle" ></Pet>
        <Pet name="Bobby" animal="Cat" breed="Sphynx" ></Pet>
    </div>
)
}

const container = document.getElementById("root")
const root = createRoot(container)
root.render(<App />)