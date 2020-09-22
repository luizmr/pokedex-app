import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";

// para cada tipo de pokemon, existe uma cor que referencia ele
const TYPE_COLORS = {
	bug: "B1C12E",
	dark: "4F3A2D",
	dragon: "755EDF",
	electric: "FCBC17",
	fairy: "F4B1F4",
	fighting: "823551D",
	fire: "E73B0C",
	flying: "A3B3F7",
	ghost: "6060B2",
	grass: "74C236",
	ground: "D3B357",
	ice: "A3E7FD",
	normal: "C8C4BC",
	poison: "934594",
	psychic: "ED4882",
	rock: "B9A156",
	steel: "B5B5C3",
	water: "3295F6",
};

export default class Pokemon extends Component {
	// neste componente, novos estados serão obtidos através de novas chamadas a pokeapi para obter detalhes de cada pokemon quando clicado
	state = {
		name: "",
		pokemonIndex: "",
		imageUrl: "",
		types: [],
		description: "",
		stats: {
			hp: "",
			attack: "",
			defense: "",
			speed: "",
			specialAttack: "",
			specialDefense: "",
		},
		height: "",
		weight: "",
		eggGroups: "",
		abilities: "",
		genderRatioMale: "",
		genderRatioFemale: "",
		evs: "",
		hatchSteps: "",
		catchRate: "",
		next: "",
		prev: "",
		evolution: "",
		imageEvolution: "",
		evolutionExist: "",
	};

	async componentDidMount() {
		// quando o usuario clica no pokemon, este componente é chamado e no seu link terá o parametro referente ao seu numero na pokedex
		const { pokemonIndex } = this.props.match.params;

		// com o numero da pokedex obtido, ele é usado para duas novas requisições que serão responsáveis por colher os detalhes do pokemon

		const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`;
		const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}`;

		// usando axios e o primeiro link, os detalhes serão obtidos

		const pokemonRes = await axios.get(pokemonUrl);

		const name = pokemonRes.data.name;
		const imageUrl = pokemonRes.data.sprites.front_default;

		let { hp, attack, defense, speed, specialAttack, specialDefense } = "";

		// para cada nome dentro do stat, ele retornará o valor desejado
		pokemonRes.data.stats.map((stat) => {
			switch (stat.stat.name) {
				case "hp":
					hp = stat["base_stat"];
					break;
				case "attack":
					attack = stat["base_stat"];
					break;
				case "defense":
					defense = stat["base_stat"];
					break;
				case "speed":
					speed = stat["base_stat"];
					break;
				case "special-attack":
					specialAttack = stat["base_stat"];
					break;
				case "special-defense":
					specialDefense = stat["base_stat"];
					break;
			}
		});

		// tanto para altura como para peso, arrendonda o valor e transforma para cm e kgs, respectivamente
		const height = Math.round(pokemonRes.data.height * 10);
		console.log(height);

		const weight = Math.round(pokemonRes.data.weight * 0.1);
		console.log(weight);

		// geralmente um pokemon pode ter mais de um tipo, logo usa map para pegar e guarda todos os tipos que ele pode ter
		const types = pokemonRes.data.types.map((type) => {
			return type.type.name;
		});

		// o mesmo para as habilidades, os pokemons podem ter mais de uma, logo usa map e join para produzir o texto esperado
		const abilities = pokemonRes.data.abilities
			.map((ability) => {
				return ability.ability.name;
			})
			.join(", ");

		// evs são pontos de habilidade que os pokemons podem ganhar quando vencem uma batalha
		// cada pokemon tem uma quantidade de pontos para uma certa característica que ele pode ganhar
		// dessa forma, se existir, ele retorna true, caso não exista, retorna false
		// se ele possuir, sera feito um map retornando a pontuação de cada característica
		const evs = pokemonRes.data.stats
			.filter((stat) => {
				if (stat.effort > 0) {
					return true;
				} else {
					return false;
				}
			})
			.map((stat) => {
				return `${stat.effort} ${stat.stat.name}`;
			})
			.join(", ");

		// nesta pagina, voce pode passar para o proximo ou retornar para o pokemon anterior através dos botões next e previous
		// quando voce clica, voce define um novo index que será utilizado para fazer uma nova requisição na pokeapi e retornar novos dados para o novo pokemon desejado
		const next = Number(pokemonIndex) + 1;
		const prev = Number(pokemonIndex) - 1;

		// o segundo link é para buscar novos detalhes do pokemon relacionados a sua espécie

		await axios.get(pokemonSpeciesUrl).then((res) => {
			let description = "";
			res.data.flavor_text_entries.some((flavor) => {
				if (flavor.language.name === "en") {
					description = flavor.flavor_text;
					return;
				}
			});

			// cada pokemon pode ter uma % de ser macho ou femea, este calculo está definido na documentação da pokeapi

			const femaleRate = res.data["gender_rate"];
			const genderRatioFemale = 12.5 * femaleRate;
			// 8 é 100%
			const genderRatioMale = 12.5 * (8 - femaleRate);

			// a conversão para capturar o pokemon desta espécie esta definida na documentação da pokeapi
			const catchRate = Math.round(
				(100 / 255) * res.data["capture_rate"]
			);

			const eggGroups = res.data["egg_groups"]
				.map((group) => {
					return group.name;
				})
				.join(", ");

			// a conversão dos passos para chocar um ovo do pokemon desta espécie esta definida na documentação da pokeapi
			const hatchSteps = 255 * (res.data["hatch_counter"] + 1);

			// seta o state com os dados obtidos através da requisição a pokeapi
			this.setState({
				description,
				genderRatioMale,
				genderRatioFemale,
				catchRate,
				eggGroups,
				hatchSteps,
			});
		});

		// todos os estados são setados após o sucesso das requisições da pokeapi e agora podem ser usados para mostrar os detalhes ao usuario
		this.setState({
			imageUrl,
			pokemonIndex,
			name,
			types,
			stats: {
				hp,
				attack,
				defense,
				speed,
				specialAttack,
				specialDefense,
			},
			height,
			weight,
			abilities,
			evs,
			next,
			prev,
		});

		console.log(this.state);
	}

