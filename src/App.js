import React from "react"
import { createRoot } from "react-dom/client"

const Pet = (props) => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, props.name),
    React.createElement("h2", {}, props.animal),
    React.createElement("h2", {}, props.breed),
  ])
}

const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "Pet Rescue App"),
    React.createElement(Pet, {
      name: "Bob",
      animal: "Dog",
      breed: "Border Collie",
    }),
    React.createElement(Pet, {
      name: "Bib",
      animal: "Dog",
      breed: "Poddle",
    }),
  ])
}

const container = document.getElementById("root")
const root = createRoot(container)
root.render(React.createElement(App))
