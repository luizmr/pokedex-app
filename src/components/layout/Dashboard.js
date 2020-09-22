import React, { Component } from "react";
import PokemonList from "../pokemon/PokemonList";

export default class Dashboard extends Component {
	// renderiza a lista de pokemons
	render() {
		return <PokemonList />;
	}
}
