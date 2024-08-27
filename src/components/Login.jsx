import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login } from '../redux/slices/authSlice'; // Update with the actual path

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Accessing the state from the Redux store
  const { loginInProgress, error } = useSelector((state) => state.auth);

  // Validation schema for Formik using Yup
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(4, 'Username must be at least 4 characters long')
      .required('Username is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters long')
      .required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const resultAction = await dispatch(login(values));

    if (login.fulfilled.match(resultAction)) {
      navigate('/home');
    }

    setSubmitting(false);
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="username">Username</label>
              <Field
                type="text"
                name="username"
                id="username"
                placeholder="Enter your username"
              />
              <ErrorMessage name="username" component="div" className="error-message" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
              />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>
            <button type="submit" disabled={isSubmitting || loginInProgress}>
              {loginInProgress ? 'Logging in...' : 'Login'}
            </button>
            {error && <div className="error-message">{error}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
