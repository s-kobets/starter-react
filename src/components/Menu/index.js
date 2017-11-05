import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as storeActions } from './ducks'

class Menu extends PureComponent {
  onActive = (e) => {
    const value = e.target.getAttribute('data-list')
    this.props.actions.setActiveForm(Number(value))
  }

  render() {
    const {listForm, activeForm} = this.props

    return (
      <ul>
        {listForm && listForm.map((item, index) => {
          return <li className={activeForm === 1 ? 'active' : ''} key={`${index}-menu-button`}>
              <button onClick={this.onActive} data-list={index + 1}>{item}</button>
            </li>
        })}
      </ul>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    listForm: state.stepForm.listForm,
    activeForm: state.stepForm.activeForm
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(storeActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu); 
