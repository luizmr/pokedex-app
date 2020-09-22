import React, { Component } from "react";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import "bootstrap/js/src/collapse.js";
import PokemonCard from "./PokemonCard";
import spinner from "./loadinggif.gif";
import BackToTop from "react-back-to-top-button";
import { FaArrowUp, FaBars } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import Pikachu from "../../pikachu.png";

export default class PokemonList extends Component {
	state = {
		pokemon: null,
	};

	async componentDidMount() {
		const limit = 807;
		// utilizando a api da PokeApi, ele retorna os dados do pokemon e salva no estado pokemon
		const res = await axios.get(
			`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`
		);
		this.setState({ pokemon: res.data["results"] });
	}

	// para cada geração, existe um limite de pokemons e um offset que define a partir de qual numero a contagem da geração começa
	// logo cada geração tem um limit e um offset diferente
	// cada função assíncrona de cada geração é chamada quando o usuário clica no seu respectivo botão
	// quando o usuário clica, tal função será chamada e carregará os pokemons da geração desejada
	async handleGen0() {
		document.querySelectorAll("Button").forEach((el) => {
			el.classList.remove("activated");
		});
		document.querySelector("#gen0").classList.add("activated");
		const limit = 807;
		const res = await axios.get(
			`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`
		);
		this.setState({ pokemon: res.data["results"] });
	}

	async handleGen1() {
		document.querySelectorAll("Button").forEach((el) => {
			el.classList.remove("activated");
		});
		document.querySelector("#gen1").classList.add("activated");
		const limit = 151;
		const offset = 0;
		const res = await axios.get(
			`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
		);
		console.log(res);
		this.setState({ pokemon: res.data["results"] });
	}

	async handleGen2() {
		document.querySelectorAll("Button").forEach((el) => {
			el.classList.remove("activated");
		});
		document.querySelector("#gen2").classList.add("activated");
		const limit = 100;
		const offset = 151;
		const res = await axios.get(
			`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
		);
		console.log(res);
		this.setState({ pokemon: res.data["results"] });
	}

	async handleGen3() {
		document.querySelectorAll("Button").forEach((el) => {
			el.classList.remove("activated");
		});
		document.querySelector("#gen3").classList.add("activated");
		const limit = 135;
		const offset = 251;
		const res = await axios.get(
			`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
		);
		console.log(res);
		this.setState({ pokemon: res.data["results"] });
	}

	async handleGen4() {
		document.querySelectorAll("Button").forEach((el) => {
			el.classList.remove("activated");
		});
		document.querySelector("#gen4").classList.add("activated");
		const limit = 107;
		const offset = 386;
		const res = await axios.get(
			`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
		);
		console.log(res);
		this.setState({ pokemon: res.data["results"] });
	}

	async handleGen5() {
		document.querySelectorAll("Button").forEach((el) => {
			el.classList.remove("activated");
		});
		document.querySelector("#gen5").classList.add("activated");
		const limit = 155;
		const offset = 493;
		const res = await axios.get(
			`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
		);
		console.log(res);
		this.setState({ pokemon: res.data["results"] });
	}

	async handleGen6() {
		document.querySelectorAll("Button").forEach((el) => {
			el.classList.remove("activated");
		});
		document.querySelector("#gen6").classList.add("activated");
		const limit = 72;
		const offset = 649;
		const res = await axios.get(
			`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
		);
		console.log(res);
		this.setState({ pokemon: res.data["results"] });
	}

