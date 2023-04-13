import GifList from '@/components/ListGifs'
import Pokemon from '@/components/Pokemon'
import React, { Component } from 'react'

export default class Index extends Component {
  state = {
    showPokemon: false,
    showGifList: false
  }

  render() {
    return (
      <div className="flex flex-col text-center items-center  bg-gradient-to-r from-gray-500 via-orange-500 to-white-500  ">
         <h1 className="text-30 pr-30">
          <strong>Choose your rendering </strong>option
        </h1>
      <div className="flex justify-center items-center pl-60 ">
        <button className="bg-gray-300 hover:bg-blue-400 text-gray-800 font-bold py-2 px-4 rounded-l hover:border-purple-500 rounded" onClick={() => this.setState({ showPokemon: true, showGifList: false })}>
          Show Pokemon
        </button>
        <button  className="bg-gray-300 hover:bg-red-400 text-gray-800 font-bold py-2 px-4 rounded-r hover:border-purple-500" onClick={() => this.setState({ showGifList: true, showPokemon: false })}>
          Show Gif List
        </button>
        </div>
        {this.state.showPokemon && <Pokemon />}
        {this.state.showGifList && <GifList />}
      </div>
    )
  }
}