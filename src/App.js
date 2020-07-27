import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

import NavBar from "./components/layout/NavBar";
import Dashboard from "./components/layout/Dashboard";
import Pokemon from "./components/pokemon/Pokemon";

import bgImage from "./newBg.png";

function App() {
	return (
		<Router>
			<div
				className="App"
				style={{
					background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(239, 83, 80, 0.5)), url(${bgImage})`,
				}}
			>
				{/* <NavBar /> */}
				<div className="container">
					<Switch>
						<Route exact path="/" component={Dashboard} />
						<Route
							exact
							path="/pokemon/:pokemonIndex"
							component={Pokemon}
						/>
					</Switch>
				</div>
			</div>
		</Router>
	);
}

export default App;
