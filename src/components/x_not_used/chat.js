import React from 'react'
import {connect} from 'react-redux'

class Chat extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div className="chatComponent">
        <h1> Welcome to chat </h1>
        <div className="chatBox">
          <h3>it's a great day!</h3>
          <p> just go in the sun with the person next to you and chat</p>
        </div>
        <div className="newChat">
          <textarea
            name="chat"
            onChange={this.handleChange}
            className="ChatNewTextArea"
            defaultValue={this.props.bio}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = function(state) {
  return {}
}

export default connect(mapStateToProps)(Chat)
