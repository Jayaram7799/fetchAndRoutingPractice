import {Component} from 'react'
import Loader from 'react-loader-spinner'

import BlogItem from '../BlogItem'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class BlogList extends Component {
  state = {
    isLoading: true,
    blogList: [],
  }

  componentDidMount() {
    this.getBlogsData()
  }

  getBlogsData = async () => {
    const apiUrl = 'https://apis.ccbp.in/blogs'
    const response = await fetch(apiUrl)
    const data = await response.json()
    const formattedData = data.map(eachItem => ({
      id: eachItem.id,
      title: eachItem.title,
      imageUrl: eachItem.image_url,
      avatarUrl: eachItem.avatar_url,
      author: eachItem.author,
      topic: eachItem.topic,
    }))

    this.setState({
      isLoading: false,
      blogList: formattedData,
    })
  }

  renderBlogList = () => {
    const {blogList} = this.state
    return (
      <ul className="blog-list">
        {blogList.map(each => (
          <BlogItem blogData={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderIsLoading = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <div className="blog-list-container">
        {isLoading ? this.renderIsLoading() : this.renderBlogList()}
      </div>
    )
  }
}

export default BlogList
