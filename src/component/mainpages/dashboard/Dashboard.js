import React, {Component} from 'react'
import {connect} from 'react-redux'

import * as actions from '../../../actions'
import HeaderMain from '../headerMain/HeaderMain'

class Dashboard extends Component {
    async componentDidMount () {
        this.props.getSecret()
    }
    render() {
        return(
            <div>
                <HeaderMain />
                Dashboard component
                <br/>
                {/* Our secret: <h2>{this.props.secret}</h2> */}
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log("state: ", state);
    return {
        secret: state.dash.secret
    }
}
    
export default connect(mapStateToProps, actions)(Dashboard)