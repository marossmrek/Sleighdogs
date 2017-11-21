import React from 'react';
import { Field, reduxForm } from 'redux-form';

import TextField from 'material-ui/TextField';

const validate = values => {
    const errors = {};
    if (!values.video) {
        errors.video = 'Cannot submit empty'
    }
    return errors
};

const renderTextField = (
    { input, label, meta: { touched, error }},
) => (
    <TextField
        fullWidth={true}
        hintText={label}
        errorStyle={{textAlign: "left"}}
        errorText={touched && error}
        {...input}
    />
);


const ReduxSearchField = props => {
    const { handleSubmit } = props;
    return (
        <form className="search-field" onSubmit={handleSubmit}>
            <div>
                <Field
                    name="video"
                    component={renderTextField}
                    label="Search video"
                />
            </div>
        </form>
    );
};

export default reduxForm({
    form: 'ReduxSearchField',
    validate
})(ReduxSearchField);
