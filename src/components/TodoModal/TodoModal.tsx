import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  userId: number,
  setUserId: (id: number) => void,
  setTodo: (id: number) => void,
  todoId: number,
  todos: Todo[],
};

export const TodoModal: React.FC<Props> = ({
  userId,
  setUserId,
  setTodo,
  todoId,
  todos,
}) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const users = async () => {
      setUser(await getUser(userId));
    };

    users();
  }, []);

  const todo = todos.filter((tod => tod.id === todoId))[0];

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                setUserId(0);
                setTodo(0);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={classNames(todo.completed
                  ? 'has-text-success' : 'has-text-danger')}
              >
                {todo.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${user.email}`}>
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
