import React from 'react';
import MyInput from '../../MyInput';
import st from './ServiceForm.module.scss';
import Formsy from 'formsy-react'

import { connect } from 'react-redux';
import { addService } from "../../store/actions/services/addService";
import { editService } from "../../store/actions/services/editService";

const errors = {
    isWords: "Не используйте цифры и спец. символы",
    isEmail: 'You have to type a valid email',
    maxLength: 'You cannot type more than 25 characters',
    minLength: 'You must type more than 6 characters',
    isAlpha: 'You can only type letters',
    equalsField: 'Password is not match',
    isStrong: 'Your password is not strong',
    isNumeric: "Введите целое число"
}

class ServiceForm extends React.Component {

    state = {
        title: '',
        time: '',
        price: '',
        canSubmit: false
    };
    handleChange = (e) => {
        const { id, value } = e.target;
        this.setState({ [id]: value });
    }

    addService = () => {
        const data = this.state;
        const { addService } = this.props;
        addService(data);
        this.setState({
            title: '',
            time: '',
            price: ''
        });
    }

    disableButton = () => {
        this.setState({ canSubmit: false })
    }
    enableButton = () => {
        this.setState({ canSubmit: true })
    }
    onSubmitEdit = (model) => {
        const { editService } = this.props;
        model.id = this.props.id;
        const { editToggle } = this.props;
        editToggle();
        editService(model)
        this.setState({ isEdit: false });
    }
    onSubmit = (model) => {
        const { addService } = this.props;
        addService(model);
    }

    handler = (e) => {
        switch (e.target.dataset.type) {
            case "edit":
                this.setState({ isEdit: true });
                break;
            case "delete":
                // DELETE
                break;
            case "cancel":
                const { editToggle } = this.props;
                editToggle();
                this.setState({ isEdit: false });
                break;
            case "confirm":
                this.setState({ isEdit: false });
                break;
            default:
                break;
        }
    }
    render() {
        const { isEdit } = this.props;
        return (
            <>
                <Formsy className='form' onValidSubmit={isEdit ? this.onSubmitEdit : this.onSubmit} onValid={this.enableButton} onInvalid={this.disableButton} className={st.grid}>
                    <MyInput label="Title" type="text" name="title" validations="isWords" validationErrors={errors} placeholder="Введите название..." required />
                    <MyInput label="Duration" type="text" name="time" validations="isNumeric" validationErrors={errors} placeholder="Введите название..." required />
                    <MyInput label="Cost" type="text" name="price" validations="isNumeric" validationErrors={errors} placeholder="Введите название..." required />
                    {isEdit ?
                        <div className={st.flex}>
                            <button type="submit" data-type="confirm" className={st.btn} disabled={!this.state.canSubmit}>
                                ✔
                            </button>
                            <button onClick={this.handler} data-type="cancel" className={st.btn}>❌</button>
                        </div>
                        :
                        <button data-type="cancel" type="submit" className={st.btn} disabled={!this.state.canSubmit}>Add</button>
                    }
                </Formsy>
            </>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        addService: service => dispatch(addService(service)),
        editService: service => dispatch(editService(service)),
    }
}
const ServiceForm_W = connect(null, mapDispatchToProps)(ServiceForm);
export default ServiceForm_W;




