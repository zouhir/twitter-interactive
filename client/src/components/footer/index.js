import {h, Component} from 'preact';

import style from './style'

export default class CardList extends Component {

  render() {
    return (
      <div className={style.footer}>
        <h3>Zouhir Chahoud</h3>
        <h4>11763745</h4>
        <h4>Interactive Media</h4>
      </div>
    )
  }
}