	async handleGen7() {
		document.querySelectorAll("Button").forEach((el) => {
			el.classList.remove("activated");
		});
		document.querySelector("#gen7").classList.add("activated");
		const limit = 86;
		const offset = 721;
		const res = await axios.get(
			`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
		);
		console.log(res);
		this.setState({ pokemon: res.data["results"] });
	}

	// função referente ao menu hamburguer quando é clicado para abrir e fechar
	handleFa() {
		if (
			document
				.querySelector(".button-tog")
				.classList.contains("collapsed")
		) {
			document.getElementById("bars").classList.remove("clicked");
			document.getElementById("x").classList.add("clicked");
		} else {
			document.getElementById("bars").classList.add("clicked");
			document.getElementById("x").classList.remove("clicked");
		}
	}

	render() {
		return (
			<>
				<div className="mb-5">
					<nav className="navbar navbar-expand-xl navbar-dark bg-dark fixed-top">
						<img
							src={Pikachu}
							alt="pokedex"
							style={{ width: "40px" }}
						/>
						<a
							className="navbar-brand col-sm-3 col-md-1 mr-4 align-items-center w-25"
							href="/"
						>
							Pokedex
						</a>
						<button
							className="navbar-toggler button-tog"
							type="button"
							data-toggle="collapse"
							data-target="#navbarTogglerDemo02"
							aria-controls="navbarTogglerDemo02"
							aria-expanded="false"
							aria-label="Toggle navigation"
							id="btn-toggler"
							onClick={this.handleFa.bind(this)}
						>
							<FaBars
								style={{
									color: "rgb(239, 83, 80)",
									transform: "scale(1.3)",
									margin: "5px",
									transition: "all 0.3s ease-in-out",
								}}
								id="bars"
								className=""
							/>

							<FiX
								style={{
									color: "rgb(239, 83, 80)",
									transform: "scale(1.3)",
									margin: "5px",
									transition: "all 0.3s ease-in-out",
								}}
								id="x"
								className="clicked"
							/>
						</button>
						<div
							className="collapse navbar-collapse"
							id="navbarTogglerDemo02"
						>
							<ul class="navbar-nav ml-5">
								<li class="nav-item active">
									<Button
										onClick={this.handleGen0.bind(this)}
										id="gen0"
									>
										All Generations
									</Button>
								</li>
								<li class="nav-item active">
									<Button
										onClick={this.handleGen1.bind(this)}
										id="gen1"
									>
										Generation I
									</Button>
								</li>
								<li class="nav-item active">
									<Button
										onClick={this.handleGen2.bind(this)}
										id="gen2"
									>
										Generation II
									</Button>
								</li>
								<li class="nav-item active">
									<Button
										onClick={this.handleGen3.bind(this)}
										id="gen3"
									>
										Generation III
									</Button>
								</li>
								<li class="nav-item active">
									<Button
										onClick={this.handleGen4.bind(this)}
										id="gen4"
									>
										Generation IV
									</Button>
								</li>
								<li class="nav-item active">
									<Button
										onClick={this.handleGen5.bind(this)}
										id="gen5"
									>
										Generation V
									</Button>
								</li>
								<li class="nav-item active">
									<Button
										onClick={this.handleGen6.bind(this)}
										id="gen6"
									>
										Generation VI
									</Button>
								</li>
								<li class="nav-item active">
									<Button
										onClick={this.handleGen7.bind(this)}
										id="gen7"
									>
										Generation VII
									</Button>
								</li>
							</ul>
						</div>
					</nav>
				</div>
				<ToTop showAt={100} speed={1500} easing="easeInOutQuint">
					<span>
						<Arrow
							style={{
								color: "rgb(239, 83, 80)",
								backgroundColor: "#fff",
								padding: "5px",
							}}
							className="rounded"
						/>{" "}
					</span>
				</ToTop>

				{/* map do estado pokemon que contem todas as informações dos pokemons de cada geração ou todas gerações */}
				{/* enquanto a função assíncrona não obtém sua resposta completa, um loading aparece na tela para indicar que os dados estão sendo carregados */}
				{this.state.pokemon ? (
					<div className="row">
						{this.state.pokemon.map((pokemon) => (
							<PokemonCard
								key={pokemon.name}
								name={pokemon.name}
								url={pokemon.url}
							/>
						))}
					</div>
				) : (
					<img
						src={spinner}
						style={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%) scale(2)",
						}}
						alt="spinner"
					/>
				)}
			</>
		);
	}
}

const Button = styled.button`
	background: transparent;
	color: #fff;
	border: none;

	padding: 5px 0;

	margin: 0.5rem;
	width: 8rem;
	font-size: 1rem;
	transition: all 0.3s ease-in-out;

	&:hover {
		transform: scale(1.1);
	}
	&.activated {
		transform: scale(1.2);
	}
	&.activated:after {
		display: block;
		content: "";
		border-bottom: 2px solid #fff;
		transform: scaleX(1);
	}

	&:after {
		display: block;
		content: "";
		border-bottom: 2px solid #fff;
		transform: scaleX(0);
		transition: transform 0.3s ease-in-out;
	}
	&:hover:after {
		transform: scaleX(1);
	}

	&:focus,
	&:active {
		outline: none !important;
	}
`;

const bouncing = keyframes`0% {
	transform: translateY(5px); 
}
50% {
	transform: translateY(-5px);
}
100% {
	transform: translateY(5px);
}`;

const ToTop = styled(BackToTop)`
	opacity: 1;
	&:focus,
	&:active {
		outline: none !important;
	}
`;

const Arrow = styled(FaArrowUp)`
	animation: 1s ${bouncing} infinite;
	transition: 0.3s all ease-in-out;
	&:active,
	&:focus {
		outline: none !important;
	}
	&:hover {
		box-shadow: 0 0 10px #fff, 0 0 20px #fff;
	}
`;