	render() {
		return (
			<div className="col">
				<div className="card">
					<div className="card-header">
						<div className="row">
							<div className="col-5">
								<h5>#{this.state.pokemonIndex}</h5>
							</div>
							<div className="col-7">
								<div className="float-right">
									{this.state.types.map((type) => (
										<span
											key={type}
											className="badge badge-pill mr-1 text-capitalize p-2"
											style={{
												backgroundColor: `#${TYPE_COLORS[type]}`,
												color: "#fff",
											}}
										>
											{type}
										</span>
									))}
								</div>
							</div>
						</div>
					</div>
					<div className="card-body">
						<div className="row align-items-center">
							<div className="col-md-3">
								<img
									src={this.state.imageUrl}
									className="card-img-top rounded mx-auto mt-2 img-poke"
									alt="pokemon"
								/>
							</div>
							<div className="col-md-9">
								<h4 className="mx-auto text-capitalize">
									{this.state.name}
								</h4>
								{/* barra referente as características do pokemon */}
								<div className="row align-items-center">
									<div className="col-12 col-md-3">HP</div>
									<div className="col-12 col-md-9">
										<div className="progress">
											<div
												className="progress-bar"
												role="progressBar"
												style={{
													width: `${this.state.stats.hp}%`,
													backgroundColor: "#FF5959",
												}}
												aria-valuenow="25"
												aria-valuemin="0"
												aria-valuemax="100"
											>
												<small>
													{this.state.stats.hp}
												</small>
											</div>
										</div>
									</div>
								</div>
								{/* barra referente as características do pokemon */}
								<div className="row align-items-center">
									<div className="col-12 col-md-3">
										Attack
									</div>
									<div className="col-12 col-md-9">
										<div className="progress">
											<div
												className="progress-bar"
												role="progressBar"
												style={{
													width: `${this.state.stats.attack}%`,
													backgroundColor: "#F5AC78",
												}}
												aria-valuenow="25"
												aria-valuemin="0"
												aria-valuemax="100"
											>
												<small>
													{this.state.stats.attack}
												</small>
											</div>
										</div>
									</div>
								</div>
								{/* barra referente as características do pokemon */}
								<div className="row align-items-center">
									<div className="col-12 col-md-3">
										Defense
									</div>
									<div className="col-12 col-md-9">
										<div className="progress">
											<div
												className="progress-bar"
												role="progressBar"
												style={{
													width: `${this.state.stats.defense}%`,
													backgroundColor: "#FAE078",
												}}
												aria-valuenow="25"
												aria-valuemin="0"
												aria-valuemax="100"
											>
												<small>
													{this.state.stats.defense}
												</small>
											</div>
										</div>
									</div>
								</div>
								{/* barra referente as características do pokemon */}
								<div className="row align-items-center">
									<div className="col-12 col-md-3">Speed</div>
									<div className="col-12 col-md-9">
										<div className="progress">
											<div
												className="progress-bar"
												role="progressBar"
												style={{
													width: `${this.state.stats.speed}%`,
													backgroundColor: "#FA92B2",
												}}
												aria-valuenow="25"
												aria-valuemin="0"
												aria-valuemax="100"
											>
												<small>
													{this.state.stats.speed}
												</small>
											</div>
										</div>
									</div>
								</div>
								{/* barra referente as características do pokemon */}
								<div className="row align-items-center">
									<div className="col-12 col-md-3">
										Special Attack
									</div>
									<div className="col-12 col-md-9">
										<div className="progress">
											<div
												className="progress-bar"
												role="progressBar"
												style={{
													width: `${this.state.stats.specialAttack}%`,
													backgroundColor: "#9DB7F5",
												}}
												aria-valuenow="25"
												aria-valuemin="0"
												aria-valuemax="100"
											>
												<small>
													{
														this.state.stats
															.specialAttack
													}
												</small>
											</div>
										</div>
									</div>
								</div>
								{/* barra referente as características do pokemon */}
								<div className="row align-items-center">
									<div className="col-12 col-md-3">
										Special Defense
									</div>
									<div className="col-12 col-md-9">
										<div className="progress">
											<div
												className="progress-bar"
												role="progressBar"
												style={{
													width: `${this.state.stats.specialDefense}%`,
													backgroundColor: "#A7DB8E",
												}}
												aria-valuenow="25"
												aria-valuemin="0"
												aria-valuemax="100"
											>
												<small>
													{
														this.state.stats
															.specialDefense
													}
												</small>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* descrição */}

							<div className="row mt-1">
								<div className="col">
									<p className="p-2">
										{this.state.description}
									</p>
								</div>
							</div>
						</div>
					</div>
					<hr />
					<div className="card-body">
						<div className="card-title ">
							<h4 className="text-center mb-4">Profile</h4>
							<div className="row">
								{/* primeira coluna */}
								<div className="col-md-6">
									<div className="row">
										<div className="col-6">
											<h6 className="float-right">
												Height:
											</h6>
										</div>
										<div className="col-6">
											<h6 className="float-left">
												{this.state.height} cm
											</h6>
										</div>
										<div className="col-6">
											<h6 className="float-right">
												Weight:
											</h6>
										</div>
										<div className="col-6">
											<h6 className="float-left">
												{this.state.weight} Kgs
											</h6>
										</div>
										<div className="col-6">
											<h6 className="float-right">
												Catch Rate:
											</h6>
										</div>
										<div className="col-6">
											<h6 className="float-left">
												{this.state.catchRate} %
											</h6>
										</div>
										<div className="col-6">
											<h6 className="float-right">
												Gender Ratio:
											</h6>
										</div>
										<div className="col-6">
											<div className="progress">
												<div
													className="progress-bar"
													role="progressbar"
													style={{
														width: `${this.state.genderRatioFemale}%`,
														backgroundColor:
															"#c2185b",
													}}
													aria-valuenow="15"
													aria-valuemin="0"
													aria-valuemax="100"
												>
													<small>
														{
															this.state
																.genderRatioFemale
														}
													</small>
												</div>
												<div
													className="progress-bar"
													role="progressbar"
													style={{
														width: `${this.state.genderRatioMale}%`,
														backgroundColor:
															"#1976d2",
													}}
													aria-valuenow="30"
													aria-valuemin="0"
													aria-valuemax="100"
												>
													<small>
														{
															this.state
																.genderRatioMale
														}
													</small>
												</div>
											</div>
										</div>
									</div>
									{/* segunda coluna */}
								</div>
								<div className="col-md-6">
									<div className="row">
										<div className="col-6">
											<h6 className="float-right">
												Egg Groups:
											</h6>
										</div>
										<div className="col-6">
											<h6 className="float-left text-capitalize">
												{this.state.eggGroups}{" "}
											</h6>
										</div>
										<div className="col-6">
											<h6 className="float-right">
												Hatch Steps:
											</h6>
										</div>
										<div className="col-6">
											<h6 className="float-left">
												{this.state.hatchSteps}
											</h6>
										</div>
										<div className="col-6">
											<h6 className="float-right">
												Abilities:
											</h6>
										</div>
										<div className="col-6">
											<h6 className="float-left text-capitalize">
												{this.state.abilities}
											</h6>
										</div>
										<div className="col-6">
											<h6 className="float-right">
												EVs:
											</h6>
										</div>
										<div className="col-6">
											<h6
												className="float-left"
												style={{
													textAlign:
														"left !important",
												}}
											>
												{this.state.evs}
											</h6>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="card-footer text-muted poke-footer">
						<div className="row">
							<div className="col-md-6 col-12 container d-flex h-100 justify-content-center">
								<p className="pt-3">
									Data from{" "}
									<a
										href="https://pokeapi.co"
										target="_blank"
										className="card-link"
										rel="noopener noreferrer"
									>
										PokeApi
									</a>
								</p>
							</div>
							<div className="col-md-6">
								<div className="row">
									{/* para o primeiro pokemon, o botão previous nao aparece, somente a partir do segundo pokemon */}
									<div className="col-md-4 d-flex justify-content-center">
										{this.state.pokemonIndex >= 2 ? (
											<Link to={`${this.state.prev}`}>
												<Button
													className="mx-auto"
													onClick="window.location.reload();"
													style={{
														transform:
															"translateX(0%)",
													}}
												>
													Previous
												</Button>
											</Link>
										) : null}
									</div>
									<div className="col-md-4">
										<Link to="/">
											<Button
												className=""
												style={{
													transform: "translateX(0%)",
												}}
											>
												Back Home
											</Button>
										</Link>
									</div>
									<div className="col-md-4">
										<Link to={`${this.state.next}`}>
											<Button
												className=""
												onClick="window.location.reload();"
												style={{
													transform: "translateX(0%)",
												}}
											>
												Next
											</Button>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const Button = styled.button`
	background-color: rgb(239, 83, 80);
	color: #fff;
	border: none;
	border-radius: 5px;
	padding: 5px 0;
	transition: all 0.3s;
	margin: 0.5rem;
	width: 8rem;
	font-size: 1rem;

	&:hover {
		background-color: rgba(239, 83, 80, 0.8);
	}
`;
