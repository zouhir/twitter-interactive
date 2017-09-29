/**
 * @module: UI Component
 * @name: CardList
 * @description: Twitter card column with tweets, group color and count
 * 
 * @developer: Zouhir Chahoud - 11763745
 */

import {h, Component} from 'preact';
import style from './style'

export default class CardList extends Component {
  
  render() {
    return (
      <div className={style.list}>
        {
          this.props.tweets.map(tweet => (
            <div className={`${style.card} ${style[tweet.type]}`}>
              <h5 className={style.user}>{tweet.name}</h5>
              <h6>({tweet.user})</h6>
              <div className={style.tweetBody}>
                {tweet.text}
              </div>
            </div>
          ))
        }
      </div>
    )
  }
}