import React, { Component } from "react";
import styled from "styled-components";
import spinner from "./loading/loadinggif.gif";
import { Link } from "react-router-dom";

export default class PokemonCard extends Component {
	state = {
		name: "",
		imageUrl: "",
		pokemonIndex: "",
		imageLoading: true,
		toManyRequests: false,
	};

	componentDidMount() {
		const { name, url } = this.props;
		const pokemonIndex = url.split("/")[url.split("/").length - 2];
		// console.log(pokemonIndex);
		const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`;

		this.setState({ name, imageUrl, pokemonIndex });
	}

	render() {
		return (
			<div className="col-lg-3 col-md-4 col-sm-6 mb-5">
				<StyledLink to={`pokemon/${this.state.pokemonIndex}`}>
					<Card className="card">
						<h5 className="card-header">
							#{this.state.pokemonIndex}
						</h5>
						{this.state.imageLoading ? (
							<img
								src={spinner}
								style={{ width: "5em", height: "5em" }}
								className="card-img-top rounded mx-auto d-block mt-2"
							/>
						) : null}
						<Sprite
							className="card-img-top rounded mx-auto mt-2"
							src={this.state.imageUrl}
							alt={this.state.name}
							onLoad={() =>
								this.setState({ imageLoading: false })
							}
							onError={() =>
								this.setState({ toManyRequests: true })
							}
							style={
								this.state.toManyRequests
									? { display: "none" }
									: this.state.imageLoading
									? null
									: { display: "block" }
							}
						/>
						{this.state.toManyRequests ? (
							<h6 className="mx-auto">
								<span className="badge badge-danger mt-2">
									To Many Requests
								</span>
							</h6>
						) : null}

						<div className="card-body mx-auto">
							<h6
								className="card-title text-capitalize"
								style={{ fontSize: "1.5rem" }}
							>
								{this.state.name}
							</h6>
						</div>
					</Card>
				</StyledLink>
			</div>
		);
	}
}

const Sprite = styled.img`
	width: 8em;
	height: 8em;
	display: none;
`;

const Card = styled.div`
	box-shadow: 0 1px 3px rgba(239, 83, 80, 0.2),
		0 1px 2px rgba(239, 83, 80, 0.3);
	transition: all 0.3s;

	&:hover {
		box-shadow: 0 14px 28px rgba(239, 83, 80, 0.2),
			0 10px 10px rgba(239, 83, 80, 0.3);
		color: rgba(239, 83, 80, 1);
		transform: scale(1.1);
	}
	img {
		transition: all 0.3s ease-in-out;
	}
	img:hover {
		transform: scale(1.2);
	}

	-moz-user-select: none;
	-website-user-select: none;
	user-select: none;
`;

const StyledLink = styled(Link)`
	text-decoration: none;
	color: #000;
	&:focus,
	&:hover,
	&:visited,
	&:link,
	&:active {
		text-decoration: none;
	}
`;
