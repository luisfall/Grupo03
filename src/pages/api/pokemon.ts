import { NextApiRequest, NextApiResponse } from "next";
import bodyParser from "body-parser";
import helmet from "helmet";
import { check, validationResult } from 'express-validator';
import { GiphyFetch } from "@giphy/js-fetch-api";

const giphyFetch = new GiphyFetch("z3c3q45cNAYqpVcu7BGbUWLsxAlJCGEk"); //instance

// Configura el middleware bodyParser para analizar el cuerpo de la solicitud
const jsonParser = bodyParser.json();

// Crea el validador
const validatePokemon = [
  check('pokemon').isString().notEmpty()
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Utiliza el middleware Helmet para agregar medidas de seguridad
  helmet()(req, res, async () => {
    // Utiliza el middleware bodyParser para analizar el cuerpo de la solicitud
    jsonParser(req, res, async () => {
      // Ejecuta el validador
      await Promise.all(validatePokemon.map(validation => validation.run(req)));

      // Verifica si hay errores en el validador
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const pokemonName = req.query.pokemon as string;

      const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

      const pokemonResponse = await fetch(pokemonUrl);
      const pokemonData = await pokemonResponse.json();

      const pokemonType = pokemonData.types.map((type: any) => type.type.name);

      const generationUrl =
        pokemonData.game_indices[pokemonData.game_indices.length - 1].version.url;
      const generationResponse = await fetch(generationUrl);
      const generationData = await generationResponse.json();
      const pokemonGeneration = generationData.name;

      const { data: gifs } = await giphyFetch.search(`Pokemon ${pokemonData.name}`, {
        limit: 5,
      });

      return res.status(200).json({
        name: pokemonData.name,
        weight: pokemonData.weight,
        height: pokemonData.height,
        type: pokemonType,
        generation: pokemonGeneration,
        baseExperience: pokemonData.baseExperience,
        gifUrls: gifs.map((gif) => gif.images.original.url), //urls
      });
    });
  });
}
