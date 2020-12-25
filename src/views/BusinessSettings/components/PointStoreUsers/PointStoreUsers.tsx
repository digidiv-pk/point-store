import clsx from 'clsx';
import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { API } from 'utility';
import icons from '../../../../assets/icons';
import { Loading } from '../../../../components';
import { ConfirmDialogue } from '../../../../components/ConfirmDialogue';
import { AuthContext, LanguageContext } from '../../../../context';
import { UserRoles } from '../../../../shared/enum';
import { UserInterface } from '../../../../shared/interface';
import classes from './PointStoreUsers.module.scss';

function PointStoreUsers(): JSX.Element {
  const context = useContext(AuthContext.Context);
  const languageContext = useContext(LanguageContext.Context);
  const [showForm, setShowForm] = useState<'add' | 'edit' | null>(null);
  const [userToDelete, setUserToDelete] = useState<string>('');
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [loading, setLoading] = useState<string[]>([]);
  const [userForm, setUserForm] = useState<{
    id?: string;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
  }>({
    firstName: '',
    lastName: '',
    password: '',
    email: '',
  });

  const getUsers = () => {
    setLoading((state) => {
      return [...state, ''];
    });
    API.Store.users()
      .then((response) => {
        setLoading((state) => {
          const newState = [...state];
          newState.pop();
          return newState;
        });
        setUsers(response.data);
      })
      .catch((error) => {
        setLoading((state) => {
          const newState = [...state];
          newState.pop();
          return newState;
        });
        console.error(error.response);
      });
  };
  const addUser = () => {
    setLoading((state) => {
      return [...state, ''];
    });
    API.Store.addUser(userForm)
      .then((response) => {
        console.log(response);
        setLoading((state) => {
          const newState = [...state];
          newState.pop();
          return newState;
        });
        setUserForm({
          firstName: '',
          lastName: '',
          password: '',
          email: '',
        });
        setShowForm(null);
        getUsers();
      })
      .catch((error) => {
        if (error.status === 400) {
          toast.error('User Already Exist');
        }
        setLoading((state) => {
          const newState = [...state];
          newState.pop();
          return newState;
        });
        console.error(error.response);
      });
  };

  const updateUser = () => {
    setLoading((state) => {
      return [...state, ''];
    });
    API.Auth.update({ id: userForm.id as string }, { ...userForm })
      .then(() => {
        setLoading((state) => {
          const newState = [...state];
          newState.pop();
          return newState;
        });
        setUserForm({
          id: '',
          firstName: '',
          lastName: '',
          password: '',
          email: '',
        });
        setShowForm(null);
        getUsers();
      })
      .catch((error) => {
        setLoading((state) => {
          const newState = [...state];
          newState.pop();
          return newState;
        });
        console.error(error.response);
      });
  };
  const addOrUpdateUser = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (showForm === 'add') {
      addUser();
    } else if (showForm === 'edit') {
      updateUser();
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setUserForm((state) => {
      return {
        ...state,
        [event.target.name]: event.target.value,
      };
    });
  };

  const onUpdateSuspend = (id: string, suspended: boolean) => {
    setLoading((state) => {
      return [...state, ''];
    });
    API.Auth.update({ id }, { suspended })
      .then((response) => {
        console.log(response);
        setLoading((state) => {
          const newState = [...state];
          newState.pop();
          return newState;
        });
        getUsers();
      })
      .catch((error) => {
        setLoading((state) => {
          const newState = [...state];
          newState.pop();
          return newState;
        });
        console.error(error.response);
      });
  };

  const onAddUser = () => {
    setUserForm({
      id: '',
      firstName: '',
      lastName: '',
      password: '',
      email: '',
    });
    setShowForm('add');
  };

  const onEditUser = (user: UserInterface) => {
    setUserForm({
      id: user.id,
      email: user.email as string,
      firstName: user.firstName as string,
      lastName: user.lastName as string,
      password: '',
    });
    setShowForm('edit');
  };

  const onConfirmDeleteUser = () => {
    setLoading((state) => {
      return [...state, ''];
    });
    API.Auth.delete(userToDelete)
      .then((response) => {
        console.log(response);
        setLoading((state) => {
          const newState = [...state];
          newState.pop();
          return newState;
        });
        setUserToDelete('');
        getUsers();
      })
      .catch((error) => {
        setLoading((state) => {
          const newState = [...state];
          newState.pop();
          return newState;
        });
        console.error(error.response);
      });
  };

  const onDeleteUser = (id: string) => {
    setUserToDelete(id);
  };
  return (
    <section className={classes.section}>
      {!!loading.length && <Loading />}

      {!!userToDelete && (
        <ConfirmDialogue
          text={{
            en: 'are you sure you want to delete this user?',
            he: 'בטוח שאתה רוצה למחוק את המשתמש?',
          }}
          cancelText={{ en: 'No', he: 'לא' }}
          confirmText={{ en: 'Yes', he: 'כן' }}
          onConfirm={onConfirmDeleteUser}
          onHide={() => setUserToDelete('')}
          cancelBtnClassName="btn-secondary"
          confirmBtnClassName="btn-danger"
        />
      )}

      <div className="card">
        <div className="card-header">
          <div className="clearfix w-100">
            <div
              className={clsx({
                'float-left': languageContext.state.direction === 'ltr',
                'float-right': languageContext.state.direction === 'rtl',
              })}>
              {languageContext.state.lang === 'en' && <>Users</>}
              {languageContext.state.lang === 'he' && <>תפקידי ניהול</>}
            </div>
            <div
              className={clsx({
                'float-left': languageContext.state.direction === 'rtl',
                'float-right': languageContext.state.direction === 'ltr',
              })}>
              {showForm !== 'add' && (
                <img src={icons.addIcon} onClick={onAddUser} className="add-btn" alt="edit icon" />
              )}
              {(showForm === 'add' || showForm === 'edit') && (
                <span
                  className="material-icons"
                  style={{
                    cursor: 'pointer',
                    verticalAlign: 'middle',
                    fontSize: '20px',
                  }}
                  onClick={() => {
                    setShowForm(null);
                  }}>
                  cancel
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="card-body p-0">
          {(showForm === 'add' || showForm === 'edit') && (
            <form className="add-user-form" onSubmit={addOrUpdateUser}>
              <div className="form-group m-0">
                <label htmlFor="f-name">
                  {languageContext.state.lang === 'en' && <>First Name</>}
                  {languageContext.state.lang === 'he' && <>שם פרטי</>}
                </label>
                <input
                  type="text"
                  className="form-control"
                  required={true}
                  id="f-name"
                  placeholder="First Name"
                  name="firstName"
                  value={userForm.firstName}
                  onChange={onChange}
                />
              </div>
              <div className="form-group m-0">
                <label htmlFor="l-name">
                  {languageContext.state.lang === 'en' && <>Last Name</>}
                  {languageContext.state.lang === 'he' && <>שם משפחה</>}
                </label>
                <input
                  type="text"
                  className="form-control"
                  required={true}
                  id="l-name"
                  placeholder="Last Name"
                  name="lastName"
                  value={userForm.lastName}
                  onChange={onChange}
                />
              </div>
              <div className="form-group m-0">
                <label htmlFor="email">
                  {languageContext.state.lang === 'en' && <>Email</>}
                  {languageContext.state.lang === 'he' && <>אימייל</>}
                </label>
                <input
                  type="email"
                  className="form-control"
                  required={true}
                  id="email"
                  placeholder="Email"
                  name="email"
                  value={userForm.email}
                  onChange={onChange}
                />
              </div>
              {showForm === 'add' && (
                <div className="form-group m-0">
                  <label htmlFor="password">
                    {languageContext.state.lang === 'en' && <>Password</>}
                    {languageContext.state.lang === 'he' && <>סיסמה</>}
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    required={true}
                    id="password"
                    placeholder="***********"
                    name="password"
                    value={userForm.password}
                    onChange={onChange}
                  />
                </div>
              )}
              <div className="form-action mt-auto">
                {showForm === 'add' && (
                  <button type="submit" className="btn add-btn">
                    {languageContext.state.lang === 'en' && <>Add User</>}
                    {languageContext.state.lang === 'he' && <>הוסף משתמש</>}
                  </button>
                )}
                {showForm === 'edit' && (
                  <button type="submit" className="btn add-btn">
                    {languageContext.state.lang === 'en' && <>Update User</>}
                    {languageContext.state.lang === 'he' && <>עדכן משתמש</>}
                  </button>
                )}
              </div>
            </form>
          )}
          <table className="table">
            <tr>
              {/*<th scope="col" style={{ width: '100px' }}>*/}
              {/*  #*/}
              {/*</th>*/}
              {/*<th scope="col">Title</th>*/}
              <th scope="col">
                {languageContext.state.lang === 'en' && <>Name</>}
                {languageContext.state.lang === 'he' && <>שם</>}
              </th>
              {/*<th scope="col">Phone</th>*/}
              <th scope="col">
                {languageContext.state.lang === 'en' && <>Email</>}
                {languageContext.state.lang === 'he' && <>אימייל</>}
              </th>
              <th scope="col" style={{ width: '70px' }}>
                {languageContext.state.lang === 'en' && <>Edit</>}
                {languageContext.state.lang === 'he' && <>ערוך</>}
              </th>
              <th scope="col" style={{ width: '70px' }}>
                {languageContext.state.lang === 'en' && <>Delete</>}
                {languageContext.state.lang === 'he' && <>מחיקה</>}
              </th>
              <th scope="col" style={{ width: '100px' }}>
                {languageContext.state.lang === 'en' && <>Enable / Disable</>}
                {languageContext.state.lang === 'he' && (
                  <>
                    פעיל
                    <br />
                    לא פעיל
                  </>
                )}
              </th>
            </tr>
            {users.map((user) => (
              <tr key={user.id}>
                {/*<th scope="row" style={{ textAlign: 'start' }}>*/}
                {/*  {user.id}*/}
                {/*</th>*/}
                {/*<td>Admin</td>*/}
                <td style={{ textAlign: 'start' }}>
                  {user.firstName} {user.lastName}
                </td>
                {/*<td>050-240-8824</td>*/}
                <td style={{ textAlign: 'start' }}>{user.email}</td>
                <td className="center">
                  {context.state.user?.roles?.includes(UserRoles.StoreAdmin) && (
                    <img
                      src={icons.editIcon}
                      className="edit-btn"
                      onClick={() => {
                        onEditUser(user);
                      }}
                      alt="edit icon"
                    />
                  )}
                </td>
                <td className="center">
                  {context.state.user?.id !== user.id &&
                    context.state.user?.roles?.includes(UserRoles.StoreAdmin) && (
                      <span
                        className="material-icons"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          onDeleteUser(user.id as string);
                        }}>
                        delete
                      </span>
                    )}
                </td>
                <td>
                  {context.state.user?.id !== user.id &&
                    context.state.user?.roles?.includes(UserRoles.StoreAdmin) && (
                      <div className="form-check form-toggle">
                        <label className="form-check-label">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={!user.suspended}
                            onChange={() => {
                              onUpdateSuspend(user.id as string, !user.suspended as boolean);
                            }}
                          />
                          <img src={icons.toggleOn} className="toggle-on" alt="toggle-on" />
                          <img src={icons.toggleOff} className="toggle-off" alt="toggle-off" />
                        </label>
                      </div>
                    )}
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
      <div className="clearfix">
        <button type="submit" className="btn view-all-btn px-5">
          {languageContext.state.lang === 'en' && <>View All</>}
          {languageContext.state.lang === 'he' && <>צפה בהכל</>}
        </button>
      </div>
    </section>
  );
}

export default PointStoreUsers;
