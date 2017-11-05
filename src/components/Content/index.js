import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Content extends Component {
    constructor() {
        super()
        this.state = {
            personalForm: null
        }
    }
    async componentDidMount() {
        const {default: Personal} = await import('../PersonalForm');
        this.setState({
            personalForm: <Personal />
        })
    }
    render() {
        return (
            <div>
                {this.props.activeForm === 1 && this.state.personalForm}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    activeForm: state.stepForm.activeForm
  }
}

export default connect(mapStateToProps)(Content);