import { NextApiRequest, NextApiResponse } from "next";
import bodyParser from "body-parser";
import helmet from "helmet";
import { check, validationResult } from 'express-validator';

// Configura el middleware bodyParser para analizar el cuerpo de la solicitud
const jsonParser = bodyParser.json();

// Crea el validador
const validatePokemon = [
  check('pokemon').isString().notEmpty()
];

export default async function listGifs(req: NextApiRequest, res: NextApiResponse) {
  // Utiliza el middleware Helmet para agregar medidas de seguridad
  helmet()(req, res, async () => {
    // Utiliza el middleware bodyParser para analizar el cuerpo de la solicitud
    jsonParser(req, res, async () => {
      if (req.method === 'POST') {
        // Ejecuta el validador
        await Promise.all(validatePokemon.map(validation => validation.run(req)));

        // Verifica si hay errores en el validador
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }

        const { pokemon } = req.body;

        try {
          const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
          const pokemonData = await pokemonResponse.json()

          const typeResponse = await fetch(pokemonData.types[0].type.url)
          const typeData = await typeResponse.json()

          const giphyResponse = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${"z3c3q45cNAYqpVcu7BGbUWLsxAlJCGEk"}&q=Pokemon+${typeData.name}+combat&limit=10`)
          const giphyData = await giphyResponse.json()

          const gifs = giphyData.data.map((gif: any) => gif.images.original.url)

          res.status(200).json({ gifs })

        } catch (error) {
          console.error(error)
          res.status(500).end()
        }
      } else {
        res.status(405).end()
      }
    });
  });
}