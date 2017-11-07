import React, { PureComponent } from 'react';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as storeActions } from './ducks'

// Инпут "Имя" (валидация на A-Za-z, не пустое); 
// 2) Инпут возраст (валидация на 0-9, не пустое);
//  3) Чекбокс "мне есть 18 лет" (валидация должен быть нажат);
//  4) Кнопка "Далее".
const required = (value) => (value ? undefined : 'Required')
const nameValidate = (value) => value && /[^A-Za-z]$/i.test(value) ? 'Latin letters' : undefined
const checked = (value) => value && value ? undefined : 'Required'

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
)

const mapStateToProps = (state) => {
  return {
    values: getFormValues('personalForm')(state),
    activeForm: state.stepForm.activeForm
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(storeActions, dispatch)
  }
}

@reduxForm({
  form: 'personalForm',
  enableReinitialize: true
})

@connect(mapStateToProps, mapDispatchToProps)

export default class PersonalForm extends PureComponent {
  mySubmit = (e) => {
    e.preventDefault()
    const {invalid, actions} = this.props
    console.log(1235, this.props.values)
    if (!invalid) {
      actions.setActiveForm(2)
    }
  }

  render() {
		return (
			<div>
        <form onSubmit={this.mySubmit}>
        <Field name='name' component={renderField} type='text' validate={[required, nameValidate]} />
          <Field name='age' component={renderField} type='number' validate={[required]} />
          <label>Мне есть 18 <Field name='age18' component={renderField} type='checkbox' validate={[checked]} /></label>
          <button type='submit'>Далее</button>
        </form>
			</div>
		);
	}
};
