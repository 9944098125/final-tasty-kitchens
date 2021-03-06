import {Link} from 'react-router-dom'

import './index.css'

import {ImStarFull} from 'react-icons/im'

const RestaurantItem = props => {
  const {restaurantData} = props
  const {id, name, imageUrl, cuisine, userRating} = restaurantData

  return (
    <Link to={`/restaurant/${id}`} className="restaurant-link-item">
      <li testid="restaurant-item" className="restaurant-item">
        <img src={imageUrl} alt="restaurant" className="restaurant-image" />
        <div>
          <h1 className="name">{name}</h1>
          <p className="cuisine">{cuisine}</p>
          <div className="rating-container">
            <ImStarFull className="star" />
            <h2 className="rating">{userRating.rating}</h2>
          </div>
        </div>
      </li>
    </Link>
  )
}
export default RestaurantItem
