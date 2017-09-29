/**
 * @module: Project Entry
 * @description: The entry point for the  UI javascript compiler
 * @developer: Zouhir Chahoud - 11763745
 */

/**
 * Open Source Libraries used:
 * Preact: Jason Miller - https://github.com/developit/preact
 * Preact-habitat: Zouhir Chahoud
 */

import { h, Component } from 'preact' 
import habitat from 'preact-habitat'

import Map from './components/map'
import CardList from './components/card-list'

class Page extends Component {
  state = {
    tweets: []
  }
  componentDidMount() {
    socket.on('tweet', (response) => {
      let tweets = this.state.tweets
      tweets.push(response)
      console.log(response);
      this.setState({tweets:tweets.reverse()})
    });
  }
  render () {
    return (
      <div>
        <Map tweets={this.state.tweets} />
        <CardList tweets={this.state.tweets} />
      </div>      
    )
  }
}

let _habitat = habitat(Page)

_habitat.render({
  inline: true
})
