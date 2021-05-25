import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Tag, message, Image, Spin, Alert } from "antd";
import {
  EditFilled,
  LockFilled,
  SaveFilled,
  CaretLeftOutlined,
} from "@ant-design/icons";
import { Form as FinalForm, Field } from "react-final-form";
import isEmpty from "lodash.isempty";
import { useDispatch, useSelector } from "react-redux";
import { usersAPI } from "./../../api/api";
import defaultUser from "./../../assets/images/default-user.png";
import "./UserProfile.scss";
import { userAuthActions } from "./../../redux/actions/actionCreator";

export default function UserProfile() {
  const router = useHistory();
  const [initialValues, setInitialValues] = useState({});
  const [submissionErrors, setSubmissionErrors] = useState({});
  const userState = useSelector((st) => st.user);
  const [editing, setEditing] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      if (userState && userState.user && userState.user.id) {
        try {
          const { data: res } = await usersAPI.getOne(userState.user.id);
          setInitialValues(res);
          setErrorMsg(null);
        } catch (error) {
          setInitialValues({});
          setErrorMsg("Error loading user profile");
          console.log("Error retrieving user data...", error);
        }
      } else {
        message.error("An error occured while retrieving user ID");
        router.push("/");
      }
    })();
  }, []);

  const checkValidation = (values) => {
    const errors = {};
    if (editing && !values.userName?.trim()) {
      errors.userName = "Please enter the userName";
    }
    if (editingPassword && !values.oldPassword?.trim()) {
      errors.password = "Please enter the old password";
    }
    if (editingPassword && !values.password?.trim()) {
      errors.password = "Please enter the password";
    }
    if (editingPassword && !values.confirmPassword?.trim()) {
      errors.confirmPassword = "Please enter the password confirmation";
    } else if (editingPassword && values.confirmPassword !== values.password) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (editing && !values.email?.trim()) {
      errors.email = "Please enter the email";
    }
    return errors;
  };

  const onSubmit = async (event) => {
    setSubmissionErrors([]);
    try {
      await usersAPI.update({ user: event });
      dispatch(userAuthActions.updateUser(event));
      message.success("User profile updated successfully");
      setEditing(false);
      setEditingPassword(false);
      setInitialValues(event);
    } catch (error) {
      console.log("Error updating user profile..", error.response ?? error);
      if (error.response && error.response.data) {
        setSubmissionErrors(error.response.data);
      } else setSubmissionErrors({ err: "Profile update error" });
    }
  };

  return (
    <div>
      <div className="user-profile">
        {errorMsg ? (
          <div className="loader-container">
            <Alert message={errorMsg} type="error" />
          </div>
        ) : Object.keys(initialValues).length === 0 ? (
          <div className="loader-container">
            <Spin size="large" />
          </div>
        ) : (
          <>
            <h2 className="centered-text ">
              {initialValues.userName}'s Profile
            </h2>
            <div className="user-image centered-text ">
              <Image
                className="image"
                src={initialValues.imagePath ?? defaultUser}
              />
            </div>
            <div className="user-info">
              <FinalForm
                initialValues={initialValues}
                validate={checkValidation}
                onSubmit={onSubmit}
                render={({ handleSubmit, submitting, form }) => (
                  <form className="form" onSubmit={handleSubmit}>
                    <Form.Item
                      label="UserName"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                    >
                      <Field name="userName">
                        {({ input, meta }) => (
                          <div>
                            <Input
                              {...input}
                              name="userName"
                              readOnly={!editing}
                              className={!editing && "disabled"}
                            />
                            {meta.touched && meta.error && (
                              <Tag color="error">{meta.error}</Tag>
                            )}
                          </div>
                        )}
                      </Field>
                    </Form.Item>

                    <Form.Item label="Email" labelCol={{ span: 24 }}>
                      <Field name="email">
                        {({ input, meta }) => (
                          <div>
                            <Input
                              {...input}
                              name="email"
                              readOnly={!editing}
                              className={!editing && "disabled"}
                            />
                            {meta.touched && meta.error && (
                              <Tag color="error">{meta.error}</Tag>
                            )}
                          </div>
                        )}
                      </Field>
                    </Form.Item>
                    <Form.Item label="Summary" labelCol={{ span: 24 }}>
                      <Field name="summary">
                        {({ input, meta }) => (
                          <div>
                            <Input
                              {...input}
                              value={
                                !initialValues.summary && !editing
                                  ? "No content"
                                  : initialValues.summary
                              }
                              name="summary"
                              readOnly={!editing}
                              className={!editing && "disabled"}
                            />
                            {meta.touched && meta.error && (
                              <Tag color="error">{meta.error}</Tag>
                            )}
                          </div>
                        )}
                      </Field>
                    </Form.Item>
                    {editing && (
                      <Form.Item label="Image URL" labelCol={{ span: 24 }}>
                        <Field name="imagePath">
                          {({ input, meta }) => (
                            <div>
                              <Input {...input} name="imagePath" />
                              {meta.touched && meta.error && (
                                <Tag color="error">{meta.error}</Tag>
                              )}
                            </div>
                          )}
                        </Field>
                      </Form.Item>
                    )}

                    {editingPassword && (
                      <>
                        <Form.Item label="Old Password" labelCol={{ span: 24 }}>
                          <Field name="oldPassword">
                            {({ input, meta }) => (
                              <div>
                                <Input.Password
                                  {...input}
                                  name="oldPassword"
                                  className="no-radius"
                                />
                                {meta.touched && meta.error && (
                                  <Tag color="error">{meta.error}</Tag>
                                )}
                              </div>
                            )}
                          </Field>
                        </Form.Item>
                        <Form.Item label="Password" labelCol={{ span: 24 }}>
                          <Field name="password">
                            {({ input, meta }) => (
                              <div>
                                <Input.Password {...input} name="password" />
                                {meta.touched && meta.error && (
                                  <Tag color="error">{meta.error}</Tag>
                                )}
                              </div>
                            )}
                          </Field>
                        </Form.Item>
                        <Form.Item
                          label="Confirm Password"
                          labelCol={{ span: 24 }}
                        >
                          <Field name="confirmPassword">
                            {({ input, meta }) => (
                              <div>
                                <Input.Password
                                  {...input}
                                  name="confirmPassword"
                                />
                                {meta.touched && meta.error && (
                                  <Tag color="error">{meta.error}</Tag>
                                )}
                              </div>
                            )}
                          </Field>
                        </Form.Item>
                      </>
                    )}

                    {!isEmpty(submissionErrors) && (
                      <div>
                        {Object.entries(submissionErrors).map(
                          ([key, value]) => (
                            <Tag color="error" className="full-width" key={key}>
                              {value}
                            </Tag>
                          )
                        )}
                      </div>
                    )}

                    <div className="buttons-wrapper-horizontal m-auto">
                      {!(editing || editingPassword) && (
                        <>
                          <Button
                            htmlType="button"
                            type="primary"
                            icon={<EditFilled />}
                            onClick={() => {
                              setEditing(true);
                              setEditingPassword(false);
                            }}
                          >
                            Edit Profile
                          </Button>
                          <Button
                            htmlType="button"
                            type="primary"
                            icon={<LockFilled />}
                            onClick={() => {
                              setEditing(false);
                              setEditingPassword(true);
                            }}
                          >
                            Edit Password
                          </Button>
                        </>
                      )}

                      {(editing || editingPassword) && (
                        <>
                          <Button
                            disabled={submitting}
                            htmlType="submit"
                            type="primary"
                            icon={<SaveFilled />}
                          >
                            Submit
                          </Button>
                          <Button
                            htmlType="button"
                            type="primary"
                            icon={<CaretLeftOutlined />}
                            onClick={() => {
                              setEditing(false);
                              setEditingPassword(false);
                              form.reset();
                            }}
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                    </div>
                  </form>
                )}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
